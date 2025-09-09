import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterBarProps {
  onFiltersChange: (activeFilters: string[]) => void;
  className?: string;
}

export function FilterBar({ onFiltersChange, className = '' }: FilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions: FilterOption[] = [
    { id: 'vegan', label: 'Vegan', count: 124 },
    { id: 'under-20', label: 'Under $20', count: 89 },
    { id: 'viral-tiktok', label: 'Viral on TikTok', count: 45 },
    { id: 'k-beauty', label: 'K-Beauty', count: 203 },
    { id: 'bestseller', label: 'Bestseller', count: 67 },
    { id: 'new-arrival', label: 'New Arrival', count: 34 },
    { id: 'editor-pick', label: "Editor's Pick", count: 28 },
    { id: 'community-fav', label: 'Community Favorite', count: 56 },
  ];

  const handleFilterToggle = (filterId: string) => {
    const newActiveFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(id => id !== filterId)
      : [...activeFilters, filterId];
    
    setActiveFilters(newActiveFilters);
    onFiltersChange(newActiveFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    onFiltersChange([]);
  };

  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="section-container py-4">
        <div className="flex items-center justify-between">
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 btn-ghost"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {activeFilters.length > 0 && (
              <span className="badge-primary text-xs">
                {activeFilters.length}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Clear Filters */}
          {activeFilters.length > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {activeFilters.map(filterId => {
              const option = filterOptions.find(opt => opt.id === filterId);
              return option ? (
                <button
                  key={filterId}
                  onClick={() => handleFilterToggle(filterId)}
                  className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  <span>{option.label}</span>
                  <X className="w-3 h-3" />
                </button>
              ) : null;
            })}
          </div>
        )}

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {filterOptions.map(option => (
                <label
                  key={option.id}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.includes(option.id)}
                    onChange={() => handleFilterToggle(option.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">
                      {option.label}
                    </div>
                    {option.count && (
                      <div className="text-xs text-gray-500">
                        {option.count} items
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
