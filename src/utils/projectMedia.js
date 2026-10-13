export function getScreenshots(project) {
  const entries = project.gallery?.length ? project.gallery : project.image ? [project.image] : [];
  return entries.map((entry, index) => ({
    path: typeof entry === 'string' ? entry : entry.path,
    alt: (typeof entry === 'object' && entry.alt) || `${project.title} screenshot ${index + 1}`,
    caption: typeof entry === 'object' ? entry.caption || '' : '',
  })).filter(entry => entry.path);
}
export function getThumbnail(project) { return project.image || getScreenshots(project)[0]?.path || null; }
