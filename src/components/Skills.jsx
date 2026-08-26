import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../utils/cn';
import { Code2, Server, Palette, Zap, Database, Terminal } from 'lucide-react';

const skills = [
  { id: 1, name: 'Frontend', icon: <Palette />, desc: 'React, Tailwind, Framer Motion', colSpan: 'col-span-12 md:col-span-8' },
  { id: 2, name: 'Animations', icon: <Zap />, desc: 'GSAP, Three.js', colSpan: 'col-span-12 md:col-span-4' },
  { id: 3, name: 'Backend', icon: <Server />, desc: 'Node.js, Express', colSpan: 'col-span-12 md:col-span-4' },
  { id: 4, name: 'Database', icon: <Database />, desc: 'PostgreSQL, MongoDB', colSpan: 'col-span-12 md:col-span-4' },
  { id: 5, name: 'Tooling', icon: <Terminal />, desc: 'Git, Vite, Webpack', colSpan: 'col-span-12 md:col-span-4' },
  { id: 6, name: 'Architecture', icon: <Code2 />, desc: 'System Design, Microservices', colSpan: 'col-span-12' },
];

function BentoCard({ skill, mousePosition }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Default values for gradient when not hovered
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
        "relative rounded-2xl bg-white/5 border border-white/10 p-6 overflow-hidden",
        "backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1",
        skill.colSpan
      )}
    >
      {/* 1px glowing border following mouse cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="p-3 bg-white/10 w-fit rounded-lg mb-4 text-sky-400">
          {skill.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
          <p className="text-slate-400">{skill.desc}</p>
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
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">Skill Arsenal</h2>
        <div className="grid grid-cols-12 gap-6">
          {skills.map((skill) => (
            <BentoCard key={skill.id} skill={skill} mousePosition={mousePosition} />
          ))}
        </div>
      </div>
    </section>
  );
}
