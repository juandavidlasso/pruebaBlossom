import Redis from "ioredis";
import { env } from "./environment";

export const redis = new Redis({
  host: env.redis.host,
  port: env.redis.port,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
});

redis.on("error", (err) => {
  console.error("💥 [Redis] Connection error:", err.message);
});

redis.on("connect", () => {
  console.log("🧠 [Redis] Connected successfully");
});
