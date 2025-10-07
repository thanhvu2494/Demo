
import { useState, useCallback } from 'react';
import { Snippet } from '@/types';
import { ComplexityService } from '@/services/complexity.service';
import { useLocalStorage } from './useLocalStorage';

export const useSnippets = () => {
  const [snippets, setSnippets] = useLocalStorage<Snippet[]>('snippets', []);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const addSnippet = useCallback((snippetData: any, author: string) => {
    const complexity = ComplexityService.estimate(snippetData.code);
    const newSnippet: Snippet = {
      id: Date.now(),
      ...snippetData,
      title: snippetData.title || 'Untitled Snippet',
      author,
      createdAt: new Date().toISOString(),
      complexity
    };
    
    setSnippets(prev => [newSnippet, ...prev]);
    return newSnippet;
  }, [setSnippets]);

  const updateSnippet = useCallback((updatedSnippet: Snippet) => {
    const complexity = ComplexityService.estimate(updatedSnippet.code);
    setSnippets(prev => 
      prev.map(s => s.id === updatedSnippet.id 
        ? { ...updatedSnippet, complexity } 
        : s
      )
    );
    setEditingSnippet(null);
    setIsEditModalOpen(false);
  }, [setSnippets]);

  const deleteSnippet = useCallback((snippetId: number) => {
    setSnippets(prev => prev.filter(s => s.id !== snippetId));
  }, [setSnippets]);

  const startEditing = useCallback((snippet: Snippet) => {
    setEditingSnippet(snippet);
    setIsEditModalOpen(true);
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingSnippet(null);
    setIsEditModalOpen(false);
  }, []);

  return {
    snippets,
    editingSnippet,
    isEditModalOpen,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    startEditing,
    cancelEditing
  };
};
