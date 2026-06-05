"use client";

import { useState, useCallback } from "react";
import { databases, DATABASE_ID, COLLECTIONS, Query, ID } from "@/lib/appwrite";
import { localBudgets } from "@/lib/localStorage";
import type { Budget, BudgetInput } from "@/lib/types";
import type { Models } from "appwrite";

type AppwriteUser = Models.User<Models.Preferences>;

interface UseBudgetReturn {
  budgets: Budget[];
  saveBudget: (data: BudgetInput) => Promise<void>;
  loadLocalBudgets: () => void;
  loadRemoteBudgets: (userId: string) => Promise<void>;
}

export function useBudget(user: AppwriteUser | null): UseBudgetReturn {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const loadLocalBudgets = useCallback(() => {
    setBudgets(localBudgets.getAll());
  }, []);

  const loadRemoteBudgets = useCallback(async (userId: string) => {
    try {
      const budgetsRes = await databases.listDocuments(DATABASE_ID, COLLECTIONS.BUDGETS, [
        Query.equal("userId", userId),
      ]);
      setBudgets(budgetsRes.documents as unknown as Budget[]);
    } catch (err: unknown) {
      console.error("Error loading remote budgets:", err);
    }
  }, []);

  const saveBudget = useCallback(
    async (data: BudgetInput) => {
      if (user) {
        const existing = budgets.find((b) => b.month === data.month);
        if (existing) {
          await databases.updateDocument(DATABASE_ID, COLLECTIONS.BUDGETS, existing.$id, {
            amount: data.amount,
          });
          setBudgets((prev) =>
            prev.map((b) => (b.$id === existing.$id ? { ...b, amount: data.amount } : b))
          );
        } else {
          const doc = await databases.createDocument(DATABASE_ID, COLLECTIONS.BUDGETS, ID.unique(), {
            ...data,
            userId: user.$id,
          });
          setBudgets((prev) => [...prev, doc as unknown as Budget]);
        }
      } else {
        localBudgets.set(data);
        setBudgets(localBudgets.getAll());
      }
    },
    [user, budgets]
  );

  return {
    budgets,
    saveBudget,
    loadLocalBudgets,
    loadRemoteBudgets,
  };
}
