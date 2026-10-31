export default function InfoContent({ item, sectionId, children }) {
  return <>
    {item.image && <figure className="experience-photo"><img src={item.image} alt={item.photoAlt || item.title} width="2048" height="1152" decoding="async" />{item.photoCaption && <figcaption>{item.photoCaption}</figcaption>}</figure>}
    <div className="case-study-copy">
      <div className="case-study-heading"><h3 id={`${sectionId}-${item.id}-title`}>{item.title}</h3></div>
      <p className="project-description">{item.description || item.summary}</p>
      {children}
      {item.tags?.length > 0 && <div className="detail-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
    </div>
  </>;
}
