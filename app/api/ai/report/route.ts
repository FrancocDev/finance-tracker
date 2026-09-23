import { choice, score } from "@typesafe-ai/sdk";
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth-server";
import { getTypeSafeClient } from "@/lib/typesafe";
import { reportLimiter } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const spendingPressureQuestion = score(
  "How much pressure does this spending pattern put on the user's finances?",
  [
    "Low pressure: spending is comfortably covered by income or budget",
    "Moderate pressure: spending deserves attention but is manageable",
    "High pressure: spending is likely to cause financial strain",
  ] as const
);

const cashFlowQuestion = choice("What best describes the net cash flow for this period?", {
  positive: "Income is greater than expenses",
  balanced: "Income and expenses are roughly equal",
  negative: "Expenses are greater than income",
});

const budgetRiskQuestion = choice("What is the budget status for the period?", {
  not_set: "No budget was provided",
  on_track: "Expenses are comfortably below the budget",
  near_limit: "Expenses are close to the budget limit",
  over_budget: "Expenses exceed the budget",
});

const savingsOpportunityQuestion = choice(
  "Which category is the clearest opportunity to reduce spending, if any?",
  {
    none: "There is no clear category to reduce",
    Food: "Food spending",
    Transport: "Transport spending",
    Rent: "Rent or housing spending",
    Utilities: "Utilities spending",
    Entertainment: "Entertainment spending",
    Shopping: "Shopping spending",
    Health: "Health spending",
    Other: "Other spending",
  }
);

function money(value: number): string {
  return `$${value.toFixed(2)}`;
}

function percent(value: number): string {
  return `${Math.round(value)}%`;
}

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
    startMonth?: unknown;
    endMonth?: unknown;
    incomes?: unknown;
    expenses?: unknown;
    budget?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof body.startMonth !== "string" ||
    typeof body.endMonth !== "string" ||
    !Array.isArray(body.incomes) ||
    !Array.isArray(body.expenses)
  ) {
    return NextResponse.json({ error: "Invalid report data" }, { status: 400 });
  }

  const incomes = body.incomes as Array<{ amount: number; description?: string; category: string; date: string }>;
  const expenses = body.expenses as Array<{ amount: number; description?: string; category: string; date: string }>;
  const budget = body.budget && typeof body.budget === "object" && "amount" in body.budget
    ? body.budget as { amount: number }
    : null;

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = totalIncome - totalExpense;
  const budgetUsed = budget && budget.amount > 0 ? (totalExpense / budget.amount) * 100 : null;
  const expenseByCategory = expenses.reduce<Record<string, number>>((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});
  const topCategories = Object.entries(expenseByCategory)
    .sort(([, first], [, second]) => second - first)
    .slice(0, 5);

  try {
    const { answers } = await getTypeSafeClient().systemOne({
      state: {
        period: { start: body.startMonth, end: body.endMonth },
        totals: {
          income: totalIncome,
          expenses: totalExpense,
          balance,
          incomeTransactions: incomes.length,
          expenseTransactions: expenses.length,
        },
        budget: budget ? { amount: budget.amount, usedPercent: budgetUsed } : null,
        expenseByCategory,
        topCategories,
      },
      questions: {
        spendingPressure: spendingPressureQuestion,
        cashFlow: cashFlowQuestion,
        budgetRisk: budgetRiskQuestion,
        savingsOpportunity: savingsOpportunityQuestion,
      },
    });

    const pressure = Math.round(answers.spendingPressure.score);
    const budgetRisk = answers.budgetRisk.choice;
    const savingsOpportunity = answers.savingsOpportunity.choice;
    const topCategoryMarkdown = topCategories.length > 0
      ? topCategories.map(([category, total]) => `- **${category}:** ${money(total)}`).join("\n")
      : "- No expenses recorded in this period.";
    const insights = [
      balance < 0
        ? `- Expenses exceeded income by ${money(Math.abs(balance))}.`
        : `- The period ended with a positive balance of ${money(balance)}.`,
      budgetRisk === "over_budget"
        ? `- Spending is over budget by ${money(totalExpense - (budget?.amount || 0))}.`
        : budgetRisk === "near_limit" && budgetUsed !== null
          ? `- Spending is close to the budget limit at ${percent(budgetUsed)} used.`
          : budgetRisk === "not_set"
            ? "- Consider setting a budget to make spending limits visible."
            : "- Spending is currently within the available budget.",
      savingsOpportunity === "none"
        ? "- Jev did not identify one dominant category to cut back."
        : `- Jev identified **${savingsOpportunity}** as the clearest category to review.`,
    ].join("\n");

    const report = [
      "# Financial Report",
      `**Period:** ${body.startMonth} to ${body.endMonth}`,
      "",
      "## Summary",
      `- **Total income:** ${money(totalIncome)} (${incomes.length} transaction(s))`,
      `- **Total expenses:** ${money(totalExpense)} (${expenses.length} transaction(s))`,
      `- **Net balance:** ${money(balance)}`,
      "",
      "## Top Spending",
      topCategoryMarkdown,
      "",
      "## Budget Status",
      budget
        ? `- **Budget:** ${money(budget.amount)}\n- **Used:** ${budgetUsed === null ? "N/A" : percent(budgetUsed)}\n- **Remaining:** ${money(budget.amount - totalExpense)}`
        : "- No budget set for this period.",
      "",
      "## Jev Signals",
      `- **Cash flow:** ${answers.cashFlow.choice.replace("_", " ")}`,
      `- **Spending pressure:** ${pressure}/2 (${answers.spendingPressure.confidence.toFixed(2)} confidence)`,
      `- **Budget risk:** ${budgetRisk.replace("_", " ")}`,
      "",
      "## Insights",
      insights,
    ].join("\n");

    return new Response(report, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to generate report";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
