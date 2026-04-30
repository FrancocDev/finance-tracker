export interface Transaction {
  $id: string;
  amount: number;
  description?: string;
  category: string;
  date: string;
  userId?: string;
}

export interface Budget {
  $id: string;
  amount: number;
  period: string;
  month: string;
  userId?: string;
}

export interface TransactionInput {
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface BudgetInput {
  amount: number;
  period: string;
  month: string;
}

export type TransactionType = "income" | "expense";
