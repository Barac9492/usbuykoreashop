import { TrendingDown, TrendingUp, Star, ShoppingCart, Sparkles, Zap } from "lucide-react";

interface FeaturedDeal {
  id: number;
  productName: string;
  brand: string;
  imageUrl: string;
  usPrice: number;
  koreaPrice: number;
  savingsUSD: number;
  savingsPercentage: number;
  category: string;
  usStore: string;
  koreaStore: string;
  usUrl: string;
  koreaUrl: string;
}

const featuredDeals: FeaturedDeal[] = [
  {
    id: 1,
    productName: "Laneige Water Sleeping Mask",
    brand: "Laneige",
    imageUrl: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=300&fit=crop&crop=center",
    usPrice: 34,
    koreaPrice: 13.50,
    savingsUSD: 20.50,
    savingsPercentage: 60.3,
    category: "K-Beauty",
    usStore: "Sephora US",
    koreaStore: "Olive Young",
    usUrl: "https://sephora.com/laneige-sleeping-mask",
    koreaUrl: "https://oliveyoung.co.kr/laneige",
  },
  {
    id: 2,
    productName: "COSRX Snail 96 Mucin Power Essence",
    brand: "COSRX",
    imageUrl: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=300&fit=crop&crop=center",
    usPrice: 25,
    koreaPrice: 9,
    savingsUSD: 16,
    savingsPercentage: 64.0,
    category: "K-Beauty",
    usStore: "Ulta Beauty",
    koreaStore: "Olive Young",
    usUrl: "https://ulta.com/cosrx-snail-mucin",
    koreaUrl: "https://oliveyoung.co.kr/cosrx",
  },
  {
    id: 3,
    productName: "Sulwhasoo First Care Activating Serum",
    brand: "Sulwhasoo",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center",
    usPrice: 85,
    koreaPrice: 49,
    savingsUSD: 36,
    savingsPercentage: 42.4,
    category: "K-Beauty",
    usStore: "Sephora US",
    koreaStore: "Olive Young",
    usUrl: "https://sephora.com/sulwhasoo-serum",
    koreaUrl: "https://oliveyoung.co.kr/sulwhasoo",
  },
];

export function FeaturedDeals() {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 rounded-4xl shadow-elevation-4 border border-gray-100/60 p-8 md:p-12 mb-16 relative overflow-hidden">
      {/* Enhanced Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-200/20 via-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-emerald-200/15 via-teal-200/15 to-blue-200/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-200/10 to-orange-200/10 rounded-full blur-2xl animate-pulse-soft"></div>
      </div>
      
      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-8">
            <div className="group flex items-center space-x-3 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white px-8 py-4 rounded-full shadow-elevation-3 hover:shadow-glow-purple transition-all duration-500 hover:scale-105">
              <Star className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-bold text-lg uppercase tracking-wide">Featured Deals</span>
              <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          
          <h2 className="section-title text-gray-900 mb-8">
            Save Up to{" "}
            <span className="text-gradient-success">64%</span>{" "}
            on K-Beauty
          </h2>
          
          <p className="section-subtitle">
            These handpicked K-beauty products cost significantly less in Korea.{" "}
            <strong className="text-gradient font-semibold">
              Request a purchase from our verified Korean shoppers today!
            </strong>
          </p>
        </div>

        {/* Enhanced Deal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {featuredDeals.map((deal, index) => (
            <div
              key={deal.id}
              className="group relative card-featured card-hover transform transition-all duration-700 animate-scale-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Enhanced Deal Rank Badge */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-elevation-3 z-20 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold">#{index + 1}</span>
              </div>

              {/* Enhanced Savings Badge */}
              <div className="absolute top-6 left-6 bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white px-5 py-2.5 rounded-full font-bold flex items-center shadow-elevation-3 z-20 group-hover:scale-105 transition-transform duration-300">
                <TrendingDown className="w-4 h-4 mr-2" />
                <span>Save ${deal.savingsUSD}</span>
              </div>

              <div className="relative p-8 pt-12">
                {/* Enhanced Product Image */}
                <div className="text-center mb-8">
                  <div className="relative mx-auto w-48 h-48 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <img
                      src={deal.imageUrl}
                      alt={deal.productName}
                      className="relative w-full h-full object-cover rounded-3xl group-hover:scale-110 transition-transform duration-700 shadow-elevation-3 group-hover:shadow-elevation-4"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <div className="space-y-3">
                    <span className="inline-block badge-gradient px-6 py-2 text-sm font-bold rounded-full">
                      {deal.category}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {deal.productName}
                    </h3>
                    <p className="text-gray-600 font-semibold text-lg">{deal.brand}</p>
                  </div>
                </div>

                {/* Enhanced Price Comparison */}
                <div className="space-y-4 mb-8">
                  <div className="price-card-us group-hover:shadow-elevation-2 transition-shadow duration-300">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-red-100/50 rounded-full -mr-10 -mt-10"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-red-700 flex items-center">
                          🇺🇸 {deal.usStore}
                        </span>
                        <TrendingUp className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="text-3xl font-bold text-red-900">${deal.usPrice}</div>
                    </div>
                  </div>
                  
                  <div className="price-card-korea group-hover:shadow-elevation-2 transition-shadow duration-300">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100/50 rounded-full -mr-10 -mt-10"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-emerald-700 flex items-center">
                          🇰🇷 {deal.koreaStore}
                        </span>
                        <div className="text-right">
                          <p className="text-xs text-emerald-600 font-semibold">You save</p>
                          <p className="text-lg font-bold text-emerald-800">{deal.savingsPercentage.toFixed(1)}%</p>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-emerald-900">${deal.koreaPrice}</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Purchase Button */}
                <button className="w-full btn-success text-xl py-5 flex items-center justify-center space-x-3 group/btn mb-4">
                  <ShoppingCart className="w-6 h-6 group-hover/btn:scale-110 transition-transform duration-200" />
                  <span>Request Purchase</span>
                  <Zap className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" />
                </button>
                
                {/* Enhanced Features */}
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 font-medium">
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Verified Shoppers</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Escrow Protected</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center space-x-1">
                    <TrendingDown className="w-3 h-3" />
                    <span>Direct Shipping</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center animate-fade-in">
          <div className="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-elevation-3">
            <p className="text-xl text-gray-700 mb-6 font-medium">
              Want to see more Korean deals? Browse our full catalog of authentic products.
            </p>
            <button className="btn-primary text-xl px-12 py-5">
              <span>View All Korean Products</span>
              <Sparkles className="w-6 h-6 ml-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
