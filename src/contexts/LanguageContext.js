import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();
const supportedLanguages = ['pt-BR', 'en-US'];

export function LanguageProvider({ children }) {
  const [language, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return supportedLanguages.includes(savedLanguage) ? savedLanguage : 'pt-BR';
  });
  const setLanguage = (nextLanguage) => {
    setCurrentLanguage((currentLanguage) => {
      const selectedLanguage = typeof nextLanguage === 'function'
        ? nextLanguage(currentLanguage)
        : nextLanguage;
      return supportedLanguages.includes(selectedLanguage) ? selectedLanguage : currentLanguage;
    });
  };

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt-BR' ? 'en-US' : 'pt-BR');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de LanguageProvider');
  }
  return context;
}
