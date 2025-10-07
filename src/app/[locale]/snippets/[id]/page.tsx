'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { SnippetCard } from '@/components/snippet/SnippetCard';
import { EditSnippetModal } from '@/components/snippet/EditSnippetModal';
import { AuthModal } from '@/components/auth/AuthModal';
import { Link } from '@/i18n/routing';
import { Snippet, User } from '@/types';

export default function SnippetDetailPage() {
  const params = useParams();
  const t = useTranslations();
  const snippetId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load snippet from localStorage
    const savedSnippets = localStorage.getItem('snippets');
    if (savedSnippets) {
      const snippets: Snippet[] = JSON.parse(savedSnippets);
      const foundSnippet = snippets.find(s => s.id.toString() === snippetId);
      setSnippet(foundSnippet || null);
    }
  }, [snippetId]);

  const handleLogin = (userData: { email: string }) => {
    const newUser: User = {
      id: Date.now(),
      email: userData.email,
      name: userData.email.split('@')[0]
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleEdit = (snippet: Snippet) => {
    setIsEditModalOpen(true);
  };

  const handleUpdateSnippet = (updatedSnippet: Snippet) => {
    const savedSnippets = localStorage.getItem('snippets');
    if (savedSnippets) {
      const snippets: Snippet[] = JSON.parse(savedSnippets);
      const updatedSnippets = snippets.map(s =>
        s.id === updatedSnippet.id ? updatedSnippet : s
      );
      localStorage.setItem('snippets', JSON.stringify(updatedSnippets));
      setSnippet(updatedSnippet);
    }
    setIsEditModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm(t('snippet.deleteConfirm'))) {
      const savedSnippets = localStorage.getItem('snippets');
      if (savedSnippets) {
        const snippets: Snippet[] = JSON.parse(savedSnippets);
        const updatedSnippets = snippets.filter(s => s.id !== id);
        localStorage.setItem('snippets', JSON.stringify(updatedSnippets));
        // Redirect to home after delete
        window.location.href = '/';
      }
    }
  };

  if (!snippet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <Header
          user={user}
          onLoginClick={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-white mb-4">Snippet Not Found</h1>
            <p className="text-gray-400 mb-8">The snippet you're looking for doesn't exist.</p>
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">
              Go Back Home
            </Link>
          </div>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header
        user={user}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        <SnippetCard
          snippet={snippet}
          user={user}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDetailPage={true}
        />
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      {snippet && (
        <EditSnippetModal
          snippet={snippet}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateSnippet}
        />
      )}
    </div>
  );
}
