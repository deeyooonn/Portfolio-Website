import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
const MENU_ITEMS = [
  { id: 'projects', label: 'Projects', description: "Things I've built" },
  { id: 'skills', label: 'Skills', description: 'Languages and tools I use' },
  { id: 'experience', label: 'Experience', description: 'Internship and work history' },
  { id: 'contact', label: 'Contact', description: 'Email and links' },
];
export default function Landing({ reducedMotion = false, isWindowOpen = false, onOpen, menuRefs = {} }) {
  return <main className="landing" data-receded={isWindowOpen} inert={isWindowOpen} aria-hidden={isWindowOpen}>
    <motion.div className="landing-composition" initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
      <div className="landing-intro">
        <h1>Dionel<br /><span className="landing-surname">De Guzman</span></h1>
        <p className="landing-role">Full-stack developer</p>
        <p className="landing-bio">I build web and mobile apps with JavaScript, Node.js, React, and Flutter. I enjoy creating practical tools that are easy to use.</p>
      </div>
      <nav className="landing-menu" aria-label="Sections"><ul>
        {MENU_ITEMS.map(({ id, label, description }) => <li key={id}>
          <button ref={menuRefs[id]} id={`menu-${id}`} className="menu-row" aria-haspopup="dialog" aria-label={`Open ${label} window`} onClick={e => onOpen(id, e.currentTarget.getBoundingClientRect(), e.currentTarget)}>
            <span><span className="menu-label">{label}</span><span className="menu-description">{description}</span></span>
            <ChevronRight size={18} strokeWidth={1.4} className="menu-chevron" aria-hidden="true" />
          </button>
        </li>)}
      </ul></nav>
      <p className="landing-footer">© {new Date().getFullYear()} Dionel De Guzman</p>
    </motion.div>
  </main>;
}
