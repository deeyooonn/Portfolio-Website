import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { Mail, Github, Linkedin } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-4 relative z-10">
      <motion.div
        className="max-w-4xl mx-auto text-center bg-white/5 border border-white/5 p-12 md:p-20 rounded-2xl backdrop-blur-md relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Subtle animated background gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34,211,238,0.04) 0%, transparent 70%)',
              'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(139,92,246,0.05) 0%, transparent 70%)',
              'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(34,211,238,0.04) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative z-10"
        >
          <motion.p variants={itemVariants} className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-4">
            // 04 - CONTACT
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Let's build the system.
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg text-slate-400 mb-12 max-w-xl mx-auto font-light">
            Open to roles, freelance, and ambitious projects. Reach out and let's talk architecture.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            <MagneticButton
              className="flex items-center gap-2 text-sm font-mono tracking-wider px-6 py-3 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10"
              onClick={() => window.location.href = 'mailto:diondeguzman@email.com'}
            >
              <Mail size={16} />
              SAY HELLO
            </MagneticButton>

            <motion.a
              href="https://github.com/deeyooonn"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 text-sm font-mono tracking-wider px-6 py-3 border border-white/10 hover:border-slate-400/50 hover:bg-white/5 text-slate-300 hover:text-white rounded-full transition-colors"
            >
              <Github size={16} />
              GITHUB
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      <footer className="mt-20 text-center text-slate-600 text-xs font-mono tracking-widest uppercase">
        <p>© {new Date().getFullYear()} DION DE GUZMAN — BUILT WITH REACT &amp; MOTION</p>
      </footer>
    </section>
  );
}
