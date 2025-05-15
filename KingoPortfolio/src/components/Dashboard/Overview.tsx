import React from 'react';
import { 
  Users, ExternalLink, BarChart2, Clock, 
  TrendingUp, TrendingDown, Eye
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../UI/Card';

// Mock data for demonstration
const stats = [
  { 
    title: 'Total Visitors', 
    value: '5,743', 
    change: '+12.3%', 
    trend: 'up',
    icon: <Users size={20} />
  },
  { 
    title: 'Page Views', 
    value: '24,102', 
    change: '+18.7%', 
    trend: 'up',
    icon: <Eye size={20} />
  },
  { 
    title: 'Link Clicks', 
    value: '1,824', 
    change: '-3.2%', 
    trend: 'down',
    icon: <ExternalLink size={20} />
  },
  { 
    title: 'Avg. Time', 
    value: '3m 42s', 
    change: '+1.5%', 
    trend: 'up',
    icon: <Clock size={20} />
  },
];

// Mock data for popular links
const popularLinks = [
  { name: 'AI Image Generator', clicks: 427, url: 'https://project1.example.com' },
  { name: 'E-commerce Platform', clicks: 385, url: 'https://project2.example.com' },
  { name: 'Smart Home Dashboard', clicks: 290, url: 'https://project3.example.com' },
  { name: 'GitHub Profile', clicks: 245, url: 'https://github.com/your-github' },
  { name: 'LinkedIn Profile', clicks: 203, url: 'https://linkedin.com/in/your-linkedin' },
];

// Mock data for traffic sources
const trafficSources = [
  { source: 'Direct', percentage: 40 },
  { source: 'Social Media', percentage: 25 },
  { source: 'Search Engines', percentage: 20 },
  { source: 'Referrals', percentage: 10 },
  { source: 'Other', percentage: 5 },
];

const Overview: React.FC = () => {
  const getDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400">{getDate()}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardBody>
              <div className="flex items-center">
                <div className={`p-3 rounded-full mr-4 ${
                  stat.title.includes('Visitors') || stat.title.includes('Views') 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    : stat.title.includes('Clicks')
                    ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                    : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                }`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp size={14} className="text-green-500 mr-1" />
                    ) : (
                      <TrendingDown size={14} className="text-red-500 mr-1" />
                    )}
                    <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Links */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Popular Links</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {popularLinks.map((link, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{link.name}</p>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {link.url}
                      </a>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">{link.clicks}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">clicks</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Traffic Sources</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{source.source}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{source.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-blue-600' : 
                        index === 1 ? 'bg-purple-600' : 
                        index === 2 ? 'bg-green-600' : 
                        index === 3 ? 'bg-orange-600' : 
                        'bg-gray-600'
                      }`} 
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Activity Chart - Placeholder */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Visitor Activity</h2>
          <div className="flex space-x-2">
            <select className="text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-1 px-2">
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
            </select>
          </div>
        </CardHeader>
        <CardBody>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="text-center">
              <BarChart2 size={48} className="text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                Visitor activity chart will appear here
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Overview;