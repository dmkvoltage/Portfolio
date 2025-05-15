import React from 'react';
import { Calendar, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';
import Section from '../UI/Section';

const AboutDetail: React.FC = () => {
  return (
    <Section title="About Me" subtitle="Get to know me better">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="relative mb-6">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/5380666/pexels-photo-5380666.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Kingo Kingsley Kaah" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-lg bg-blue-600 -z-10 hidden md:block"></div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Personal Information</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <Calendar size={18} className="mr-2 text-blue-600" />
                <span className="font-medium mr-2">Date of Birth:</span> January 1, 2000
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <MapPin size={18} className="mr-2 text-blue-600" />
                <span className="font-medium mr-2">Location:</span> Buea, Cameroon
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <Briefcase size={18} className="mr-2 text-blue-600" />
                <span className="font-medium mr-2">Occupation:</span> Student, Web Developer
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <GraduationCap size={18} className="mr-2 text-blue-600" />
                <span className="font-medium mr-2">Education:</span> University of Buea, Level 400
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <Award size={18} className="mr-2 text-blue-600" />
                <span className="font-medium mr-2">Scholarship:</span> KKT Scholar
              </li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Who I Am</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            I'm Kingo Kingsley Kaah, a passionate Software Engineering student at the University of Buea, currently in Level 400.
            I specialize in web development, with expertise in Flask for backend and React for frontend development. I'm also
            deeply interested in Artificial Intelligence and continuously exploring new technologies in this field.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            As a KKT Scholar, I've maintained academic excellence throughout my studies, balancing theoretical knowledge with
            practical application. My goal is to create innovative solutions that solve real-world problems through technology.
          </p>
          
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Skills</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 dark:text-gray-300">Web Development (Flask, React)</span>
                <span className="text-gray-700 dark:text-gray-300">90%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 dark:text-gray-300">Python</span>
                <span className="text-gray-700 dark:text-gray-300">85%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 dark:text-gray-300">JavaScript/TypeScript</span>
                <span className="text-gray-700 dark:text-gray-300">80%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 dark:text-gray-300">Artificial Intelligence</span>
                <span className="text-gray-700 dark:text-gray-300">75%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 dark:text-gray-300">UI/UX Design</span>
                <span className="text-gray-700 dark:text-gray-300">70%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Education & Experience</h3>
        <div className="relative border-l-2 border-blue-600 pl-8 ml-4 space-y-10">
          <div className="relative">
            <div className="absolute -left-10 mt-1 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white"></div>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">2021 - Present</span>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">Bachelor of Engineering in Software Engineering</h4>
              <p className="text-gray-700 dark:text-gray-300">University of Buea, Faculty of Engineering and Technology</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Currently in Level 400, specializing in software development and engineering principles.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-10 mt-1 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white"></div>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">2022 - Present</span>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">KKT Scholar</h4>
              <p className="text-gray-700 dark:text-gray-300">Merit-based Scholarship Program</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Awarded prestigious scholarship for academic excellence and leadership potential.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-10 mt-1 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white"></div>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">2023 - Present</span>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">Freelance Web Developer</h4>
              <p className="text-gray-700 dark:text-gray-300">Self-employed</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Developing web applications using Flask and React for various clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutDetail;