import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";

export const applyAsShopper = baseProcedure
  .input(z.object({
    koreanAddress: z.string().min(10, "Please provide a complete Korean address"),
    koreanPhoneNumber: z.string().regex(/^\+82-\d{2,3}-\d{3,4}-\d{4}$/, "Please provide a valid Korean phone number (+82-XX-XXX-XXXX)"),
    businessRegistration: z.string().optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Login required" });
    }

    // Get user and verify they can apply as shopper
    const user = await db.user.findUnique({
      where: { id: ctx.user.id },
      include: { shopperProfile: true },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    if (user.role !== "shopper") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Only users with shopper role can apply",
      });
    }

    if (user.country !== "Korea") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Only Korean residents can apply as shoppers",
      });
    }

    if (user.shopperProfile) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "You have already submitted a shopper application",
      });
    }

    // Create shopper profile
    const shopperProfile = await db.shopperProfile.create({
      data: {
        userId: user.id,
        koreanAddress: input.koreanAddress,
        koreanPhoneNumber: input.koreanPhoneNumber,
        businessRegistration: input.businessRegistration,
        applicationStatus: "pending",
      },
    });

    return {
      success: true,
      message: "Shopper application submitted successfully. We will review your application within 3-5 business days.",
      applicationId: shopperProfile.id,
    };
  });
