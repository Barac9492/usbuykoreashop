import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  type: 'lantern' | 'sparkle' | 'cherry';
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

export function SeoulAmbientParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      
      // Generate hanji lantern particles
      for (let i = 0; i < 6; i++) {
        newParticles.push({
          id: `lantern-${i}`,
          type: 'lantern',
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 15,
          duration: 15 + Math.random() * 10,
          size: 0.8 + Math.random() * 0.4,
        });
      }

      // Generate cosmetic sparkle particles
      for (let i = 0; i < 12; i++) {
        newParticles.push({
          id: `sparkle-${i}`,
          type: 'sparkle',
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 12,
          duration: 12 + Math.random() * 8,
          size: 0.5 + Math.random() * 0.5,
        });
      }

      // Generate cherry blossom particles
      for (let i = 0; i < 8; i++) {
        newParticles.push({
          id: `cherry-${i}`,
          type: 'cherry',
          x: Math.random() * 100,
          y: -10,
          delay: Math.random() * 10,
          duration: 10 + Math.random() * 5,
          size: 0.3 + Math.random() * 0.4,
        });
      }

      setParticles(newParticles);
    };

    generateParticles();
    
    // Regenerate particles periodically
    const interval = setInterval(generateParticles, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="seoul-ambient-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute ${
            particle.type === 'lantern' 
              ? 'hanji-lantern-particle' 
              : particle.type === 'sparkle'
              ? 'cosmetic-sparkle-particle'
              : 'cherry-particle'
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            transform: `scale(${particle.size})`,
          }}
        />
      ))}
      
      {/* Cherry blossom mist overlay */}
      <div className="cherry-blossom-overlay" />
      
      {/* Additional floating elements for depth */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-kbeauty-rose/5 to-transparent rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-br from-hanbok-electric/5 to-transparent rounded-full blur-2xl animate-float-delayed" />
      <div className="absolute top-1/2 left-3/4 w-40 h-40 bg-gradient-to-br from-accent-400/5 to-transparent rounded-full blur-3xl animate-lantern-float" />
    </div>
  );
}
