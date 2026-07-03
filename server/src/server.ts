import dotenv from "dotenv";
import { createApp } from "./app";
import { sequelize } from "./models";
import { redis } from "./config/redis";
import { env } from "./config/environment";
import { startCharacterCron } from "./cron/updateCharacters.cron";

dotenv.config();

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ [Database] PostgreSQL connected successfully");

    await redis.connect();

    const app = await createApp();

    startCharacterCron();
    console.log("⏰ [Cron] Character sync tasks scheduled");

    app.listen(env.port, () => {
      console.log(`🚀 [Server] Running at http://localhost:${env.port}`);
      console.log(
        `🔗 [Server] GraphQL endpoint: http://localhost:${env.port}/graphql`,
      );
    });
  } catch (error) {
    console.error("💥 [Server] Failed to start:", error);
    process.exit(1);
  }
}

startServer();
