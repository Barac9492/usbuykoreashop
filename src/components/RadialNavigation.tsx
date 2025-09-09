import { useState } from 'react';
import { Home, ShoppingBag, Users, Info, Mail, Sparkles } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
}

const navItems: NavItem[] = [
  {
    icon: <Home className="w-6 h-6" />,
    label: 'Home',
    href: '/',
    color: 'from-kbeauty-rose to-kbeauty-coral',
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    label: 'Shop',
    href: '/shop',
    color: 'from-hanbok-electric to-hanbok-royal',
  },
  {
    icon: <Users className="w-6 h-6" />,
    label: 'Shoppers',
    href: '/shoppers',
    color: 'from-accent-400 to-accent-600',
  },
  {
    icon: <Info className="w-6 h-6" />,
    label: 'About',
    href: '/about',
    color: 'from-primary-400 to-primary-600',
  },
  {
    icon: <Mail className="w-6 h-6" />,
    label: 'Contact',
    href: '/contact',
    color: 'from-secondary-400 to-secondary-600',
  },
];

export function RadialNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getItemPosition = (index: number, total: number) => {
    const angle = (index * 360) / total - 90; // Start from top
    const radius = 120; // Distance from center
    const radian = (angle * Math.PI) / 180;
    
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    };
  };

  return (
    <div className="fixed top-8 right-8 z-50">
      {/* Central Cherry Blossom Button */}
      <button
        onClick={toggleMenu}
        className={`relative w-16 h-16 rounded-full bg-gradient-to-br from-kbeauty-rose to-seoul-neon text-white shadow-cherry-glow hover:shadow-neon-pink transition-all duration-500 transform hover:scale-110 hover:rotate-12 ${
          isOpen ? 'rotate-180 scale-110' : ''
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        <Sparkles className={`w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
          isOpen ? 'rotate-90 scale-125' : ''
        }`} />
        
        {/* Pulsing rings when closed */}
        {!isOpen && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-kbeauty-rose/30 animate-ping" />
            <div className="absolute inset-0 rounded-full border border-seoul-neon/20 animate-pulse" />
          </>
        )}
      </button>

      {/* Radial Menu Items */}
      <div className={`absolute top-8 left-8 transition-all duration-700 ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
      }`}>
        {navItems.map((item, index) => {
          const position = getItemPosition(index, navItems.length);
          
          return (
            <a
              key={item.label}
              href={item.href}
              className={`radial-menu-item bg-gradient-to-br ${item.color} text-white shadow-seoul-depth hover:shadow-neon-pink group`}
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex flex-col items-center justify-center">
                {item.icon}
                <span className="text-xs font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-8 whitespace-nowrap">
                  {item.label}
                </span>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-glow-pulse" />
            </a>
          );
        })}
      </div>

      {/* Background overlay when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-seoul-night/20 backdrop-blur-sm -z-10 animate-fade-in"
          onClick={toggleMenu}
        />
      )}

      {/* Connecting lines/threads */}
      {isOpen && (
        <svg className="absolute top-8 left-8 w-64 h-64 pointer-events-none -z-10">
          {navItems.map((_, index) => {
            const position = getItemPosition(index, navItems.length);
            return (
              <line
                key={index}
                x1="0"
                y1="0"
                x2={position.x}
                y2={position.y}
                stroke="url(#glowingThread)"
                strokeWidth="1"
                className="animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              />
            );
          })}
          <defs>
            <linearGradient id="glowingThread" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 51, 153, 0.6)" />
              <stop offset="50%" stopColor="rgba(255, 215, 0, 0.4)" />
              <stop offset="100%" stopColor="rgba(0, 102, 255, 0.3)" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
}
