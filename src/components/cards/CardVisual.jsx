import { Braces, PanelsTopLeft, Smartphone, GitBranch, BriefcaseBusiness, Mail, CodeXml, FolderCode } from 'lucide-react';
import { EMAIL } from '../../data/collections';

const icons = { languages: Braces, frontend: PanelsTopLeft, 'backend-mobile': Smartphone, tools: GitBranch, 'prime-internship': BriefcaseBusiness, 'work-experience': BriefcaseBusiness, email: Mail, github: CodeXml };

export default function CardVisual({ item }) {
  const Icon = icons[item.id] || FolderCode;
  const labels = item.items?.map(skill => skill.name);
  return <div className="card-visual" aria-hidden="true">
    <Icon size={30} strokeWidth={1.3} />
    {labels ? <div className="visual-skills">{labels.map(label => <span key={label}>{label}</span>)}</div>
      : <span className="visual-label">{item.id === 'email' ? EMAIL : item.id === 'github' ? 'github.com / deeyooonn' : item.id === 'work-experience' ? 'Ready for the next chapter' : item.title}</span>}
  </div>;
}
