export interface Experience {
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

export interface ExperienceData {
  experiences: Experience[];
}
