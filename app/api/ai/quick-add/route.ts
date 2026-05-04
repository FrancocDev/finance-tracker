import { NextResponse } from "next/server";
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
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

  const limit = quickAddLimiter.consume(user.$id);
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
    const { text: aiText } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      system: `You are a finance assistant. Parse natural language transactions into structured JSON.

Rules:
- Determine if it's income or expense based on context.
- Income categories: Salary, Freelance, Investment, Gift, Other
- Expense categories: Food, Transport, Rent, Utilities, Entertainment, Shopping, Health, Other
- If date is relative (e.g., "yesterday", "last week", "today"), convert it to an ISO date string (YYYY-MM-DD) relative to today (${new Date().toISOString().slice(0, 10)}).
- Amount should be a positive number.
- Description should be a clean, concise summary.

Return ONLY a JSON object with this exact shape (no markdown, no explanation):
{"type":"income|expense","amount":0.00,"category":"Category","description":"Description","date":"YYYY-MM-DD"}`,
      prompt: `Parse this transaction: "${text.trim()}"`,
    });

    // Extract JSON from response (handle potential markdown fences)
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in AI response");
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const validated = transactionSchema.parse(parsed);

    return NextResponse.json({ data: validated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to parse transaction";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
