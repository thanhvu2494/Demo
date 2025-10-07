
import React from 'react';
import { Snippet, User } from '@/types';

interface SnippetActionsProps {
  snippet: Snippet;
  user: User | null;
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: number) => void;
}

export const SnippetActions: React.FC<SnippetActionsProps> = ({
  snippet,
  user,
  onEdit,
  onDelete
}) => {
  if (!user || user.email !== snippet.author) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onEdit(snippet)}
        className="text-gray-400 hover:text-white p-1 rounded-md transition"
        aria-label="Edit snippet"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </button>
      
      <button
        onClick={() => onDelete(snippet.id)}
        className="text-gray-400 hover:text-red-500 p-1 rounded-md transition"
        aria-label="Delete snippet"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </div>
  );
};
