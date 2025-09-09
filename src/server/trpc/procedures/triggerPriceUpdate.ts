import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { baseProcedure } from "~/server/trpc/main";
import { priceUpdateAgent } from "~/server/agents/priceUpdateAgent";

export const triggerPriceUpdate = baseProcedure
  .input(z.object({ 
    productId: z.number().optional(), // If not provided, update all products
  }))
  .mutation(async ({ input, ctx }) => {
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }
    try {
      console.log(`Manual price update triggered via tRPC${input.productId ? ` for product ${input.productId}` : ' for all products'}`);
      
      const result = await priceUpdateAgent.triggerUpdate(input.productId);
      
      return {
        success: true,
        message: "Price update triggered successfully",
        agentStatus: priceUpdateAgent.getStatus(),
        updateResult: result,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to trigger price update: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  });
