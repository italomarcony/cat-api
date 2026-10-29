import { render, screen } from '@testing-library/react';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

jest.mock('./services/catApi', () => ({
  fetchBreeds: jest.fn().mockResolvedValue([]),
  fetchBreedImages: jest.fn().mockResolvedValue([])
}));

test('renders the app header and navigation', () => {
  render(
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  );

  expect(screen.getAllByRole('heading', { name: 'MiauPédia' }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /raças/i }).length).toBeGreaterThan(0);
});
