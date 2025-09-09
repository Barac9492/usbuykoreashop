import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";

export const createPurchaseRequest = baseProcedure
  .input(z.object({
    productId: z.number(),
    quantity: z.number().min(1).max(10),
    maxBudgetUSD: z.number().min(1),
    specialInstructions: z.string().optional(),
    legalNoticeAcknowledged: z.boolean().refine((val) => val === true, {
      message: "You must acknowledge the legal binding agreement to proceed",
    }),
    // Extra UI fields accepted but not persisted
    shippingMethod: z.enum(["standard", "express", "economy"]).optional(),
    urgencyLevel: z.enum(["low", "medium", "high"]).optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Login required" });
    }

    // Get user and verify they can create purchase requests
    const user = await db.user.findUnique({
      where: { id: ctx.user.id },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    if (user.role !== "buyer") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Only buyers can create purchase requests",
      });
    }

    if (user.country !== "US") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Only US residents can create purchase requests",
      });
    }

    if (user.status !== "verified") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Your account must be verified before creating purchase requests",
      });
    }

    // Verify product exists and has Korean pricing
    const product = await db.product.findUnique({
      where: { id: input.productId },
      include: {
        prices: {
          include: { store: true },
        },
      },
    });

    if (!product) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Product not found",
      });
    }

    const koreanPrice = product.prices.find(p => p.country === "Korea");
    if (!koreanPrice) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "This product is not available in Korea",
      });
    }

    // Create purchase request
    const purchaseRequest = await db.purchaseRequest.create({
      data: {
        buyerId: user.id,
        productId: input.productId,
        quantity: input.quantity,
        maxPriceUSD: input.maxPriceUSD,
        specialInstructions: input.specialInstructions,
        legalNoticeAcknowledged: input.legalNoticeAcknowledged,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    // Create escrow transaction
    const depositAmount = input.maxBudgetUSD; // initial hold equals max budget
    const serviceFee = Math.max(depositAmount * 0.05, 2); // 5% service fee, minimum $2
    const shippingFee = 15; // Estimated international shipping
    const totalAmount = depositAmount + serviceFee + shippingFee;

    await db.escrowTransaction.create({
      data: {
        purchaseRequestId: purchaseRequest.id,
        buyerId: user.id,
        depositAmount,
        serviceFee,
        shippingFee,
        totalAmount,
        status: "deposited",
        paymentMethod: "credit_card", // This would be determined by actual payment processing
        releaseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days auto-release
      },
    });

    return {
      success: true,
      purchaseRequest: {
        id: purchaseRequest.id,
        product: purchaseRequest.product,
        quantity: purchaseRequest.quantity,
        maxPriceUSD: purchaseRequest.maxPriceUSD,
        status: purchaseRequest.status,
      },
      escrowAmount: totalAmount,
      message: "Purchase request created successfully. Korean shoppers can now accept your request.",
    };
  });
