import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: 'Albion Calculator', type: 'GAME TOOL', desc: 'A damage-and-economy calculator for Albion Online — parses item stats, computes build efficiency, and surfaces profit-optimal crafting paths in real time.', tags: ['REACT', 'TYPESCRIPT', 'REST'] },
  { id: 2, title: 'CheckXACT', type: 'VERIFICATION', desc: 'An automated verification harness that cross-checks transaction records against source-of-truth feeds, flagging discrepancies with a full audit trail.', tags: ['PYTHON', 'VERILOG', 'CLI'] },
  { id: 3, title: 'SweepDash', type: 'PRODUCTIVITY', desc: 'A keyboard-first task sweep dashboard with drag reordering, streak tracking, and a live activity heatmap built for flow-state focus.', tags: ['REACT', 'TAILWIND', 'MOTION'] },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const leftBlockRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Calculate exactly how far to scroll the container left
      // scrollWidth = total width of all cards + gaps
      // viewport width - leftBlock width = visible area for the cards
      const getScrollAmount = () => {
        const containerWidth = containerRef.current.scrollWidth;
        const visibleWidth = window.innerWidth - leftBlockRef.current.offsetWidth;
        return -(containerWidth - visibleWidth + 100); // 100px extra padding at the end
      };

      const tween = gsap.to(containerRef.current, {
        x: getScrollAmount,
        ease: 'none'
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        animation: tween,
        scrub: 1,
        // The scroll distance is equal to the amount we're moving it left
        end: () => `+=${Math.abs(getScrollAmount())}`
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="projects" className="relative flex flex-col md:flex-row z-10 py-24 md:py-0 md:h-screen overflow-hidden">
      {/* Left Side: Fixed Title Block (Sticky in Flex, Pinned by GSAP on Desktop) */}
      <div 
        ref={leftBlockRef} 
        className="w-full md:w-[400px] lg:w-[500px] flex-shrink-0 flex flex-col justify-center px-6 md:px-12 lg:px-20 z-20 mb-12 md:mb-0 md:h-screen"
      >
        <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase mb-2">// 03 - BUILDS</p>
        <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">Selected <br/> Works</h2>
        <p className="text-slate-400 mt-6 max-w-sm font-light">
          Scroll to explore. A few systems I've shipped — each engineered to be fast, reliable, and genuinely useful.
        </p>
      </div>
      
      {/* Right Side: Horizontal Track */}
      <div className="flex-1 flex items-center md:h-screen w-full">
        <div 
          ref={containerRef} 
          className="flex flex-col md:flex-row gap-8 md:gap-12 px-6 md:px-0 md:pr-24 items-center w-full md:w-auto"
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card flex-shrink-0 w-full md:w-[600px] lg:w-[700px]"
            >
              <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 md:p-12 backdrop-blur-md flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_-15px_rgba(34,211,238,0.2)]">
                <div>
                  <div className="flex justify-between items-start mb-6 border-b border-slate-800/50 pb-6">
                    <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">{project.tags.slice(0, 2).join(' / ')}</span>
                    <span className="font-mono text-xs text-slate-600">0{project.id}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{project.title}</h3>
                  <p className="text-slate-400 text-base leading-relaxed mb-8 font-light">{project.desc}</p>
                </div>
                
                <div className="flex gap-4 items-center pt-6">
                  <button className="bg-cyan-500 text-cyan-50 hover:bg-cyan-400 px-6 py-2 rounded-full font-mono text-sm tracking-wider transition-colors">
                    VIEW LIVE
                  </button>
                  <button className="border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 px-6 py-2 rounded-full font-mono text-sm tracking-wider transition-colors">
                    SOURCE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
