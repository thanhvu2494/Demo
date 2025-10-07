'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const t = useTranslations('page');

  const navItems = [
    { id: 'home', label: t('home'), icon: '🏠' },
    { id: 'tags', label: t('tags'), icon: '🏷️' },
  ];

  return (
    <nav className="mb-8">
      <div className="flex gap-2 flex-wrap">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              currentView === item.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
