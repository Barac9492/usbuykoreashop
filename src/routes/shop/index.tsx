import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/react";
import { ProductGrid } from "~/components/ProductGrid";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
});

function ShopPage() {
  const trpc = useTRPC();
  const categoriesQuery = useQuery(trpc.getCategories.queryOptions());
  const productsQuery = useQuery(trpc.getProductComparisons.queryOptions({ limit: 24 }));

  return (
    <div className="bg-white min-h-screen">
      <header className="py-16">
        <div className="section-container text-center">
          <h1 className="section-title mb-4">Shop</h1>
          <p className="section-subtitle">Compare US vs. Korea pricing in real time</p>
        </div>
      </header>

      <section className="py-8">
        <ProductGrid products={productsQuery.data || []} loading={productsQuery.isLoading} />
      </section>
    </div>
  );
}

