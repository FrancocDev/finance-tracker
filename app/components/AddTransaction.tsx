"use client";

import { useState, FormEvent } from "react";
import type { TransactionInput } from "@/lib/types";

interface AddTransactionProps {
  type: "income" | "expense";
  onAdd: (data: TransactionInput) => Promise<void>;
}

export default function AddTransaction({ type, onAdd }: AddTransactionProps) {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const categories =
    type === "income"
      ? ["Salary", "Freelance", "Investment", "Gift", "Other"]
      : ["Food", "Transport", "Rent", "Utilities", "Entertainment", "Shopping", "Health", "Other"];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    setLoading(true);
    try {
      await onAdd({
        amount: parseFloat(amount),
        description,
        category: category || "Other",
        date: new Date().toISOString(),
      });
      setAmount("");
      setDescription("");
      setCategory("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to add";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const isIncome = type === "income";
  const accentColor = isIncome ? "#10b981" : "#ef4444";

  return (
    <div style={sectionStyle}>
      <h3 style={sectionTitleStyle}>
        <span style={{ ...dotStyle, background: accentColor }} />
        Add {isIncome ? "Income" : "Expense"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div style={formGridStyle}>
          <div>
            <label style={labelStyle}>Amount</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select...</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <label style={labelStyle}>Description</label>
          <input
            type="text"
            placeholder="Optional note..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ ...submitButtonStyle, background: accentColor }}
        >
          {loading ? "Adding..." : `Add ${isIncome ? "Income" : "Expense"}`}
        </button>
      </form>
    </div>
  );
}

const sectionStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 12,
  padding: 20,
  marginBottom: 20,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 600,
  marginBottom: 16,
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "#0f172a",
};

const dotStyle: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  display: "inline-block",
};

const formGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 500,
  color: "#475569",
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 14,
  background: "#ffffff",
  color: "#0f172a",
};

const submitButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  borderRadius: 8,
  border: "none",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 12,
};
