import {
  experienceData,
  educationData,
  projectsData,
  blogsData,
  profileData,
  type ExperienceItem,
  type EducationItem,
  type ProjectItem,
  type BlogItem,
  type ExperienceData,
  type EducationData,
  type ProjectsData,
  type BlogsData,
} from '@dave-kav/config';

const configMap: Record<string, unknown> = {
  experience: experienceData,
  education: educationData,
  projects: projectsData,
  blogs: blogsData,
  profile: profileData,
};

export function useConfig<T>(file: string): { data: T | null; loading: boolean; error: Error | null } {
  const data = configMap[file] as T | undefined;

  return {
    data: data ?? null,
    loading: false,
    error: data ? null : new Error(`Unknown config file: ${file}`),
  };
}

export type {
  ExperienceItem,
  EducationItem,
  ProjectItem,
  BlogItem,
  ExperienceData,
  EducationData,
  ProjectsData,
  BlogsData,
};
