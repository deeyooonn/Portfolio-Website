import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { Code2, Server, Palette, Cpu, Terminal } from 'lucide-react';

const skills = [
  {
    id: 1, name: 'C++', icon: <Cpu />, label: 'CORE / SYSTEMS',
    desc: 'Engines, allocators, real-time loops.',
    detail: 'I write low-level C++ for game engines, custom memory allocators, lock-free data structures, and real-time simulation loops. Performance is the goal — every byte counts.',
    colSpan: 'col-span-12 md:col-span-4',
  },
  {
    id: 2, name: 'Python', icon: <Terminal />, label: 'TOOLING / DATA',
    desc: 'Automation, pipelines, scripting.',
    detail: 'I use Python to build CLI tools, data pipelines, automation scripts, and verification harnesses. Fast to write, fast to iterate.',
    colSpan: 'col-span-12 md:col-span-4',
  },
  {
    id: 3, name: 'React', icon: <Code2 />, label: 'FRONTEND',
    desc: 'Component systems, motion, SSR.',
    detail: 'React is my primary UI layer. I build reusable component systems, integrate Framer Motion for polished UX, and optimize for both performance and accessibility.',
    colSpan: 'col-span-12 md:col-span-4',
  },
  {
    id: 4, name: 'HTML / CSS', icon: <Palette />, label: 'INTERFACE',
    desc: 'Tailwind, responsive, design tokens.',
    detail: 'Deep knowledge of semantic HTML, modern CSS (Grid, Cascade Layers, Container Queries), and Tailwind for rapid design-system implementation.',
    colSpan: 'col-span-12 md:col-span-6',
  },
  {
    id: 5, name: 'Verilog', icon: <Server />, label: 'HARDWARE / HDL',
    desc: 'RTL design, simulation, synthesis.',
    detail: 'I design digital circuits in Verilog — RTL modules, testbenches, and synthesis targeting FPGAs. Bridging software thinking with hardware reality.',
    colSpan: 'col-span-12 md:col-span-6',
  },
];

// ── Flip Card ─────────────────────────────────────────────────────────────────
function BentoCard({ skill, mousePosition, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  let x = 0, y = 0;
  if (cardRef.current && isHovered) {
    const rect = cardRef.current.getBoundingClientRect();
    x = mousePosition.x - rect.left;
    y = mousePosition.y - rect.top;
  }

  return (
    <motion.div
      custom={index}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({
          opacity: 1, y: 0,
          transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        }),
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={cn('relative cursor-pointer', skill.colSpan)}
      style={{ perspective: 1000 }}
      onClick={() => setIsFlipped((f) => !f)}
      whileTap={{ scale: 0.97 }}
    >
      {/* Card container — rotates on flip */}
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="relative w-full h-full"
      >
        {/* ── FRONT ── */}
        <div
          ref={cardRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            'relative rounded-2xl bg-white/5 border border-white/5 p-6 overflow-hidden min-h-[200px]',
            'backdrop-blur-sm transition-all duration-300 group',
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Cursor glow */}
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s',
              background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(34,211,238,0.35), transparent 40%)`,
            }}
          />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-10">
              <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                {skill.icon}
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-slate-500 block">0{skill.id}</span>
                <span className="font-mono text-[10px] text-cyan-500/50 mt-1 block">TAP TO FLIP</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{skill.name}</h3>
              <p className="font-mono text-xs text-cyan-400 mb-3 tracking-widest uppercase">{skill.label}</p>
              <p className="text-slate-400 font-light text-sm">{skill.desc}</p>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 p-6 overflow-hidden backdrop-blur-sm flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-cyan-500/20 text-cyan-300 rounded-lg">
              {skill.icon}
            </div>
            <span className="font-mono text-[10px] text-cyan-400/50">TAP TO FLIP BACK</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-cyan-300 mb-3">{skill.name}</h3>
            <p className="text-slate-300 font-light text-sm leading-relaxed">{skill.detail}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Skills() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="skills" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase mb-2">// 02 - SKILL STACK</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Core Competencies</h2>
          <p className="text-slate-400 mt-4 max-w-xl">
            The languages and layers I build with, from silicon to screen.{' '}
            <span className="text-cyan-400/70 font-mono text-sm">Click any card to learn more.</span>
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-4">
          {skills.map((skill, i) => (
            <BentoCard key={skill.id} skill={skill} mousePosition={mousePosition} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
