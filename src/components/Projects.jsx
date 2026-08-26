import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: 'Nebula Engine', type: 'WEBGL / THREE.JS', desc: 'A custom 3D rendering engine built for the web, pushing the limits of browser performance.' },
  { id: 2, title: 'Quantum UI', type: 'REACT / FRAMER', desc: 'A component library focusing on complex micro-interactions and fluid motion design.' },
  { id: 3, title: 'Orbit Protocol', type: 'FULLSTACK / WEB3', desc: 'Decentralized platform with real-time data visualization and secure smart contract integration.' },
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
    <section ref={sectionRef} id="projects" className="relative h-screen flex items-center overflow-hidden z-10">
      <div className="absolute top-12 left-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white">Selected Works</h2>
        <p className="text-slate-400 mt-2">Scroll to explore</p>
      </div>
      
      <div ref={containerRef} className="flex h-[60vh] w-[300vw] ml-[10vw]">
        {projects.map((project, idx) => (
          <div 
            key={project.id} 
            className="project-card w-screen h-full flex items-center px-10 flex-shrink-0"
          >
            <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
              <span className="text-sky-400 font-mono text-sm tracking-wider">{project.type}</span>
              <h3 className="text-5xl font-bold text-white mt-4 mb-6">{project.title}</h3>
              <p className="text-xl text-slate-300 mb-8">{project.desc}</p>
              
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-colors">
                  View Live
                </button>
                <button className="px-6 py-2 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                  Source
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
