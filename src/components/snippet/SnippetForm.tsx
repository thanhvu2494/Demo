
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { User } from '@/types';
import { LANGUAGES } from '@/constants/snippets';
import { GeminiService } from '@/services/gemini.service';

interface SnippetFormProps {
  onAddSnippet: (data: { title: string; code: string; language: string; tags: string[] }) => void;
  user: User | null;
}

export const SnippetForm: React.FC<SnippetFormProps> = ({ onAddSnippet, user }) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [tags, setTags] = useState('');
  const [isLoadingTags, setIsLoadingTags] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to share a snippet.');
      return;
    }
    if (!code.trim()) {
      alert('Code cannot be empty.');
      return;
    }

    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    onAddSnippet({ title, code, language, tags: tagsArray });
    
    // Reset form
    setTitle('');
    setCode('');
    setLanguage('javascript');
    setTags('');
  };

  const handleSuggestTags = async () => {
    if (!code.trim()) {
      alert('Please enter some code first.');
      return;
    }

    setIsLoadingTags(true);
    try {
      const suggestedTags = await GeminiService.suggestTags(code, language);
      setTags(suggestedTags);
    } catch (error) {
      console.error('Error suggesting tags:', error);
      alert('Failed to suggest tags. Please try again.');
    } finally {
      setIsLoadingTags(false);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Share a New Snippet</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Title (Optional)
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Find Max Number in Array"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Code
          </label>
          <textarea
            id="code"
            rows={10}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste your code here..."
            value={code}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value)}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Language
            </label>
            <select
              id="language"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={language}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}
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
              htmlFor="tags"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Tags (comma-separated)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="tags"
                className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., array, algorithm"
                value={tags}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTags(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSuggestTags}
                disabled={isLoadingTags}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-bold px-4 rounded-lg transition whitespace-nowrap"
              >
                {isLoadingTags ? 'Loading...' : 'Suggest Tags ✨'}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
        >
          Share Snippet
        </button>
      </form>
    </div>
  );
};
