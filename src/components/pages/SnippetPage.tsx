
import React, { useState } from 'react';
import { Snippet, User } from '@/types';
import { PageHeader } from '../layout/PageHeader';
import { SnippetCard } from '../snippet/SnippetCard';
import { GeminiService } from '@/services/gemini.service';

interface SnippetPageProps {
  snippetId: string;
  allSnippets: Snippet[];
  user: User | null;
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: number) => void;
}

export const SnippetPage: React.FC<SnippetPageProps> = ({
  snippetId,
  allSnippets,
  user,
  onEdit,
  onDelete
}) => {
  const [explanation, setExplanation] = useState<string>('');
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);

  const snippet = allSnippets.find(s => s.id === parseInt(snippetId));

  if (!snippet) {
    return (
      <div>
        <PageHeader title="Snippet Not Found" />
        <div className="text-center py-16 bg-gray-800 rounded-2xl">
          <p className="text-gray-400">The snippet you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const handleExplainCode = async () => {
    setIsLoadingExplanation(true);
    try {
      const result = await GeminiService.explainCode(snippet.code, snippet.language);
      setExplanation(result);
    } catch (error) {
      console.error('Error explaining code:', error);
      setExplanation('Failed to generate explanation. Please try again.');
    } finally {
      setIsLoadingExplanation(false);
    }
  };

  return (
    <div>
      <PageHeader
        title={snippet.title || 'Untitled Snippet'}
        subtitle={`Shared by ${snippet.author}`}
      />

      <div className="mb-8">
        <SnippetCard
          snippet={snippet}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
          isDetailPage={true}
        />
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">AI Explanation</h3>
          <button
            onClick={handleExplainCode}
            disabled={isLoadingExplanation}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            {isLoadingExplanation ? 'Generating...' : 'Explain Code ✨'}
          </button>
        </div>

        {explanation && (
          <div className="bg-gray-900 p-4 rounded-lg">
            <p className="text-gray-300 leading-relaxed">{explanation}</p>
          </div>
        )}

        {!explanation && !isLoadingExplanation && (
          <p className="text-gray-400 text-center py-8">
            Click the button above to get an AI-powered explanation of this code.
          </p>
        )}
      </div>
    </div>
  );
};
