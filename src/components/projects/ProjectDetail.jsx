import { ArrowUpRight } from 'lucide-react';
import ScreenshotGallery from './ScreenshotGallery';
import { getScreenshots } from '../../utils/projectMedia';
export default function ProjectDetail({ project, reducedMotion = false }) {
  const screenshots = getScreenshots(project);
  return <>
      {screenshots.length > 0 && <ScreenshotGallery screenshots={screenshots} project={project} reducedMotion={reducedMotion} />}
      {(project.repoUrl || project.liveUrl) && <div className="project-links">
        {project.liveUrl && <a className="primary-project-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Open project<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> in a new tab</span></a>}
        {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">Source code<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> in a new tab</span></a>}
      </div>}
      {project.demoNote && <p className="project-demo-note">{project.demoNote}</p>}
      <div className="case-study-copy"><div className="case-study-heading"><h3 id={`projects-${project.id}-title`}>{project.title}</h3>{project.year?.trim() && <span>{project.year}</span>}</div>
        {project.role?.trim() && <p className="project-role">{project.role}</p>}
        {project.description && <p className="project-description">{project.description}</p>}
        {project.highlights?.length > 0 && <section className="project-highlights"><h4>Key Highlights</h4><ul>{project.highlights.map((item, i) => <li key={i}>{item}</li>)}</ul></section>}
        {project.tags?.length > 0 && <div className="detail-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
      </div>
  </>;
}
