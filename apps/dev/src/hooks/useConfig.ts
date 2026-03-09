import { useState, useEffect } from 'react';

const CONFIG_API = process.env.REACT_APP_CONFIG_API || 'https://dave-kav-portfolio-config.davykav87.workers.dev';

const cache: Record<string, unknown> = {};

export function useConfig<T>(file: string): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(() => (cache[file] as T) || null);
  const [loading, setLoading] = useState(!cache[file]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (cache[file]) {
      setData(cache[file] as T);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${CONFIG_API}/api/${file}`);
        if (!response.ok) throw new Error(`Failed to fetch ${file}`);
        const json = await response.json();
        cache[file] = json;
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [file]);

  return { data, loading, error };
}

export interface ExperienceItem {
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
  id: number;
  school: string;
  degree: string;
  period: string;
  location: string;
  description: string;
  highlights?: string[];
}

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  repo?: string;
  tech: string[];
  highlights?: string[];
  thumbnail?: string;
}

export interface ExperienceData {
  experiences: ExperienceItem[];
}

export interface EducationData {
  education: EducationItem[];
}

export interface ProjectsData {
  projects: ProjectItem[];
}
