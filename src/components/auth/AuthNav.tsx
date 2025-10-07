import React from 'react';
import { useTranslations } from 'next-intl';
import { User } from '@/types';

interface AuthNavProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const AuthNav: React.FC<AuthNavProps> = ({ user, onLoginClick, onLogout }) => {
  const t = useTranslations('common');

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {user ? (
        <>
          <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-3 py-1.5 sm:py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs sm:text-sm text-gray-300 max-w-[60px] sm:max-w-[120px] truncate">
              {user.email}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600/90 hover:bg-red-600 text-white font-medium py-1.5 px-2.5 sm:py-2 sm:px-4 rounded-lg transition-all duration-200 text-xs sm:text-sm whitespace-nowrap"
          >
            {t('logout')}
          </button>
        </>
      ) : (
        <button
          onClick={onLoginClick}
          className="bg-blue-600/90 hover:bg-blue-600 text-white font-medium py-1.5 px-2.5 sm:py-2 sm:px-4 rounded-lg transition-all duration-200 text-xs sm:text-sm shadow-lg shadow-blue-500/20 whitespace-nowrap"
        >
          {t('login')}
        </button>
      )}
    </div>
  );
};