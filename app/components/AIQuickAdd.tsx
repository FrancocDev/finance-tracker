"use client";

import { useState } from "react";
import type { TransactionInput } from "@/lib/types";
import type { Models } from "appwrite";
import { getAppwriteSessionToken } from "@/lib/auth-client";

interface ParsedTransaction extends TransactionInput {
  type: "income" | "expense";
}

interface AIQuickAddProps {
  user: Models.User<Models.Preferences> | null;
  onAuthRequired: () => void;
  onParsed: (data: ParsedTransaction) => void;
}

export default function AIQuickAdd({ user, onAuthRequired, onParsed }: AIQuickAddProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    if (!text.trim()) return;

    if (!user) {
      onAuthRequired();
      return;
    }

    setLoading(true);
    setError("");

    const token = getAppwriteSessionToken();
    if (!token) {
      onAuthRequired();
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/ai/quick-add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Session": token,
        },
        body: JSON.stringify({ text: text.trim() }),
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
        const data = await res.json().catch(() => ({ error: "Failed to parse" }));
        setError(data.error || "Could not understand that. Try being more specific.");
        setLoading(false);
        return;
      }

      const { data } = await res.json();
      onParsed(data);
      setText("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || text.trim().length === 0;

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>
        <span style={sparkleStyle}>✨</span> AI Quick Add
      </h3>
      <p style={subtitleStyle}>
        {user
          ? "Describe a transaction in plain English and let AI fill it in for you."
          : "Sign in to use AI-powered transaction entry."}
      </p>

      <div style={inputRowStyle}>
        <input
          type="text"
          placeholder="e.g., Starbucks coffee $5.50 yesterday"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !isDisabled && handleSubmit()}
          disabled={loading}
          style={inputStyle}
        />
        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          style={{
            ...buttonStyle,
            opacity: isDisabled ? 0.6 : 1,
            cursor: isDisabled ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Adding..." : "✨ Add with AI"}
        </button>
      </div>

      {error && <div style={errorStyle}>{error}</div>}

      {!user && (
        <button onClick={onAuthRequired} style={authPromptStyle}>
          Sign in to use AI Quick Add
        </button>
      )}
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 12,
  padding: 20,
  marginBottom: 20,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const titleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 600,
  marginBottom: 4,
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "#0f172a",
};

const sparkleStyle: React.CSSProperties = {
  fontSize: 16,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#64748b",
  marginBottom: 12,
};

const inputRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 14,
  background: "#ffffff",
  color: "#0f172a",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: 8,
  border: "none",
  background: "#0f172a",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 600,
  whiteSpace: "nowrap",
};

const errorStyle: React.CSSProperties = {
  marginTop: 10,
  padding: "8px 12px",
  borderRadius: 6,
  background: "#fef2f2",
  color: "#dc2626",
  fontSize: 13,
};

const authPromptStyle: React.CSSProperties = {
  marginTop: 12,
  padding: "8px 12px",
  borderRadius: 6,
  background: "#eff6ff",
  color: "#0f172a",
  fontSize: 13,
  fontWeight: 600,
  border: "1px solid #bfdbfe",
  cursor: "pointer",
  width: "100%",
};
