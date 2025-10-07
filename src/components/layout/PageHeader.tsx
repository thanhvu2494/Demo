
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <a
        href="#/"
        className="inline-block text-blue-400 hover:text-blue-300 mb-4 transition"
      >
        ← Back to Home
      </a>
      <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
      {subtitle && <p className="text-gray-400">{subtitle}</p>}
    </div>
  );
};
