
import React from 'react';
import { Snippet, User } from '@/types';
import { PageHeader } from '../layout/PageHeader';
import { SnippetList } from '../snippet/SnippetList';

interface ProfilePageProps {
  authorEmail: string;
  allSnippets: Snippet[];
  user: User | null;
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: number) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  authorEmail,
  allSnippets,
  user,
  onEdit,
  onDelete
}) => {
  const userSnippets = allSnippets.filter(snippet => snippet.author === authorEmail);

  return (
    <div>
      <PageHeader
        title={`Profile: ${authorEmail}`}
        subtitle={`${userSnippets.length} snippet${userSnippets.length !== 1 ? 's' : ''} shared`}
      />
      <SnippetList
        snippets={userSnippets}
        user={user}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};
