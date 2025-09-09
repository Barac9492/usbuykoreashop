import { Loader2, ShoppingCart, Search, Sparkles, Star, TrendingUp } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "shopping" | "search";
  message?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = "md", 
  variant = "default",
  message,
  className = ""
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-20 h-20"
  };

  const getIcon = () => {
    switch (variant) {
      case "shopping":
        return <ShoppingCart className={`${sizeClasses[size]} animate-pulse`} />;
      case "search":
        return <Search className={`${sizeClasses[size]} animate-pulse`} />;
      default:
        return <Loader2 className={`${sizeClasses[size]} animate-spin`} />;
    }
  };

  const getColors = () => {
    switch (variant) {
      case "shopping":
        return "text-emerald-500";
      case "search":
        return "text-blue-500";
      default:
        return "text-blue-600";
    }
  };

  if (size === "xl" && message) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
        <div className="relative mb-8 animate-scale-in">
          {/* Enhanced large spinner with multiple layers */}
          <div className="relative">
            <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-2 w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            <div className="absolute inset-6 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse shadow-elevation-3"></div>
          </div>
          
          {/* Floating particles */}
          <div className="absolute -inset-8">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
        
        <div className="text-center max-w-md animate-fade-in">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-2">
            <Sparkles className="w-6 h-6 text-blue-500" />
            <span>
              {variant === "shopping" ? "Processing Your Request" : 
               variant === "search" ? "Searching Korean Products" : 
               "Loading Amazing Deals"}
            </span>
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg mb-6">{message}</p>
          
          {/* Enhanced loading dots */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${getColors()}`}>
        {getIcon()}
      </div>
      {message && size !== "sm" && (
        <span className="ml-3 text-gray-600 font-medium">{message}</span>
      )}
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="card animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
          {/* Enhanced image skeleton */}
          <div className="h-64 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-t-3xl relative overflow-hidden">
            <div className="shimmer absolute inset-0"></div>
            {/* Category badge skeleton */}
            <div className="absolute top-6 left-6 w-20 h-8 bg-gray-300 rounded-full shimmer"></div>
            {/* Savings badge skeleton */}
            <div className="absolute top-6 right-6 w-24 h-8 bg-gray-300 rounded-full shimmer"></div>
          </div>
          
          <div className="p-8 space-y-6">
            {/* Title skeleton */}
            <div className="space-y-3">
              <div className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl shimmer"></div>
              <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 shimmer"></div>
            </div>
            
            {/* Price comparison skeleton */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 space-y-3 border border-red-100">
                <div className="h-4 bg-red-200 rounded-lg w-2/3 shimmer"></div>
                <div className="h-8 bg-red-300 rounded-lg w-1/2 shimmer"></div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 space-y-3 border border-emerald-100">
                <div className="h-4 bg-emerald-200 rounded-lg w-2/3 shimmer"></div>
                <div className="h-8 bg-emerald-300 rounded-lg w-1/2 shimmer"></div>
              </div>
            </div>
            
            {/* Savings summary skeleton */}
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-6 text-center space-y-3 border border-emerald-200">
              <div className="h-6 bg-emerald-300 rounded-lg w-1/2 mx-auto shimmer"></div>
              <div className="h-4 bg-emerald-200 rounded-lg w-3/4 mx-auto shimmer"></div>
            </div>
            
            {/* Button skeleton */}
            <div className="h-14 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SearchLoading() {
  return (
    <div className="flex items-center justify-center py-16 animate-fade-in">
      <div className="text-center">
        <div className="relative mb-8">
          {/* Enhanced search spinner */}
          <div className="relative">
            <Search className="w-16 h-16 text-blue-400 animate-pulse mx-auto" />
            <div className="absolute -inset-6 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute -inset-4 border-2 border-purple-200 border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          
          {/* Search beam effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-700 flex items-center justify-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span>Searching Korean Products</span>
            <Star className="w-5 h-5 text-purple-500" />
          </h3>
          <p className="text-gray-600 font-medium">Finding the best Korean deals for you...</p>
          
          {/* Enhanced loading dots */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategoryFilterSkeleton() {
  return (
    <div className="card p-8 mb-8 animate-pulse">
      <div className="text-center mb-8">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-64 mx-auto mb-4 shimmer"></div>
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-96 mx-auto shimmer"></div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl w-40 shimmer"
            style={{ animationDelay: `${i * 100}ms` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center animate-pulse">
      <div className="section-container py-32">
        <div className="text-center space-y-8">
          {/* Legal notice skeleton */}
          <div className="flex justify-center mb-8">
            <div className="w-80 h-16 bg-white/10 rounded-full shimmer-dark"></div>
          </div>
          
          {/* Title skeleton */}
          <div className="space-y-4">
            <div className="h-16 bg-white/10 rounded-2xl w-full max-w-4xl mx-auto shimmer-dark"></div>
            <div className="h-16 bg-white/10 rounded-2xl w-full max-w-3xl mx-auto shimmer-dark"></div>
          </div>
          
          {/* Subtitle skeleton */}
          <div className="space-y-3">
            <div className="h-8 bg-white/10 rounded-xl w-full max-w-5xl mx-auto shimmer-dark"></div>
            <div className="h-8 bg-white/10 rounded-xl w-full max-w-4xl mx-auto shimmer-dark"></div>
          </div>
          
          {/* Legal warning skeleton */}
          <div className="h-32 bg-white/10 rounded-3xl max-w-5xl mx-auto shimmer-dark"></div>
          
          {/* Buttons skeleton */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <div className="h-16 bg-white/10 rounded-2xl w-64 shimmer-dark"></div>
            <div className="h-16 bg-white/10 rounded-2xl w-64 shimmer-dark"></div>
          </div>
          
          {/* Stats skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-white/10 rounded-3xl shimmer-dark"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
