import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, Users, BarChart2, Settings, LogOut, 
  Menu, X, ChevronRight, FileEdit
} from 'lucide-react';
import { Link, useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  // Close sidebar on mobile screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutGrid size={20} /> },
    { name: 'Content', path: '/dashboard/content', icon: <FileEdit size={20} /> },
    { name: 'Visitors', path: '/dashboard/visitors', icon: <Users size={20} /> },
    { name: 'Analytics', path: '/dashboard/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile navbar */}
      <div className="md:hidden bg-white dark:bg-gray-800 shadow-sm z-20 fixed top-0 left-0 right-0">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              className="text-gray-500 dark:text-gray-300 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
              KK<span className="text-blue-600">.</span>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 dark:border-gray-700 py-2 px-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              <button
                onClick={logout}
                className="w-full text-left group flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <LogOut size={20} className="mr-3" />
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Sidebar for desktop */}
      <div className={`hidden md:block fixed inset-y-0 z-10 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'left-0' : '-left-64'
      }`}>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
                KK<span className="text-blue-600">.</span> Admin
              </Link>
            </div>
            
            <div className="flex-grow overflow-y-auto py-4 px-3">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.path
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={logout}
                className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <LogOut size={20} className="mr-3" />
                Logout
              </button>
            </div>
          </div>
          
          {/* Toggle sidebar button */}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-r bg-white dark:bg-gray-800 border-y border-r border-gray-200 dark:border-gray-700 self-center"
          >
            <ChevronRight size={20} className={`transform transition-transform ${isSidebarOpen ? 'rotate-180' : 'rotate-0'} text-gray-500 dark:text-gray-400`} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ease-in-out md:pt-0 pt-14 ${
        isSidebarOpen ? 'md:ml-64' : 'md:ml-0'
      }`}>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;