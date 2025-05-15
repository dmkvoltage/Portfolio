import React from 'react';
import { Users, MapPin, Clock, Monitor } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../../components/UI/Card';

// Mock data for demonstration
const visitors = [
  { 
    id: 1, 
    ip: '192.168.1.1', 
    location: 'New York, USA', 
    device: 'Chrome / Windows', 
    time: '2 min ago',
    path: '/projects/1' 
  },
  { 
    id: 2, 
    ip: '192.168.1.2', 
    location: 'London, UK', 
    device: 'Safari / macOS', 
    time: '15 min ago',
    path: '/' 
  },
  { 
    id: 3, 
    ip: '192.168.1.3', 
    location: 'Tokyo, Japan', 
    device: 'Firefox / Linux', 
    time: '32 min ago',
    path: '/about' 
  },
  { 
    id: 4, 
    ip: '192.168.1.4', 
    location: 'Paris, France', 
    device: 'Edge / Windows', 
    time: '1 hour ago',
    path: '/contact' 
  },
  { 
    id: 5, 
    ip: '192.168.1.5', 
    location: 'Sydney, Australia', 
    device: 'Chrome / Android', 
    time: '2 hours ago',
    path: '/projects' 
  },
  { 
    id: 6, 
    ip: '192.168.1.6', 
    location: 'Berlin, Germany', 
    device: 'Safari / iOS', 
    time: '3 hours ago',
    path: '/projects/2' 
  },
  { 
    id: 7, 
    ip: '192.168.1.7', 
    location: 'Toronto, Canada', 
    device: 'Chrome / Windows', 
    time: '4 hours ago',
    path: '/' 
  },
  { 
    id: 8, 
    ip: '192.168.1.8', 
    location: 'Mumbai, India', 
    device: 'Chrome / Android', 
    time: '5 hours ago',
    path: '/projects/3' 
  },
];

const VisitorsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Recent Visitors</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Track and analyze your visitors' information
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Visitor Log</h2>
            <div className="flex space-x-2">
              <select className="text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-1 px-2">
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Page
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {visitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    #{visitor.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <MapPin size={16} className="text-gray-400 mr-2" />
                      {visitor.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Monitor size={16} className="text-gray-400 mr-2" />
                      {visitor.device}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      {visitor.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs">
                      {visitor.path}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CardBody className="border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">8</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top Locations</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                    <Users size={16} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">United States</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">42%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                    <Users size={16} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">United Kingdom</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">18%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                    <Users size={16} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Germany</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">15%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3">
                    <Users size={16} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">India</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">10%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mr-3">
                    <Users size={16} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Other</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">15%</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Devices</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Desktop</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">58%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: '58%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">36%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-purple-600" style={{ width: '36%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tablet</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">6%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-600" style={{ width: '6%' }}></div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Browsers</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chrome</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">64%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: '64%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Safari</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">19%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-purple-600" style={{ width: '19%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Firefox</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">10%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-orange-600" style={{ width: '10%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Edge</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">7%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-600" style={{ width: '7%' }}></div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default VisitorsPage;