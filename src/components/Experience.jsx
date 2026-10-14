import CardCollection from './cards/CardCollection';
import InfoContent from './cards/InfoContent';
import { experienceCards } from '../data/collections';

export default function Experience() {
  return <CardCollection sectionId="experience" title="Experience" items={experienceCards} renderDetail={item => <InfoContent item={item} sectionId="experience" />} />;
}
