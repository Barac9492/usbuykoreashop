import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTRPC } from "~/trpc/react";
import { ModernHero } from "~/components/ModernHero";
import { ProductGrid } from "~/components/ProductGrid";
import { FilterBar } from "~/components/FilterBar";
import { SimpleNavigation } from "~/components/SimpleNavigation";
import { TrendingDown, Shield, Users, Mail, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/")({
  component: ModernHomePage,
});

function ModernHomePage() {
  const trpc = useTRPC();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Fetch categories
  const categoriesQuery = useQuery(trpc.getCategories.queryOptions());
  
  // Fetch product comparisons
  const comparisonsQuery = useQuery(
    trpc.getProductComparisons.queryOptions({
      categoryId: selectedCategoryId || undefined,
      searchQuery: searchQuery || undefined,
      sortBy: "savings",
      limit: 24,
    })
  );

  const handleFiltersChange = (filters: string[]) => {
    setActiveFilters(filters);
    // Filter logic would be implemented here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <SimpleNavigation />

      {/* Hero Section */}
      <ModernHero />

      {/* Filters */}
      <FilterBar onFiltersChange={handleFiltersChange} />

      {/* Products Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Discover authentic Korean products with verified shoppers
            </p>
          </div>
          
          <ProductGrid 
            products={comparisonsQuery.data || []} 
            loading={comparisonsQuery.isLoading}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why choose us</h2>
            <p className="section-subtitle">Trusted, transparent, and effortless purchasing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingDown className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Best Prices
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Save up to 60% on Korean products compared to US retail prices through our network of verified shoppers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Secure Purchases
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All transactions are protected with escrow payments and verified shopper identities for your peace of mind.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Verified Shoppers
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our Korean shoppers are ID-verified and rated by the community to ensure reliable service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title mb-6">Ready to start?</h2>
            <p className="section-subtitle mb-10">Join customers saving on authentic Korean products.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Browse Products
              </button>
              <button className="btn-secondary">Learn more</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-sm text-gray-500">© 2024 Korean Shop</span>
            <nav className="flex items-center gap-6 text-sm text-gray-600">
              <a href="/shop" className="hover:text-gray-900">Shop</a>
              <a href="/shoppers" className="hover:text-gray-900">Shoppers</a>
              <a href="/about" className="hover:text-gray-900">About</a>
              <a href="/contact" className="hover:text-gray-900">Contact</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
