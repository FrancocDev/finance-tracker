"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import type { Transaction, Budget } from "@/lib/types";
import { getAppwriteSessionToken } from "@/lib/auth-client";

interface AIReportProps {
  user: unknown | null;
  onAuthRequired: () => void;
  incomes: Transaction[];
  expenses: Transaction[];
  budgets: Budget[];
  currentMonth: string;
}

export default function AIReport({
  user,
  onAuthRequired,
  incomes,
  expenses,
  budgets,
  currentMonth,
}: AIReportProps) {
  const [startMonth, setStartMonth] = useState(currentMonth);
  const [endMonth, setEndMonth] = useState(currentMonth);
  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const handleGenerate = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    setLoading(true);
    setError("");
    setReport("");

    const periodIncomes = incomes.filter((i) => {
      const m = i.date?.slice(0, 7);
      return m >= startMonth && m <= endMonth;
    });

    const periodExpenses = expenses.filter((e) => {
      const m = e.date?.slice(0, 7);
      return m >= startMonth && m <= endMonth;
    });

    const budget = budgets.find((b) => {
      const m = b.month;
      return m >= startMonth && m <= endMonth;
    });

    const token = getAppwriteSessionToken();
    if (!token) {
      onAuthRequired();
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/ai/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Session": token,
        },
        body: JSON.stringify({
          startMonth,
          endMonth,
          incomes: periodIncomes,
          expenses: periodExpenses,
          budget: budget ? { amount: budget.amount } : null,
        }),
        signal: controller.signal,
      });

      if (res.status === 401) {
        onAuthRequired();
        setLoading(false);
        return;
      }

      if (res.status === 429) {
        const data = await res.json().catch(() => ({ error: "Rate limit exceeded" }));
        setError(data.error || "Too many requests. Please try again later.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Failed to generate report" }));
        setError(data.error || "Failed to generate report.");
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let text = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          text += decoder.decode(value, { stream: true });
          setReport(text);
        }
        text += decoder.decode();
        setReport(text);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading;

  if (!user) {
    return (
      <div style={containerStyle}>
        <h3 style={titleStyle}>🤖 AI Report</h3>
        <p style={subtitleStyle}>Sign in to generate AI-powered financial reports.</p>
        <button onClick={onAuthRequired} style={authButtonStyle}>
          Sign In to Use AI Report
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>🤖 AI Report</h3>
      <p style={subtitleStyle}>Analyze your finances with AI-generated insights.</p>

      <div style={rangeRowStyle}>
        <div style={rangeFieldStyle}>
          <label style={labelStyle}>From</label>
          <input
            type="month"
            value={startMonth}
            onChange={(e) => setStartMonth(e.target.value)}
            style={monthInputStyle}
          />
        </div>
        <div style={rangeFieldStyle}>
          <label style={labelStyle}>To</label>
          <input
            type="month"
            value={endMonth}
            onChange={(e) => setEndMonth(e.target.value)}
            style={monthInputStyle}
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={isDisabled}
          style={{
            ...generateButtonStyle,
            opacity: isDisabled ? 0.6 : 1,
            cursor: isDisabled ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Report"}
        </button>
      </div>

      {error && <div style={errorStyle}>{error}</div>}

      {report && (
        <div style={reportStyle}>
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 style={{ margin: "16px 0 8px", fontSize: 19, fontWeight: 800, color: "#0f172a" }}>{children}</h1>,
              h2: ({ children }) => <h2 style={{ margin: "16px 0 8px", fontSize: 17, fontWeight: 700, color: "#0f172a" }}>{children}</h2>,
              h3: ({ children }) => <h3 style={{ margin: "12px 0 6px", fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{children}</h3>,
              p: ({ children }) => <p style={{ margin: "8px 0" }}>{children}</p>,
              ul: ({ children }) => <ul style={{ margin: "8px 0", paddingLeft: 18 }}>{children}</ul>,
              li: ({ children }) => <li style={{ margin: "4px 0" }}>{children}</li>,
              strong: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
            }}
          >
            {report}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  maxWidth: 700,
  background: "#ffffff",
  borderRadius: 12,
  padding: 24,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const titleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  marginBottom: 4,
  color: "#0f172a",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#64748b",
  marginBottom: 16,
};

const rangeRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "flex-end",
  marginBottom: 16,
  flexWrap: "wrap",
};

const rangeFieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#475569",
};

const monthInputStyle: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 14,
  color: "#0f172a",
  background: "#ffffff",
};

const generateButtonStyle: React.CSSProperties = {
  padding: "8px 18px",
  borderRadius: 8,
  border: "none",
  background: "#0f172a",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 600,
  height: 38,
};

const errorStyle: React.CSSProperties = {
  marginTop: 10,
  padding: "8px 12px",
  borderRadius: 6,
  background: "#fef2f2",
  color: "#dc2626",
  fontSize: 13,
  marginBottom: 12,
};

const reportStyle: React.CSSProperties = {
  marginTop: 16,
  padding: 16,
  background: "#f8fafc",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 14,
  lineHeight: 1.6,
  color: "#0f172a",
};

const authButtonStyle: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: 8,
  border: "none",
  background: "#0f172a",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};
