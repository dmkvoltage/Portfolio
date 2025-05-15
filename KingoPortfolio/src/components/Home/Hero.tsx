import React from 'react';
import { ArrowDown } from 'lucide-react';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-gray-900 to-blue-900 text-white">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.15),transparent_50%)]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Kingo Kingsley Kaah</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fadeIn animation-delay-200">
            Software Engineer & AI Enthusiast
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn animation-delay-400">
            <Button 
              variant="primary" 
              size="lg"
              onClick={scrollToProjects}
            >
              View My Work
            </Button>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Me
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <button 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80 hover:text-white animate-bounce transition-colors"
        onClick={scrollToProjects}
        aria-label="Scroll down"
      >
        <span className="mb-2 text-sm">Scroll Down</span>
        <ArrowDown size={20} />
      </button>
    </section>
  );
};

export default Hero;