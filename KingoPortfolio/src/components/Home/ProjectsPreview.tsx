import React from 'react';
import { ArrowRight } from 'lucide-react';
import Card, { CardBody } from '../UI/Card';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';
import { ProjectType } from '../../types/project';

// Sample projects data
const projects: ProjectType[] = [
  {
    id: '1',
    title: 'AI Image Generator',
    description: 'A web application that generates images using AI models based on text prompts.',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Python', 'Flask', 'TensorFlow'],
    category: 'AI',
    githubUrl: 'https://github.com/username/project1',
    liveUrl: 'https://project1.example.com',
  },
  {
    id: '2',
    title: 'E-commerce Platform',
    description: 'Full-featured e-commerce platform with user authentication, product management, and checkout system.',
    image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Web Development',
    githubUrl: 'https://github.com/username/project2',
    liveUrl: 'https://project2.example.com',
  },
  {
    id: '3',
    title: 'Smart Home Dashboard',
    description: 'An IoT dashboard for monitoring and controlling smart home devices with real-time updates.',
    image: 'https://images.pexels.com/photos/3987020/pexels-photo-3987020.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Flask', 'MQTT', 'WebSockets'],
    category: 'IoT',
    githubUrl: 'https://github.com/username/project3',
    liveUrl: 'https://project3.example.com',
  },
];

const ProjectsPreview: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here's a selection of my recent work. These projects showcase my skills in web development and AI.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} hoverable className="h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                  </div>
                </div>
              </div>
              <CardBody className="flex flex-col flex-grow">
                <div className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Live Demo
                  </a>
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/projects">
            <Button variant="outline" className="group">
              View All Projects 
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;