"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { SnippetForm } from '@/components/snippet/SnippetForm';
import { SnippetList } from '@/components/snippet/SnippetList';
import { AuthModal } from '@/components/auth/AuthModal';
import { EditSnippetModal } from '@/components/snippet/EditSnippetModal';
import { TagPage } from '@/components/pages/TagPage';
import { ProfilePage } from '@/components/pages/ProfilePage';
import { Toast } from '@/components/common/Toast';
import { Loading } from '@/components/common/Loading';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useToast } from '@/hooks/useToast';
import { Snippet, User } from '@/types';

export default function Home() {
  const t = useTranslations();
  const { toast, showToast, hideToast } = useToast();
  
  const [user, setUser] = useState<User | null>(null);
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'tag' | 'profile'>('home');
  const [currentTag, setCurrentTag] = useState<string>('');
  const [currentProfile, setCurrentProfile] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load snippets from localStorage
    const savedSnippets = localStorage.getItem('snippets');
    if (savedSnippets) {
      setSnippets(JSON.parse(savedSnippets));
    }

    setIsLoading(false);

    // Handle hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/tags/')) {
        setCurrentView('tag');
        setCurrentTag(hash.replace('#/tags/', ''));
      } else if (hash.startsWith('#/profiles/')) {
        setCurrentView('profile');
        setCurrentProfile(hash.replace('#/profiles/', ''));
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = (userData: { email: string }) => {
    const newUser: User = {
      id: Date.now(),
      email: userData.email,
      name: userData.email.split('@')[0]
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    showToast(t('auth.loginSuccess'), 'success');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    showToast(t('auth.logoutSuccess'), 'success');
  };

  const handleAddSnippet = (snippetData: any) => {
    if (!user) return;

    const newSnippet: Snippet = {
      id: Date.now(),
      ...snippetData,
      author: user.email,
      createdAt: new Date().toISOString(),
      complexity: calculateComplexity(snippetData.code)
    };

    const updatedSnippets = [newSnippet, ...snippets];
    setSnippets(updatedSnippets);
    localStorage.setItem('snippets', JSON.stringify(updatedSnippets));
    showToast(t('snippet.addSuccess'), 'success');
  };

  const handleUpdateSnippet = (updatedSnippet: Snippet) => {
    const updatedSnippets = snippets.map(s =>
      s.id === updatedSnippet.id ? { ...updatedSnippet, updatedAt: new Date().toISOString() } : s
    );
    setSnippets(updatedSnippets);
    localStorage.setItem('snippets', JSON.stringify(updatedSnippets));
    setEditingSnippet(null);
    showToast(t('snippet.updateSuccess'), 'success');
  };

  const handleDeleteSnippet = (id: number) => {
    if (confirm(t('snippet.deleteConfirm'))) {
      const updatedSnippets = snippets.filter(s => s.id !== id);
      setSnippets(updatedSnippets);
      localStorage.setItem('snippets', JSON.stringify(updatedSnippets));
      showToast(t('snippet.deleteSuccess'), 'success');
    }
  };

  const calculateComplexity = (code: string) => {
    const lines = code.split('\n').length;
    const hasNestedLoops = /for.*for|while.*while/.test(code);
    const hasRecursion = /function.*\1\(/.test(code);

    if (hasRecursion) {
      return { notation: 'O(2^n)', className: 'exponential' };
    }
    if (hasNestedLoops) {
      return { notation: 'O(n²)', className: 'quadratic' };
    }
    if (lines > 20) {
      return { notation: 'O(n)', className: 'linear' };
    }
    return { notation: 'O(1)', className: 'constant' };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Loading message={t('common.loading')} size="lg" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Header
            user={user}
            onLoginClick={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
          />

          {currentView === 'home' && (
            <>
              <SnippetForm onAddSnippet={handleAddSnippet} user={user} />
              <SnippetList
                snippets={snippets}
                user={user}
                onEdit={setEditingSnippet}
                onDelete={handleDeleteSnippet}
              />
            </>
          )}

          {currentView === 'tag' && (
            <TagPage
              tagName={currentTag}
              allSnippets={snippets}
              user={user}
              onEdit={setEditingSnippet}
              onDelete={handleDeleteSnippet}
            />
          )}

          {currentView === 'profile' && (
            <ProfilePage
              authorEmail={currentProfile}
              allSnippets={snippets}
              user={user}
              onEdit={setEditingSnippet}
              onDelete={handleDeleteSnippet}
            />
          )}
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
        />

        {editingSnippet && (
          <EditSnippetModal
            snippet={editingSnippet}
            isOpen={!!editingSnippet}
            onClose={() => setEditingSnippet(null)}
            onUpdate={handleUpdateSnippet}
          />
        )}

        {toast.isVisible && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}