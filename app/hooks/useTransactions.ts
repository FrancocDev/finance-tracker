"use client";

import { useState, useCallback } from "react";
import { databases, DATABASE_ID, COLLECTIONS, Query, ID } from "@/lib/appwrite";
import { localIncomes, localExpenses, localBudgets, getAllLocalData, clearAllLocalData } from "@/lib/localStorage";
import type { Transaction, TransactionInput, Budget, BudgetInput } from "@/lib/types";
import type { Models } from "appwrite";

type AppwriteUser = Models.User<Models.Preferences>;

interface UseTransactionsReturn {
  incomes: Transaction[];
  expenses: Transaction[];
  migrating: boolean;
  addIncome: (data: TransactionInput) => Promise<void>;
  deleteIncome: (id: string) => Promise<void>;
  addExpense: (data: TransactionInput) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  handleAIParsed: (data: TransactionInput & { type: "income" | "expense" }) => Promise<void>;
  loadLocalData: () => void;
  loadRemoteData: (userId: string) => Promise<void>;
  migrateLocalData: (user: AppwriteUser, reloadBudgets: () => Promise<void>) => Promise<void>;
}

export function useTransactions(user: AppwriteUser | null): UseTransactionsReturn {
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [migrating, setMigrating] = useState(false);

  const loadLocalData = useCallback(() => {
    setIncomes(localIncomes.getAll());
    setExpenses(localExpenses.getAll());
  }, []);

  const loadRemoteData = useCallback(async (userId: string) => {
    try {
      const [incomesRes, expensesRes] = await Promise.all([
        databases.listDocuments(DATABASE_ID, COLLECTIONS.INCOMES, [
          Query.equal("userId", userId),
          Query.orderDesc("date"),
        ]),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.EXPENSES, [
          Query.equal("userId", userId),
          Query.orderDesc("date"),
        ]),
      ]);

      setIncomes(incomesRes.documents as unknown as Transaction[]);
      setExpenses(expensesRes.documents as unknown as Transaction[]);
    } catch (err: unknown) {
      console.error("Error loading remote data:", err);
    }
  }, []);

  const addIncome = useCallback(
    async (data: TransactionInput) => {
      if (user) {
        const doc = await databases.createDocument(DATABASE_ID, COLLECTIONS.INCOMES, ID.unique(), {
          ...data,
          userId: user.$id,
        });
        setIncomes((prev) => [doc as unknown as Transaction, ...prev]);
      } else {
        const item = localIncomes.add(data);
        setIncomes((prev) => [item, ...prev]);
      }
    },
    [user]
  );

  const deleteIncome = useCallback(
    async (id: string) => {
      if (user) {
        await databases.deleteDocument(DATABASE_ID, COLLECTIONS.INCOMES, id);
      } else {
        localIncomes.remove(id);
      }
      setIncomes((prev) => prev.filter((i) => i.$id !== id));
    },
    [user]
  );

  const addExpense = useCallback(
    async (data: TransactionInput) => {
      if (user) {
        const doc = await databases.createDocument(DATABASE_ID, COLLECTIONS.EXPENSES, ID.unique(), {
          ...data,
          userId: user.$id,
        });
        setExpenses((prev) => [doc as unknown as Transaction, ...prev]);
      } else {
        const item = localExpenses.add(data);
        setExpenses((prev) => [item, ...prev]);
      }
    },
    [user]
  );

  const deleteExpense = useCallback(
    async (id: string) => {
      if (user) {
        await databases.deleteDocument(DATABASE_ID, COLLECTIONS.EXPENSES, id);
      } else {
        localExpenses.remove(id);
      }
      setExpenses((prev) => prev.filter((e) => e.$id !== id));
    },
    [user]
  );

  const handleAIParsed = useCallback(
    async (data: TransactionInput & { type: "income" | "expense" }) => {
      const { type, ...transactionData } = data;
      if (type === "income") {
        await addIncome(transactionData);
      } else {
        await addExpense(transactionData);
      }
    },
    [addIncome, addExpense]
  );

  const migrateLocalData = useCallback(
    async (currentUser: AppwriteUser, reloadBudgets: () => Promise<void>) => {
      const local = getAllLocalData();
      const hasLocalData =
        local.incomes.length > 0 || local.expenses.length > 0 || local.budgets.length > 0;
      if (!hasLocalData) {
        await loadRemoteData(currentUser.$id);
        return;
      }

      setMigrating(true);
      try {
        for (const item of local.incomes) {
          await databases.createDocument(DATABASE_ID, COLLECTIONS.INCOMES, ID.unique(), {
            amount: item.amount,
            description: item.description,
            category: item.category,
            date: item.date,
            userId: currentUser.$id,
          });
        }
        for (const item of local.expenses) {
          await databases.createDocument(DATABASE_ID, COLLECTIONS.EXPENSES, ID.unique(), {
            amount: item.amount,
            description: item.description,
            category: item.category,
            date: item.date,
            userId: currentUser.$id,
          });
        }
        for (const item of local.budgets) {
          const existing = (
            await databases.listDocuments(DATABASE_ID, COLLECTIONS.BUDGETS, [
              Query.equal("userId", currentUser.$id),
              Query.equal("month", item.month),
            ])
          ).documents[0];

          if (existing) {
            await databases.updateDocument(DATABASE_ID, COLLECTIONS.BUDGETS, existing.$id, {
              amount: item.amount,
            });
          } else {
            await databases.createDocument(DATABASE_ID, COLLECTIONS.BUDGETS, ID.unique(), {
              amount: item.amount,
              period: item.period,
              month: item.month,
              userId: currentUser.$id,
            });
          }
        }

        clearAllLocalData();
        await loadRemoteData(currentUser.$id);
        await reloadBudgets();
      } catch (err: unknown) {
        console.error("Migration error:", err);
        alert("Some local data could not be migrated. Please try again or contact support.");
      } finally {
        setMigrating(false);
      }
    },
    [loadRemoteData]
  );

  return {
    incomes,
    expenses,
    migrating,
    addIncome,
    deleteIncome,
    addExpense,
    deleteExpense,
    handleAIParsed,
    loadLocalData,
    loadRemoteData,
    migrateLocalData,
  };
}
