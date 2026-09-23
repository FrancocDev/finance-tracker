import { choice } from "@typesafe-ai/sdk";
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth-server";
import { getTypeSafeClient, transactionCategories, incomeCategories, expenseCategories } from "@/lib/typesafe";
import { quickAddLimiter } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

type TransactionType = "income" | "expense";

const typeQuestion = choice("Is this transaction money coming in or money going out?", {
  income: "Money received, earned, or deposited",
  expense: "Money spent, paid, or withdrawn",
});

const categoryQuestion = choice(
  "Which category best describes this transaction? Choose from the available categories.",
  transactionCategories
);

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function parseAmount(text: string): number | null {
  const matches = [...text.matchAll(/(?:[$€£]\s*)?(\d[\d.,]*)(?:\s*(k|m|mil)\b)?/gi)]
    .map((match) => ({
      raw: match[0],
      value: match[1],
      scale: match[2]?.toLowerCase(),
      index: match.index ?? 0,
    }))
    .filter(({ value, raw, index }) => {
      const before = text[index - 1];
      const after = text[index + raw.length];
      const isDatePart = before === "-" || after === "-";
      const isYear = /^\d{4}$/.test(value) && Number(value) >= 1900 && Number(value) <= 2100;
      return !isDatePart && !isYear;
    });

  if (matches.length === 0) return null;

  const preferred = matches.find(({ raw, value }) =>
    /[$€£]/.test(raw) || /[.,]/.test(value) || /\b(?:k|m|mil)\b/i.test(raw)
  );
  const candidate = preferred ?? matches[0];
  let normalized = candidate.value;

  if (normalized.includes(",") && normalized.includes(".")) {
    normalized = normalized.lastIndexOf(",") > normalized.lastIndexOf(".")
      ? normalized.replace(/\./g, "").replace(",", ".")
      : normalized.replace(/,/g, "");
  } else if (normalized.includes(",")) {
    normalized = /,\d{1,2}$/.test(normalized)
      ? normalized.replace(",", ".")
      : normalized.replace(/,/g, "");
  }

  const amount = Number(normalized);
  if (!Number.isFinite(amount) || amount <= 0) return null;

  const multiplier = candidate.scale === "k" || candidate.scale === "mil"
    ? 1_000
    : candidate.scale === "m"
      ? 1_000_000
      : 1;

  return amount * multiplier;
}

function parseDate(text: string, today = new Date()): string {
  const isoDate = text.match(/\b(20\d{2})[-/](\d{1,2})[-/](\d{1,2})\b/);
  if (isoDate) {
    return toIsoDate(new Date(Number(isoDate[1]), Number(isoDate[2]) - 1, Number(isoDate[3])));
  }

  const normalized = text.toLowerCase();
  if (/\bday before yesterday\b/.test(normalized)) return toIsoDate(addDays(today, -2));
  if (/\byesterday\b/.test(normalized)) return toIsoDate(addDays(today, -1));
  if (/\btomorrow\b/.test(normalized)) return toIsoDate(addDays(today, 1));
  if (/\btoday\b/.test(normalized)) return toIsoDate(today);

  const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const weekdayMatch = normalized.match(/\b(last|this|on)?\s*(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/);
  if (weekdayMatch) {
    const target = weekdays.indexOf(weekdayMatch[2]);
    const difference = (today.getDay() - target + 7) % 7;
    const daysAgo = weekdayMatch[1] === "last" ? difference || 7 : difference;
    return toIsoDate(addDays(today, -daysAgo));
  }

  const monthDayMatch = normalized.match(
    /\b(?:on\s+)?(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s+(20\d{2}))?\b/
  );
  if (monthDayMatch) {
    const month = [
      "january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december",
    ].indexOf(monthDayMatch[1]);
    return toIsoDate(new Date(
      Number(monthDayMatch[3] || today.getFullYear()),
      month,
      Number(monthDayMatch[2])
    ));
  }

  const dayOnlyMatch = normalized.match(/\b(?:on\s+the\s+)?(\d{1,2})(?:st|nd|rd|th)\b/);
  if (dayOnlyMatch) {
    return toIsoDate(new Date(today.getFullYear(), today.getMonth(), Number(dayOnlyMatch[1])));
  }

  return toIsoDate(today);
}

function cleanDescription(text: string): string {
  return text
    .replace(/[$€£]\s*\d[\d.,]*(?:\s*(?:k|m|mil))?/gi, "")
    .replace(/\b\d[\d.,]*\s*(?:k|m|mil)\b/gi, "")
    .replace(/\b(?:today|yesterday|tomorrow|day before yesterday|last\s+\w+day)\b/gi, "")
    .replace(/\s+/g, " ")
    .replace(/^[\s,–-]+|[\s,–-]+$/g, "")
    .trim() || text.trim();
}

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

  let body: { text?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body.text !== "string" || body.text.trim().length === 0) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const text = body.text.trim();
  const amount = parseAmount(text);
  if (amount === null) {
    return NextResponse.json(
      { error: "Could not find a positive amount in that transaction." },
      { status: 422 }
    );
  }

  try {
    const { answers } = await getTypeSafeClient().systemOne({
      state: {
        transaction: text,
        today: toIsoDate(new Date()),
        amount,
      },
      questions: {
        type: typeQuestion,
        category: categoryQuestion,
      },
    });

    const type = answers.type.choice as TransactionType;
    const selectedCategory = answers.category.choice;
    const validCategories = type === "income"
      ? Object.keys(incomeCategories)
      : Object.keys(expenseCategories);
    const category = validCategories.includes(selectedCategory) ? selectedCategory : "Other";

    return NextResponse.json({
      data: {
        type,
        amount,
        category,
        description: cleanDescription(text),
        date: parseDate(text),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to classify transaction";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
