import React, { useEffect, useRef } from 'react';
import MagneticButton from './MagneticButton';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 50 } }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient mesh / glowing cursor tracking */}
      <div 
        ref={containerRef}
        className="absolute inset-0 z-0 opacity-30 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 211, 238, 0.15) 0%, transparent 50%)`
        }}
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-12"
      >
        <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 font-mono text-xs tracking-widest font-semibold uppercase">System Online</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight">
          Building Core Engines <br className="hidden md:block"/> 
          <span className="text-cyan-400">&</span> Digital Systems
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl font-light">
          Developer & systems engineer crafting high-performance software — from low-level engines in C++ to polished full-stack interfaces. I build things that run fast and stay running.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
          <MagneticButton className="bg-cyan-500/20 text-cyan-50 hover:bg-cyan-500/30 border-cyan-500/50" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
            VIEW PROJECTS
          </MagneticButton>
          <MagneticButton className="font-mono text-sm uppercase tracking-widest" onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}>
            SKILL STACK
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
