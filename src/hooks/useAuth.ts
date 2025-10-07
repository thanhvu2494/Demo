
import { useState, useCallback } from 'react';
import { User } from '@/types';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const login = useCallback((userData: { email: string }) => {
    const newUser: User = {
      id: Date.now(),
      email: userData.email,
      name: userData.email.split('@')[0]
    };
    setUser(newUser);
    setAuthModalOpen(false);
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const openAuthModal = useCallback(() => {
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  return {
    user,
    isAuthModalOpen,
    login,
    logout,
    openAuthModal,
    closeAuthModal
  };
};
