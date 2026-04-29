"use client";

import { useState } from "react";
import { account, ID } from "@/lib/appwrite";

export default function AuthForm({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setError("");
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      onAuthSuccess(user);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    setError("");
    setLoading(true);
    try {
      await account.create(ID.unique(), email, password, name);
      await login();
    } catch (err) {
      setError(err.message || "Registration failed");
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

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {isRegistering && (
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
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
            />
          </div>

          <button
            onClick={isRegistering ? register : login}
            disabled={loading}
            style={primaryButtonStyle}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span style={spinnerStyle} />
                Loading...
              </span>
            ) : isRegistering ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>

          <p style={{ textAlign: "center", fontSize: 14, color: "#64748b" }}>
            {isRegistering ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => { setIsRegistering(!isRegistering); setError(""); }}
              style={linkButtonStyle}
            >
              {isRegistering ? "Sign In" : "Register"}
            </button>
          </p>
        </div>

        {error && (
          <div style={errorStyle}>{error}</div>
        )}
      </div>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: 20,
};

const cardStyle = {
  width: "100%",
  maxWidth: 400,
  padding: 40,
  background: "#ffffff",
  borderRadius: 16,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 10px 40px rgba(0,0,0,0.08)",
};

const logoStyle = {
  fontSize: 48,
  marginBottom: 16,
};

const titleStyle = {
  fontSize: 24,
  fontWeight: 700,
  margin: "0 0 4px",
  color: "#0f172a",
};

const subtitleStyle = {
  fontSize: 14,
  color: "#64748b",
  margin: 0,
};

const labelStyle = {
  display: "block",
  fontSize: 14,
  fontWeight: 500,
  color: "#334155",
  marginBottom: 6,
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 15,
  background: "#ffffff",
  color: "#0f172a",
  transition: "border-color 0.2s",
};

const primaryButtonStyle = {
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

const linkButtonStyle = {
  background: "none",
  border: "none",
  color: "#0f172a",
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "underline",
  padding: 0,
  fontSize: 14,
};

const errorStyle = {
  marginTop: 16,
  padding: "12px 16px",
  borderRadius: 8,
  background: "#fef2f2",
  color: "#dc2626",
  fontSize: 14,
  textAlign: "center",
};

const spinnerStyle = {
  display: "inline-block",
  width: 16,
  height: 16,
  border: "2px solid rgba(255,255,255,0.3)",
  borderTopColor: "#fff",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};
