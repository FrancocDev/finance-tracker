"use client";

import { useState, useEffect } from "react";
import { account, ID } from "@/lib/appwrite";
import { setAppwriteSessionToken, clearAppwriteSessionToken, getAppwriteSessionToken } from "@/lib/auth-client";
import type { Models } from "appwrite";

type AppwriteUser = Models.User<Models.Preferences>;

interface AuthState {
  user: AppwriteUser | null;
  loading: boolean;
  showAuth: boolean;
  authMode: "login" | "register";
  authEmail: string;
  authPassword: string;
  authName: string;
  authError: string;
  authLoading: boolean;
}

interface UseAuthReturn extends AuthState {
  setShowAuth: (show: boolean) => void;
  setAuthMode: (mode: "login" | "register") => void;
  setAuthEmail: (email: string) => void;
  setAuthPassword: (password: string) => void;
  setAuthName: (name: string) => void;
  handleLogin: () => Promise<AppwriteUser>;
  handleRegister: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

export function useAuth(onLoginSuccess: (user: AppwriteUser) => Promise<void>): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    showAuth: false,
    authMode: "login",
    authEmail: "",
    authPassword: "",
    authName: "",
    authError: "",
    authLoading: false,
  });

  useEffect(() => {
    const init = async () => {
      setState((s) => ({ ...s, loading: true }));
      try {
        const currentUser = await account.get();
        // Extract session token from Appwrite fallback storage if needed
        if (!getAppwriteSessionToken()) {
          const fallbackRaw = localStorage.getItem("cookieFallback");
          if (fallbackRaw) {
            try {
              const parsed = JSON.parse(fallbackRaw);
              if (Array.isArray(parsed) && parsed.length >= 2) {
                setAppwriteSessionToken(parsed[1]);
              }
            } catch {
              // ignore malformed fallback
            }
          }
        }
        setState((s) => ({ ...s, user: currentUser, loading: false }));
        await onLoginSuccess(currentUser);
      } catch {
        setState((s) => ({ ...s, user: null, loading: false }));
      }
    };
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setShowAuth = (show: boolean) => setState((s) => ({ ...s, showAuth: show }));
  const setAuthMode = (mode: "login" | "register") => setState((s) => ({ ...s, authMode: mode, authError: "" }));
  const setAuthEmail = (email: string) => setState((s) => ({ ...s, authEmail: email }));
  const setAuthPassword = (password: string) => setState((s) => ({ ...s, authPassword: password }));
  const setAuthName = (name: string) => setState((s) => ({ ...s, authName: name }));

  const handleLogin = async (): Promise<AppwriteUser> => {
    setState((s) => ({ ...s, authError: "", authLoading: true }));
    try {
      const session = await account.createEmailPasswordSession(state.authEmail, state.authPassword);
      if (session.secret) {
        setAppwriteSessionToken(session.secret);
      }
      const current = await account.get();
      setState((s) => ({ ...s, user: current, showAuth: false, authLoading: false }));
      return current;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setState((s) => ({ ...s, authError: message, authLoading: false }));
      throw err;
    }
  };

  const handleRegister = async () => {
    setState((s) => ({ ...s, authError: "", authLoading: true }));
    try {
      await account.create(ID.unique(), state.authEmail, state.authPassword, state.authName);
      await handleLogin();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setState((s) => ({ ...s, authError: message, authLoading: false }));
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      clearAppwriteSessionToken();
      setState((s) => ({ ...s, user: null }));
    } catch (err: unknown) {
      console.error("Logout error:", err);
    }
  };

  return {
    ...state,
    setShowAuth,
    setAuthMode,
    setAuthEmail,
    setAuthPassword,
    setAuthName,
    handleLogin,
    handleRegister,
    handleLogout,
  };
}
