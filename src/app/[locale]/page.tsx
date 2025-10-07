
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { SnippetForm } from '@/components/snippet/SnippetForm';
import { SnippetList } from '@/components/snippet/SnippetList';
import { AuthModal } from '@/components/auth/AuthModal';
import { EditSnippetModal } from '@/components/snippet/EditSnippetModal';
import { useAuth } from '@/hooks/useAuth';
import { useSnippets } from '@/hooks/useSnippets';

export default function Home() {
  const t = useTranslations();
  const { user, isAuthModalOpen, login, logout, openAuthModal, closeAuthModal } = useAuth();
  const { 
    snippets, 
    editingSnippet, 
    isEditModalOpen,
    addSnippet, 
    updateSnippet, 
    deleteSnippet, 
    startEditing, 
    cancelEditing 
  } = useSnippets();

  const handleAddSnippet = (snippetData: any) => {
    if (!user) return;
    addSnippet(snippetData, user.email);
  };

  const handleDelete = (id: number) => {
    if (confirm(t('snippet.deleteConfirm'))) {
      deleteSnippet(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header
        user={user}
        onLoginClick={openAuthModal}
        onLogout={logout}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <SnippetForm onAddSnippet={handleAddSnippet} user={user} />
        
        <SnippetList
          snippets={snippets}
          user={user}
          onEdit={startEditing}
          onDelete={handleDelete}
        />
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onLogin={login}
      />

      {editingSnippet && (
        <EditSnippetModal
          snippet={editingSnippet}
          isOpen={isEditModalOpen}
          onClose={cancelEditing}
          onUpdate={updateSnippet}
        />
      )}
    </div>
  );
}
