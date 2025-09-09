import { useState } from 'react';
import { Sparkles, Heart, DollarSign, TrendingUp, Leaf, Users, Clock, Star } from 'lucide-react';

interface FilterPetal {
  id: string;
  label: string;
  koreanLabel: string;
  icon: React.ReactNode;
  color: string;
  isActive: boolean;
}

interface PetalFilterSystemProps {
  onFiltersChange: (activeFilters: string[]) => void;
  className?: string;
}

export function PetalFilterSystem({ onFiltersChange, className = '' }: PetalFilterSystemProps) {
  const [petals, setPetals] = useState<FilterPetal[]>([
    {
      id: 'vegan',
      label: 'Vegan',
      koreanLabel: '비건',
      icon: <Leaf className="w-4 h-4" />,
      color: 'from-green-400 to-emerald-500',
      isActive: false,
    },
    {
      id: 'under-20',
      label: 'Under $20',
      koreanLabel: '$20 이하',
      icon: <DollarSign className="w-4 h-4" />,
      color: 'from-blue-400 to-cyan-500',
      isActive: false,
    },
    {
      id: 'viral-tiktok',
      label: 'Viral on TikTok',
      koreanLabel: '틱톡 인기',
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'from-pink-400 to-rose-500',
      isActive: false,
    },
    {
      id: 'k-beauty',
      label: 'K-Beauty',
      koreanLabel: 'K-뷰티',
      icon: <Sparkles className="w-4 h-4" />,
      color: 'from-kbeauty-rose to-kbeauty-coral',
      isActive: false,
    },
    {
      id: 'bestseller',
      label: 'Bestseller',
      koreanLabel: '베스트셀러',
      icon: <Star className="w-4 h-4" />,
      color: 'from-accent-400 to-accent-600',
      isActive: false,
    },
    {
      id: 'new-arrival',
      label: 'New Arrival',
      koreanLabel: '신상품',
      icon: <Clock className="w-4 h-4" />,
      color: 'from-purple-400 to-indigo-500',
      isActive: false,
    },
    {
      id: 'editor-pick',
      label: 'Editor\'s Pick',
      koreanLabel: '에디터 픽',
      icon: <Heart className="w-4 h-4" />,
      color: 'from-red-400 to-pink-500',
      isActive: false,
    },
    {
      id: 'community-fav',
      label: 'Community Favorite',
      koreanLabel: '커뮤니티 인기',
      icon: <Users className="w-4 h-4" />,
      color: 'from-orange-400 to-amber-500',
      isActive: false,
    },
  ]);

  const handlePetalClick = (petalId: string) => {
    const updatedPetals = petals.map(petal => 
      petal.id === petalId 
        ? { ...petal, isActive: !petal.isActive }
        : petal
    );
    
    setPetals(updatedPetals);
    
    const activeFilters = updatedPetals
      .filter(petal => petal.isActive)
      .map(petal => petal.id);
    
    onFiltersChange(activeFilters);
  };

  const clearAllFilters = () => {
    const clearedPetals = petals.map(petal => ({ ...petal, isActive: false }));
    setPetals(clearedPetals);
    onFiltersChange([]);
  };

  const activePetalsCount = petals.filter(petal => petal.isActive).length;

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold korean-morph text-hanbok-gradient mb-2">
          필터 꽃잎
        </h3>
        <p className="text-hanji-600 text-sm mb-4">
          Click petals to bloom your perfect product selection
        </p>
        
        {activePetalsCount > 0 && (
          <div className="flex items-center justify-center space-x-4">
            <span className="text-sm text-hanji-700">
              {activePetalsCount} filter{activePetalsCount !== 1 ? 's' : ''} active
            </span>
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium underline"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Petal Garden */}
      <div className="relative">
        {/* Central Stem */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-green-600 rounded-full transform -translate-x-1/2 opacity-30" />
        
        {/* Petals arranged in a blooming pattern */}
        <div className="relative min-h-96 flex items-center justify-center">
          {petals.map((petal, index) => {
            // Calculate position in a spiral/blooming pattern
            const angle = (index * 45) - 90; // Start from top, 45 degrees apart
            const radius = 120 + (index % 2) * 40; // Alternate between two radius levels
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <button
                key={petal.id}
                onClick={() => handlePetalClick(petal.id)}
                className={`absolute petal-filter transition-all duration-500 ${
                  petal.isActive ? 'scale-125 z-10' : 'hover:scale-110'
                }`}
                style={{
                  transform: `translate(${x}px, ${y}px) ${petal.isActive ? 'rotate(0deg)' : `rotate(${Math.random() * 30 - 15}deg)`}`,
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${petal.color} ${
                  petal.isActive 
                    ? 'shadow-elevation-4 ring-4 ring-white/30' 
                    : 'shadow-elevation-2 hover:shadow-elevation-3'
                } flex items-center justify-center text-white transition-all duration-300 relative overflow-hidden group`}>
                  
                  {/* Petal shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon */}
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-200">
                    {petal.icon}
                  </div>

                  {/* Active indicator */}
                  {petal.isActive && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-elevation-2">
                      <div className="w-2 h-2 bg-success-500 rounded-full" />
                    </div>
                  )}
                </div>
                
                {/* Label */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="text-xs font-bold text-seoul-night whitespace-nowrap">
                    {petal.label}
                  </p>
                  <p className="text-2xs text-hanji-600 font-korean-sans">
                    {petal.koreanLabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Floating sparkles for active petals */}
        {activePetalsCount > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: activePetalsCount * 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-accent-400 rounded-full animate-float opacity-60"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {activePetalsCount > 0 && (
        <div className="mt-12 glass-hanji rounded-2xl p-6 animate-scale-in">
          <h4 className="text-lg font-bold text-seoul-night mb-4 text-center">
            Active Filters ({activePetalsCount})
          </h4>
          <div className="flex flex-wrap gap-3 justify-center">
            {petals
              .filter(petal => petal.isActive)
              .map(petal => (
                <div
                  key={petal.id}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${petal.color} text-white text-sm font-medium shadow-elevation-2`}
                >
                  {petal.icon}
                  <span>{petal.label}</span>
                  <button
                    onClick={() => handlePetalClick(petal.id)}
                    className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                  >
                    <span className="text-xs">×</span>
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
