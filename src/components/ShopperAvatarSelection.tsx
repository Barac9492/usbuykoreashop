import { useState, useEffect } from 'react';
import { Sparkles, Star, ShoppingBag, Heart, Zap, User } from 'lucide-react';

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

const shopperAvatars: ShopperAvatar[] = [
  {
    id: 'kbeauty-enthusiast',
    name: '지민 (Jimin)',
    personality: 'K-Beauty Enthusiast',
    description: 'Obsessed with the latest K-beauty trends and knows every Olive Young secret!',
    specialty: 'Skincare & Cosmetics',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'from-kbeauty-rose to-kbeauty-coral',
    recommendations: [
      'Try the viral glass skin routine with COSRX Snail Mucin!',
      'This cushion foundation is perfect for your skin tone',
      'I found a limited edition palette at Myeongdong!',
    ],
    rating: 4.9,
    completedPurchases: 156,
  },
  {
    id: 'market-navigator',
    name: '현우 (Hyunwoo)',
    personality: 'Savvy Market Navigator',
    description: 'Master of finding the best deals in Seoul\'s bustling markets and underground shops.',
    specialty: 'Fashion & Accessories',
    icon: <ShoppingBag className="w-8 h-8" />,
    color: 'from-hanbok-electric to-hanbok-royal',
    recommendations: [
      'Found this designer dupe in Dongdaemun for 70% less!',
      'The night markets have the best streetwear deals',
      'I know a secret shop with authentic hanbok accessories',
    ],
    rating: 4.8,
    completedPurchases: 203,
  },
  {
    id: 'culture-connector',
    name: '수빈 (Subin)',
    personality: 'Culture Connector',
    description: 'Bridges Korean culture with modern trends, specializing in traditional meets contemporary.',
    specialty: 'Cultural Items & Gifts',
    icon: <Heart className="w-8 h-8" />,
    color: 'from-accent-400 to-accent-600',
    recommendations: [
      'This traditional tea set would be perfect for your home!',
      'Korean snacks that will blow your mind',
      'Handcrafted items from local Seoul artisans',
    ],
    rating: 4.9,
    completedPurchases: 89,
  },
  {
    id: 'tech-trendsetter',
    name: '민재 (Minjae)',
    personality: 'Tech Trendsetter',
    description: 'Always first to discover the latest Korean tech gadgets and lifestyle innovations.',
    specialty: 'Tech & Lifestyle',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-primary-400 to-primary-600',
    recommendations: [
      'This Korean phone accessory is going viral on TikTok!',
      'Smart beauty devices that are game-changers',
      'Korean study tools that make learning fun',
    ],
    rating: 4.7,
    completedPurchases: 134,
  },
];

interface ShopperAvatarSelectionProps {
  onShopperSelect: (shopper: ShopperAvatar) => void;
  selectedShopper: ShopperAvatar | null;
}

export function ShopperAvatarSelection({ onShopperSelect, selectedShopper }: ShopperAvatarSelectionProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [currentRecommendation, setCurrentRecommendation] = useState(0);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowRecommendation(false);
    
    // Simulate spinning animation
    let spins = 0;
    const maxSpins = 10 + Math.floor(Math.random() * 10);
    
    const spinInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shopperAvatars.length);
      spins++;
      
      if (spins >= maxSpins) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        
        // Select final shopper
        const finalIndex = Math.floor(Math.random() * shopperAvatars.length);
        setCurrentIndex(finalIndex);
        onShopperSelect(shopperAvatars[finalIndex]);
        
        // Show recommendation after a delay
        setTimeout(() => {
          setShowRecommendation(true);
          setCurrentRecommendation(Math.floor(Math.random() * shopperAvatars[finalIndex].recommendations.length));
        }, 500);
      }
    }, 100);
  };

  useEffect(() => {
    if (selectedShopper && showRecommendation) {
      // Cycle through recommendations
      const recommendationInterval = setInterval(() => {
        setCurrentRecommendation((prev) => 
          (prev + 1) % selectedShopper.recommendations.length
        );
      }, 4000);
      
      return () => clearInterval(recommendationInterval);
    }
  }, [selectedShopper, showRecommendation]);

  const currentShopper = shopperAvatars[currentIndex];

  return (
    <div className="relative flex flex-col items-center space-y-8">
      {/* Main Orb */}
      <div className="relative">
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${currentShopper.color} text-white shadow-orb-float hover:shadow-neon-pink transition-all duration-500 transform hover:scale-110 disabled:cursor-not-allowed ${
            isSpinning ? 'animate-spin' : 'hover:rotate-12'
          }`}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          
          {/* Shopper Icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {currentShopper.icon}
          </div>
          
          {/* Spinning indicator */}
          {isSpinning && (
            <div className="absolute inset-0 rounded-full border-4 border-white/30 border-t-white animate-spin" />
          )}
          
          {/* Pulsing rings */}
          {!isSpinning && (
            <>
              <div className="absolute -inset-4 rounded-full border-2 border-current/20 animate-ping" />
              <div className="absolute -inset-2 rounded-full border border-current/30 animate-pulse" />
            </>
          )}
        </button>
        
        {/* Spin instruction */}
        {!selectedShopper && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-sm font-bold text-hanbok-electric mb-1">Shopper Summon</p>
            <p className="text-xs text-hanji-600">Click to spin!</p>
          </div>
        )}
      </div>

      {/* Shopper Information */}
      {selectedShopper && (
        <div className="glass-hanji rounded-3xl p-6 max-w-md text-center animate-scale-in">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <h3 className="text-xl font-bold text-korean-brush text-hanbok-gradient">
              {selectedShopper.name}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-accent-500 fill-current" />
              <span className="text-sm font-bold text-accent-600">{selectedShopper.rating}</span>
            </div>
          </div>
          
          <p className="text-sm font-semibold text-primary-600 mb-2">
            {selectedShopper.personality}
          </p>
          
          <p className="text-sm text-hanji-700 mb-4">
            {selectedShopper.description}
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-xs text-hanji-600 mb-4">
            <span className="flex items-center space-x-1">
              <ShoppingBag className="w-3 h-3" />
              <span>{selectedShopper.completedPurchases} purchases</span>
            </span>
            <span className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{selectedShopper.specialty}</span>
            </span>
          </div>
          
          {/* Recommendation Dialogue */}
          {showRecommendation && (
            <div className="relative bg-gradient-to-r from-kbeauty-rose/10 to-hanbok-electric/10 rounded-2xl p-4 animate-fade-in">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-kbeauty-rose rotate-45" />
              <p className="text-sm font-medium text-seoul-night italic">
                "{selectedShopper.recommendations[currentRecommendation]}"
              </p>
              <div className="flex justify-center mt-2">
                <div className="flex space-x-1">
                  {selectedShopper.recommendations.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === currentRecommendation 
                          ? 'bg-hanbok-electric' 
                          : 'bg-hanji-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Available Shoppers Preview */}
      <div className="flex space-x-4">
        {shopperAvatars.map((shopper, index) => (
          <button
            key={shopper.id}
            onClick={() => {
              setCurrentIndex(index);
              onShopperSelect(shopper);
              setShowRecommendation(true);
              setCurrentRecommendation(0);
            }}
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${shopper.color} text-white shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 transform hover:scale-110 ${
              selectedShopper?.id === shopper.id ? 'scale-110 shadow-neon-pink' : ''
            }`}
          >
            <div className="flex items-center justify-center">
              <div className="scale-75">
                {shopper.icon}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
