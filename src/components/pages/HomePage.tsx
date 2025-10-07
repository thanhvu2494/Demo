
import React from 'react';
import { Snippet, User } from '@/types';
import { SnippetForm } from '../snippet/SnippetForm';
import { SnippetList } from '../snippet/SnippetList';

interface HomePageProps {
  snippets: Snippet[];
  user: User | null;
  onAddSnippet: (data: { title: string; code: string; language: string; tags: string[] }) => void;
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  snippets,
  user,
  onAddSnippet,
  onEdit,
  onDelete
}) => {
  return (
    <>
      <SnippetForm onAddSnippet={onAddSnippet} user={user} />
      <SnippetList
        snippets={snippets}
        user={user}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};
