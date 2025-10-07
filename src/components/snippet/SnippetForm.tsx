
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { User } from '@/types';

interface SnippetFormProps {
  onAddSnippet: (snippet: any) => void;
  user: User | null;
}

export const SnippetForm: React.FC<SnippetFormProps> = ({ onAddSnippet, user }) => {
  const t = useTranslations();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [tags, setTags] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !user) return;

    onAddSnippet({
      title: title || t('snippet.untitled'),
      code,
      language,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    });

    setCode('');
    setLanguage('javascript');
    setTags('');
    setTitle('');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-12 relative">
      {!user && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center rounded-2xl z-10">
          <p className="text-white text-lg font-semibold">
            {t('auth.pleaseLogin')}
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title-input" className="block text-sm font-medium text-gray-300 mb-2">
            {t('snippet.title')}
          </label>
          <input
            type="text"
            id="title-input"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!user}
            placeholder={t('snippet.untitled')}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="code-input" className="block text-sm font-medium text-gray-300 mb-2">
            {t('snippet.yourCode')}
          </label>
          <textarea
            id="code-input"
            rows={10}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg font-mono text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={!user}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="language-select" className="block text-sm font-medium text-gray-300 mb-2">
              {t('common.language')}
            </label>
            <select
              id="language-select"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={!user}
            >
              <option value="javascript">{t('languages.javascript')}</option>
              <option value="python">{t('languages.python')}</option>
              <option value="java">{t('languages.java')}</option>
              <option value="typescript">{t('languages.typescript')}</option>
              <option value="cpp">{t('languages.cpp')}</option>
              <option value="go">{t('languages.go')}</option>
            </select>
          </div>

          <div>
            <label htmlFor="tags-input" className="block text-sm font-medium text-gray-300 mb-2">
              {t('snippet.topics')}
            </label>
            <input
              type="text"
              id="tags-input"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              disabled={!user}
              placeholder="algorithm, data-structure"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:bg-gray-500"
          disabled={!user || !code.trim()}
        >
          {t('snippet.analyzeShare')}
        </button>
      </form>
    </div>
  );
};
