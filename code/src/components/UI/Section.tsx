import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  className = '',
  id,
}) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;