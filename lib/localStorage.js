/**
 * Local storage utilities for offline-first finance tracking.
 * All data is stored under keys: ft_incomes, ft_expenses, ft_budgets
 */

const KEYS = {
  INCOMES: 'ft_incomes',
  EXPENSES: 'ft_expenses',
  BUDGETS: 'ft_budgets',
};

function getItems(key) {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setItems(key, items) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(items));
}

export const localIncomes = {
  getAll: () => getItems(KEYS.INCOMES),
  add: (item) => {
    const items = getItems(KEYS.INCOMES);
    const newItem = { ...item, $id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}` };
    items.unshift(newItem);
    setItems(KEYS.INCOMES, items);
    return newItem;
  },
  remove: (id) => {
    const items = getItems(KEYS.INCOMES).filter((i) => i.$id !== id);
    setItems(KEYS.INCOMES, items);
  },
  clear: () => localStorage.removeItem(KEYS.INCOMES),
};

export const localExpenses = {
  getAll: () => getItems(KEYS.EXPENSES),
  add: (item) => {
    const items = getItems(KEYS.EXPENSES);
    const newItem = { ...item, $id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}` };
    items.unshift(newItem);
    setItems(KEYS.EXPENSES, items);
    return newItem;
  },
  remove: (id) => {
    const items = getItems(KEYS.EXPENSES).filter((i) => i.$id !== id);
    setItems(KEYS.EXPENSES, items);
  },
  clear: () => localStorage.removeItem(KEYS.EXPENSES),
};

export const localBudgets = {
  getAll: () => getItems(KEYS.BUDGETS),
  set: (budget) => {
    const items = getItems(KEYS.BUDGETS).filter((b) => b.month !== budget.month);
    items.push(budget);
    setItems(KEYS.BUDGETS, items);
  },
  getByMonth: (month) => getItems(KEYS.BUDGETS).find((b) => b.month === month),
  clear: () => localStorage.removeItem(KEYS.BUDGETS),
};

export function getAllLocalData() {
  return {
    incomes: localIncomes.getAll(),
    expenses: localExpenses.getAll(),
    budgets: localBudgets.getAll(),
  };
}

export function clearAllLocalData() {
  localIncomes.clear();
  localExpenses.clear();
  localBudgets.clear();
}
