"use client";

import { useState, useEffect } from "react";
import { client } from "@/lib/appwrite";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const [pingStatus, setPingStatus] = useState<string>("Checking connection...");

  useEffect(() => {
    const ping = async () => {
      try {
        await client.ping();
        setPingStatus("Connected to Appwrite");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setPingStatus(`Connection failed: ${message}`);
      }
    };
    ping();
  }, []);

  return (
    <main style={mainStyle}>
      <div style={pingBarStyle}>
        <span
          style={{
            ...pingDotStyle,
            background: pingStatus.includes("Connected") ? "#10b981" : "#ef4444",
          }}
        />
        {pingStatus}
      </div>
      <Dashboard />
    </main>
  );
}

const mainStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f8fafc",
};

const pingBarStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "6px",
  fontSize: 12,
  color: "#64748b",
  background: "#ffffff",
  borderBottom: "1px solid #e2e8f0",
};

const pingDotStyle: React.CSSProperties = {
  width: 6,
  height: 6,
  borderRadius: "50%",
  display: "inline-block",
};
