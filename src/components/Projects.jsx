import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: 'Albion Calculator', type: 'GAME TOOL', desc: 'A damage-and-economy calculator for Albion Online — parses item stats, computes build efficiency, and surfaces profit-optimal crafting paths in real time.', tags: ['REACT', 'TYPESCRIPT', 'REST'] },
  { id: 2, title: 'CheckXACT', type: 'VERIFICATION', desc: 'An automated verification harness that cross-checks transaction records against source-of-truth feeds, flagging discrepancies with a full audit trail.', tags: ['PYTHON', 'VERILOG', 'CLI'] },
  { id: 3, title: 'SweepDash', type: 'PRODUCTIVITY', desc: 'A keyboard-first task sweep dashboard with drag reordering, streak tracking, and a live activity heatmap built for flow-state focus.', tags: ['REACT', 'TAILWIND', 'MOTION'] },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');
      
      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          end: () => "+=" + containerRef.current.offsetWidth
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative h-screen flex flex-col justify-center overflow-hidden z-10 py-24">
      <div className="max-w-5xl mx-auto w-full px-4 absolute top-24 left-1/2 -translate-x-1/2 z-20">
        <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase mb-2">// 03 - BUILDS</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">Selected Projects</h2>
        <p className="text-slate-400 mt-4 max-w-xl">A few systems I've shipped — each engineered to be fast, reliable, and genuinely useful.</p>
      </div>
      
      <div ref={containerRef} className="flex h-[50vh] w-[300vw] ml-[max(0px,calc((100vw-64rem)/2))] mt-32">
        {projects.map((project, idx) => (
          <div 
            key={project.id} 
            className="project-card w-screen h-full flex items-center px-4 md:px-10 flex-shrink-0 max-w-4xl"
          >
            <div className="w-full h-full bg-white/5 border border-white/10 rounded-xl p-8 md:p-10 backdrop-blur-md flex flex-col justify-between group hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-15px_rgba(34,211,238,0.3)]">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">{project.type}</span>
                  <span className="font-mono text-xs text-slate-500">0{project.id}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-cyan-50 transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono border border-white/10 rounded px-2 py-1 text-slate-300 tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-6 items-center pt-6 border-t border-white/5">
                <button className="text-white font-mono text-sm tracking-wider hover:text-cyan-400 transition-colors flex items-center gap-2">
                  LIVE ↗
                </button>
                <button className="text-slate-400 font-mono text-sm tracking-wider hover:text-white transition-colors flex items-center gap-2">
                  SOURCE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
