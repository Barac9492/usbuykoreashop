import { z } from "zod";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";

export const getProductComparisons = baseProcedure
  .input(z.object({ 
    categoryId: z.number().optional(),
    limit: z.number().min(1).max(50).default(20),
  }))
  .query(async ({ input }) => {
    const products = await db.product.findMany({
      where: input.categoryId ? {
        categoryId: input.categoryId,
      } : undefined,
      include: {
        category: true,
        prices: {
          include: {
            store: true,
          },
        },
      },
      take: input.limit,
    });

    // Transform the data to include price comparisons
    const comparisons = products.map(product => {
      const usPrice = product.prices.find(p => p.country === "US");
      const koreaPrice = product.prices.find(p => p.country === "Korea");

      if (!usPrice || !koreaPrice) {
        return null; // Skip products without both prices
      }

      // Convert KRW to USD for comparison (approximate rate: 1 USD = 1330 KRW)
      const koreanPriceInUSD = koreaPrice.price / 1330;
      const usPriceValue = usPrice.price;
      
      const savings = usPriceValue - koreanPriceInUSD;
      const savingsPercentage = (savings / usPriceValue) * 100;

      return {
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          imageUrl: product.imageUrl,
          brand: product.brand,
          model: product.model,
          category: product.category,
        },
        usPrice: {
          price: usPrice.price,
          currency: usPrice.currency,
          store: usPrice.store,
          productUrl: usPrice.productUrl,
        },
        koreaPrice: {
          price: koreaPrice.price,
          currency: koreaPrice.currency,
          store: koreaPrice.store,
          productUrl: koreaPrice.productUrl,
        },
        comparison: {
          koreanPriceInUSD: Math.round(koreanPriceInUSD * 100) / 100,
          savings: Math.round(savings * 100) / 100,
          savingsPercentage: Math.round(savingsPercentage * 100) / 100,
          betterDeal: savings > 0 ? "Korea" : "US",
        },
      };
    }).filter(Boolean); // Remove null entries

    // Sort by absolute savings amount (highest savings first)
    comparisons.sort((a, b) => Math.abs(b!.comparison.savings) - Math.abs(a!.comparison.savings));

    return comparisons;
  });
