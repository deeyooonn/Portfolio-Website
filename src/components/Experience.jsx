import React from 'react';
import { motion } from 'framer-motion';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 relative z-10">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase mb-3">
          // 04 - EXPERIENCE
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Experience</h2>

        <div className="bg-white/5 border border-white/5 rounded-2xl p-8 md:p-10 backdrop-blur-md">
          <p className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
            Internship
          </p>
          <h3 className="text-2xl font-bold text-white mb-3">PRIME</h3>
          <p className="text-slate-400 leading-relaxed max-w-2xl">
            Contributed to a platform that helps company employees book cars and services.
          </p>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="font-mono text-xs text-slate-400 tracking-widest uppercase mb-2">
              Work experience
            </h4>
            <p className="text-slate-400">No professional work experience yet.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
