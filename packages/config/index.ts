import experience from './data/experience.json';
import education from './data/education.json';
import projects from './data/projects.json';
import blogs from './data/blogs.json';
import profile from './data/profile.json';

export const experienceData = experience;
export const educationData = education;
export const projectsData = projects;
export const blogsData = blogs;
export const profileData = profile;

export type ExperienceItem = {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
  logo: string;
};

export type EducationItem = {
  id: number;
  school: string;
  degree: string;
  period: string;
  location: string;
  description: string;
  highlights?: string[];
  logo?: string;
};

export type ProjectItem = {
  id: number;
  title: string;
  description: string;
  repo?: string;
  tech: string[];
  highlights?: string[];
  thumbnail?: string;
};

export type BlogItem = {
  id: number;
  title: string;
  url: string;
  source: string;
  date?: string;
};

export type ProfileData = {
  profile: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    website: string;
    linkedin: string;
    github: string;
    summary: string;
    skills: {
      languages: string;
      data: string;
      tools: string;
      architecture: string;
      devops: string;
      leadership: string;
    };
  };
};

export type ExperienceData = { experiences: ExperienceItem[] };
export type EducationData = { education: EducationItem[] };
export type ProjectsData = { projects: ProjectItem[] };
export type BlogsData = { blogs: BlogItem[] };
