import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsContextType {
  trackPageView: (path: string) => void;
  trackEvent: (category: string, action: string, label?: string, value?: number) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const trackPageView = (path: string) => {
    // In a real app, this would send data to your analytics service
    console.log(`Page view: ${path}`);
    
    // Example of how you might track in a real app
    // if (window.gtag) {
    //   window.gtag('config', 'YOUR-GA-ID', {
    //     page_path: path,
    //   });
    // }
  };

  const trackEvent = (
    category: string,
    action: string,
    label?: string,
    value?: number
  ) => {
    // In a real app, this would send event data to your analytics service
    console.log(`Event: ${category} - ${action} - ${label} - ${value}`);
    
    // Example of how you might track in a real app
    // if (window.gtag) {
    //   window.gtag('event', action, {
    //     event_category: category,
    //     event_label: label,
    //     value: value,
    //   });
    // }
  };

  // Track page views when location changes
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <AnalyticsContext.Provider value={{ trackPageView, trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};