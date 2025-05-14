import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Card, { CardBody } from '../UI/Card';
import { Link } from 'react-router-dom';
import { ProjectType } from '../../types/project';

// Sample projects data - in a real app, this would come from an API or database
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
  {
    id: '4',
    title: 'Student Management System',
    description: 'A comprehensive system for schools to manage students, courses, grades, and attendance.',
    image: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Flask', 'PostgreSQL', 'Redux'],
    category: 'Web Development',
    githubUrl: 'https://github.com/username/project4',
    liveUrl: 'https://project4.example.com',
  },
  {
    id: '5',
    title: 'Natural Language Processor',
    description: 'A tool that analyses and processes natural language texts for sentiment and key information extraction.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Python', 'NLTK', 'Flask', 'React'],
    category: 'AI',
    githubUrl: 'https://github.com/username/project5',
    liveUrl: 'https://project5.example.com',
  },
  {
    id: '6',
    title: 'Weather Forecast App',
    description: 'Real-time weather forecast application with interactive maps and alerts.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'OpenWeatherAPI', 'Charts.js', 'Mapbox'],
    category: 'Web Development',
    githubUrl: 'https://github.com/username/project6',
    liveUrl: 'https://project6.example.com',
  },
];

const ProjectsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Get unique categories
  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
  
  // Filter projects based on search and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No projects found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id} className="block h-full">
              <Card hoverable className="h-full flex flex-col">
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
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live Demo
                    </a>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;