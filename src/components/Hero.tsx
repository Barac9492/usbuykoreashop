import { Shield, DollarSign, Users, ArrowRight, AlertTriangle, Sparkles, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 min-h-screen flex items-center">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <img
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop&crop=center"
          alt="Korean shopping"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-purple-900/90"></div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-br from-emerald-400/25 to-teal-400/25 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Animated particles */}
        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-white/40 rounded-full animate-pulse-soft"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-300/60 rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-purple-300/50 rounded-full animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          {/* Enhanced Legal Notice Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="group flex items-center space-x-3 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-full px-8 py-4 border border-red-400/30 hover:border-red-400/50 transition-all duration-500 shadow-2xl">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-300 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-red-100 text-sm font-semibold tracking-wide">
                  Legally Binding Purchase Service
                </span>
                <AlertTriangle className="w-5 h-5 text-red-300 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Enhanced Main Heading */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Buy Korean Products
              <span className="block mt-2">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Direct from Korea
                </span>
              </span>
            </h1>
          </div>

          {/* Enhanced Subtitle */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 max-w-5xl mx-auto leading-relaxed font-light">
              Connect with verified Korean shoppers to purchase 
              <span className="font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> K-beauty</span>, 
              <span className="font-semibold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent"> fashion</span>, and 
              <span className="font-semibold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"> food products</span> at 
              local Korean prices. <strong className="text-white">Save up to 60%</strong> compared to US retail.
            </p>
          </div>

          {/* Enhanced Legal Warning */}
          <div className="animate-scale-in mb-16" style={{ animationDelay: '0.6s' }}>
            <div className="bg-gradient-to-r from-red-900/40 via-red-800/40 to-red-900/40 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 max-w-5xl mx-auto shadow-2xl">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-red-200 font-bold text-xl mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    LEGAL BINDING AGREEMENT
                  </h3>
                  <p className="text-red-100/90 leading-relaxed">
                    All purchase services are <strong>legally binding contracts</strong>. Failure to fulfill agreed purchases 
                    by shoppers or payment by buyers will result in <strong>legal action</strong> and permanent platform bans. 
                    By using this service, you agree to binding arbitration and legal enforcement.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 mb-20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <button className="group relative bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-emerald-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center space-x-3">
                <span>Start Shopping</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
            
            <button className="group bg-white/10 backdrop-blur-xl text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-500 border border-white/20 hover:border-white/40 shadow-2xl transform hover:scale-105">
              <div className="flex items-center space-x-3">
                <Star className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Become a Shopper</span>
              </div>
            </button>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-slide-up" style={{ animationDelay: '1s' }}>
            <div className="group bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-3xl p-8 border border-emerald-400/30 hover:border-emerald-400/60 transition-all duration-500 shadow-2xl transform hover:scale-105 hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                <DollarSign className="w-8 h-8 text-emerald-300" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:scale-105 transition-transform duration-300">
                Up to 60%
              </h3>
              <p className="text-white/80 leading-relaxed font-medium">Savings on K-beauty products</p>
            </div>

            <div className="group bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-8 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-500 shadow-2xl transform hover:scale-105 hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                <Users className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:scale-105 transition-transform duration-300">
                Verified
              </h3>
              <p className="text-white/80 leading-relaxed font-medium">Korean shoppers with ID verification</p>
            </div>

            <div className="group bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-8 border border-purple-400/30 hover:border-purple-400/60 transition-all duration-500 shadow-2xl transform hover:scale-105 hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                <Shield className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:scale-105 transition-transform duration-300">
                Escrow
              </h3>
              <p className="text-white/80 leading-relaxed font-medium">Protected payments until delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
