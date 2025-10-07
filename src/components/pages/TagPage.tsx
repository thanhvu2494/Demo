import React from 'react';
import { Snippet, User } from '@/types';
import { PageHeader } from '../layout/PageHeader';
import { SnippetList } from '../snippet/SnippetList';

interface TagPageProps {
  tagName: string;
  allSnippets: Snippet[];
  user: User | null;
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: number) => void;
}

export const TagPage: React.FC<TagPageProps> = ({
  tagName,
  allSnippets,
  user,
  onEdit,
  onDelete
}) => {
  const filteredSnippets = allSnippets.filter(snippet =>
    snippet.tags.includes(tagName)
  );

  return (
    <div>
      <PageHeader
        title={`#${tagName}`}
        subtitle={`${filteredSnippets.length} snippet${filteredSnippets.length !== 1 ? 's' : ''} found`}
      />
      <SnippetList
        snippets={filteredSnippets}
        user={user}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};