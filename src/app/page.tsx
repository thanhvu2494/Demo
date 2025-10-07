"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSnippets } from '@/hooks/useSnippets';
import { useRouter } from '@/hooks/useRouter';
import { usePrism } from '@/hooks/usePrism';
import { Header } from '@/components/layout/Header';
import { AuthModal } from '@/components/auth/AuthModal';
import { EditSnippetModal } from '@/components/snippet/EditSnippetModal';
import { HomePage } from '@/components/pages/HomePage';
import { SnippetPage } from '@/components/pages/SnippetPage';
import { TagPage } from '@/components/pages/TagPage';
import { ProfilePage } from '@/components/pages/ProfilePage';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  const {
    user,
    isAuthModalOpen,
    login,
    logout,
    openAuthModal,
    closeAuthModal
  } = useAuth();

  const {
    snippets,
    editingSnippet,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    startEditing,
    cancelEditing
  } = useSnippets();

  const route = useRouter();

  // Trigger Prism.js syntax highlighting when snippets or route changes
  usePrism([snippets, route]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddSnippet = (data: {
    title: string;
    code: string;
    language: string;
    tags: string[];
  }) => {
    if (!user) {
      openAuthModal();
      return;
    }
    addSnippet(data, user.email);
  };

  const handleDeleteSnippet = (id: number) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      deleteSnippet(id);
    }
  };

  const renderContent = () => {
    if (!mounted) {
      return (
        <div className="text-center py-16">
          <p className="text-gray-400">Loading...</p>
        </div>
      );
    }

    switch (route.view) {
      case 'snippet':
        return (
          <SnippetPage
            snippetId={route.params.id}
            allSnippets={snippets}
            user={user}
            onEdit={startEditing}
            onDelete={handleDeleteSnippet}
          />
        );

      case 'tag':
        return (
          <TagPage
            tagName={route.params.name}
            allSnippets={snippets}
            user={user}
            onEdit={startEditing}
            onDelete={handleDeleteSnippet}
          />
        );

      case 'profile':
        return (
          <ProfilePage
            authorEmail={route.params.email}
            allSnippets={snippets}
            user={user}
            onEdit={startEditing}
            onDelete={handleDeleteSnippet}
          />
        );

      default:
        return (
          <HomePage
            snippets={snippets}
            user={user}
            onAddSnippet={handleAddSnippet}
            onEdit={startEditing}
            onDelete={handleDeleteSnippet}
          />
        );
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Header user={user} onLoginClick={openAuthModal} onLogout={logout} />
        {renderContent()}
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} onLogin={login} />

      {editingSnippet && (
        <EditSnippetModal
          snippet={editingSnippet}
          isOpen={!!editingSnippet}
          onClose={cancelEditing}
          onUpdate={updateSnippet}
        />
      )}
    </div>
  );
}