
import React from 'react';
import { User } from '@/types';
import { AuthNav } from '../auth/AuthNav';

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onLogout }) => {
  return (
    <header className="mb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            <a href="#/" className="hover:text-blue-400 transition">
              CodeShare
            </a>
          </h1>
          <p className="text-gray-400">
            Share code snippets, get complexity estimates, and AI-powered explanations.
          </p>
        </div>
        <AuthNav user={user} onLoginClick={onLoginClick} onLogout={onLogout} />
      </div>
    </header>
  );
};
