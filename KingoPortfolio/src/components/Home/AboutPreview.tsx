import React from 'react';
import { FileText, Code, Brain } from 'lucide-react';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';

const AboutPreview: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105">
                <img 
                  src="https://images.pexels.com/photos/5380666/pexels-photo-5380666.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Kingo Kingsley Kaah" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-lg bg-blue-600 dark:bg-blue-700 hidden md:block"></div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">About Me</h2>
            <div className="w-16 h-1 bg-blue-600 mb-6"></div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I'm a Software Engineering student at the University of Buea, passionate about building innovative solutions 
              through code. As a KKT Scholar, I'm committed to excellence in every project I undertake.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md text-blue-600 dark:text-blue-400">
                  <Code size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Web Development</h3>
                  <p className="text-gray-600 dark:text-gray-400">Specializing in Flask backends and React frontends</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/50 p-2 rounded-md text-purple-600 dark:text-purple-400">
                  <Brain size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Development</h3>
                  <p className="text-gray-600 dark:text-gray-400">Creating intelligent systems and solutions</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-900/50 p-2 rounded-md text-orange-600 dark:text-orange-400">
                  <FileText size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Academic Excellence</h3>
                  <p className="text-gray-600 dark:text-gray-400">Level 400 student with strong technical foundation</p>
                </div>
              </div>
            </div>
            
            <Link to="/about">
              <Button variant="primary">Learn More About Me</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;