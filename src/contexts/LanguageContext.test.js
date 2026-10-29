import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext';

function LanguageProbe() {
  const { language, setLanguage } = useLanguage();

  return (
    <div>
      <span>{language}</span>
      <button onClick={() => setLanguage('unsupported')}>Set invalid language</button>
    </div>
  );
}

describe('LanguageProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('falls back to Portuguese when an unsupported language was persisted', () => {
    localStorage.setItem('language', 'fr-FR');

    render(
      <LanguageProvider>
        <LanguageProbe />
      </LanguageProvider>
    );

    expect(screen.getByText('pt-BR')).toBeInTheDocument();
  });

  test('ignores attempts to select an unsupported language', () => {
    render(
      <LanguageProvider>
        <LanguageProbe />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Set invalid language' }));

    expect(screen.getByText('pt-BR')).toBeInTheDocument();
  });
});
