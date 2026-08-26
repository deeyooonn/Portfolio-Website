import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: 'Albion Calculator', type: 'GAME TOOL', desc: 'A damage-and-economy calculator for Albion Online — parses item stats, computes build efficiency, and surfaces profit-optimal crafting paths in real time.', tags: ['REACT', 'TYPESCRIPT', 'REST'] },
  { id: 2, title: 'CheckXACT', type: 'VERIFICATION', desc: 'An automated verification harness that cross-checks transaction records against source-of-truth feeds, flagging discrepancies with a full audit trail.', tags: ['PYTHON', 'VERILOG', 'CLI'] },
  { id: 3, title: 'SweepDash', type: 'PRODUCTIVITY', desc: 'A keyboard-first task sweep dashboard with drag reordering, streak tracking, and a live activity heatmap built for flow-state focus.', tags: ['REACT', 'TAILWIND', 'MOTION'] },
];

function Flashcard({ project }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[320px] w-full cursor-pointer group"
      style={{ perspective: 1000 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-md flex flex-col justify-center items-center text-center group-hover:border-cyan-500/40 transition-colors shadow-[0_0_20px_-10px_rgba(34,211,238,0)] group-hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-4">{project.type}</span>
          <h3 className="text-3xl font-bold text-white">{project.title}</h3>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono border border-white/10 rounded px-2 py-1 text-slate-400 tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          <p className="font-mono text-[10px] text-slate-500 mt-8 uppercase tracking-widest animate-pulse">Click to flip ⤵</p>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 bg-slate-800/90 border border-cyan-500/50 rounded-2xl p-8 backdrop-blur-md flex flex-col justify-between shadow-[0_0_40px_-15px_rgba(34,211,238,0.3)]"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)' 
          }}
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <span className="font-mono text-xs text-cyan-400 tracking-widest">0{project.id}</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed font-light">{project.desc}</p>
          </div>
          
          <div className="flex gap-3 items-center">
            <button 
               className="bg-cyan-500 text-cyan-50 hover:bg-cyan-400 px-4 py-2 rounded-md font-mono text-xs tracking-wider transition-colors w-full"
               onClick={(e) => { e.stopPropagation(); window.open('#', '_blank'); }}
            >
              LIVE ↗
            </button>
            <button 
               className="border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 px-4 py-2 rounded-md font-mono text-xs tracking-wider transition-colors w-full"
               onClick={(e) => { e.stopPropagation(); window.open('#', '_blank'); }}
            >
              SOURCE
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 py-32 px-4 md:px-12 lg:px-20 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase mb-2">// 03 - BUILDS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Selected Works</h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light">
            A growing ecosystem of projects. Click any card to reveal its architecture and live links.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Flashcard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
