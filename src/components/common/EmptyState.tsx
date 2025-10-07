
import React from 'react';
import { useTranslations } from 'next-intl';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon,
  action
}) => {
  const t = useTranslations('page');

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-gray-500 mb-4">
        {icon || (
          <svg
            className="w-24 h-24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        )}
      </div>
      {title && (
        <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      )}
      {message && (
        <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};
