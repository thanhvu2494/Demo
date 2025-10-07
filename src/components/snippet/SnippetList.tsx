import React from 'react';
import { Snippet, User } from '@/types';
import { SnippetCard } from './SnippetCard';

interface SnippetListProps {
  snippets: Snippet[];
  user: User | null;
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: number) => void;
}

export const SnippetList: React.FC<SnippetListProps> = ({
  snippets,
  user,
  onEdit,
  onDelete
}) => {
  if (snippets.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-800 rounded-2xl">
        <p className="text-gray-400">No snippets found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {snippets.map(snippet => (
        <SnippetCard
          key={snippet.id}
          snippet={snippet}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
