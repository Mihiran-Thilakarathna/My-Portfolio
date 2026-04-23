export type ProjectCategory = 'AI/ML' | 'Web Application' | 'Mobile Application';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  categories: ProjectCategory[];
  tags: string[];

  codeUrl?: string;
  liveUrl?: string;
}

export interface WorkExperience {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  current: boolean;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  status: 'ONGOING' | 'COMPLETED';
}

export interface Certification {
  id: number;
  title: string;
  provider: string;
  date: string;
  certificateUrl?: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  tagline: string[];
  bio: string;
  email: string;
  phone?: string;
  telegram?: string;
  messenger?: string;
  discord?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  kaggle?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  medium?: string;
  footerBio?: string;
  profileViews?: number;
  profileViewsUpdatedAt?: string;
}

export type Theme = 'light' | 'dark' | 'default';

export interface Competition {
  id: number;
  name: string;
  year: string;
  result: string;
  resultType: 'winner' | 'finalist' | 'participant';
  organizer: string;
  venue: string;
  team: string;
  university: string;
  description: string;
  tags: string[];
  photos: string[];
}
