import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CardDetail({ item, sectionId, title, onBack, onPrev, onNext, hasPrev, hasNext, reducedMotion, children }) {
  const backRef = useRef(null);
  useEffect(() => { backRef.current?.focus({ preventScroll: true }); }, []);
  return <motion.article className={`project-detail ${sectionId === 'projects' ? '' : 'collection-detail'}`} aria-labelledby={`${sectionId}-${item.id}-title`} layoutId={reducedMotion ? undefined : `card-${item.id}`} initial={false} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0.15 : 0.32, ease: [0.22, 1, 0.36, 1] }}>
    <div className="detail-navigation">
      <button ref={backRef} data-autofocus type="button" className="text-button" onClick={onBack} aria-label={`Back to ${title.toLowerCase()} cards`}><ArrowLeft size={16} aria-hidden="true" />Back to {title.toLowerCase()}</button>
      <div className="detail-browse">
        <button className="icon-button" type="button" onClick={onPrev} disabled={!hasPrev} aria-label="Previous card (Left arrow)"><ChevronLeft size={18} aria-hidden="true" /></button>
        <span>Browse</span>
        <button className="icon-button" type="button" onClick={onNext} disabled={!hasNext} aria-label="Next card (Right arrow)"><ChevronRight size={18} aria-hidden="true" /></button>
      </div>
    </div>
    {children}
  </motion.article>;
}
