import type { Transaction, Budget, TransactionInput, BudgetInput } from "./types";

const KEYS = {
  INCOMES: 'ft_incomes',
  EXPENSES: 'ft_expenses',
  BUDGETS: 'ft_budgets',
} as const;

function getItems<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setItems<T>(key: string, items: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(items));
}

function generateLocalId(): string {
  return `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export const localIncomes = {
  getAll: (): Transaction[] => getItems<Transaction>(KEYS.INCOMES),
  add: (item: TransactionInput): Transaction => {
    const items = getItems<Transaction>(KEYS.INCOMES);
    const newItem: Transaction = { ...item, $id: generateLocalId() };
    items.unshift(newItem);
    setItems(KEYS.INCOMES, items);
    return newItem;
  },
  remove: (id: string): void => {
    const items = getItems<Transaction>(KEYS.INCOMES).filter((i) => i.$id !== id);
    setItems(KEYS.INCOMES, items);
  },
  clear: (): void => localStorage.removeItem(KEYS.INCOMES),
};

export const localExpenses = {
  getAll: (): Transaction[] => getItems<Transaction>(KEYS.EXPENSES),
  add: (item: TransactionInput): Transaction => {
    const items = getItems<Transaction>(KEYS.EXPENSES);
    const newItem: Transaction = { ...item, $id: generateLocalId() };
    items.unshift(newItem);
    setItems(KEYS.EXPENSES, items);
    return newItem;
  },
  remove: (id: string): void => {
    const items = getItems<Transaction>(KEYS.EXPENSES).filter((i) => i.$id !== id);
    setItems(KEYS.EXPENSES, items);
  },
  clear: (): void => localStorage.removeItem(KEYS.EXPENSES),
};

export const localBudgets = {
  getAll: (): Budget[] => getItems<Budget>(KEYS.BUDGETS),
  set: (budget: BudgetInput): void => {
    const items = getItems<Budget>(KEYS.BUDGETS).filter((b) => b.month !== budget.month);
    items.push({ ...budget, $id: generateLocalId() });
    setItems(KEYS.BUDGETS, items);
  },
  getByMonth: (month: string): Budget | undefined =>
    getItems<Budget>(KEYS.BUDGETS).find((b) => b.month === month),
  clear: (): void => localStorage.removeItem(KEYS.BUDGETS),
};

export function getAllLocalData(): { incomes: Transaction[]; expenses: Transaction[]; budgets: Budget[] } {
  return {
    incomes: localIncomes.getAll(),
    expenses: localExpenses.getAll(),
    budgets: localBudgets.getAll(),
  };
}

export function clearAllLocalData(): void {
  localIncomes.clear();
  localExpenses.clear();
  localBudgets.clear();
}
