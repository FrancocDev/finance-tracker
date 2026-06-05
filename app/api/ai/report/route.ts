import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { getAuthenticatedUser } from "@/lib/auth-server";
import { reportLimiter } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const limit = await reportLimiter.consume(user.$id);
  if (!limit.allowed) {
    const minutes = Math.ceil(limit.resetInMs / 60000);
    return NextResponse.json(
      { error: `Rate limit exceeded. Try again in ${minutes} minute(s).` },
      { status: 429 }
    );
  }

  let body: {
    startMonth: string;
    endMonth: string;
    incomes: Array<{ amount: number; description?: string; category: string; date: string }>;
    expenses: Array<{ amount: number; description?: string; category: string; date: string }>;
    budget?: { amount: number } | null;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { startMonth, endMonth, incomes, expenses, budget } = body;

  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const balance = totalIncome - totalExpense;

  const expenseByCategory = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(expenseByCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, amt]) => `${cat}: $${amt.toFixed(2)}`)
    .join("\n");

  const systemPrompt = `You are a concise, insightful financial analyst. Analyze the user's income and expenses for the period ${startMonth} to ${endMonth}.

Provide a brief report in markdown format with:
1. **Summary** — Total income, total expenses, net balance
2. **Top Spending** — List the top 3-5 categories by amount spent
3. **Budget Status** — If a budget is provided, state remaining budget and percentage used
4. **Insights** — 2-3 short, actionable observations or tips

Keep it friendly, concise, and avoid generic advice. Use the actual numbers provided.

Data:
- Total Income: $${totalIncome.toFixed(2)} (${incomes.length} transactions)
- Total Expenses: $${totalExpense.toFixed(2)} (${expenses.length} transactions)
- Net Balance: $${balance.toFixed(2)}
- Budget: ${budget ? `$${budget.amount.toFixed(2)}` : "Not set"}
- Expense Categories:\n${sortedCategories || "None"}`;

  try {
    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      prompt: "Generate the financial report based on the data above.",
    });

    return result.toTextStreamResponse();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to generate report";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
