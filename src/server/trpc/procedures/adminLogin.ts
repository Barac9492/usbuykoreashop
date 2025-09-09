import { z } from "zod";
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import { baseProcedure } from "~/server/trpc/main";
import { env } from "~/server/env";

export const adminLogin = baseProcedure
  .input(z.object({ password: z.string().min(1) }))
  .mutation(async ({ input }) => {
    if (!env.ADMIN_PASSWORD) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Admin not configured" });
    }
    if (input.password !== env.ADMIN_PASSWORD) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid admin password" });
    }
    const token = jwt.sign(
      { userId: -1, role: "admin", email: "admin@local", status: "verified", country: "US" },
      env.JWT_SECRET ?? "change-me-jwt-secret-please",
      { expiresIn: "8h" },
    );
    return { token };
  });

