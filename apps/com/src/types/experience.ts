export interface Experience {
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

export interface Education {
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

export type TimelineItem = Experience | Education;

export interface ExperienceData {
  experiences: Experience[];
}

export interface EducationData {
  education: Education[];
}
