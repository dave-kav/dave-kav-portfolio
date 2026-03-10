export interface ExperienceItem {
  type: 'work';
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
  logo: string;
}

export interface EducationItem {
  type: 'education';
  id: number;
  school: string;
  degree: string;
  period: string;
  location: string;
  description: string;
  highlights?: string[];
  courses?: string[];
  logo?: string;
}

export type TimelineItem = ExperienceItem | EducationItem;

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  repo?: string;
  tech: string[];
  highlights?: string[];
  thumbnail?: string;
}

export interface BlogItem {
  id: number;
  title: string;
  description?: string;
  url?: string;
  source?: string;
  date?: string;
  link?: string;
}

export interface Skills {
  languages: string;
  data: string;
  tools: string;
  architecture: string;
  devops: string;
  leadership: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  skills: Skills;
}

// Wrapper types for backwards compatibility
export interface ExperienceData {
  experiences: ExperienceItem[];
}

export interface EducationData {
  education: EducationItem[];
}

export interface ProjectsData {
  projects: ProjectItem[];
}

export interface BlogsData {
  blogs: BlogItem[];
}

export interface ProfileData {
  profile: Profile;
}
