import React from 'react';
import { useTranslations } from 'next-intl';
import { Snippet, User } from '@/types';
import { PageHeader } from '../layout/PageHeader';
import { SnippetList } from '../snippet/SnippetList';
import { EmptyState } from '../common/EmptyState';

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
  const t = useTranslations('page');
  
  const taggedSnippets = allSnippets.filter(snippet =>
    snippet.tags.some(tag => tag.toLowerCase() === tagName.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title={`#${tagName}`}
        subtitle={t('snippetsFound', { 
          count: taggedSnippets.length, 
          plural: taggedSnippets.length !== 1 ? 's' : '' 
        })}
        action={
          <a
            href="#"
            className="text-blue-400 hover:text-blue-300 font-medium transition"
          >
            ← {t('home')}
          </a>
        }
      />
      {taggedSnippets.length > 0 ? (
        <SnippetList
          snippets={taggedSnippets}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <EmptyState
          title={t('noSnippets')}
          message={`No snippets found with tag "${tagName}"`}
          action={
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              {t('home')}
            </a>
          }
        />
      )}
    </div>
  );
};