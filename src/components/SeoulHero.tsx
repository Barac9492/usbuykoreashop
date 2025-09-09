import { useState } from 'react';
import { ArrowRight, Sparkles, Star, Cherry, Zap } from 'lucide-react';
import { ShopperAvatarSelection } from './ShopperAvatarSelection';

interface ShopperAvatar {
  id: string;
  name: string;
  personality: string;
  description: string;
  specialty: string;
  icon: React.ReactNode;
  color: string;
  recommendations: string[];
  rating: number;
  completedPurchases: number;
}

export function SeoulHero() {
  const [selectedShopper, setSelectedShopper] = useState<ShopperAvatar | null>(null);

  const handleShopperSelect = (shopper: ShopperAvatar) => {
    setSelectedShopper(shopper);
  };

  return (
    <section className="relative min-h-screen overflow-hidden seoul-skyline-bg">
      {/* Cherry Blossom Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-seoul-cherry rounded-full animate-cherry-fall opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Parallax Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Neon Seoul Skyline Silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-seoul-night/80 to-transparent">
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-seoul-night via-hanbok-midnight/50 to-transparent" />
          
          {/* Building silhouettes with neon accents */}
          <div className="absolute bottom-0 left-[10%] w-12 h-40 bg-seoul-night opacity-80 neon-flicker" />
          <div className="absolute bottom-0 left-[25%] w-8 h-32 bg-seoul-night opacity-70" />
          <div className="absolute bottom-0 left-[40%] w-16 h-48 bg-seoul-night opacity-90 neon-flicker" />
          <div className="absolute bottom-0 left-[60%] w-10 h-36 bg-seoul-night opacity-75" />
          <div className="absolute bottom-0 left-[80%] w-14 h-44 bg-seoul-night opacity-85 neon-flicker" />
          
          {/* Neon signs */}
          <div className="absolute bottom-20 left-[15%] w-6 h-2 bg-seoul-neon shadow-neon-pink animate-neon-flicker" />
          <div className="absolute bottom-32 left-[45%] w-8 h-3 bg-accent-500 shadow-neon-gold animate-neon-flicker" />
          <div className="absolute bottom-28 left-[75%] w-5 h-2 bg-hanbok-electric shadow-neon-blue animate-neon-flicker" />
        </div>

        {/* Floating Hanji Lanterns */}
        <div className="absolute top-20 left-[20%] w-12 h-16 lantern-glow opacity-60" />
        <div className="absolute top-32 right-[30%] w-10 h-14 lantern-glow opacity-50" />
        <div className="absolute top-16 left-[70%] w-8 h-12 lantern-glow opacity-70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="section-container py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left animate-slide-up">
              {/* Korean-English Title */}
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-korean-serif font-bold mb-4 korean-morph">
                  <span className="block text-hanji-50 neon-text">서울 드림스케이프</span>
                  <span className="block text-2xl md:text-3xl lg:text-4xl text-cherry-gradient font-korean-sans mt-2">
                    Seoul Dreamscape
                  </span>
                </h1>
              </div>

              <div className="mb-12">
                <p className="text-xl md:text-2xl text-hanji-100 mb-6 leading-relaxed">
                  Discover hidden beauty gems in bustling 
                  <span className="text-korean-brush text-kbeauty-coral"> Myeongdong </span>
                  markets at twilight
                </p>
                <p className="text-lg text-hanji-200/80 leading-relaxed">
                  Connect with verified Korean shoppers for authentic K-beauty at local prices. 
                  Save up to <span className="text-accent-400 font-bold text-xl">60%</span> on your favorite products.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="btn-cherry text-lg px-8 py-4">
                  <Sparkles className="w-6 h-6 mr-2" />
                  Start Shopping Journey
                  <ArrowRight className="w-6 h-6 ml-2" />
                </button>
                <button className="btn-hanbok text-lg px-8 py-4">
                  <Star className="w-6 h-6 mr-2" />
                  Become a Seoul Shopper
                </button>
              </div>

              {/* Cultural Elements */}
              <div className="flex items-center justify-center lg:justify-start space-x-8 text-hanji-200">
                <div className="flex items-center space-x-2">
                  <Cherry className="w-5 h-5 text-seoul-cherry" />
                  <span className="text-sm font-korean-sans">벚꽃 시즌</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-accent-400" />
                  <span className="text-sm font-korean-sans">네온 서울</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-kbeauty-coral" />
                  <span className="text-sm font-korean-sans">K-뷰티</span>
                </div>
              </div>
            </div>

            {/* Right Column - Shopper Summon Orb */}
            <div className="flex justify-center lg:justify-end animate-fade-in">
              <div className="relative">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-radial from-kbeauty-rose/20 via-hanbok-electric/10 to-transparent rounded-full scale-150 blur-3xl animate-glow-pulse" />
                
                {/* Main Shopper Selection */}
                <div className="relative z-10 glass-hanji rounded-4xl p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-hanbok-gradient mb-2 korean-morph">
                      쇼퍼 소환
                    </h3>
                    <p className="text-hanji-600 text-sm">
                      Spin to summon your perfect Korean shopper
                    </p>
                  </div>
                  
                  <ShopperAvatarSelection
                    onShopperSelect={handleShopperSelect}
                    selectedShopper={selectedShopper}
                  />
                </div>

                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent-400 rounded-full animate-float opacity-60" />
                <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-seoul-cherry rounded-full animate-float-delayed opacity-50" />
                <div className="absolute top-1/2 -right-8 w-4 h-4 bg-hanbok-electric rounded-full animate-pulse-soft opacity-70" />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-24 animate-scale-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-success-400 to-success-600 flex items-center justify-center shadow-elevation-3 group-hover:shadow-neon-pink transition-all duration-500 group-hover:scale-110">
                  <span className="text-2xl font-bold text-white">60%</span>
                </div>
                <p className="text-hanji-200 text-sm font-korean-sans">최대 절약</p>
                <p className="text-hanji-300 text-xs">Max Savings</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-hanbok-electric to-hanbok-royal flex items-center justify-center shadow-elevation-3 group-hover:shadow-neon-blue transition-all duration-500 group-hover:scale-110">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <p className="text-hanji-200 text-sm font-korean-sans">검증된 쇼퍼</p>
                <p className="text-hanji-300 text-xs">Verified Shoppers</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-kbeauty-rose to-kbeauty-coral flex items-center justify-center shadow-elevation-3 group-hover:shadow-cherry-glow transition-all duration-500 group-hover:scale-110">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <p className="text-hanji-200 text-sm font-korean-sans">정품 보장</p>
                <p className="text-hanji-300 text-xs">Authentic Products</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-elevation-3 group-hover:shadow-neon-gold transition-all duration-500 group-hover:scale-110">
                  <Zap className="w-8 h-8 text-seoul-night" />
                </div>
                <p className="text-hanji-200 text-sm font-korean-sans">빠른 배송</p>
                <p className="text-hanji-300 text-xs">Fast Shipping</p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-hanji-200/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-hanji-200/50 rounded-full mt-2 animate-pulse" />
            </div>
            <p className="text-xs text-hanji-300 mt-2 text-center font-korean-sans">아래로 스크롤</p>
          </div>
        </div>
      </div>
    </section>
  );
}
