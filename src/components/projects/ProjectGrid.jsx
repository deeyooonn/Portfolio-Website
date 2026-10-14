import CardCollection from '../cards/CardCollection';
import ProjectDetail from './ProjectDetail';
import { projects } from '../../data/projects';

export default function ProjectGrid() {
  return <CardCollection sectionId="projects" title="Projects" items={projects} renderDetail={(project, reducedMotion) => <ProjectDetail project={project} reducedMotion={reducedMotion} />} />;
}
