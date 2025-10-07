
import React from 'react';
import { useTranslations } from 'next-intl';

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Loading: React.FC<LoadingProps> = ({ message, size = 'md' }) => {
  const t = useTranslations('common');

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`${sizeClasses[size]} border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin`}></div>
      {message && (
        <p className="mt-4 text-gray-400 text-sm">{message || t('loading')}</p>
      )}
    </div>
  );
};
