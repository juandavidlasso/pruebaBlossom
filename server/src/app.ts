import express from "express";
import cors from "cors";
import { ApolloServer, BaseContext } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { apiReference } from "@scalar/express-api-reference";
import { typeDefs, resolvers } from "./graphql";
import { requestLogger } from "./middlewares/requestLogger.middleware";
import { sequelize } from "./models";
import { swaggerDocument } from "./docs/swagger";

export async function createApp(): Promise<express.Express> {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(requestLogger);

  app.use("/api-docs", apiReference({ content: swaggerDocument }));

  const server = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
  });

  await server.start();
  console.log("🛰️  [Apollo] GraphQL Server initialized successfully");

  app.use(
    "/graphql",
    expressMiddleware(server) as unknown as express.RequestHandler,
  );

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      services: {
        database: sequelize ? "initialized" : "disconnected",
      },
      timestamp: new Date().toISOString(),
    });
  });

  return app;
}
