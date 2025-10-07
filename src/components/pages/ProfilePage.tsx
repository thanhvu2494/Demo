
import React from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('page');
  
  const userSnippets = allSnippets.filter(
    snippet => snippet.author === authorEmail
  );

  return (
    <div>
      <PageHeader
        title={t('snippetsByAuthor', { author: authorEmail })}
        subtitle={t('snippetsFound', { 
          count: userSnippets.length, 
          plural: userSnippets.length !== 1 ? 's' : '' 
        })}
      />
      {userSnippets.length > 0 ? (
        <SnippetList
          snippets={userSnippets}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">{t('noSnippets')}</p>
        </div>
      )}
    </div>
  );
};
