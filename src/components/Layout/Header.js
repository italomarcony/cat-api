import React from 'react';
import LanguageToggle from '../UI/LanguageToggle';
import { useLanguage } from '../../hooks/useLanguage';
import { translateText } from '../../utils/i18n';

function Header() {
  const { language } = useLanguage();

  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg transition-colors relative">
      <LanguageToggle />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3">
          <svg
            className="w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
            <path d="M8 14v.5" />
            <path d="M16 14v.5" />
            <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
          </svg>
          <h1 className="text-4xl font-bold">MiauPédia</h1>
        </div>
        <p className="text-center text-primary-100 dark:text-gray-300 mt-2">
          {translateText('Sua enciclopédia completa sobre raças de gatos', language)}
        </p>
      </div>
    </header>
  );
}

export default Header;
