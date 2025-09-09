import { useState } from "react";
import { Globe, Sparkles, UserPlus, LogIn, Menu, X, Star } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 shadow-elevation-4 backdrop-blur-xl border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      
      <div className="relative section-container">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Enhanced Logo Section */}
          <div className="flex items-center space-x-4 group">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl shadow-elevation-3 group-hover:shadow-glow-blue transition-all duration-500 group-hover:scale-110">
              <Globe className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-500" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-200 transition-all duration-300 cursor-pointer">
                KoreaBuy
              </h1>
              <p className="text-xs text-white/70 hidden sm:block font-medium tracking-wide">
                US Buyers ↔ Korean Shoppers
              </p>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <a 
              href="#cosmetics" 
              className="group flex items-center space-x-3 text-white/90 hover:text-white transition-all duration-300 px-6 py-3 rounded-2xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20 shadow-elevation-1 hover:shadow-elevation-2"
            >
              <Sparkles className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-semibold">K-Beauty</span>
            </a>
            <a 
              href="#how-it-works" 
              className="text-white/90 hover:text-white transition-all duration-300 px-6 py-3 rounded-2xl hover:bg-white/10 backdrop-blur-sm font-semibold border border-transparent hover:border-white/20 shadow-elevation-1 hover:shadow-elevation-2"
            >
              How It Works
            </a>
            <a 
              href="#shoppers" 
              className="text-white/90 hover:text-white transition-all duration-300 px-6 py-3 rounded-2xl hover:bg-white/10 backdrop-blur-sm font-semibold border border-transparent hover:border-white/20 shadow-elevation-1 hover:shadow-elevation-2"
            >
              Become a Shopper
            </a>
          </nav>

          {/* Enhanced Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="group flex items-center space-x-3 bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-2xl hover:bg-white/20 transition-all duration-300 font-semibold border border-white/20 hover:border-white/40 shadow-elevation-2 hover:shadow-elevation-3">
              <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Sign In</span>
            </button>
            <button className="group flex items-center space-x-3 bg-gradient-to-r from-white via-blue-50 to-white text-blue-700 px-6 py-3 rounded-2xl hover:from-blue-50 hover:via-white hover:to-blue-50 hover:text-blue-800 transition-all duration-300 font-bold shadow-elevation-3 hover:shadow-elevation-4 transform hover:scale-105 hover:-translate-y-0.5">
              <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Join Now</span>
            </button>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-gradient-to-r from-white via-blue-50 to-white text-blue-700 px-4 py-2.5 rounded-xl hover:from-blue-50 hover:via-white hover:to-blue-50 transition-all duration-300 font-bold shadow-elevation-2 hover:shadow-elevation-3">
              <UserPlus className="w-4 h-4" />
              <span>Join</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 bg-white/10 backdrop-blur-xl text-white rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 shadow-elevation-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 rotate-0 hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl shadow-elevation-4 border border-white/20 rounded-b-3xl overflow-hidden z-50 animate-slide-up">
            <nav className="px-6 py-8 space-y-2">
              <a 
                href="#cosmetics" 
                className="flex items-center space-x-4 text-gray-700 hover:text-blue-600 transition-all duration-300 px-6 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 font-semibold group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <span>K-Beauty Products</span>
              </a>
              <a 
                href="#how-it-works" 
                className="flex items-center space-x-4 text-gray-700 hover:text-blue-600 transition-all duration-300 px-6 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 font-semibold group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                  ❓
                </div>
                <span>How It Works</span>
              </a>
              <a 
                href="#shoppers" 
                className="flex items-center space-x-4 text-gray-700 hover:text-blue-600 transition-all duration-300 px-6 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 font-semibold group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                  🛒
                </div>
                <span>Become a Shopper</span>
              </a>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <button className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-4 rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-semibold mb-4 shadow-elevation-1 hover:shadow-elevation-2">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2 font-medium">New to KoreaBuy?</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Join thousands of users saving money on authentic Korean products
                  </p>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Enhanced Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
