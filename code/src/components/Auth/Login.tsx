import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../UI/Button';

interface LocationState {
  from?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const from = state?.from || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  // For demo purposes - in a real app, remove this
  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await login('admin@example.com', 'password');
      navigate(from, { replace: true });
    } catch (err) {
      setError('Demo login failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white inline-block">
              KK<span className="text-blue-600">.</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-6">Sign in to Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Enter your email and password to access your dashboard
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-3 rounded-md mb-6 flex items-start">
              <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
              icon={<LogIn size={18} />}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          
          <div className="mt-6">
            <button
              onClick={handleDemoLogin}
              className="w-full py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Demo Login (For testing)
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have access? Contact the administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;