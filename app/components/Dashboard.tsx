"use client";

import { useState, useEffect } from "react";
import type { TransactionInput, BudgetInput } from "@/lib/types";
import AddTransaction from "./AddTransaction";
import TransactionList from "./TransactionList";
import BudgetManager from "./BudgetManager";
import AIQuickAdd from "./AIQuickAdd";
import AIReport from "./AIReport";
import { useAuth } from "../hooks/useAuth";
import { useTransactions } from "../hooks/useTransactions";
import { useBudget } from "../hooks/useBudget";

export default function Dashboard() {
  const [currentMonth, setCurrentMonth] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Auth
  const auth = useAuth(async (user) => {
    await transactions.loadRemoteData(user.$id);
    await budgets.loadRemoteBudgets(user.$id);
  });

  // Data
  const transactions = useTransactions(auth.user);
  const budgets = useBudget(auth.user);

  useEffect(() => {
    setCurrentMonth(new Date().toISOString().slice(0, 7));

    // Load local data when no user is found after auth init
    if (!auth.loading && !auth.user) {
      transactions.loadLocalData();
      budgets.loadLocalBudgets();
    }
  }, [auth.loading, auth.user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Wrap login to handle migration
  const handleLogin = async () => {
    const user = await auth.handleLogin();
    await transactions.migrateLocalData(user, async () => {
      await budgets.loadRemoteBudgets(user.$id);
    });
  };

  // Wrap logout to load local data
  const handleLogout = async () => {
    await auth.handleLogout();
    transactions.loadLocalData();
    budgets.loadLocalBudgets();
  };

  // ---- Derived state ----

  const totalIncome = transactions.incomes.reduce((sum, i) => sum + (i.amount || 0), 0);
  const totalExpense = transactions.expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const balance = totalIncome - totalExpense;

  const currentBudget = budgets.budgets.find((b) => b.month === currentMonth);
  const monthlyExpenses = transactions.expenses
    .filter((e) => e.date?.startsWith(currentMonth))
    .reduce((sum, e) => sum + (e.amount || 0), 0);
  const budgetRemaining = currentBudget ? currentBudget.amount - monthlyExpenses : null;
  const budgetPercent = currentBudget ? (monthlyExpenses / currentBudget.amount) * 100 : 0;

  const hasLocalData =
    !auth.user &&
    (transactions.incomes.length > 0 ||
      transactions.expenses.length > 0 ||
      budgets.budgets.length > 0);

  if (auth.loading) {
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
            {auth.user
              ? `Welcome back, ${auth.user.name || auth.user.email}`
              : "Track your finances locally — save to the cloud anytime"}
          </p>
        </div>
        {auth.user ? (
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => {
                auth.setAuthMode("login");
                auth.setShowAuth(true);
              }}
              style={loginButtonStyle}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                auth.setAuthMode("register");
                auth.setShowAuth(true);
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
            <strong>
              You have {transactions.incomes.length + transactions.expenses.length} local record(s)
            </strong>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#475569" }}>
              Your data is saved in this browser. Sign in to back it up to the cloud.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => {
                auth.setAuthMode("login");
                auth.setShowAuth(true);
              }}
              style={ctaSecondaryButtonStyle}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                auth.setAuthMode("register");
                auth.setShowAuth(true);
              }}
              style={ctaButtonStyle}
            >
              Save to Cloud
            </button>
          </div>
        </div>
      )}

      {/* Migration overlay */}
      {transactions.migrating && (
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
      {auth.showAuth && (
        <div style={modalOverlayStyle} onClick={() => auth.setShowAuth(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => auth.setShowAuth(false)} style={modalCloseStyle}>
              ×
            </button>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>☁️</div>
              <h2 style={{ margin: 0, fontSize: 20 }}>
                {auth.authMode === "login" ? "Sign In" : "Create Account"}
              </h2>
              <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>
                {auth.authMode === "login"
                  ? "Access your data from anywhere"
                  : "Start tracking in the cloud"}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {auth.authMode === "register" && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={auth.authName}
                  onChange={(e) => auth.setAuthName(e.target.value)}
                  style={modalInputStyle}
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={auth.authEmail}
                onChange={(e) => auth.setAuthEmail(e.target.value)}
                style={modalInputStyle}
              />
              <input
                type="password"
                placeholder="Password"
                value={auth.authPassword}
                onChange={(e) => auth.setAuthPassword(e.target.value)}
                style={modalInputStyle}
              />
              <button
                onClick={auth.authMode === "login" ? handleLogin : auth.handleRegister}
                disabled={auth.authLoading}
                style={modalButtonStyle}
              >
                {auth.authLoading
                  ? "Loading..."
                  : auth.authMode === "login"
                    ? "Sign In"
                    : "Create Account"}
              </button>
              <p style={{ textAlign: "center", fontSize: 13, color: "#64748b", margin: 0 }}>
                {auth.authMode === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => {
                    auth.setAuthMode(auth.authMode === "login" ? "register" : "login");
                  }}
                  style={{ ...linkStyle, background: "none", border: "none", cursor: "pointer" }}
                >
                  {auth.authMode === "login" ? "Register" : "Sign In"}
                </button>
              </p>
            </div>

            {auth.authError && <div style={errorStyle}>{auth.authError}</div>}
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
            <span
              style={{
                fontWeight: 700,
                color: budgetRemaining && budgetRemaining >= 0 ? "#10b981" : "#ef4444",
              }}
            >
              ${budgetRemaining?.toFixed(2)} remaining
            </span>
          </div>
          <div style={progressTrackStyle}>
            <div
              style={{
                ...progressFillStyle,
                width: `${Math.min(budgetPercent, 100)}%`,
                background:
                  budgetPercent > 90 ? "#ef4444" : budgetPercent > 75 ? "#f59e0b" : "#10b981",
              }}
            />
          </div>
          <p style={progressTextStyle}>
            ${monthlyExpenses.toFixed(2)} of ${currentBudget.amount.toFixed(2)}
          </p>
        </div>
      )}

      {/* Tabs */}
      <Tabs activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div>
          <AIQuickAdd
            user={auth.user}
            onAuthRequired={() => auth.setShowAuth(true)}
            onParsed={transactions.handleAIParsed}
          />
          <div style={overviewGridStyle}>
            <div>
              <AddTransaction type="income" onAdd={transactions.addIncome} />
              <TransactionList
                transactions={transactions.incomes.slice(0, 5)}
                type="income"
                onDelete={transactions.deleteIncome}
              />
            </div>
            <div>
              <AddTransaction type="expense" onAdd={transactions.addExpense} />
              <TransactionList
                transactions={transactions.expenses.slice(0, 5)}
                type="expense"
                onDelete={transactions.deleteExpense}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "incomes" && (
        <div style={{ maxWidth: 600 }}>
          <AddTransaction type="income" onAdd={transactions.addIncome} />
          <TransactionList
            transactions={transactions.incomes}
            type="income"
            onDelete={transactions.deleteIncome}
          />
        </div>
      )}

      {activeTab === "expenses" && (
        <div style={{ maxWidth: 600 }}>
          <AddTransaction type="expense" onAdd={transactions.addExpense} />
          <TransactionList
            transactions={transactions.expenses}
            type="expense"
            onDelete={transactions.deleteExpense}
          />
        </div>
      )}

      {activeTab === "budget" && (
        <div style={{ maxWidth: 600 }}>
          <BudgetManager budgets={budgets.budgets} onSave={budgets.saveBudget} />
        </div>
      )}

      {activeTab === "ai-report" && (
        <AIReport
          user={auth.user}
          onAuthRequired={() => auth.setShowAuth(true)}
          incomes={transactions.incomes}
          expenses={transactions.expenses}
          budgets={budgets.budgets}
          currentMonth={currentMonth}
        />
      )}
    </div>
  );
}

// ---- Sub-components ----

function Tabs({ activeTab, onChange }: { activeTab: string; onChange: (tab: string) => void }) {
  return (
    <div style={tabsContainerStyle}>
      {["overview", "incomes", "expenses", "budget", "ai-report"].map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
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
  );
}

function SummaryCard({
  title,
  amount,
  color,
  icon,
}: {
  title: string;
  amount: number;
  color: string;
  icon?: string;
}) {
  return (
    <div style={cardStyle}>
      <div
        style={{
          fontSize: 12,
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          fontWeight: 600,
        }}
      >
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
