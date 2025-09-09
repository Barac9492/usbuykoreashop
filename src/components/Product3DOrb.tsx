import { useState, useRef, useEffect } from 'react';
import { ExternalLink, ShoppingCart, Star, Sparkles, Eye, Heart } from 'lucide-react';
import { PurchaseRequestModal } from './PurchaseRequestModal';

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

interface Product3DOrbProps {
  comparison: ProductComparison;
  index: number;
}

export function Product3DOrb({ comparison, index }: Product3DOrbProps) {
  const { product, usPrice, koreaPrice, comparison: comp } = comparison;
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startY: 0, startRotX: 0, startRotY: 0 });

  const isBetterInKorea = comp.betterDeal === "Korea";

  useEffect(() => {
    // Add random initial rotation for variety
    setRotation({
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 30,
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startRotX: rotation.x,
      startRotY: rotation.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;

    setRotation({
      x: dragRef.current.startRotX + deltaY * 0.5,
      y: dragRef.current.startRotY + deltaX * 0.5,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleExpand = () => {
    if (!isDragging) {
      setIsExpanded(true);
    }
  };

  const animationDelay = index * 200;

  return (
    <>
      <div
        ref={orbRef}
        className={`relative group cursor-pointer transform-gpu transition-all duration-700 ${
          isExpanded ? 'scale-110 z-20' : 'hover:scale-105'
        }`}
        style={{
          animationDelay: `${animationDelay}ms`,
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleExpand}
      >
        {/* Main Orb Container */}
        <div className={`relative w-64 h-64 rounded-full overflow-hidden ${
          isBetterInKorea ? 'orb-glow' : 'bg-gradient-to-br from-hanji-100 to-hanji-200'
        } shadow-orb-float hover:shadow-seoul-depth transition-all duration-500 animate-scale-in`}>
          
          {/* Product Image */}
          <div className="absolute inset-4 rounded-full overflow-hidden">
            <img
              src={product.imageUrl || "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=300&fit=crop&crop=center"}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? 'scale-110' : ''
              }`}
              draggable={false}
            />
            
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
              isHovered 
                ? 'from-seoul-night/40 via-transparent to-transparent opacity-100' 
                : 'opacity-0'
            }`} />
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Brand badge */}
            {product.brand && (
              <div className="absolute top-4 left-4 bg-hanji-50/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-seoul-night border border-hanji-200/60">
                {product.brand}
              </div>
            )}

            {/* Savings badge */}
            {isBetterInKorea && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-success-500 to-success-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-elevation-3">
                -{comp.savingsPercentage.toFixed(0)}%
              </div>
            )}

            {/* Category indicator */}
            <div className="absolute bottom-4 left-4 badge-seoul text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              {product.category.name}
            </div>

            {/* Interactive hints */}
            {isHovered && (
              <div className="absolute bottom-4 right-4 flex space-x-2 animate-fade-in">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Orb shine effect */}
          <div className={`absolute top-4 left-4 w-16 h-16 bg-white/30 rounded-full blur-xl transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-60'
          }`} />

          {/* Rotation indicator */}
          {isDragging && (
            <div className="absolute inset-0 border-2 border-hanbok-electric/50 rounded-full animate-pulse" />
          )}
        </div>

        {/* Floating Price Information */}
        <div className={`absolute -bottom-20 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="glass-hanji rounded-2xl p-4 text-center min-w-48">
            <h3 className="font-bold text-seoul-night mb-2 line-clamp-1 text-sm">
              {product.name}
            </h3>
            
            <div className="flex justify-between items-center text-xs mb-2">
              <div className="text-error-600 font-bold">
                US: ${usPrice.price}
              </div>
              <div className="text-success-600 font-bold">
                KR: ${comp.koreanPriceInUSD}
              </div>
            </div>

            {isBetterInKorea && (
              <div className="text-success-700 font-bold text-sm mb-3">
                Save ${comp.savings.toFixed(2)}
              </div>
            )}

            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPurchaseModalOpen(true);
                }}
                className="flex-1 btn-cherry text-xs py-2 px-3"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Buy
              </button>
              <a
                href={koreaPrice.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 btn-hanbok text-xs py-2 px-3"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View
              </a>
            </div>
          </div>
        </div>

        {/* Expanded Modal Overlay */}
        {isExpanded && (
          <div
            className="fixed inset-0 bg-seoul-night/60 backdrop-blur-sm z-10 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setIsExpanded(false)}
          >
            <div
              className="glass-hanji rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start space-x-6">
                <div className="w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    src={product.imageUrl || "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=300&fit=crop&crop=center"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <h2 className="text-2xl font-bold text-seoul-night korean-morph">
                      {product.name}
                    </h2>
                    <Star className="w-5 h-5 text-accent-500 fill-current" />
                  </div>
                  
                  <p className="text-hanji-700 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glass-cherry rounded-2xl p-4 text-center">
                      <p className="text-xs font-bold text-error-700 mb-1">US Price</p>
                      <p className="text-2xl font-bold text-error-800">${usPrice.price}</p>
                      <p className="text-xs text-error-600">{usPrice.store.name}</p>
                    </div>
                    
                    <div className="glass-hanbok rounded-2xl p-4 text-center">
                      <p className="text-xs font-bold text-success-700 mb-1">Korea Price</p>
                      <p className="text-2xl font-bold text-success-800">${comp.koreanPriceInUSD}</p>
                      <p className="text-xs text-success-600">{koreaPrice.store.name}</p>
                    </div>
                  </div>

                  {isBetterInKorea && (
                    <div className="bg-gradient-to-r from-success-500 to-success-600 text-white rounded-2xl p-4 text-center mb-6">
                      <p className="text-lg font-bold">Save ${comp.savings.toFixed(2)}</p>
                      <p className="text-sm opacity-90">{comp.savingsPercentage.toFixed(1)}% cheaper in Korea</p>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setIsExpanded(false);
                        setIsPurchaseModalOpen(true);
                      }}
                      className="flex-1 btn-cherry"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Request Korean Purchase
                    </button>
                    <a
                      href={koreaPrice.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-hanbok px-6"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
