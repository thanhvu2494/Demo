'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { SnippetList } from '@/components/snippet/SnippetList';
import { EditSnippetModal } from '@/components/snippet/EditSnippetModal';
import { AuthModal } from '@/components/auth/AuthModal';
import { Link } from '@/i18n/routing';
import { Snippet, User } from '@/types';

export default function TagPage() {
  const params = useParams();
  const t = useTranslations();
  const tag = decodeURIComponent(params.tag as string);

  const [user, setUser] = useState<User | null>(null);
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load snippets from localStorage
    const savedSnippets = localStorage.getItem('snippets');
    if (savedSnippets) {
      const allSnippets: Snippet[] = JSON.parse(savedSnippets);
      setSnippets(allSnippets);
      
      // Filter snippets by tag
      const filtered = allSnippets.filter(snippet => 
        snippet.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
      setFilteredSnippets(filtered);
    }
  }, [tag]);

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
    setEditingSnippet(snippet);
    setIsEditModalOpen(true);
  };

  const handleUpdateSnippet = (updatedSnippet: Snippet) => {
    const updatedSnippets = snippets.map(s => 
      s.id === updatedSnippet.id ? updatedSnippet : s
    );
    setSnippets(updatedSnippets);
    localStorage.setItem('snippets', JSON.stringify(updatedSnippets));
    
    // Update filtered list
    const filtered = updatedSnippets.filter(snippet => 
      snippet.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
    setFilteredSnippets(filtered);
    
    setIsEditModalOpen(false);
    setEditingSnippet(null);
  };

  const handleDelete = (id: number) => {
    if (confirm(t('snippet.deleteConfirm'))) {
      const updatedSnippets = snippets.filter(s => s.id !== id);
      setSnippets(updatedSnippets);
      localStorage.setItem('snippets', JSON.stringify(updatedSnippets));
      
      // Update filtered list
      const filtered = updatedSnippets.filter(snippet => 
        snippet.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
      setFilteredSnippets(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header
        user={user}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                #{tag}
              </h1>
              <p className="text-gray-400 mt-1">
                {filteredSnippets.length} {filteredSnippets.length === 1 ? 'snippet' : 'snippets'} found
              </p>
            </div>
          </div>
        </div>

        {filteredSnippets.length > 0 ? (
          <SnippetList
            snippets={filteredSnippets}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No snippets found</h2>
            <p className="text-gray-400">There are no snippets with the tag "#{tag}"</p>
          </div>
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
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingSnippet(null);
          }}
          onUpdate={handleUpdateSnippet}
        />
      )}
    </div>
  );
}
