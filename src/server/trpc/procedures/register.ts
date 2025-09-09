import { z } from "zod";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";

export const register = baseProcedure
  .input(z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z.string().optional(),
    role: z.enum(["buyer", "shopper"]),
    country: z.enum(["US", "Korea"]),
  }))
  .mutation(async ({ input }) => {
    // Validate role and country alignment
    if (input.role === "buyer" && input.country !== "US") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Buyers must be from the US",
      });
    }
    if (input.role === "shopper" && input.country !== "Korea") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Shoppers must be from Korea",
      });
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User with this email already exists",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(input.password, 10);

    // Create user
    const user = await db.user.create({
      data: {
        email: input.email,
        passwordHash,
        firstName: input.firstName,
        lastName: input.lastName,
        phoneNumber: input.phoneNumber,
        role: input.role,
        country: input.country,
        status: "pending", // Requires vetting
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        country: true,
        status: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      user,
      message: "Registration successful. Your account is pending verification.",
    };
  });
