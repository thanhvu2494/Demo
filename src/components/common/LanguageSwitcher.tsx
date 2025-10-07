'use client';

import React from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { locales, type Locale } from '@/i18n/config';

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const languageNames: Record<Locale, string> = {
    en: 'English',
    vi: 'Tiếng Việt'
  };

  const languageFlags: Record<Locale, string> = {
    en: '🇺🇸',
    vi: '🇻🇳'
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-1.5 sm:py-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-all duration-200 border border-gray-700/50">
        <span className="text-base sm:text-lg">{languageFlags[currentLocale]}</span>
        <span className="hidden sm:inline text-white text-sm font-medium whitespace-nowrap">{languageNames[currentLocale]}</span>
        <svg
          className="w-3 h-3 text-gray-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700/50 transition-colors ${
              currentLocale === locale ? 'bg-gray-700/30' : ''
            }`}
          >
            <span className="text-lg">{languageFlags[locale]}</span>
            <span className="text-white text-sm font-medium">{languageNames[locale]}</span>
            {currentLocale === locale && (
              <svg
                className="w-4 h-4 text-blue-400 ml-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
