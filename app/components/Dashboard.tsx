"use client";

import { useState, useEffect } from "react";
import { account, databases, DATABASE_ID, COLLECTIONS, Query, ID } from "@/lib/appwrite";
import { localIncomes, localExpenses, localBudgets, getAllLocalData, clearAllLocalData } from "@/lib/localStorage";
import type { Transaction, Budget, TransactionInput, BudgetInput } from "@/lib/types";
import type { Models } from "appwrite";
import AddTransaction from "./AddTransaction";
import TransactionList from "./TransactionList";
import BudgetManager from "./BudgetManager";
import AIQuickAdd from "./AIQuickAdd";
import AIReport from "./AIReport";

export default function Dashboard() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [migrating, setMigrating] = useState<boolean>(false);

  // Auth form state
  const [authEmail, setAuthEmail] = useState<string>("");
  const [authPassword, setAuthPassword] = useState<string>("");
  const [authName, setAuthName] = useState<string>("");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authError, setAuthError] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  useEffect(() => {
    setCurrentMonth(new Date().toISOString().slice(0, 7));

    const init = async () => {
      setLoading(true);
      try {
        const currentUser = await account.get();
        setUser(currentUser);
        await loadRemoteData(currentUser.$id);
      } catch {
        setUser(null);
        loadLocalData();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const loadLocalData = () => {
    setIncomes(localIncomes.getAll());
    setExpenses(localExpenses.getAll());
    setBudgets(localBudgets.getAll());
  };

  const loadRemoteData = async (userId: string) => {
    try {
      const [incomesRes, expensesRes, budgetsRes] = await Promise.all([
        databases.listDocuments(DATABASE_ID, COLLECTIONS.INCOMES, [
          Query.equal("userId", userId),
          Query.orderDesc("date"),
        ]),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.EXPENSES, [
          Query.equal("userId", userId),
          Query.orderDesc("date"),
        ]),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.BUDGETS, [Query.equal("userId", userId)]),
      ]);

      setIncomes(incomesRes.documents as unknown as Transaction[]);
      setExpenses(expensesRes.documents as unknown as Transaction[]);
      setBudgets(budgetsRes.documents as unknown as Budget[]);
    } catch (err: unknown) {
      console.error("Error loading remote data:", err);
    }
  };

  // ---- CRUD callbacks ----

  const addIncome = async (data: TransactionInput) => {
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
  };

  const deleteIncome = async (id: string) => {
    if (user) {
      await databases.deleteDocument(DATABASE_ID, COLLECTIONS.INCOMES, id);
    } else {
      localIncomes.remove(id);
    }
    setIncomes((prev) => prev.filter((i) => i.$id !== id));
  };

  const addExpense = async (data: TransactionInput) => {
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
  };

  const deleteExpense = async (id: string) => {
    if (user) {
      await databases.deleteDocument(DATABASE_ID, COLLECTIONS.EXPENSES, id);
    } else {
      localExpenses.remove(id);
    }
    setExpenses((prev) => prev.filter((e) => e.$id !== id));
  };

  const handleAIParsed = async (data: TransactionInput & { type: "income" | "expense" }) => {
    if (data.type === "income") {
      await addIncome(data);
    } else {
      await addExpense(data);
    }
  };

  const saveBudget = async (data: BudgetInput) => {
    if (user) {
      const existing = budgets.find((b) => b.month === data.month);
      if (existing) {
        await databases.updateDocument(DATABASE_ID, COLLECTIONS.BUDGETS, existing.$id, {
          amount: data.amount,
        });
        setBudgets((prev) => prev.map((b) => (b.$id === existing.$id ? { ...b, amount: data.amount } : b)));
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
  };

  // ---- Auth ----

  const handleLogin = async () => {
    setAuthError("");
    setAuthLoading(true);
    try {
      await account.createEmailPasswordSession(authEmail, authPassword);
      const current = await account.get();
      await migrateLocalData(current);
      setUser(current);
      setShowAuth(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setAuthError(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async () => {
    setAuthError("");
    setAuthLoading(true);
    try {
      await account.create(ID.unique(), authEmail, authPassword, authName);
      await handleLogin();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setAuthError(message);
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      loadLocalData();
    } catch (err: unknown) {
      console.error("Logout error:", err);
    }
  };

  // ---- Migration ----

  const migrateLocalData = async (currentUser: Models.User<Models.Preferences>) => {
    const local = getAllLocalData();
    const hasLocalData = local.incomes.length > 0 || local.expenses.length > 0 || local.budgets.length > 0;
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
    } catch (err: unknown) {
      console.error("Migration error:", err);
      alert("Some local data could not be migrated. Please try again or contact support.");
    } finally {
      setMigrating(false);
    }
  };

  // ---- Derived state ----

  const totalIncome = incomes.reduce((sum, i) => sum + (i.amount || 0), 0);
  const totalExpense = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const balance = totalIncome - totalExpense;

  const currentBudget = budgets.find((b) => b.month === currentMonth);
  const monthlyExpenses = expenses
    .filter((e) => e.date?.startsWith(currentMonth))
    .reduce((sum, e) => sum + (e.amount || 0), 0);
  const budgetRemaining = currentBudget ? currentBudget.amount - monthlyExpenses : null;
  const budgetPercent = currentBudget ? (monthlyExpenses / currentBudget.amount) * 100 : 0;

  const hasLocalData = !user && (incomes.length > 0 || expenses.length > 0 || budgets.length > 0);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#64748b" }}>
          <span style={spinnerStyle} />
          Loading your finances...
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      {/* Header */}
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Finance Tracker</h1>
          <p style={subtitleStyle}>
            {user
              ? `Welcome back, ${user.name || user.email}`
              : "Track your finances locally — save to the cloud anytime"}
          </p>
        </div>
        {user ? (
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => {
                setAuthMode("login");
                setShowAuth(true);
              }}
              style={loginButtonStyle}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode("register");
                setShowAuth(true);
              }}
              style={saveButtonStyle}
            >
              ☁️ Save to Cloud
            </button>
          </div>
        )}
      </header>

      {/* CTA Banner */}
      {hasLocalData && (
        <div style={ctaBannerStyle}>
          <div>
            <strong>You have {incomes.length + expenses.length} local record(s)</strong>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#475569" }}>
              Your data is saved in this browser. Sign in to back it up to the cloud.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => {
                setAuthMode("login");
                setShowAuth(true);
              }}
              style={ctaSecondaryButtonStyle}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode("register");
                setShowAuth(true);
              }}
              style={ctaButtonStyle}
            >
              Save to Cloud
            </button>
          </div>
        </div>
      )}

      {/* Migration overlay */}
      {migrating && (
        <div style={overlayStyle}>
          <div style={overlayContentStyle}>
            <span style={spinnerStyle} />
            <p style={{ margin: 0, fontWeight: 600 }}>Migrating your local data to the cloud...</p>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
              Please don&apos;t close this tab.
            </p>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <div style={modalOverlayStyle} onClick={() => setShowAuth(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowAuth(false)} style={modalCloseStyle}>
              ×
            </button>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>☁️</div>
              <h2 style={{ margin: 0, fontSize: 20 }}>
                {authMode === "login" ? "Sign In" : "Create Account"}
              </h2>
              <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>
                {authMode === "login"
                  ? "Access your data from anywhere"
                  : "Start tracking in the cloud"}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {authMode === "register" && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  style={modalInputStyle}
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                style={modalInputStyle}
              />
              <input
                type="password"
                placeholder="Password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                style={modalInputStyle}
              />
              <button
                onClick={authMode === "login" ? handleLogin : handleRegister}
                disabled={authLoading}
                style={modalButtonStyle}
              >
                {authLoading ? "Loading..." : authMode === "login" ? "Sign In" : "Create Account"}
              </button>
              <p style={{ textAlign: "center", fontSize: 13, color: "#64748b", margin: 0 }}>
                {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => {
                    setAuthMode(authMode === "login" ? "register" : "login");
                    setAuthError("");
                  }}
                  style={{ ...linkStyle, background: "none", border: "none", cursor: "pointer" }}
                >
                  {authMode === "login" ? "Register" : "Sign In"}
                </button>
              </p>
            </div>

            {authError && <div style={errorStyle}>{authError}</div>}
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div style={cardsGridStyle}>
        <SummaryCard title="Balance" amount={balance} color={balance >= 0 ? "#0f172a" : "#ef4444"} />
        <SummaryCard title="Income" amount={totalIncome} color="#10b981" icon="📈" />
        <SummaryCard title="Expenses" amount={totalExpense} color="#ef4444" icon="📉" />
      </div>

      {/* Budget Progress */}
      {currentBudget && (
        <div style={budgetBarContainerStyle}>
          <div style={budgetBarHeaderStyle}>
            <span style={budgetBarLabelStyle}>Budget ({currentMonth})</span>
            <span style={{ fontWeight: 700, color: budgetRemaining && budgetRemaining >= 0 ? "#10b981" : "#ef4444" }}>
              ${budgetRemaining?.toFixed(2)} remaining
            </span>
          </div>
          <div style={progressTrackStyle}>
            <div
              style={{
                ...progressFillStyle,
                width: `${Math.min(budgetPercent, 100)}%`,
                background: budgetPercent > 90 ? "#ef4444" : budgetPercent > 75 ? "#f59e0b" : "#10b981",
              }}
            />
          </div>
          <p style={progressTextStyle}>${monthlyExpenses.toFixed(2)} of ${currentBudget.amount.toFixed(2)}</p>
        </div>
      )}

      {/* Tabs */}
      <div style={tabsContainerStyle}>
        {["overview", "incomes", "expenses", "budget", "ai-report"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...tabButtonStyle,
              borderBottomColor: activeTab === tab ? "#0f172a" : "transparent",
              color: activeTab === tab ? "#0f172a" : "#64748b",
              fontWeight: activeTab === tab ? 600 : 400,
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div>
          <AIQuickAdd
            user={user}
            onAuthRequired={() => setShowAuth(true)}
            onParsed={handleAIParsed}
          />
          <div style={overviewGridStyle}>
            <div>
              <AddTransaction type="income" onAdd={addIncome} />
              <TransactionList transactions={incomes.slice(0, 5)} type="income" onDelete={deleteIncome} />
            </div>
            <div>
              <AddTransaction type="expense" onAdd={addExpense} />
              <TransactionList transactions={expenses.slice(0, 5)} type="expense" onDelete={deleteExpense} />
            </div>
          </div>
        </div>
      )}

      {activeTab === "incomes" && (
        <div style={{ maxWidth: 600 }}>
          <AddTransaction type="income" onAdd={addIncome} />
          <TransactionList transactions={incomes} type="income" onDelete={deleteIncome} />
        </div>
      )}

      {activeTab === "expenses" && (
        <div style={{ maxWidth: 600 }}>
          <AddTransaction type="expense" onAdd={addExpense} />
          <TransactionList transactions={expenses} type="expense" onDelete={deleteExpense} />
        </div>
      )}

      {activeTab === "budget" && (
        <div style={{ maxWidth: 600 }}>
          <BudgetManager budgets={budgets} onSave={saveBudget} />
        </div>
      )}

      {activeTab === "ai-report" && (
        <AIReport
          user={user}
          onAuthRequired={() => setShowAuth(true)}
          incomes={incomes}
          expenses={expenses}
          budgets={budgets}
          currentMonth={currentMonth}
        />
      )}
    </div>
  );
}

function SummaryCard({ title, amount, color, icon }: { title: string; amount: number; color: string; icon?: string }) {
  return (
    <div style={cardStyle}>
      <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>
        {icon} {title}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color, marginTop: 8, letterSpacing: -0.5 }}>
        ${amount.toFixed(2)}
      </div>
    </div>
  );
}

// ---- Styles ----

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 32,
  paddingBottom: 20,
  borderBottom: "1px solid #e2e8f0",
};

const titleStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 800,
  margin: 0,
  color: "#0f172a",
  letterSpacing: -0.5,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#64748b",
  margin: "4px 0 0",
};

const logoutButtonStyle: React.CSSProperties = {
  padding: "8px 18px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  background: "#ffffff",
  cursor: "pointer",
  fontSize: 13,
  color: "#475569",
  fontWeight: 500,
};

const loginButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  background: "#ffffff",
  color: "#475569",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 600,
};

const saveButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 8,
  border: "none",
  background: "#0f172a",
  color: "#ffffff",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 600,
};

const ctaBannerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 20px",
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  borderRadius: 12,
  marginBottom: 24,
};

const ctaSecondaryButtonStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 8,
  border: "1px solid #0f172a",
  background: "#ffffff",
  color: "#0f172a",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  whiteSpace: "nowrap",
};

const ctaButtonStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 8,
  border: "none",
  background: "#0f172a",
  color: "#ffffff",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  whiteSpace: "nowrap",
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
};

const overlayContentStyle: React.CSSProperties = {
  background: "#ffffff",
  padding: "32px 40px",
  borderRadius: 16,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
};

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 50,
  padding: 20,
};

const modalStyle: React.CSSProperties = {
  background: "#ffffff",
  padding: "32px 28px",
  borderRadius: 16,
  width: "100%",
  maxWidth: 400,
  position: "relative",
  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
};

