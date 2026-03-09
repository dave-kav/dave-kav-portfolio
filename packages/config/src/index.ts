// Re-export all types
export type {
  ExperienceItem,
  EducationItem,
  ProjectItem,
  BlogItem,
  Profile,
  Skills,
  ExperienceData,
  EducationData,
  ProjectsData,
  BlogsData,
  ProfileData,
} from './types.js';

// Re-export data
export { experiences, education, profile, blogs, projects } from './data/index.js';

// Wrapper exports for backwards compatibility with useConfig hook
import { experiences } from './data/experience.js';
import { education } from './data/education.js';
import { profile } from './data/profile.js';
import { blogs } from './data/blogs.js';
import { projects } from './data/projects.js';

export const experienceData = { experiences };
export const educationData = { education };
export const profileData = { profile };
export const blogsData = { blogs };
export const projectsData = { projects };
