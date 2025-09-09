import { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Sparkles, ArrowRight, Package, Plane, Home } from 'lucide-react';
import { useSeoulAudio } from './AudioFeedback';

interface CartItem {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  price: number;
  koreanPrice: number;
  savings: number;
  quantity: number;
  shopper?: {
    name: string;
    rating: number;
  };
}

interface LanternBasketProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export function LanternBasket({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}: LanternBasketProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'journey' | 'payment'>('cart');
  const { playSound } = useSeoulAudio();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.koreanPrice * item.quantity), 0);
  const totalSavings = items.reduce((sum, item) => sum + (item.savings * item.quantity), 0);

  const journeySteps = [
    { id: 'pickup', label: 'Shopper Pickup', korean: '쇼퍼 픽업', icon: ShoppingCart, status: 'pending' },
    { id: 'packaging', label: 'Packaging in Seoul', korean: '서울 포장', icon: Package, status: 'pending' },
    { id: 'shipping', label: 'International Shipping', korean: '국제 배송', icon: Plane, status: 'pending' },
    { id: 'delivery', label: 'US Delivery', korean: '미국 배송', icon: Home, status: 'pending' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-seoul-night/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Lantern Basket Container */}
      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-gradient-to-br from-hanji-50 to-hanji-100 shadow-seoul-depth animate-slide-up">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-400/5 to-kbeauty-rose/5" />
        
        {/* Header */}
        <div className="relative z-10 p-6 border-b border-hanji-200/60">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lantern-glow">
                <ShoppingCart className="w-6 h-6 text-seoul-night" />
              </div>
              <div>
                <h2 className="text-2xl font-korean-serif font-bold korean-morph text-hanbok-gradient">
                  등불 바구니
                </h2>
                <p className="text-sm text-hanji-600">Lantern Basket</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-hanji-200/60 hover:bg-hanji-300/60 flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-5 h-5 text-hanji-700" />
            </button>
          </div>

          {/* Step Indicator */}
          <div className="flex space-x-2">
            {['cart', 'journey', 'payment'].map((step, index) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full transition-colors duration-300 ${
                  step === checkoutStep
                    ? 'bg-hanbok-electric'
                    : index < ['cart', 'journey', 'payment'].indexOf(checkoutStep)
                    ? 'bg-success-500'
                    : 'bg-hanji-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6">
          {checkoutStep === 'cart' && (
            <div className="space-y-6">
              {/* Items */}
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-hanji-200 to-hanji-300 flex items-center justify-center opacity-60">
                    <ShoppingCart className="w-12 h-12 text-hanji-500" />
                  </div>
                  <h3 className="text-xl font-korean-serif text-hanji-600 mb-2">
                    바구니가 비어있습니다
                  </h3>
                  <p className="text-hanji-500">Your lantern basket is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="card-floating-stall animate-scale-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex space-x-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-seoul-night line-clamp-2 mb-1">
                            {item.name}
                          </h4>
                          <p className="text-sm text-hanji-600 mb-2">{item.brand}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm">
                              <span className="font-bold text-success-600">
                                ${item.koreanPrice}
                              </span>
                              <span className="text-hanji-500 ml-2">
                                Save ${item.savings}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  onUpdateQuantity(item.id, Math.max(0, item.quantity - 1));
                                  playSound('filter-select');
                                }}
                                className="w-8 h-8 rounded-full bg-hanji-200 hover:bg-hanji-300 flex items-center justify-center transition-colors duration-200"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              
                              <span className="w-8 text-center font-bold">
                                {item.quantity}
                              </span>
                              
                              <button
                                onClick={() => {
                                  onUpdateQuantity(item.id, item.quantity + 1);
                                  playSound('filter-select');
                                }}
                                className="w-8 h-8 rounded-full bg-hanbok-electric hover:bg-hanbok-royal text-white flex items-center justify-center transition-colors duration-200"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => {
                            onRemoveItem(item.id);
                            playSound('filter-select');
                          }}
                          className="w-8 h-8 rounded-full bg-error-100 hover:bg-error-200 text-error-600 flex items-center justify-center transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {checkoutStep === 'journey' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-korean-serif font-bold korean-morph text-hanbok-gradient mb-2">
                  여행 지도
                </h3>
                <p className="text-hanji-600">Journey Map - Track your order's path from Seoul to you</p>
              </div>

              <div className="journey-map">
                <div className="space-y-6">
                  {journeySteps.map((step, index) => (
                    <div key={step.id} className="journey-step">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          step.status === 'completed'
                            ? 'bg-success-500 text-white'
                            : step.status === 'active'
                            ? 'bg-hanbok-electric text-white'
                            : 'bg-hanji-300 text-hanji-600'
                        }`}>
                          <step.icon className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-bold text-seoul-night">{step.label}</h4>
                          <p className="text-sm text-hanji-600 font-korean-sans">{step.korean}</p>
                          <p className="text-xs text-hanji-500 mt-1">
                            {index === 0 && "1-2 days"}
                            {index === 1 && "1 day"}
                            {index === 2 && "5-7 days"}
                            {index === 3 && "2-3 days"}
                          </p>
                        </div>
                      </div>
                      
                      {index < journeySteps.length - 1 && (
                        <div className="ml-6 mt-2 w-px h-8 bg-hanji-300" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="relative z-10 p-6 border-t border-hanji-200/60 bg-hanji-50/80 backdrop-blur-sm">
            {checkoutStep === 'cart' && (
              <>
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-hanji-600">Items ({totalItems})</span>
                    <span className="text-hanji-700">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-success-600 font-bold">Total Savings</span>
                    <span className="text-success-600 font-bold">${totalSavings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-hanji-200">
                    <span>Total</span>
                    <span className="text-hanbok-electric">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCheckoutStep('journey');
                    playSound('page-transition');
                  }}
                  className="w-full btn-cherry text-lg py-4"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Continue to Journey Map
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </>
            )}

            {checkoutStep === 'journey' && (
              <div className="flex space-x-3">
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="flex-1 btn-secondary"
                >
                  Back to Cart
                </button>
                <button
                  onClick={() => {
                    onCheckout();
                    playSound('add-to-cart');
                  }}
                  className="flex-1 btn-hanbok"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Complete Order
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
