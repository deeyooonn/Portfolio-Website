import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: 'Albion Calculator', type: 'GAME TOOL', desc: 'A damage-and-economy calculator for Albion Online — parses item stats, computes build efficiency, and surfaces profit-optimal crafting paths in real time.', tags: ['REACT', 'TYPESCRIPT', 'REST'] },
  { id: 2, title: 'CheckXACT', type: 'VERIFICATION', desc: 'An automated verification harness that cross-checks transaction records against source-of-truth feeds, flagging discrepancies with a full audit trail.', tags: ['PYTHON', 'VERILOG', 'CLI'] },
  { id: 3, title: 'SweepDash', type: 'PRODUCTIVITY', desc: 'A keyboard-first task sweep dashboard with drag reordering, streak tracking, and a live activity heatmap built for flow-state focus.', tags: ['REACT', 'TAILWIND', 'MOTION'] },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
  })
};

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 py-24 px-6 md:px-12 lg:px-20">
      {/* Section Header */}
      <div className="max-w-5xl mx-auto mb-16">
        <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase mb-3">// 03 - BUILDS</p>
        <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">Selected <br /> Works</h2>
        <p className="text-slate-400 mt-4 max-w-xl font-light">
          A few systems I've shipped — each engineered to be fast, reliable, and genuinely useful.
        </p>
      </div>

      {/* Project Cards — vertical stack */}
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 md:p-12 backdrop-blur-md flex flex-col group hover:border-cyan-500/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_-15px_rgba(34,211,238,0.2)]">
              <div className="flex justify-between items-start mb-6 border-b border-slate-800/50 pb-6">
                <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">{project.tags.slice(0, 2).join(' / ')}</span>
                <span className="font-mono text-xs text-slate-600">0{project.id}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h3>
              <p className="text-slate-400 text-base leading-relaxed mb-8 font-light">{project.desc}</p>
              <div className="flex gap-4 items-center pt-2">
                <button className="bg-cyan-500 text-cyan-50 hover:bg-cyan-400 px-6 py-2 rounded-full font-mono text-sm tracking-wider transition-colors">
                  VIEW LIVE
                </button>
                <button className="border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 px-6 py-2 rounded-full font-mono text-sm tracking-wider transition-colors">
                  SOURCE
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
