
import React, { useRef, useState, useEffect } from 'react';
import { Snippet, User } from '@/types';
import { ComplexityBadge } from './ComplexityBadge';
import { SnippetActions } from './SnippetActions';
import { copyToClipboard as copyText } from '@/utils/clipboard';

interface SnippetCardProps {
  snippet: Snippet;
  user: User | null;
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: number) => void;
  isDetailPage?: boolean;
}

export const SnippetCard: React.FC<SnippetCardProps> = ({
  snippet,
  user,
  onEdit,
  onDelete,
  isDetailPage = false
}) => {
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [mounted, setMounted] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = async () => {
    if (codeRef.current) {
      const success = await copyText(snippet.code);
      if (success) {
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
      }
    }
  };

  // Format date only on client side to avoid hydration mismatch
  const formattedDate = mounted 
    ? new Date(snippet.created_at).toLocaleDateString()
    : '';

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-gray-400 uppercase">
            {snippet.language}
          </span>
          <ComplexityBadge complexity={snippet.complexity} />
          {mounted && (
            <div className="text-sm">
              <span className="font-semibold text-gray-300">Author: </span>
              <a
                href={`#/profiles/${snippet.author}`}
                className="text-cyan-400 cursor-pointer hover:underline"
              >
                {snippet.author}
              </a>
            </div>
          )}
        </div>
        
        {mounted && (
          <SnippetActions
            snippet={snippet}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </div>

      <div className="p-4">
        {!isDetailPage && snippet.title && (
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">
              <a href={`#/snippets/${snippet.id}`} className="hover:underline">
                {snippet.title}
              </a>
            </h3>
            {mounted && formattedDate && (
              <span className="text-sm text-gray-400">{formattedDate}</span>
            )}
          </div>
        )}
        
        <div className="relative">
          {mounted && (
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold py-1 px-3 rounded transition"
              aria-label="Copy code"
            >
              {copyFeedback ? 'Copied!' : 'Copy'}
            </button>
          )}
          
          <pre className="!bg-transparent !p-0">
            <code
              ref={codeRef}
              className={`language-${snippet.language}`}
            >
              {snippet.code}
            </code>
          </pre>
        </div>

        {snippet.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {snippet.tags.map((tag, index) => (
              <a
                key={index}
                href={`#/tags/${tag}`}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition"
              >
                #{tag}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
