
import React from 'react';
import { useTranslations } from 'next-intl';
import { User } from '@/types';
import { AuthNav } from '../auth/AuthNav';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onLogout }) => {
  const t = useTranslations('header');

  return (
    <header className="sticky top-0 z-50 mb-8 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">
      <div className="backdrop-blur-md bg-gray-900/80 border-b border-gray-800/50 shadow-lg">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-2">
            {/* Logo and Brand */}
            <a href="#" className="flex items-center gap-2 group flex-shrink-0 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors whitespace-nowrap">
                  {t('title')}
                </h1>
                <p className="hidden sm:block text-xs text-gray-400 -mt-1 whitespace-nowrap">
                  {t('subtitle')}
                </p>
              </div>
            </a>

            {/* Navigation Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              <LanguageSwitcher />
              <AuthNav user={user} onLoginClick={onLoginClick} onLogout={onLogout} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
