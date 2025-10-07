
import { useState, useCallback } from 'react';
import { Snippet } from '@/types';
import { ComplexityService } from '@/services/complexity.service';
import { INITIAL_SNIPPETS } from '@/constants/snippets';

export const useSnippets = () => {
  const [snippets, setSnippets] = useState<Snippet[]>(INITIAL_SNIPPETS);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);

  const addSnippet = useCallback((newSnippetData: Omit<Snippet, 'id' | 'complexity' | 'author'>, author: string) => {
    const complexity = ComplexityService.estimate(newSnippetData.code);
    const newSnippet: Snippet = {
      id: Date.now(),
      title: newSnippetData.title || 'Untitled Snippet',
      author,
      ...newSnippetData,
      complexity
    };
    
    setSnippets(prev => [newSnippet, ...prev]);
    return newSnippet;
  }, []);

  const updateSnippet = useCallback((updatedSnippet: Snippet) => {
    const complexity = ComplexityService.estimate(updatedSnippet.code);
    setSnippets(prev => 
      prev.map(s => s.id === updatedSnippet.id 
        ? { ...updatedSnippet, complexity } 
        : s
      )
    );
    setEditingSnippet(null);
  }, []);

  const deleteSnippet = useCallback((snippetId: number) => {
    setSnippets(prev => prev.filter(s => s.id !== snippetId));
  }, []);

  const startEditing = useCallback((snippet: Snippet) => {
    setEditingSnippet(snippet);
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingSnippet(null);
  }, []);

  return {
    snippets,
    editingSnippet,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    startEditing,
    cancelEditing
  };
};