const modalCloseStyle: React.CSSProperties = {
  position: "absolute",
  top: 12,
  right: 16,
  background: "none",
  border: "none",
  fontSize: 24,
  color: "#94a3b8",
  cursor: "pointer",
  lineHeight: 1,
};

const modalInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 15,
  color: "#0f172a",
};

const modalButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: 8,
  border: "none",
  background: "#0f172a",
  color: "#ffffff",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
};

const linkStyle: React.CSSProperties = {
  color: "#0f172a",
  fontWeight: 600,
  textDecoration: "underline",
};

const errorStyle: React.CSSProperties = {
  marginTop: 12,
  padding: "10px 14px",
  borderRadius: 8,
  background: "#fef2f2",
  color: "#dc2626",
  fontSize: 13,
  textAlign: "center",
};

const cardsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 16,
  marginBottom: 24,
};

const cardStyle: React.CSSProperties = {
  padding: 20,
  background: "#ffffff",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const budgetBarContainerStyle: React.CSSProperties = {
  marginBottom: 24,
  padding: 20,
  background: "#ffffff",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const budgetBarHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
};

const budgetBarLabelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "#475569",
};

const progressTrackStyle: React.CSSProperties = {
  width: "100%",
  height: 8,
  background: "#f1f5f9",
  borderRadius: 4,
  overflow: "hidden",
};

const progressFillStyle: React.CSSProperties = {
  height: "100%",
  borderRadius: 4,
  transition: "width 0.4s ease, background 0.4s ease",
};

const progressTextStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#94a3b8",
  marginTop: 8,
  fontWeight: 500,
};

const tabsContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: 4,
  marginBottom: 24,
  borderBottom: "1px solid #e2e8f0",
};

const tabButtonStyle: React.CSSProperties = {
  padding: "10px 18px",
  border: "none",
  background: "none",
  cursor: "pointer",
  fontSize: 14,
  borderBottom: "2px solid transparent",
  marginBottom: -1,
  transition: "all 0.2s",
};

const overviewGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 20,
};

const spinnerStyle: React.CSSProperties = {
  display: "inline-block",
  width: 18,
  height: 18,
  border: "2px solid #e2e8f0",
  borderTopColor: "#64748b",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};
