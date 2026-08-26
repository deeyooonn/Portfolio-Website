import React from 'react';
import MagneticButton from './MagneticButton';
import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center bg-white/5 border border-white/5 p-12 md:p-20 rounded-2xl backdrop-blur-md">
        <p className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-4">// 04 - CONTACT</p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Let's build the system.</h2>
        <p className="text-lg text-slate-400 mb-12 max-w-xl mx-auto font-light">
          Open to roles, freelance, and ambitious projects. Reach out and let's talk architecture.
        </p>
        
        <div className="flex justify-center gap-4">
          <MagneticButton className="flex items-center gap-2 text-sm font-mono tracking-wider px-6 py-3 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10" onClick={() => window.location.href = 'mailto:hello@example.com'}>
            <Mail size={16} /> SAY HELLO
          </MagneticButton>
        </div>
      </div>
      
      <footer className="mt-20 text-center text-slate-600 text-xs font-mono tracking-widest uppercase">
        <p>© {new Date().getFullYear()} DION DE GUZMAN — BUILT WITH REACT & MOTION</p>
      </footer>
    </section>
  );
}
