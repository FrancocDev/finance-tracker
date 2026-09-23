import { TypeSafeClient } from "@typesafe-ai/sdk";

let client: TypeSafeClient | null = null;

export const incomeCategories = {
  Salary: "Employment income or a regular paycheck",
  Freelance: "Income from independent contract or freelance work",
  Investment: "Returns, dividends, interest, or other investment income",
  Gift: "Money received as a gift",
  Other: "Income that does not fit another category",
} as const;

export const expenseCategories = {
  Food: "Groceries, restaurants, coffee, or meals",
  Transport: "Fuel, public transit, taxis, or rideshares",
  Rent: "Rent, mortgage, or housing payment",
  Utilities: "Electricity, water, internet, phone, or other utilities",
  Entertainment: "Movies, games, hobbies, or leisure",
  Shopping: "Clothing, electronics, household goods, or retail purchases",
  Health: "Medical, pharmacy, fitness, or health-related spending",
  Other: "An expense that does not fit another category",
} as const;

export const transactionCategories = {
  ...incomeCategories,
  ...expenseCategories,
} as const;

export function getTypeSafeClient(): TypeSafeClient {
  const apiKey = process.env.TYPESAFE_API_KEY;
  if (!apiKey) {
    throw new Error("TYPESAFE_API_KEY is not configured");
  }

  client ??= new TypeSafeClient({
    apiKey,
    defaultModel: process.env.TYPESAFE_DEFAULT_MODEL || "jev-latest",
  });

  return client;
}
