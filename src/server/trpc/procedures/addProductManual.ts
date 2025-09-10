import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";

const PriceInput = z.object({
  storeName: z.string().min(1),
  storeWebsite: z.string().url().optional(),
  productUrl: z.string().url(),
  price: z.number().positive(),
  currency: z.string().min(1),
  isAvailable: z.boolean().optional().default(true),
});

export const addProductManual = baseProcedure
  .input(
    z.object({
      category: z.string().min(1),
      name: z.string().min(1),
      description: z.string().optional(),
      brand: z.string().optional(),
      model: z.string().optional(),
      imageUrl: z.string().url().optional(),
      korea: PriceInput.optional(),
      us: PriceInput.optional(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }

    if (!input.korea && !input.us) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Provide at least one price entry (Korea or US)" });
    }

    const category = await db.category.upsert({
      where: { name: input.category },
      create: { name: input.category },
      update: {},
    });

    const product = await db.product.create({
      data: {
        name: input.name,
        description: input.description ?? null,
        imageUrl: input.imageUrl ?? null,
        brand: input.brand ?? null,
        model: input.model ?? null,
        categoryId: category.id,
      },
    });

    async function createPrice(country: "Korea" | "US", p: z.infer<typeof PriceInput>) {
      const website = p.storeWebsite ?? new URL(p.productUrl).origin;
      const store = await db.store.upsert({
        where: { name: p.storeName },
        update: { website, country },
        create: { name: p.storeName, website, country },
      });
      await db.productPrice.create({
        data: {
          productId: product.id,
          country,
          price: p.price,
          currency: p.currency,
          storeId: store.id,
          productUrl: p.productUrl,
          isAvailable: p.isAvailable ?? true,
        },
      });
    }

    if (input.korea) await createPrice("Korea", input.korea);
    if (input.us) await createPrice("US", input.us);

    return { success: true, productId: product.id };
  });

