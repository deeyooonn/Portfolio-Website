import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Constellation from './Constellation';
import ScreenshotGallery from './ScreenshotGallery';
import { getScreenshots } from '../../utils/projectMedia';
export default function ProjectDetail({ project, onBack, onPrev, onNext, hasPrev, hasNext, reducedMotion = false }) {
  const backRef = useRef(null);
  const screenshots = getScreenshots(project);
  useEffect(() => { backRef.current?.focus({ preventScroll: true }); }, []);
  return <motion.article className="project-detail" layoutId={reducedMotion ? undefined : `project-${project.id}`} initial={false} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0.15 : 0.32, ease: [0.22, 1, 0.36, 1] }}>
    <div className="detail-navigation">
      <button ref={backRef} data-autofocus type="button" className="text-button" onClick={onBack} aria-label="Back to projects grid"><ArrowLeft size={16} aria-hidden="true" />Back to projects</button>
      <div className="detail-browse"><button className="icon-button" type="button" onClick={onPrev} disabled={!hasPrev} aria-label="Previous project (Left arrow)"><ChevronLeft size={18} /></button><span>Browse</span><button className="icon-button" type="button" onClick={onNext} disabled={!hasNext} aria-label="Next project (Right arrow)"><ChevronRight size={18} /></button></div>
    </div>
    <AnimatePresence mode="wait" initial={false}><motion.div key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.14 }}>
      {screenshots.length ? <ScreenshotGallery screenshots={screenshots} project={project} reducedMotion={reducedMotion} /> : <Constellation id={project.id} className="detail-constellation" />}
      {(project.repoUrl || project.liveUrl) && <div className="project-links">
        {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">Source Code<ArrowUpRight size={15} aria-hidden="true" /></a>}
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Site<ArrowUpRight size={15} aria-hidden="true" /></a>}
      </div>}
      <div className="case-study-copy"><div className="case-study-heading"><h3>{project.title}</h3>{project.year?.trim() && <span>{project.year}</span>}</div>
        {project.role?.trim() && <p className="project-role">{project.role}</p>}
        {project.description && <p className="project-description">{project.description}</p>}
        {project.highlights?.length > 0 && <section className="project-highlights"><h4>Key Highlights</h4><ul>{project.highlights.map((item, i) => <li key={i}>{item}</li>)}</ul></section>}
        {project.tags?.length > 0 && <div className="detail-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
      </div>
    </motion.div></AnimatePresence>
  </motion.article>;
}
