import { projects } from './projects';
import { skills } from './skills';

const skillIds = ['languages', 'frontend', 'backend-mobile', 'tools'];
const skillSummaries = [
  'The languages I use for web applications, automation, and mobile development.',
  'Building responsive interfaces with reusable components and accessible layouts.',
  'Backend services and mobile applications across platforms.',
  'The tools I use to build, run, and collaborate on projects.',
];

export const skillCards = skills.map((group, index) => ({
  id: skillIds[index],
  title: group.group,
  summary: skillSummaries[index],
  tags: [`${group.items.length} skills`],
  items: group.items,
}));

export const experienceCards = [
  {
    id: 'prime-internship',
    title: 'PRIME',
    summary: "Contributed to PRIME's fleet and mobility platform as part of the development team.",
    tags: ['Internship', 'Development'],
    description: "Worked as part of PRIME's development team during my internship, contributing to a platform that lets employees book company cars and services.",
  },
  {
    id: 'work-experience',
    title: 'Work experience',
    summary: 'Starting my professional journey and looking for opportunities to contribute.',
    tags: ['Early career'],
    description: 'No professional work experience yet. Open to internships, freelance work, and collaborations.',
  },
];

export const EMAIL = 'diondeguzman0@gmail.com';
export const GITHUB_URL = 'https://github.com/deeyooonn';
export const contactCards = [
  {
    id: 'email',
    title: 'Email',
    summary: 'Get in touch about internships, freelance work, or collaborations.',
    tags: ['Get in touch'],
    description: 'Open to internships, freelance work, and collaborations. Feel free to reach out.',
  },
  {
    id: 'github',
    title: 'GitHub',
    summary: 'Explore my repositories and the code behind my projects.',
    tags: ['Code', 'Projects'],
    description: 'Find my projects and source code on GitHub.',
  },
];

export const collections = { projects, skills: skillCards, experience: experienceCards, contact: contactCards };
