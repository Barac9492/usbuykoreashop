import { ArrowRight } from 'lucide-react';

export function ModernHero() {
  return (
    <section className="relative bg-white py-24 md:py-36">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="section-title mb-6">
            Buy Korean products
            <span className="block">direct from Korea</span>
          </h1>
          <p className="section-subtitle mb-12">
            Authentic items at local prices. Connected by verified Korean shoppers. Simple, secure, and fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center justify-center">
              Start shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="btn-secondary">Become a shopper</button>
          </div>
        </div>
      </div>
    </section>
  );
}
