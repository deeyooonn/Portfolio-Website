import CardCollection from './cards/CardCollection';
import InfoContent from './cards/InfoContent';
import { skillCards } from '../data/collections';

export default function Skills() {
  return <CardCollection sectionId="skills" title="Skills" items={skillCards} renderDetail={item =>
    <InfoContent item={item} sectionId="skills">
      <ul className="skill-items">{item.items.map(skill => <li key={skill.name}><span>{skill.name}</span>{skill.note && <p>{skill.note}</p>}</li>)}</ul>
    </InfoContent>
  } />;
}
