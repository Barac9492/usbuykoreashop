import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/react";
import { Search, X, Filter, TrendingUp, Clock, Tag, Sparkles, Star } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string, filters?: SearchFilters) => void;
  onCategoryFilter?: (categoryId: number | null) => void;
  placeholder?: string;
  className?: string;
}

interface SearchFilters {
  category?: number | null;
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy?: "savings" | "price" | "popularity" | "newest";
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: "product" | "brand" | "category";
  count?: number;
}

export function SearchBar({ 
  onSearch, 
  onCategoryFilter,
  placeholder = "Search Korean products, brands, or categories...",
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("koreabuy-recent-searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load recent searches:", e);
      }
    }
  }, []);

  // Mock search suggestions - in real app, this would be a tRPC query
  const suggestions: SearchSuggestion[] = [
    { id: "1", text: "Laneige Water Sleeping Mask", type: "product" },
    { id: "2", text: "COSRX", type: "brand", count: 24 },
    { id: "3", text: "K-Beauty", type: "category", count: 156 },
    { id: "4", text: "Sulwhasoo", type: "brand", count: 18 },
    { id: "5", text: "Korean skincare", type: "product" },
  ].filter(s => 
    query.length >= 2 && 
    s.text.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const updatedRecent = [
        searchQuery,
        ...recentSearches.filter(s => s !== searchQuery)
      ].slice(0, 5);
      setRecentSearches(updatedRecent);
      localStorage.setItem("koreabuy-recent-searches", JSON.stringify(updatedRecent));
      
      onSearch(searchQuery, filters);
      setIsOpen(false);
      setQuery(searchQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const itemCount = suggestions.length + recentSearches.length;
    
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => prev < itemCount - 1 ? prev + 1 : -1);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : itemCount - 1);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          const allItems = [...suggestions.map(s => s.text), ...recentSearches];
          handleSearch(allItems[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        searchInputRef.current?.blur();
        break;
    }
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
    onSearch("", filters);
    searchInputRef.current?.focus();
  };

  const getSuggestionIcon = (type: SearchSuggestion["type"]) => {
    switch (type) {
      case "product":
        return <Search className="w-4 h-4 text-gray-400" />;
      case "brand":
        return <Tag className="w-4 h-4 text-blue-500" />;
      case "category":
        return <Filter className="w-4 h-4 text-purple-500" />;
      default:
        return <Search className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="flex items-center card shadow-elevation-4 hover:shadow-glow-blue transition-all duration-500 focus-within:shadow-glow-blue focus-within:scale-[1.02]">
          <div className="flex items-center pl-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-elevation-2">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 px-6 py-6 text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none text-xl font-medium"
          />

          <div className="flex items-center pr-4 space-x-3">
            {query && (
              <button
                onClick={clearSearch}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 group"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:scale-110 transition-all duration-200" />
              </button>
            )}
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 rounded-2xl transition-all duration-300 group ${
                showFilters ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-400"
              }`}
            >
              <Filter className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>

            <button
              onClick={() => handleSearch()}
              className="btn-primary px-8 py-4 text-lg shadow-elevation-3 hover:shadow-glow-blue"
            >
              <span>Search</span>
              <Sparkles className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Enhanced Advanced Filters */}
        {showFilters && (
          <div className="absolute top-full left-0 right-0 mt-4 card shadow-elevation-4 p-8 z-50 animate-slide-up">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <Filter className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Advanced Filters</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Sort by
                </label>
                <select
                  value={filters.sortBy || "savings"}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    sortBy: e.target.value as SearchFilters["sortBy"]
                  }))}
                  className="input-field"
                >
                  <option value="savings">💰 Biggest Savings</option>
                  <option value="price">💵 Lowest Price</option>
                  <option value="popularity">⭐ Most Popular</option>
                  <option value="newest">✨ Newest Products</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Min Price (USD)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={filters.priceRange?.min || ""}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: {
                      ...prev.priceRange,
                      min: Number(e.target.value) || 0,
                      max: prev.priceRange?.max || 1000
                    }
                  }))}
                  placeholder="0"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Max Price (USD)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={filters.priceRange?.max || ""}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: {
                      min: prev.priceRange?.min || 0,
                      ...prev.priceRange,
                      max: Number(e.target.value) || 1000
                    }
                  }))}
                  placeholder="1000"
                  className="input-field"
                />
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Search Suggestions Dropdown */}
        {isOpen && (query.length >= 2 || recentSearches.length > 0) && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-4 card shadow-elevation-4 max-h-96 overflow-y-auto z-40 animate-slide-up"
          >
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-4">
                <div className="flex items-center space-x-3 px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>Suggestions</span>
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSearch(suggestion.text)}
                    className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group ${
                      selectedIndex === index ? "bg-gradient-to-r from-blue-50 to-purple-50" : ""
                    }`}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-elevation-1">
                      {getSuggestionIcon(suggestion.type)}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 font-semibold text-lg group-hover:text-blue-600 transition-colors duration-300">
                        {suggestion.text}
                      </div>
                      {suggestion.count && (
                        <div className="text-sm text-gray-500 font-medium">{suggestion.count} products</div>
                      )}
                    </div>
                    <div className="badge-primary text-xs px-3 py-1 capitalize group-hover:scale-105 transition-transform duration-300">
                      {suggestion.type}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="border-t border-gray-100 p-4">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center space-x-3 text-xs font-bold text-gray-500 uppercase tracking-wide">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                      <Clock className="w-4 h-4 text-gray-600" />
                    </div>
                    <span>Recent Searches</span>
                  </div>
                  <button
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem("koreabuy-recent-searches");
                    }}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-semibold px-3 py-1 rounded-lg hover:bg-gray-100"
                  >
                    Clear All
                  </button>
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={search}
                    onClick={() => handleSearch(search)}
                    className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl text-left hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group ${
                      selectedIndex === suggestions.length + index ? "bg-gradient-to-r from-gray-50 to-gray-100" : ""
                    }`}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-elevation-1">
                      <Clock className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-gray-700 font-semibold text-lg group-hover:text-gray-900 transition-colors duration-300 flex-1">
                      {search}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* No results */}
            {query.length >= 2 && suggestions.length === 0 && recentSearches.length === 0 && (
              <div className="p-12 text-center animate-fade-in">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-elevation-2">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-3">No suggestions found</h3>
                <p className="text-gray-500 leading-relaxed">
                  Try searching for Korean products, brands, or categories like "K-beauty" or "COSRX"
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
