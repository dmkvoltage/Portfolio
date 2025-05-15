import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { Toaster } from 'react-hot-toast';

// Import pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';

// Import Dashboard pages
import DashboardLayout from './components/Dashboard/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import VisitorsPage from './pages/dashboard/VisitorsPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import ContentPage from './pages/dashboard/ContentPage';

// Import global styles
import './index.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AnalyticsProvider>
            <Toaster position="top-right" />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Dashboard routes - protected by AuthProvider */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="visitors" element={<VisitorsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="content" element={<ContentPage />} />
              </Route>
              
              {/* Fallback for 404 */}
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </AnalyticsProvider>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;