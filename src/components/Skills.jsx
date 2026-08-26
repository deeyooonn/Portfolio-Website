import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../utils/cn';
import { Code2, Server, Palette, Cpu, Terminal } from 'lucide-react';

const skills = [
  { id: 1, name: 'C++', icon: <Cpu />, desc: 'Engines, allocators, real-time loops.', label: 'CORE / SYSTEMS', colSpan: 'col-span-12 md:col-span-4' },
  { id: 2, name: 'Python', icon: <Terminal />, desc: 'Automation, pipelines, scripting.', label: 'TOOLING / DATA', colSpan: 'col-span-12 md:col-span-4' },
  { id: 3, name: 'React', icon: <Code2 />, desc: 'Component systems, motion, SSR.', label: 'FRONTEND', colSpan: 'col-span-12 md:col-span-4' },
  { id: 4, name: 'HTML / CSS', icon: <Palette />, desc: 'Tailwind, responsive, design tokens.', label: 'INTERFACE', colSpan: 'col-span-12 md:col-span-6' },
  { id: 5, name: 'Verilog', icon: <Server />, desc: 'RTL design, simulation, synthesis.', label: 'HARDWARE / HDL', colSpan: 'col-span-12 md:col-span-6' },
];

function BentoCard({ skill, mousePosition }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  let x = 0;
  let y = 0;

  if (cardRef.current && isHovered) {
    const rect = cardRef.current.getBoundingClientRect();
    x = mousePosition.x - rect.left;
    y = mousePosition.y - rect.top;
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-2xl bg-white/5 border border-white/5 p-6 overflow-hidden",
        "backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10 group",
        skill.colSpan
      )}
    >
      {/* 1px glowing cyan border following mouse cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.4), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-12">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
            {skill.icon}
          </div>
          <span className="font-mono text-xs text-slate-500">0{skill.id}</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{skill.name}</h3>
          <p className="font-mono text-xs text-cyan-400 mb-4 tracking-widest uppercase">{skill.label}</p>
          <p className="text-slate-400 font-light text-sm">{skill.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="skills" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase mb-2">// 02 - SKILL STACK</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Core Competencies</h2>
          <p className="text-slate-400 mt-4 max-w-xl">The languages and layers I build with, from silicon to screen.</p>
        </div>
        
        <div className="grid grid-cols-12 gap-4">
          {skills.map((skill) => (
            <BentoCard key={skill.id} skill={skill} mousePosition={mousePosition} />
          ))}
        </div>
      </div>
    </section>
  );
}
