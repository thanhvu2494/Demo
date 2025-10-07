import React from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('page');

  if (snippets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">{t('noSnippets')}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {snippets.map((snippet) => (
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
