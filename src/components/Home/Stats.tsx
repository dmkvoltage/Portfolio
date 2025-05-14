import React from 'react';
import { Code, Coffee, Award, User } from 'lucide-react';

const stats = [
  {
    title: 'Projects',
    value: '20+',
    icon: <Code size={24} />,
    color: 'blue',
  },
  {
    title: 'Happy Clients',
    value: '15+',
    icon: <User size={24} />,
    color: 'purple',
  },
  {
    title: 'Cups of Coffee',
    value: '500+',
    icon: <Coffee size={24} />,
    color: 'orange',
  },
  {
    title: 'Awards',
    value: '3',
    icon: <Award size={24} />,
    color: 'green',
  },
];

const Stats: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-800 to-purple-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center transform transition-transform duration-300 hover:scale-105"
            >
              <div className={`bg-${stat.color}-500/20 p-3 rounded-full inline-flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</h3>
              <p className="text-white/80">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;