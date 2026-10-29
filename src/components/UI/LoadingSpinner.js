import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { translateText } from '../../utils/i18n';

function LoadingSpinner({ message = 'Carregando...' }) {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
      <p className="text-gray-600 text-lg">{translateText(message, language)}</p>
    </div>
  );
}

export default LoadingSpinner;
