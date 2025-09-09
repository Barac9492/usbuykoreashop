import { Sparkles, Grid3x3 } from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string | null;
  productCount: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  loading?: boolean;
}

export function CategoryFilter({ 
  categories, 
  selectedCategoryId, 
  onCategoryChange,
  loading = false 
}: CategoryFilterProps) {
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'cosmetics':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-64 mb-6"></div>
          <div className="flex flex-wrap gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-14 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shop by Category</h2>
        <p className="text-gray-600">Discover Korean products across different categories</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => onCategoryChange(null)}
          className={`group relative overflow-hidden flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
            selectedCategoryId === null
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl'
              : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 shadow-lg hover:shadow-xl'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <Grid3x3 className="w-5 h-5 relative z-10" />
          <span className="relative z-10">All Products</span>
          <span className={`relative z-10 text-xs px-3 py-1 rounded-full font-bold ${
            selectedCategoryId === null 
              ? 'bg-white/20 text-white' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
          </span>
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`group relative overflow-hidden flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              selectedCategoryId === category.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl'
                : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 shadow-lg hover:shadow-xl'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative z-10">
              {getCategoryIcon(category.name)}
            </div>
            <span className="relative z-10">{category.name}</span>
            <span className={`relative z-10 text-xs px-3 py-1 rounded-full font-bold ${
              selectedCategoryId === category.id 
                ? 'bg-white/20 text-white' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {category.productCount}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
