import { ExternalLink, TrendingDown, Star } from 'lucide-react';

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

interface ProductGridProps {
  products: ProductComparison[];
  loading?: boolean;
}

export function ProductGrid({ products, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="card p-6">
              <div className="w-full h-48 bg-gray-200 rounded-lg shimmer mb-4" />
              <div className="h-4 bg-gray-200 rounded shimmer mb-2" />
              <div className="h-4 bg-gray-200 rounded shimmer w-3/4 mb-4" />
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded shimmer w-20" />
                <div className="h-6 bg-gray-200 rounded shimmer w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="section-container py-24 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.product.id} className="card-interactive p-6">
            {/* Product Image */}
            <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
              {product.product.imageUrl ? (
                <img 
                  src={product.product.imageUrl} 
                  alt={product.product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Star className="w-12 h-12 text-gray-300" />
                </div>
              )}
            </div>

            {/* Category Badge */}
            <div className="badge-primary mb-3">
              {product.product.category.name}
            </div>

            {/* Product Info */}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              {product.product.name}
            </h3>
            
            {product.product.brand && (
              <p className="text-sm text-gray-600 mb-4">{product.product.brand}</p>
            )}

            {/* Price Comparison */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">US Price:</span>
                <span className="font-medium text-gray-900">
                  ${product.usPrice.price.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Korea Price:</span>
                <span className="font-medium text-gray-900">
                  ${product.comparison.koreanPriceInUSD.toFixed(2)}
                </span>
              </div>

              {product.comparison.savings > 0 && (
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <TrendingDown className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-600">
                      You save:
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-emerald-600">
                      ${product.comparison.savings.toFixed(2)}
                    </div>
                    <div className="text-xs text-emerald-600">
                      ({product.comparison.savingsPercentage.toFixed(0)}% off)
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="btn-primary flex-1 text-sm py-2">
                Request Purchase
              </button>
              <a 
                href={product.koreaPrice.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost p-2"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
