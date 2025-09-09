import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Eye, Map } from 'lucide-react';
import { Product3DOrb } from './Product3DOrb';

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

interface SeoulMarketplaceProps {
  products: ProductComparison[];
  loading?: boolean;
}

export function SeoulMarketplace({ products, loading = false }: SeoulMarketplaceProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [viewAngle, setViewAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const marketplaceRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, startAngle: 0 });

  // Group products into sections (alleyway segments)
  const sections = [];
  const productsPerSection = 6;
  for (let i = 0; i < products.length; i += productsPerSection) {
    sections.push(products.slice(i, i + productsPerSection));
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - dragStartRef.current.x;
      const newAngle = dragStartRef.current.startAngle + deltaX * 0.2;
      setViewAngle(newAngle);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      startAngle: viewAngle,
    };
  };

  const navigateSection = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else if (direction === 'next' && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-hanji-50 to-seoul-mist overflow-hidden">
        <div className="absolute inset-0 cherry-blossom-overlay opacity-30" />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-kbeauty-rose to-hanbok-electric animate-spin opacity-60" />
            <p className="text-xl font-korean-serif text-hanbok-gradient">
              서울 시장을 탐험하는 중...
            </p>
            <p className="text-sm text-hanji-600 mt-2">
              Exploring Seoul marketplace...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentProducts = sections[currentSection] || [];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-hanji-50 to-seoul-mist overflow-hidden">
      {/* Background Mist and Atmosphere */}
      <div className="absolute inset-0 cherry-blossom-overlay opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hanji-100/30 to-hanji-200/50" />
      
      {/* Floating Lanterns */}
      <div className="absolute top-20 left-[10%] w-8 h-12 lantern-glow opacity-40" />
      <div className="absolute top-32 right-[20%] w-6 h-10 lantern-glow opacity-50" />
      <div className="absolute top-16 left-[70%] w-10 h-14 lantern-glow opacity-45" />

      {/* Navigation Header */}
      <div className="relative z-20 pt-8 pb-4">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-korean-serif font-bold korean-morph text-hanbok-gradient mb-2">
                서울 시장 골목
              </h2>
              <p className="text-hanji-600">
                Section {currentSection + 1} of {sections.length} • {currentProducts.length} stalls
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Controls */}
              <div className="flex items-center space-x-2 glass-hanji rounded-2xl px-4 py-2">
                <Eye className="w-4 h-4 text-hanji-600" />
                <span className="text-sm text-hanji-700">Drag to rotate view</span>
                <button
                  onClick={() => setViewAngle(0)}
                  className="btn-ghost p-1"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              {/* Section Navigation */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateSection('prev')}
                  disabled={currentSection === 0}
                  className="btn-hanbok p-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigateSection('next')}
                  disabled={currentSection === sections.length - 1}
                  className="btn-hanbok p-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Alleyway Map */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2 glass-hanji rounded-full px-6 py-3">
              <Map className="w-4 h-4 text-hanbok-electric" />
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSection
                      ? 'bg-hanbok-electric scale-125 shadow-neon-blue'
                      : index < currentSection
                      ? 'bg-success-500'
                      : 'bg-hanji-300 hover:bg-hanji-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Marketplace */}
      <div
        ref={marketplaceRef}
        className="relative z-10 min-h-screen perspective-1000 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        style={{
          transform: `rotateY(${viewAngle}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="section-container py-12">
          {/* Glowing Thread Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <defs>
              <linearGradient id="threadGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 51, 153, 0.6)" />
                <stop offset="50%" stopColor="rgba(255, 215, 0, 0.4)" />
                <stop offset="100%" stopColor="rgba(0, 102, 255, 0.3)" />
              </linearGradient>
            </defs>
            
            {/* Connect stalls with flowing paths */}
            {currentProducts.map((_, index) => {
              if (index === currentProducts.length - 1) return null;
              const startX = ((index % 3) * 33 + 16.5) + '%';
              const startY = (Math.floor(index / 3) * 50 + 25) + '%';
              const endX = (((index + 1) % 3) * 33 + 16.5) + '%';
              const endY = (Math.floor((index + 1) / 3) * 50 + 25) + '%';
              
              return (
                <path
                  key={index}
                  d={`M ${startX} ${startY} Q ${(parseInt(startX) + parseInt(endX)) / 2}% ${(parseInt(startY) + parseInt(endY)) / 2 - 10}% ${endX} ${endY}`}
                  stroke="url(#threadGlow)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse-soft"
                />
              );
            })}
          </svg>

          {/* Product Stalls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {currentProducts.map((product, index) => (
              <div
                key={product.product.id}
                className="relative transform-gpu"
                style={{
                  animationDelay: `${index * 200}ms`,
                  transform: `translateZ(${Math.sin(index * 0.5) * 50}px) rotateY(${Math.cos(index * 0.3) * 10}deg)`,
                }}
              >
                {/* Stall Base */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-80 h-4 bg-seoul-night/10 rounded-full blur-xl" />
                
                {/* Product Orb */}
                <Product3DOrb comparison={product} index={index} />
                
                {/* Stall Decorations */}
                <div className="absolute -top-8 left-4 w-4 h-6 bg-accent-400 rounded-full opacity-60 animate-float" />
                <div className="absolute -top-6 right-6 w-3 h-4 bg-kbeauty-coral rounded-full opacity-50 animate-float-delayed" />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {currentProducts.length === 0 && (
            <div className="text-center py-24">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-hanji-200 to-hanji-300 flex items-center justify-center opacity-60">
                <Map className="w-16 h-16 text-hanji-500" />
              </div>
              <h3 className="text-2xl font-korean-serif text-hanji-600 mb-4">
                이 골목은 비어있습니다
              </h3>
              <p className="text-hanji-500">
                This alleyway section is empty. Try exploring other sections!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section Transition Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="glass-hanji rounded-full px-6 py-3 flex items-center space-x-4">
          <div className="flex space-x-2">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSection
                    ? 'bg-hanbok-electric scale-125'
                    : 'bg-hanji-300'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-hanji-600">
            {currentSection + 1}/{sections.length}
          </div>
        </div>
      </div>
    </div>
  );
}
