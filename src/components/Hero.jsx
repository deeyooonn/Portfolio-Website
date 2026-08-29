import React from 'react';
import MagneticButton from './MagneticButton';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0, filter: 'blur(8px)' },
  visible: {
    y: 0, opacity: 1, filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 60, damping: 14 },
  },
};

// Typing cursor blink
const CursorBlink = () => (
  <motion.span
    className="inline-block w-[3px] h-[1em] bg-cyan-400 ml-1 align-middle"
    animate={{ opacity: [1, 0] }}
    transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
  />
);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-12"
      >
        {/* Status badge */}
        <motion.div
          variants={itemVariants}
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm"
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-cyan-400"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <span className="text-cyan-400 font-mono text-xs tracking-widest font-semibold uppercase">
            System Online
          </span>
          <CursorBlink />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight"
        >
          Building Core Engines{' '}
          <br className="hidden md:block" />
          <span className="text-cyan-400">&</span> Digital Systems
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl font-light"
        >
          Developer &amp; systems engineer crafting high-performance software — from low-level engines
          in C++ to polished full-stack interfaces. I build things that run fast and stay running.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
          <MagneticButton
            className="bg-cyan-500/20 text-cyan-50 hover:bg-cyan-500/30 border-cyan-500/50"
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          >
            VIEW PROJECTS
          </MagneticButton>
          <MagneticButton
            className="font-mono text-sm uppercase tracking-widest"
            onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}
          >
            SKILL STACK
          </MagneticButton>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={itemVariants}
          className="mt-20 flex flex-col items-center gap-2 text-slate-600"
        >
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-cyan-500/60 to-transparent"
            animate={{ scaleY: [0, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
