interface RateLimitEntry {
  tokens: number;
  lastRefill: number;
}

class TokenBucket {
  private store = new Map<string, RateLimitEntry>();
  private readonly capacity: number;
  private readonly windowMs: number;

  constructor(capacity: number, windowMinutes: number) {
    this.capacity = capacity;
    this.windowMs = windowMinutes * 60 * 1000;
  }

  consume(key: string): { allowed: boolean; remaining: number; resetInMs: number } {
    const now = Date.now();
    let entry = this.store.get(key);

    if (!entry) {
      entry = { tokens: this.capacity - 1, lastRefill: now };
      this.store.set(key, entry);
      return { allowed: true, remaining: entry.tokens, resetInMs: this.windowMs };
    }

    const timePassed = now - entry.lastRefill;
    const tokensToAdd = Math.floor(timePassed / this.windowMs) * this.capacity;

    if (tokensToAdd > 0) {
      entry.tokens = Math.min(this.capacity, entry.tokens + tokensToAdd);
      entry.lastRefill = now;
    }

    if (entry.tokens >= 1) {
      entry.tokens -= 1;
      this.store.set(key, entry);
      return { allowed: true, remaining: entry.tokens, resetInMs: this.windowMs - (now - entry.lastRefill) };
    }

    return { allowed: false, remaining: 0, resetInMs: this.windowMs - (now - entry.lastRefill) };
  }
}

export const quickAddLimiter = new TokenBucket(20, 60); // 20 requests per hour
export const reportLimiter = new TokenBucket(5, 60);   // 5 requests per hour
