
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-400 text-lg">
              {subtitle}
            </p>
          )}
        </div>
        {action && (
          <div>
            {action}
          </div>
        )}
      </div>
      <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
    </div>
  );
};
