import React, { useEffect, useRef } from 'react';
import MagneticButton from './MagneticButton';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      containerRef.current.style.setProperty('--mouse-x', `${x}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient mesh / glowing cursor tracking */}
      <div 
        ref={containerRef}
        className="absolute inset-0 z-0 opacity-40 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(56, 189, 248, 0.15) 0%, transparent 50%)`
        }}
      />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Creative Developer
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl font-light">
          Crafting AAA-level interactive experiences with React, GSAP, and Framer Motion. 
          Bridging the gap between software and art.
        </p>
        
        <MagneticButton className="flex items-center gap-2" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
          Explore My Work <ArrowRight size={18} />
        </MagneticButton>
      </div>
    </section>
  );
}
