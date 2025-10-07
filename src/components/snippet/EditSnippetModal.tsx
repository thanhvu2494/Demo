import React, { useState, useEffect, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Snippet } from '@/types';

interface EditSnippetModalProps {
  snippet: Snippet;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (snippet: Snippet) => void;
}

export const EditSnippetModal: React.FC<EditSnippetModalProps> = ({
  snippet,
  isOpen,
  onClose,
  onUpdate
}) => {
  const t = useTranslations();
  const [formData, setFormData] = useState(snippet);

  useEffect(() => {
    setFormData(snippet);
  }, [snippet]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate({
      ...formData,
      tags: Array.isArray(formData.tags)
        ? formData.tags
        : formData.tags.split(',').map(tag => tag.trim())
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">
          {t('snippet.editSnippet')}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-300 mb-2">
              {t('snippet.title')}
            </label>
            <input
              type="text"
              id="edit-title"
              name="title"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title || ''}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="edit-code" className="block text-sm font-medium text-gray-300 mb-2">
              {t('snippet.yourCode')}
            </label>
            <textarea
              id="edit-code"
              name="code"
              rows={12}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg font-mono text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.code}
              onChange={handleChange}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="edit-language" className="block text-sm font-medium text-gray-300 mb-2">
                {t('common.language')}
              </label>
              <select
                id="edit-language"
                name="language"
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="javascript">{t('languages.javascript')}</option>
                <option value="python">{t('languages.python')}</option>
                <option value="java">{t('languages.java')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="edit-tags" className="block text-sm font-medium text-gray-300 mb-2">
                {t('common.tags')}
              </label>
              <input
                type="text"
                id="edit-tags"
                name="tags"
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
