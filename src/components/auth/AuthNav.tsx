import React from 'react';
import { User } from '@/types';

interface AuthNavProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const AuthNav: React.FC<AuthNavProps> = ({ user, onLoginClick, onLogout }) => {
  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-gray-300">
          Welcome, <span className="font-medium text-white">{user.email}</span>
        </span>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onLoginClick}
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition"
      >
        Login
      </button>
      <button
        onClick={onLoginClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
      >
        Sign Up
      </button>
    </div>
  );
};