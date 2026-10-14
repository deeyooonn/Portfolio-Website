import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Constellation from '../projects/Constellation';
import { getThumbnail } from '../../utils/projectMedia';
export default function CollectionCard({ item, index, slotRef, geometry, dealt, onDealt, onSelect, cardRef, onKeyDown, reducedMotion, canDrag, active, onActivate, position, onPosition }) {
  const inView = useInView(slotRef, { once: true, margin: '-16px' });
  const [finished, setFinished] = useState(dealt);
  const dragX = useMotionValue(position?.x || 0), dragY = useMotionValue(position?.y || 0);
  const didDrag = useRef(false);
  const started = dealt || geometry.above || inView;
  const thumbnail = getThumbnail(item);
  const tags = item.tags?.slice(0, 3) || [];
  const metadata = Boolean(item.year?.trim() || tags.length);
  const bounds = { left: 16 - geometry.left, right: window.innerWidth - geometry.right - 16, top: 16 - geometry.top, bottom: window.innerHeight - 104 - geometry.bottom };
  useEffect(() => {
    if (!canDrag) { dragX.set(0); dragY.set(0); return; }
    dragX.set(Math.max(bounds.left, Math.min(bounds.right, dragX.get())));
    // Cards below the fold are constrained when touched, after scrolling into view.
  }, [canDrag, bounds.left, bounds.right, dragX, dragY]);
  const initial = dealt ? false : reducedMotion ? { opacity: 0 } : geometry.above
    ? { x: geometry.dx, y: geometry.dy, scale: 0.76, rotate: ((index * 17) % 13) - 6, opacity: 0 }
    : { x: 0, y: 28, scale: 0.96, rotate: ((index * 7) % 9) - 4, opacity: 0 };
  const delay = dealt ? 0 : reducedMotion ? index * 0.035 : geometry.above ? index * 0.09 : geometry.column * 0.08;
  const [dragBounds, setDragBounds] = useState(bounds);
  return <motion.div className="project-drag" style={{ x: dragX, y: dragY, zIndex: active ? 30 : 10 - index }} drag={canDrag && finished} dragMomentum={false} dragElastic={0} dragConstraints={dragBounds}
    onPointerDown={() => { didDrag.current = false; onActivate(); const r = slotRef.current.getBoundingClientRect(); setDragBounds({ left: 16 - r.left, right: window.innerWidth - r.right - 16, top: 16 - r.top, bottom: window.innerHeight - 104 - r.bottom }); }}
    onDragStart={() => { didDrag.current = true; }} onDragEnd={() => onPosition({ x: dragX.get(), y: dragY.get() })}>
    <motion.button ref={cardRef} type="button" className="project-card" layoutId={reducedMotion ? undefined : `card-${item.id}`} aria-label={`View details for ${item.title}`} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') didDrag.current = false; onKeyDown(event); }}
      onClick={() => { if (!didDrag.current) onSelect(item.id); }}
      initial={initial} animate={started ? { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 } : undefined}
      transition={reducedMotion ? { duration: 0.16, delay } : { type: 'spring', stiffness: 180, damping: 28, mass: 0.85, delay, layout: { duration: 0.32, ease: [0.22, 1, 0.36, 1] }, opacity: { type: 'tween', duration: 0.12, delay } }}
      onAnimationComplete={() => { if (started && !finished) { setFinished(true); onDealt(); } }}
      whileHover={!reducedMotion && finished ? { y: -4, transition: { duration: 0.18 } } : undefined}
      style={{ willChange: finished ? 'auto' : 'transform, opacity' }}>
      <div className="project-card-art">{thumbnail ? <img src={thumbnail} alt="" width="1600" height="1000" loading="lazy" decoding="async" /> : <Constellation id={item.id} />}</div>
      <div className="project-card-copy"><h3>{item.title}</h3>{item.summary && <p>{item.summary}</p>}</div>
      {metadata && <div className="project-metadata">{item.year?.trim() && <span>{item.year}</span>}{tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
      <span className="project-view"><span>View</span><ChevronRight size={14} aria-hidden="true" /></span>
    </motion.button>
  </motion.div>;
}
