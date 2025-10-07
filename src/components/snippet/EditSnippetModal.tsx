import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Snippet } from '@/types';
import { LANGUAGES } from '@/constants/snippets';

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
  const [formData, setFormData] = useState<Snippet>(snippet);

  useEffect(() => {
    setFormData(snippet);
  }, [snippet]);

  if (!isOpen) return null;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Snippet</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="edit-title"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="edit-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="edit-code"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Code
            </label>
            <textarea
              id="edit-code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              rows={10}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="edit-language"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Language
              </label>
              <select
                id="edit-language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="edit-tags"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="edit-tags"
                value={formData.tags.join(', ')}
                onChange={handleTagsChange}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., array, algorithm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              Update Snippet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
