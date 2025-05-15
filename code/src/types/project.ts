export interface ProjectType {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  screenshots?: string[];
  technologies: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  challenges?: string;
  learning?: string;
}