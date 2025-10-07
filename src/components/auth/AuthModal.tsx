
import React, { FormEvent } from 'react';
import { useTranslations } from 'next-intl';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: { email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const t = useTranslations();

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    onLogin({ email });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {t('auth.loginTitle')}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              {t('auth.emailLabel')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              {t('auth.passwordLabel')}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
          >
            {t('auth.continue')}
          </button>
        </form>
        <button
          onClick={onClose}
          className="w-full mt-4 text-gray-400 hover:text-white transition"
        >
          {t('common.cancel')}
        </button>
      </div>
    </div>
  );
};
