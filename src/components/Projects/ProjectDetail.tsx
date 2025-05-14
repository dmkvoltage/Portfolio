import React from 'react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../UI/Button';
import { ProjectType } from '../../types/project';

// Sample projects data - in a real app, this would come from an API or database
const projects: ProjectType[] = [
  {
    id: '1',
    title: 'AI Image Generator',
    description: 'A web application that generates images using AI models based on text prompts.',
    fullDescription: `
      This AI Image Generator is a cutting-edge web application that utilizes state-of-the-art machine learning models to convert text descriptions into visual imagery. Built with a Flask backend and React frontend, this application demonstrates the power of AI in creative contexts.
      
      Key features include:
      - Text-to-image generation using advanced AI models
      - User account system with saved image history
      - Ability to fine-tune generation parameters
      - Image editing and enhancement tools
      - Social sharing capabilities
      
      The backend uses Python with TensorFlow to handle the AI model processing, while the frontend is built with React for a responsive and intuitive user experience.
    `,
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
    screenshots: [
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/262488/pexels-photo-262488.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/11035363/pexels-photo-11035363.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    technologies: ['React', 'Python', 'Flask', 'TensorFlow'],
    category: 'AI',
    githubUrl: 'https://github.com/username/project1',
    liveUrl: 'https://project1.example.com',
    challenges: 'Integrating the AI models with the web interface was particularly challenging, as was optimizing the application for performance to handle near real-time image generation.',
    learning: 'This project deepened my understanding of machine learning models and how they can be effectively deployed in web applications.',
  },
  {
    id: '2',
    title: 'E-commerce Platform',
    description: 'Full-featured e-commerce platform with user authentication, product management, and checkout system.',
    fullDescription: `
      This comprehensive e-commerce platform provides a complete solution for online retail. Built with React on the frontend and Node.js on the backend, with MongoDB for data storage, it offers a smooth shopping experience for customers and powerful management tools for administrators.
      
      Key features include:
      - User authentication and profile management
      - Product browsing with category filters and search
      - Shopping cart and wishlist functionality
      - Secure checkout with Stripe integration
      - Order tracking and history
      - Admin dashboard for product and order management
      - Analytics and reporting tools
      
      The application follows modern best practices for security, performance, and user experience, making it suitable for real-world e-commerce operations.
    `,
    image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800',
    screenshots: [
      'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Web Development',
    githubUrl: 'https://github.com/username/project2',
    liveUrl: 'https://project2.example.com',
    challenges: 'Implementing secure payment processing and ensuring a smooth checkout flow required careful consideration of UX design and security best practices.',
    learning: 'Through this project, I gained valuable experience in handling e-commerce specific challenges like shopping cart management, payment processing, and inventory tracking.',
  },
  // Other projects would be defined here
];

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Project Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/projects">
          <Button variant="primary">Back to Projects</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-16">
      {/* Project Hero */}
      <div className="w-full h-[40vh] min-h-[300px] relative">
        <div className="absolute inset-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <Link 
          to="/projects" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mt-8"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>Overview</h2>
              <p>{project.description}</p>
              
              {project.fullDescription && (
                <div className="whitespace-pre-line">
                  {project.fullDescription}
                </div>
              )}
              
              {project.challenges && (
                <>
                  <h2>Challenges</h2>
                  <p>{project.challenges}</p>
                </>
              )}
              
              {project.learning && (
                <>
                  <h2>What I Learned</h2>
                  <p>{project.learning}</p>
                </>
              )}
            </div>
            
            {project.screenshots && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Screenshots</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.screenshots.map((screenshot, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-md">
                      <img 
                        src={screenshot} 
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Project Details</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Category</h4>
                  <p className="text-gray-900 dark:text-white">{project.category}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 space-y-3">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Live Demo
                  </a>
                  
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <Github size={16} className="mr-2" />
                    View Source
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;