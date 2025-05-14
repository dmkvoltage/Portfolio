export interface Link {
  id: string;
  title: string;
  url: string;
  type: 'github' | 'project' | 'social';
  isActive: boolean;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  education: string;
  imageUrl: string;
  stats: {
    projects: number;
    clients: number;
    coffee: number;
    awards: number;
  };
  skills: {
    name: string;
    percentage: number;
  }[];
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  education_history: {
    degree: string;
    institution: string;
    period: string;
    description: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  screenshots: string[];
  technologies: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
  challenges: string;
  learning: string;
  createdAt: string;
}