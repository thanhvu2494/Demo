'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface FilterBarProps {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  languages,
  selectedLanguage,
  onLanguageChange,
  sortBy,
  onSortChange
}) => {
  const t = useTranslations();

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {t('common.language')}
        </label>
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {t(`languages.${lang}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="author">By Author</option>
        </select>
      </div>
    </div>
  );
};
