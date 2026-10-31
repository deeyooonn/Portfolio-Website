export default function InfoContent({ item, sectionId, children }) {
  return <>
    {item.image && <figure className={item.photoAlt ? 'experience-photo' : 'skill-preview'}><img src={item.image} alt={item.photoAlt || item.imageAlt || item.title} width={item.photoAlt ? 2048 : 1600} height={item.photoAlt ? 1152 : 1000} decoding="async" />{(item.photoCaption || item.imageCaption) && <figcaption>{item.photoCaption || item.imageCaption}</figcaption>}</figure>}
    <div className="case-study-copy">
      <div className="case-study-heading"><h3 id={`${sectionId}-${item.id}-title`}>{item.title}</h3></div>
      <p className="project-description">{item.description || item.summary}</p>
      {children}
      {item.tags?.length > 0 && <div className="detail-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
    </div>
  </>;
}
