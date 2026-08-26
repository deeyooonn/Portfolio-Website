import React from 'react';
import MagneticButton from './MagneticButton';
import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center bg-white/5 border border-white/10 p-12 md:p-20 rounded-3xl backdrop-blur-md">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Let's Build Together</h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          Currently open for new opportunities. Whether you have a question or just want to say hi, 
          I'll try my best to get back to you!
        </p>
        
        <div className="flex justify-center">
          <MagneticButton className="flex items-center gap-3 text-lg px-10 py-4" onClick={() => window.location.href = 'mailto:hello@example.com'}>
            <Mail size={20} /> Say Hello
          </MagneticButton>
        </div>
      </div>
      
      <footer className="mt-20 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Designed and built with React, Tailwind, and Framer Motion.</p>
      </footer>
    </section>
  );
}
