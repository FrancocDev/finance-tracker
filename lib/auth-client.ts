const SESSION_COOKIE_NAME = "a_session_finance-ai";
const CUSTOM_TOKEN_KEY = "ai_session_token";

export function getAppwriteSessionToken(): string | null {
  if (typeof window === "undefined") return null;

  try {
    // 1. Check our custom token first (most reliable)
    const customToken = localStorage.getItem(CUSTOM_TOKEN_KEY);
    if (customToken) {
      return customToken;
    }

    // 2. Try Appwrite's localStorage fallback
    const fallbackRaw = localStorage.getItem("cookieFallback");
    if (fallbackRaw) {
      const parsed = JSON.parse(fallbackRaw);
      if (Array.isArray(parsed) && parsed.length >= 2) {
        return parsed[1] as string;
      }
      // Newer Appwrite versions might store as object
      if (typeof parsed === "object" && parsed !== null) {
        const token = parsed[SESSION_COOKIE_NAME] || parsed.secret;
        if (token) return token;
      }
    }

    // 3. Try reading cookie directly (won't work for HttpOnly, but try anyway)
    const cookieFallback = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith(`${SESSION_COOKIE_NAME}=`));
    if (cookieFallback) {
      return decodeURIComponent(cookieFallback.split("=")[1]);
    }
  } catch {
    // ignore
  }

  return null;
}

export function setAppwriteSessionToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CUSTOM_TOKEN_KEY, token);
}

export function clearAppwriteSessionToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CUSTOM_TOKEN_KEY);
}
