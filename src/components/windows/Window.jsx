import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useDragControls, useIsPresent, useMotionValue } from 'framer-motion';
import { X } from 'lucide-react';
export default function Window({ id, title, variant = 'window', width = 640, depth = 0, isTop, originRect, reducedMotion, mobile, onClose, onBringToFront, children }) {
  const ref = useRef(null);
  const backgroundPress = useRef(null);
  const isPresent = useIsPresent();
  isTop = isTop && isPresent;
  const dragControls = useDragControls();
  const x = useMotionValue(0), y = useMotionValue(0);
  const [geometry, setGeometry] = useState(null);
  const [bounds, setBounds] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  const layer = variant === 'layer';
  useLayoutEffect(() => {
    const measure = () => {
      const el = ref.current; if (!el) return;
      const parent = el.parentElement.getBoundingClientRect();
      const left = parent.left + el.offsetLeft, top = parent.top + el.offsetTop;
      const right = Math.max(0, window.innerWidth - left - el.offsetWidth - 12);
      const bottom = Math.max(0, window.innerHeight - (mobile ? 0 : 88) - top - el.offsetHeight - 12);
      setBounds({ left: -left + 12, right, top: -top + 12, bottom });
      if (mobile || layer) { x.set(0); y.set(0); }
      else { x.set(Math.max(-left + 12, Math.min(right, x.get()))); y.set(Math.max(-top + 12, Math.min(bottom, y.get()))); }
      setGeometry({ originX: originRect ? originRect.left + originRect.width / 2 - left : el.offsetWidth / 2, originY: originRect ? originRect.top + originRect.height / 2 - top : el.offsetHeight / 2 });
    };
    measure(); window.addEventListener('resize', measure);
    const observer = new ResizeObserver(measure); observer.observe(ref.current);
    return () => { window.removeEventListener('resize', measure); observer.disconnect(); };
  }, [mobile, layer, originRect, x, y]);
  const depthScale = reducedMotion || mobile ? 1 : 1 - depth * 0.025;
  const close = () => onClose(id);
  const isProjectBackground = target => !target.closest('.project-card, .project-detail, [data-image-viewer]');
  const recordBackgroundPress = event => {
    backgroundPress.current = layer && isTop && event.button === 0 && isProjectBackground(event.target)
      ? { x: event.clientX, y: event.clientY } : null;
  };
  const closeFromBackground = event => {
    const start = backgroundPress.current;
    backgroundPress.current = null;
    // Empty grid wrappers count as background; card drags and scrolling do not.
    if (layer && isTop && start && !event.defaultPrevented && isProjectBackground(event.target)
      && Math.hypot(event.clientX - start.x, event.clientY - start.y) < 8) close();
  };
  return <motion.div className={`window-stage ${layer ? 'layer-stage' : ''}`} style={{ zIndex: 120 - depth, pointerEvents: 'none' }} initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.18 } }}>
    <motion.div ref={ref} className={layer ? 'project-layer' : 'window-container'}
      style={{ width: layer || mobile ? '100%' : `min(${width}px, 100%)`, x, y, pointerEvents: layer && !isTop ? 'none' : 'auto', visibility: geometry ? 'visible' : 'hidden', transformOrigin: geometry ? `${geometry.originX}px ${geometry.originY}px` : 'center' }}
      drag={!layer && !mobile && isTop} dragListener={false} dragControls={dragControls} dragMomentum={false} dragElastic={0} dragConstraints={bounds}
      onPointerDown={() => { if (!isTop) onBringToFront(id); }}
      initial={false} animate={{ opacity: geometry ? (isTop ? 1 : 0.5) : 0, scale: depthScale }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.86 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
      <motion.div className="window-surface" data-window={id} role="dialog" aria-modal={isTop} aria-labelledby={`window-title-${id}`} aria-owns={isTop && !mobile ? 'section-switcher' : undefined} aria-hidden={!isTop} inert={!isTop} initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.86 }} animate={{ opacity: geometry ? 1 : 0, scale: 1 }} transition={{ duration: reducedMotion ? 0.15 : 0.32, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: geometry ? `${geometry.originX}px ${geometry.originY}px` : 'center' }}>
        <header className="window-titlebar" onPointerDown={e => { if (!layer && !mobile && isTop && !e.target.closest('button')) dragControls.start(e); }} data-draggable={!layer && !mobile}>
          <h2 id={`window-title-${id}`}>{title}</h2>
          <button type="button" className="icon-button window-close" onClick={close} aria-label={layer ? `Close ${title}` : `Close ${title} window`}><X size={19} strokeWidth={1.5} /></button>
        </header>
        <div className={layer ? 'project-layer-body' : 'window-body'} onPointerDownCapture={recordBackgroundPress} onPointerCancel={() => { backgroundPress.current = null; }} onClick={closeFromBackground}>{children}</div>
      </motion.div>
      {isPresent && !isTop && !layer && !mobile && <div className="window-activate" aria-hidden="true" onPointerDown={() => onBringToFront(id)} />}
    </motion.div>
  </motion.div>;
}
