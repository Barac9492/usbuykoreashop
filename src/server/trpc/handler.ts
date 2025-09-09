import { defineEventHandler, toWebRequest } from "@tanstack/react-start/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./root";
import jwt from "jsonwebtoken";
import { env } from "~/server/env";
import { db } from "~/server/db";

export default defineEventHandler((event) => {
  const request = toWebRequest(event);
  if (!request) {
    return new Response("No request", { status: 400 });
  }
  try {
    const url = new URL(request.url);
    console.info(`[trpc] ${request.method} ${url.pathname}`);
  } catch {}

  return fetchRequestHandler({
    endpoint: "/trpc",
    req: request,
    router: appRouter,
    async createContext() {
      try {
        const auth = request.headers.get("authorization");
        if (!auth || !auth.toLowerCase().startsWith("bearer ")) {
          return {};
        }
        const token = auth.slice(7).trim();
        const decoded = jwt.verify(token, env.JWT_SECRET) as any;
        if (decoded.role === "admin") {
          return {
            user: {
              id: -1,
              email: decoded.email ?? "admin@local",
              role: "admin",
              status: "verified",
              country: decoded.country ?? "US",
            },
          };
        }
        const user = await db.user.findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            email: true,
            role: true,
            status: true,
            country: true,
          },
        });
        if (!user) return {};
        return { user };
      } catch {
        return {};
      }
    },
    onError({ error, path }) {
      console.error(`tRPC error on '${path}':`, error);
    },
  });
});
