import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const PREFIX = "finance-tracker-ai";

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInMs: number;
}

class SlidingWindowRateLimiter {
  private readonly capacity: number;
  private readonly windowMs: number;
  private readonly name: string;

  constructor(name: string, capacity: number, windowMinutes: number) {
    this.name = name;
    this.capacity = capacity;
    this.windowMs = windowMinutes * 60 * 1000;
  }

  async consume(key: string): Promise<RateLimitResult> {
    const redisKey = `${PREFIX}:ratelimit:${this.name}:${key}`;
    const now = Date.now();
    const windowStart = now - this.windowMs;
    const member = `${now}:${Math.random().toString(36).slice(2, 8)}`;

    // Remove expired entries and count current ones in a single pipeline
    const [count] = await redis
      .pipeline()
      .zremrangebyscore(redisKey, 0, windowStart)
      .zcard(redisKey)
      .exec();

    const currentCount = count as number;

    if (currentCount >= this.capacity) {
      // Find the oldest entry to calculate when the window resets
      const oldest = await redis.zrange(redisKey, 0, 0, { withScores: true });
      const oldestScore = oldest.length > 0 ? (oldest[0] as { score: number }).score : now;
      const resetInMs = oldestScore + this.windowMs - now;

      return {
        allowed: false,
        remaining: 0,
        resetInMs: Math.max(resetInMs, 0),
      };
    }

    // Add the request and refresh TTL
    await redis
      .pipeline()
      .zadd(redisKey, { score: now, member })
      .pexpire(redisKey, this.windowMs)
      .exec();

    return {
      allowed: true,
      remaining: this.capacity - currentCount - 1,
      resetInMs: this.windowMs,
    };
  }
}

export const quickAddLimiter = new SlidingWindowRateLimiter("quick-add", 20, 60);
export const reportLimiter = new SlidingWindowRateLimiter("report", 5, 60);
