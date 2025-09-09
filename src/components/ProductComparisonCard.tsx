import { useState } from "react";
import { ExternalLink, TrendingDown, TrendingUp, ShoppingCart, Shield, Star, Sparkles } from "lucide-react";
import { PurchaseRequestModal } from "~/components/PurchaseRequestModal";

type ProductComparison = {
  product: {
    id: number;
    name: string;
    description: string | null;
    imageUrl: string | null;
    brand: string | null;
    model: string | null;
    category: {
      id: number;
      name: string;
      description: string | null;
    };
  };
  usPrice: {
    price: number;
    currency: string;
    store: {
      id: number;
      name: string;
      country: string;
      website: string;
      logoUrl: string | null;
    };
    productUrl: string;
  };
  koreaPrice: {
    price: number;
    currency: string;
    store: {
      id: number;
      name: string;
      country: string;
      website: string;
      logoUrl: string | null;
    };
    productUrl: string;
  };
  comparison: {
    koreanPriceInUSD: number;
    savings: number;
    savingsPercentage: number;
    betterDeal: "Korea" | "US";
  };
};

interface ProductComparisonCardProps {
  comparison: ProductComparison;
}

export function ProductComparisonCard({ comparison }: ProductComparisonCardProps) {
  const { product, usPrice, koreaPrice, comparison: comp } = comparison;
  const isBetterInKorea = comp.betterDeal === "Korea";
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  
  const handleRequestPurchase = () => {
    setIsPurchaseModalOpen(true);
  };
  
  return (
    <>
      <div className="group card card-hover animate-scale-in">
        <div className="relative overflow-hidden rounded-t-3xl">
          {/* Enhanced Product Image */}
          <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
            <img
              src={product.imageUrl || "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=300&fit=crop&crop=center"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          {/* Enhanced Category Badge */}
          <div className="absolute top-6 left-6">
            <span className="badge-primary shadow-elevation-3 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-3 h-3 mr-1" />
              {product.category.name}
            </span>
          </div>
          
          {/* Enhanced Savings Badge */}
          {isBetterInKorea && (
            <div className="absolute top-6 right-6">
              <div className="flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white shadow-elevation-3 group-hover:scale-105 transition-transform duration-300">
                <TrendingDown className="w-4 h-4" />
                <span>Save {comp.savingsPercentage.toFixed(0)}%</span>
              </div>
            </div>
          )}
          
          {/* Enhanced Brand Badge */}
          {product.brand && (
            <div className="absolute bottom-6 left-6">
              <span className="bg-black/60 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/20">
                {product.brand}
              </span>
            </div>
          )}
        </div>

        <div className="relative p-8">
          {/* Enhanced Product Info */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
              {product.name}
            </h3>
            <p className="text-gray-600 text-base line-clamp-2 leading-relaxed">{product.description}</p>
          </div>

          {/* Enhanced Price Comparison Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Enhanced US Price Card */}
            <div className="price-card-us group-hover:shadow-elevation-3 transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-100/40 rounded-full -mr-12 -mt-12"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-orange-100/30 rounded-full -ml-8 -mb-8"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-red-700 flex items-center space-x-2">
                    <span>🇺🇸</span>
                    <span>US Price</span>
                  </span>
                  {usPrice.store.logoUrl && (
                    <img src={usPrice.store.logoUrl} alt={usPrice.store.name} className="w-8 h-8 rounded-lg shadow-elevation-1" />
                  )}
                </div>
                <div className="text-3xl font-bold text-red-900 mb-2">
                  ${usPrice.price.toFixed(2)}
                </div>
                <div className="text-sm text-red-700 font-semibold">{usPrice.store.name}</div>
              </div>
            </div>

            {/* Enhanced Korea Price Card */}
            <div className="price-card-korea group-hover:shadow-elevation-3 transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/40 rounded-full -mr-12 -mt-12"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-teal-100/30 rounded-full -ml-8 -mb-8"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-emerald-700 flex items-center space-x-2">
                    <span>🇰🇷</span>
                    <span>Korea Price</span>
                  </span>
                  {koreaPrice.store.logoUrl && (
                    <img src={koreaPrice.store.logoUrl} alt={koreaPrice.store.name} className="w-8 h-8 rounded-lg shadow-elevation-1" />
                  )}
                </div>
                <div className="text-3xl font-bold text-emerald-900 mb-2">
                  ${comp.koreanPriceInUSD}
                </div>
                <div className="text-sm text-emerald-700 font-semibold">{koreaPrice.store.name}</div>
                <div className="text-xs text-gray-500 mt-1">₩{koreaPrice.price.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Enhanced Savings Summary */}
          {isBetterInKorea && (
            <div className="price-savings mb-8 group-hover:shadow-glow-green transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full -ml-10 -mb-10"></div>
              <div className="relative text-center">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <Star className="w-6 h-6" />
                  <span className="text-2xl font-bold">Save ${comp.savings.toFixed(2)}</span>
                  <Star className="w-6 h-6" />
                </div>
                <div className="text-sm opacity-90 mb-3">
                  {comp.savingsPercentage.toFixed(1)}% cheaper in Korea
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Best Deal Available</span>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Action Buttons */}
          <div className="space-y-4">
            {isBetterInKorea ? (
              <>
                <button
                  onClick={handleRequestPurchase}
                  className="w-full btn-success text-lg py-5 flex items-center justify-center space-x-3 group/btn shadow-elevation-3 hover:shadow-glow-green"
                >
                  <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" />
                  <span>Request Korean Purchase</span>
                  <Sparkles className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" />
                </button>
                
                {/* Enhanced Security Notice */}
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 bg-gray-50 rounded-2xl px-4 py-3">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>Escrow protected • Verified shoppers • Money-back guarantee</span>
                </div>
                
                {/* Enhanced Store Links */}
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={koreaPrice.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 py-4 px-4 rounded-2xl hover:from-emerald-100 hover:to-teal-100 transition-all duration-300 text-sm font-semibold group/link border border-emerald-200/60"
                  >
                    <span>Korean Store</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                  <a
                    href={usPrice.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 py-4 px-4 rounded-2xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 text-sm font-semibold group/link border border-gray-200"
                  >
                    <span>US Store</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                {/* Enhanced US Better Deal Notice */}
                <div className="bg-gradient-to-r from-orange-50 via-red-50 to-orange-50 border-2 border-orange-200/60 rounded-2xl p-6 text-center shadow-elevation-1">
                  <div className="flex items-center justify-center space-x-3 text-orange-800 font-bold text-lg mb-3">
                    <TrendingUp className="w-5 h-5" />
                    <span>Better to buy in the US</span>
                  </div>
                  <div className="text-orange-700 font-semibold">
                    ${Math.abs(comp.savings).toFixed(2)} more expensive in Korea
                  </div>
                </div>
                
                {/* Enhanced US Purchase Button */}
                <a
                  href={usPrice.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-3 font-bold text-lg shadow-elevation-3 hover:shadow-elevation-4 transform hover:scale-105"
                >
                  <span>Buy from {usPrice.store.name}</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Purchase Request Modal */}
      <PurchaseRequestModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        product={product}
        pricing={comp}
        koreanStore={koreaPrice.store}
      />
    </>
  );
}
