import Constellation from '../projects/Constellation';

export default function InfoContent({ item, sectionId, children }) {
  return <>
    <Constellation id={item.id} className="detail-constellation" />
    <div className="case-study-copy">
      <div className="case-study-heading"><h3 id={`${sectionId}-${item.id}-title`}>{item.title}</h3></div>
      <p className="project-description">{item.description || item.summary}</p>
      {children}
      {item.tags?.length > 0 && <div className="detail-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
    </div>
  </>;
}
