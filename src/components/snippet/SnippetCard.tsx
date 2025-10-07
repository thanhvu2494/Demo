
import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Snippet, User } from '@/types';
import { createShareableUrl } from '@/utils/snippetEncoder';

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
  const t = useTranslations();
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [copyLinkFeedback, setCopyLinkFeedback] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const copyToClipboard = () => {
    if (codeRef.current) {
      const codeText = codeRef.current.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  };

  const copyLinkToClipboard = () => {
    const baseUrl = window.location.origin;
    const shareableUrl = createShareableUrl(snippet, baseUrl);
    
    navigator.clipboard.writeText(shareableUrl).then(() => {
      setCopyLinkFeedback(true);
      setTimeout(() => setCopyLinkFeedback(false), 2000);
    }).catch(err => {
      console.error('Failed to copy link: ', err);
    });
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center bg-gray-900/50 flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <span className={`complexity-badge complexity-${snippet.complexity.className}`}>
            {snippet.complexity.notation}
          </span>
          <div className="text-sm">
            <span className="font-semibold text-gray-300">{t('common.author')}: </span>
            <span className="text-cyan-400">
              {snippet.author}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {user && user.email === snippet.author && (
            <>
              <button
                onClick={() => onEdit(snippet)}
                className="text-gray-400 hover:text-white p-1 rounded-md transition"
                title={t('common.edit')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L18.5 2.5z"></path>
                </svg>
              </button>
              <button
                onClick={() => onDelete(snippet.id)}
                className="text-gray-400 hover:text-red-400 p-1 rounded-md transition"
                title={t('common.delete')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </>
          )}
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-green-400 p-1 rounded-md transition"
            title={copyFeedback ? t('common.copied') : t('common.copy')}
          >
            {copyFeedback ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
          </button>
          <button
            onClick={copyLinkToClipboard}
            className="text-gray-400 hover:text-blue-400 p-1 rounded-md transition"
            title={copyLinkFeedback ? 'Link copied!' : 'Copy link'}
          >
            {copyLinkFeedback ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        {snippet.title && (
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">
              {!isDetailPage ? (
                <Link 
                  href={`/snippets/${snippet.id}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {snippet.title}
                </Link>
              ) : (
                snippet.title
              )}
            </h3>
            <span className="text-sm text-gray-400">
              {new Date(snippet.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
        
        <div className="relative">
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
              <Link
                key={index}
                href={`/tags/${tag}`}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-2 py-1 rounded transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
