"use client";

import { useState, FormEvent } from "react";
import { account, ID } from "@/lib/appwrite";
import type { Models } from "appwrite";

interface AuthFormProps {
  onAuthSuccess: (user: Models.User<Models.Preferences>) => void;
}

export default function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const login = async () => {
    setError("");
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      onAuthSuccess(user);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await account.create(ID.unique(), email, password, name);
      await login();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={logoStyle}>💰</div>
          <h1 style={titleStyle}>Finance Tracker</h1>
          <p style={subtitleStyle}>
            {isRegistering ? "Create your account" : "Sign in to your account"}
          </p>
        </div>

        <form
          onSubmit={isRegistering ? register : (e) => { e.preventDefault(); login(); }}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {isRegistering && (
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                required={isRegistering}
              />
            </div>
          )}
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <button type="submit" disabled={loading} style={primaryButtonStyle}>
            {loading
              ? "Loading..."
              : isRegistering
              ? "Create Account"
              : "Sign In"}
          </button>

          <p style={{ textAlign: "center", fontSize: 14, color: "#64748b" }}>
            {isRegistering ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
              }}
              style={linkButtonStyle}
            >
              {isRegistering ? "Sign In" : "Register"}
            </button>
          </p>
        </form>

        {error && <div style={errorStyle}>{error}</div>}
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: 20,
};

const cardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 400,
  padding: 40,
  background: "#ffffff",
  borderRadius: 16,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 10px 40px rgba(0,0,0,0.08)",
};

const logoStyle: React.CSSProperties = {
  fontSize: 48,
  marginBottom: 16,
};

const titleStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  margin: "0 0 4px",
  color: "#0f172a",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#64748b",
  margin: 0,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 14,
  fontWeight: 500,
  color: "#334155",
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 15,
  background: "#ffffff",
  color: "#0f172a",
  transition: "border-color 0.2s",
};

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: 8,
  border: "none",
  background: "#0f172a",
  color: "#ffffff",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  transition: "opacity 0.2s",
  marginTop: 8,
};

const linkButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#0f172a",
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "underline",
  padding: 0,
  fontSize: 14,
};

const errorStyle: React.CSSProperties = {
  marginTop: 16,
  padding: "12px 16px",
  borderRadius: 8,
  background: "#fef2f2",
  color: "#dc2626",
  fontSize: 14,
  textAlign: "center",
};
