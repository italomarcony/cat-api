import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { translateText } from '../utils/i18n';

/**
 * NotFoundPage - Página 404 personalizada
 */
function NotFoundPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl mb-6">🐱</div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
          {translateText('Ops! Página não encontrada', language)}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {translateText('Parece que este gatinho se perdeu... A página que você está procurando não existe.', language)}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            🏠 {translateText('Voltar para Home', language)}
          </Link>
          <Link
            to="/quiz"
            className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-gray-200 dark:border-gray-600"
          >
            🎯 {translateText('Fazer Quiz', language)}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
