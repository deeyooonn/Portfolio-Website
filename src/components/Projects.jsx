import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'SweepDash',
    type: 'PRODUCTIVITY',
    desc: 'A keyboard-first task sweep dashboard with drag reordering, streak tracking, and a live activity heatmap built for flow-state focus.',
    tags: ['REACT', 'TAILWIND', 'MOTION'],
    liveUrl: 'https://just-ctrl-v-zst2.vercel.app/',
    sourceUrl: null,
  },
  {
    id: 2,
    title: 'Albion Calculator',
    type: 'GAME TOOL',
    desc: 'A damage-and-economy calculator for Albion Online — parses item stats, computes build efficiency, and surfaces profit-optimal crafting paths in real time.',
    tags: ['REACT', 'TYPESCRIPT', 'REST'],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    id: 3,
    title: 'CheckXACT',
    type: 'VERIFICATION',
    desc: 'An automated verification harness that cross-checks transaction records against source-of-truth feeds, flagging discrepancies with a full audit trail.',
    tags: ['PYTHON', 'VERILOG', 'CLI'],
    liveUrl: null,
    sourceUrl: null,
  },
];

// ── Project Modal ─────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[9000] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            className="fixed z-[9001] inset-0 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } }}
            exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }}
          >
            <div className="relative w-full max-w-xl bg-[#080f1f] border border-cyan-500/20 rounded-2xl p-8 shadow-[0_0_60px_-10px_rgba(34,211,238,0.2)]">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div className="flex items-start justify-between mb-6 border-b border-slate-800/60 pb-6">
                <div>
                  <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">{project.tags.join(' · ')}</span>
                  <h3 className="text-3xl font-bold text-white mt-1">{project.title}</h3>
                </div>
                <span className="font-mono text-xs text-slate-600 mt-1">0{project.id}</span>
              </div>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed mb-8 font-light">{project.desc}</p>

              {/* CTA buttons */}
              <div className="flex gap-3 flex-wrap">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-sm px-6 py-3 rounded-full transition-colors"
                  >
                    <ExternalLink size={15} />
                    OPEN LIVE SITE
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 bg-slate-800 text-slate-500 font-mono text-sm px-6 py-3 rounded-full cursor-not-allowed">
                    LIVE — COMING SOON
                  </span>
                )}
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-slate-700 hover:border-slate-400 text-slate-300 hover:text-white font-mono text-sm px-6 py-3 rounded-full transition-colors"
                  >
                    <Github size={15} />
                    SOURCE
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Section animation helpers ─────────────────────────────────────────────────
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="relative z-10 py-24 px-6 md:px-12 lg:px-20">
      {/* Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      {/* Section Header */}
      <motion.div
        className="max-w-5xl mx-auto mb-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase mb-3">// 03 - BUILDS</p>
        <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">Selected <br /> Works</h2>
        <p className="text-slate-400 mt-4 max-w-xl font-light">
          A few systems I've shipped — each engineered to be fast, reliable, and genuinely useful.
          <span className="text-cyan-400/70"> Click any card to explore.</span>
        </p>
      </motion.div>

      {/* Project Cards */}
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(project)}
            className="cursor-pointer"
          >
            <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 md:p-12 backdrop-blur-md flex flex-col group hover:border-cyan-500/40 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(34,211,238,0.25)]">
              <div className="flex justify-between items-start mb-6 border-b border-slate-800/50 pb-6">
                <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">{project.tags.slice(0, 2).join(' / ')}</span>
                <span className="font-mono text-xs text-slate-600">0{project.id}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h3>
              <p className="text-slate-400 text-base leading-relaxed mb-8 font-light">{project.desc}</p>
              <div className="flex gap-4 items-center pt-2">
                {/* VIEW LIVE — only show if url exists */}
                {project.liveUrl ? (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileTap={{ scale: 0.94 }}
                    className="inline-flex items-center gap-2 bg-cyan-500 text-slate-950 hover:bg-cyan-400 px-6 py-2 rounded-full font-mono font-bold text-sm tracking-wider transition-colors"
                  >
                    <ExternalLink size={13} />
                    VIEW LIVE
                  </motion.a>
                ) : (
                  <span className="inline-flex items-center gap-2 bg-slate-800/80 text-slate-500 px-6 py-2 rounded-full font-mono text-sm tracking-wider cursor-not-allowed">
                    COMING SOON
                  </span>
                )}
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={(e) => { e.stopPropagation(); setSelected(project); }}
                  className="border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/50 px-6 py-2 rounded-full font-mono text-sm tracking-wider transition-colors"
                >
                  DETAILS
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
