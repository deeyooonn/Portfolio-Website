import { ArrowUpRight } from 'lucide-react';
import Constellation from './Constellation';
import ScreenshotGallery from './ScreenshotGallery';
import { getScreenshots } from '../../utils/projectMedia';
export default function ProjectDetail({ project, reducedMotion = false }) {
  const screenshots = getScreenshots(project);
  return <>
      {screenshots.length ? <ScreenshotGallery screenshots={screenshots} project={project} reducedMotion={reducedMotion} /> : <Constellation id={project.id} className="detail-constellation" />}
      {(project.repoUrl || project.liveUrl) && <div className="project-links">
        {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">Source Code<ArrowUpRight size={15} aria-hidden="true" /></a>}
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Site<ArrowUpRight size={15} aria-hidden="true" /></a>}
      </div>}
      <div className="case-study-copy"><div className="case-study-heading"><h3 id={`projects-${project.id}-title`}>{project.title}</h3>{project.year?.trim() && <span>{project.year}</span>}</div>
        {project.role?.trim() && <p className="project-role">{project.role}</p>}
        {project.description && <p className="project-description">{project.description}</p>}
        {project.highlights?.length > 0 && <section className="project-highlights"><h4>Key Highlights</h4><ul>{project.highlights.map((item, i) => <li key={i}>{item}</li>)}</ul></section>}
        {project.tags?.length > 0 && <div className="detail-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
      </div>
  </>;
}
