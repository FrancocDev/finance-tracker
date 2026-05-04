const SESSION_COOKIE_NAME = "a_session_finance-ai";

export function getAppwriteSessionToken(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const fallbackRaw = localStorage.getItem("cookieFallback");
    if (fallbackRaw) {
      const parsed = JSON.parse(fallbackRaw);
      if (Array.isArray(parsed) && parsed.length >= 2) {
        return parsed[1] as string;
      }
    }

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
