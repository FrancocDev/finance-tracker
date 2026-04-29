"use client";

import { useState, useEffect } from "react";

export default function BudgetManager({ budgets, onSave }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    setCurrentMonth(new Date().toISOString().slice(0, 7));
  }, []);

  const currentBudget = budgets.find(b => b.month === currentMonth);

  const handleSetBudget = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;

    setLoading(true);
    try {
      await onSave({
        amount: parseFloat(amount),
        period: "monthly",
        month: currentMonth,
      });
      setAmount("");
    } catch (err) {
      console.error("Error setting budget:", err);
      alert("Failed to set budget: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={sectionStyle}>
      <h3 style={sectionTitleStyle}>💳 Monthly Budget</h3>

      {currentBudget ? (
        <div style={{ marginBottom: 20 }}>
          <p style={monthLabelStyle}>Current budget for {currentMonth}</p>
          <p style={amountStyle}>${currentBudget.amount?.toFixed(2)}</p>
        </div>
      ) : (
        <p style={emptyStyle}>No budget set for {currentMonth}</p>
      )}

      <form onSubmit={handleSetBudget}>
        <label style={labelStyle}>{currentBudget ? "Update Budget" : "Set Budget"}</label>
        <div style={formRowStyle}>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" disabled={loading} style={submitButtonStyle}>
            {loading ? "Saving..." : currentBudget ? "Update" : "Set Budget"}
          </button>
        </div>
      </form>
    </div>
  );
}

const sectionStyle = {
  background: "#ffffff",
  borderRadius: 12,
  padding: 24,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const sectionTitleStyle = {
  fontSize: 16,
  fontWeight: 700,
  marginBottom: 16,
  color: "#0f172a",
};

const monthLabelStyle = {
  fontSize: 14,
  color: "#64748b",
  marginBottom: 4,
};

const amountStyle = {
  fontSize: 32,
  fontWeight: 800,
  color: "#0f172a",
  margin: 0,
};

const emptyStyle = {
  fontSize: 14,
  color: "#94a3b8",
  marginBottom: 20,
  fontStyle: "italic",
};

const labelStyle = {
  display: "block",
  fontSize: 13,
  fontWeight: 500,
  color: "#475569",
  marginBottom: 8,
};

const formRowStyle = {
  display: "flex",
  gap: 10,
};

const inputStyle = {
  flex: 1,
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 15,
  background: "#ffffff",
  color: "#0f172a",
};

const submitButtonStyle = {
  padding: "10px 20px",
  borderRadius: 8,
  border: "none",
  background: "#0f172a",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  whiteSpace: "nowrap",
};
