'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { SnippetCard } from '@/components/snippet/SnippetCard';
import { AuthModal } from '@/components/auth/AuthModal';
import { Link } from '@/i18n/routing';
import { useAuth } from '@/hooks/useAuth';
import { useSnippets } from '@/hooks/useSnippets';
import { decodeSnippet } from '@/utils/snippetEncoder';
import { Snippet } from '@/types';

export default function SharedSnippetPage() {
  const searchParams = useSearchParams();
  const t = useTranslations();
  const { user, isAuthModalOpen, login, logout, openAuthModal, closeAuthModal } = useAuth();
  const { addSnippet } = useSnippets();
  
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [error, setError] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      const decoded = decodeSnippet(data);
      if (decoded) {
        // Create a temporary snippet with decoded data
        const tempSnippet: Snippet = {
          id: Date.now(), // Temporary ID
          title: decoded.title || 'Shared Snippet',
          code: decoded.code || '',
          language: decoded.language || 'javascript',
          tags: decoded.tags || [],
          author: decoded.author || 'Anonymous',
          createdAt: decoded.createdAt || new Date().toISOString(),
          complexity: decoded.complexity || { notation: 'O(1)', className: 'constant' }
        };
        setSnippet(tempSnippet);
      } else {
        setError('Invalid or corrupted snippet data');
      }
    } else {
      setError('No snippet data found in URL');
    }
  }, [searchParams]);

  const handleSaveToMySnippets = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    
    if (snippet) {
      addSnippet({
        title: snippet.title,
        code: snippet.code,
        language: snippet.language,
        tags: snippet.tags
      }, user.email);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <Header
          user={user}
          onLoginClick={openAuthModal}
          onLogout={logout}
        />
        
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Error Loading Snippet</h1>
            <p className="text-gray-400 mb-8">{error}</p>
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition inline-block">
              Go Back Home
            </Link>
          </div>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          onLogin={login}
        />
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <Header
          user={user}
          onLoginClick={openAuthModal}
          onLogout={logout}
        />
        
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading snippet...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header
        user={user}
        onLoginClick={openAuthModal}
        onLogout={logout}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
          
          <button
            onClick={handleSaveToMySnippets}
            disabled={isSaved}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              isSaved 
                ? 'bg-green-600 text-white cursor-default' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSaved ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Saved!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                Save to My Snippets
              </>
            )}
          </button>
        </div>

        <div className="mb-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <p className="text-blue-300 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            This is a shared snippet. Save it to your collection to keep it permanently.
          </p>
        </div>

        <SnippetCard
          snippet={snippet}
          user={user}
          onEdit={() => {}}
          onDelete={() => {}}
          isDetailPage={true}
        />
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onLogin={login}
      />
    </div>
  );
}
