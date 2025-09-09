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
      <section className="py-16 bg-gray-50">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">
              The trusted platform for Korean product purchases
            </p>
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
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of customers who save money on authentic Korean products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Browse Products
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Korean Shop</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted platform for authentic Korean products at local prices.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="/shop" className="block text-gray-400 hover:text-white transition-colors">Shop</a>
                <a href="/shoppers" className="block text-gray-400 hover:text-white transition-colors">Shoppers</a>
                <a href="/about" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="/help" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                <a href="/shipping" className="block text-gray-400 hover:text-white transition-colors">Shipping Info</a>
                <a href="/returns" className="block text-gray-400 hover:text-white transition-colors">Returns</a>
                <a href="/faq" className="block text-gray-400 hover:text-white transition-colors">FAQ</a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>support@koreanshop.com</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Korean Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
