import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { skills } from '../data/skills';
import { useWindowManager } from './windows/WindowManagerContext';
export default function Skills() {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const refs = useRef([]);
  const { reducedMotion } = useWindowManager();
  const navigate = (e, index) => {
    const target = { ArrowDown: (index + 1) % skills.length, ArrowUp: (index - 1 + skills.length) % skills.length, Home: 0, End: skills.length - 1 }[e.key];
    if (target !== undefined) { e.preventDefault(); refs.current[target]?.focus(); }
  };
  return <div className="skills-list">{skills.map((group, index) => {
    const expanded = expandedIndex === index;
    return <section className="skill-group" key={group.group}>
      <h3><button ref={el => { refs.current[index] = el; }} id={`skills-heading-${index}`} className="skill-toggle" aria-expanded={expanded} aria-controls={expanded ? `skills-group-${index}` : undefined} onClick={() => setExpandedIndex(expanded ? -1 : index)} onKeyDown={e => navigate(e, index)}>
        <span>{group.group}</span><span className="skill-count">{group.items.length} items</span>{expanded ? <Minus size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
      </button></h3>
      <AnimatePresence initial={false}>{expanded && <motion.div id={`skills-group-${index}`} role="region" aria-labelledby={`skills-heading-${index}`} initial={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }} transition={{ duration: reducedMotion ? 0.12 : 0.2, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
        <ul className="skill-items">{group.items.map((item, i) => <li key={i}><span>{typeof item === 'string' ? item : item.name}</span>{typeof item !== 'string' && item.note && <p>{item.note}</p>}</li>)}</ul>
      </motion.div>}</AnimatePresence>
    </section>;
  })}</div>;
}
