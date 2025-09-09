import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";

export const getCategories = baseProcedure
  .query(async () => {
    const categories = await db.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      productCount: category._count.products,
    }));
  });
