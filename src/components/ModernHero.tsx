import { ArrowRight, Shield, Users, Zap } from 'lucide-react';

export function ModernHero() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            <span>Verified Korean Shoppers</span>
          </div>

          {/* Main Heading */}
          <h1 className="section-title mb-6">
            Buy Korean Products
            <span className="block text-gradient">Direct from Korea</span>
          </h1>

          {/* Subtitle */}
          <p className="section-subtitle mb-12">
            Connect with verified Korean shoppers to purchase K-beauty, fashion, and food products 
            at local prices. Save up to <span className="font-semibold text-emerald-600">60%</span> compared to US retail.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="btn-primary flex items-center justify-center">
              Start Shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="btn-secondary">
              Become a Shopper
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-emerald-600 font-bold text-lg">60%</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Max Savings</h3>
              <p className="text-sm text-gray-600">On Korean products</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Verified</h3>
              <p className="text-sm text-gray-600">Korean shoppers</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Fast</h3>
              <p className="text-sm text-gray-600">7-14 day shipping</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
