import React from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-sky-500/30">
      {/* Global Background Layer */}
      <div 
        className="fixed inset-0 -z-20 bg-[url('/image_3e963e.jpg')] bg-cover bg-center bg-no-repeat"
      />
      {/* Dark Overlay to ensure UI readability */}
      <div className="fixed inset-0 -z-10 bg-slate-950/80" />

      {/* Main Content */}
      <main className="relative z-10 w-full">
        {/* Navigation / Header - Optional minimal nav */}
        <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md bg-transparent border-b border-white/5">
          <div className="font-bold text-xl tracking-tighter font-mono">
            DION<span className="text-cyan-400">.DEV</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300 font-mono">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Skills</button>
            <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Projects</button>
            <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Contact</button>
          </div>
        </nav>

        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
