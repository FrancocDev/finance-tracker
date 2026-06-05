import { NextResponse } from "next/server";
import { groq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { z } from "zod";
import { getAuthenticatedUser } from "@/lib/auth-server";
import { quickAddLimiter } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.number().positive(),
  category: z.string(),
  description: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function POST(request: Request) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const limit = await quickAddLimiter.consume(user.$id);
  if (!limit.allowed) {
    const minutes = Math.ceil(limit.resetInMs / 60000);
    return NextResponse.json(
      { error: `Rate limit exceeded. Try again in ${minutes} minute(s).` },
      { status: 429 }
    );
  }

  let body: { text: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { text } = body;
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  try {
    const { object } = await generateObject({
      model: groq("llama-3.1-8b-instant"),
      schema: transactionSchema,
      prompt: `Parse this natural language transaction into structured data.

Rules:
- Determine if it's income or expense based on context.
- Income categories: Salary, Freelance, Investment, Gift, Other
- Expense categories: Food, Transport, Rent, Utilities, Entertainment, Shopping, Health, Other
- If date is relative (e.g., "yesterday", "last week", "today"), convert it to an ISO date string (YYYY-MM-DD) relative to today (${new Date().toISOString().slice(0, 10)}).
- Amount should be a positive number.
- Description should be a clean, concise summary.

Transaction: "${text.trim()}"`,
    });

    return NextResponse.json({ data: object });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to parse transaction";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
