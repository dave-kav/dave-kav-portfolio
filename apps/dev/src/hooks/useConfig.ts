import {
  experienceData,
  educationData,
  projectsData,
  blogsData,
  profileData,
} from '@dave-kav/config';

import type {
  ExperienceItem,
  EducationItem,
  ProjectItem,
  BlogItem,
  ExperienceData,
  EducationData,
  ProjectsData,
  BlogsData,
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
