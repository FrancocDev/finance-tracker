"use client";

import type { Transaction } from "@/lib/types";

interface TransactionListProps {
  transactions: Transaction[];
  type: "income" | "expense";
  onDelete: (id: string) => Promise<void>;
}

export default function TransactionList({ transactions, type, onDelete }: TransactionListProps) {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    try {
      await onDelete(id);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete";
      alert(message);
    }
  };

  const total = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const isIncome = type === "income";
  const accentColor = isIncome ? "#10b981" : "#ef4444";
  const lightBg = isIncome ? "#ecfdf5" : "#fef2f2";

  return (
    <div style={sectionStyle}>
      <div style={headerStyle}>
        <h3 style={sectionTitleStyle}>
          <span style={{ ...dotStyle, background: accentColor }} />
          {isIncome ? "Incomes" : "Expenses"}
        </h3>
        <span style={{ ...totalStyle, color: accentColor }}>${total.toFixed(2)}</span>
      </div>

      {transactions.length === 0 ? (
        <div style={emptyStyle}>No {type}s yet</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {transactions.map((t) => (
            <div
              key={t.$id}
              style={{
                ...itemStyle,
                background: lightBg,
                borderLeft: `3px solid ${accentColor}`,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={itemHeaderStyle}>
                  <span style={amountStyle}>${t.amount?.toFixed(2)}</span>
                  <span style={categoryStyle}>{t.category || "Other"}</span>
                </div>
                {t.description && <div style={descStyle}>{t.description}</div>}
                <div style={dateStyle}>{new Date(t.date).toLocaleDateString()}</div>
              </div>
              <button
                onClick={() => handleDelete(t.$id)}
                style={deleteButtonStyle}
                title="Delete"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const sectionStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 12,
  padding: 20,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 600,
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

const totalStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 16,
};

const emptyStyle: React.CSSProperties = {
  textAlign: "center",
  padding: 24,
  color: "#94a3b8",
  fontSize: 14,
  fontStyle: "italic",
};

const itemStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "12px 14px",
  borderRadius: 8,
};

const itemHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 2,
};

const amountStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 15,
  color: "#0f172a",
};

const categoryStyle: React.CSSProperties = {
  fontSize: 12,
  padding: "2px 8px",
  borderRadius: 12,
  background: "rgba(0,0,0,0.06)",
  color: "#475569",
  fontWeight: 500,
};

const descStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#64748b",
  marginTop: 2,
};

const dateStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#94a3b8",
  marginTop: 4,
};

const deleteButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#94a3b8",
  cursor: "pointer",
  fontSize: 20,
  padding: "0 0 0 8px",
  lineHeight: 1,
  transition: "color 0.2s",
};
