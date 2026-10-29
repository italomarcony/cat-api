import React from 'react';
import { render, screen } from '@testing-library/react';
import CatBreedCard from './Breed/CatBreedCard';
import BreedRadarChart from './Charts/BreedRadarChart';
import EnergyExerciseLevelsChart from './Charts/EnergyExerciseLevelsChart';
import StatsDashboard from './Charts/StatsDashboard';
import ComparisonRadarChart from './Compare/ComparisonRadarChart';
import ComparisonTable from './Compare/ComparisonTable';
import QuizWelcome from './Quiz/QuizWelcome';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ThemeProvider } from '../contexts/ThemeContext';

const breedWithoutRatings = {
  id: 'basic',
  name: 'Basic breed',
  origin: 'Thailand',
  description: 'Basic breed description',
  temperament: 'Calm, Friendly'
};

function renderWithProviders(ui) {
  return render(
    <ThemeProvider>
      <LanguageProvider>{ui}</LanguageProvider>
    </ThemeProvider>
  );
}

describe('UI behavior when breed ratings are unavailable', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('shows unavailable ratings on breed cards instead of zero scores', () => {
    renderWithProviders(<CatBreedCard breed={breedWithoutRatings} onClick={() => {}} />);

    expect(screen.getAllByText('N/D')).toHaveLength(4);
    expect(screen.queryByText('0/5')).not.toBeInTheDocument();
  });

  test('shows an explicit empty state in individual and comparison radar charts', () => {
    const { rerender } = renderWithProviders(
      <BreedRadarChart breed={breedWithoutRatings} />
    );
    expect(screen.getByText(/plano gratuito da The Cat API/i)).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <LanguageProvider>
          <ComparisonRadarChart breeds={[breedWithoutRatings]} />
        </LanguageProvider>
      </ThemeProvider>
    );
    expect(screen.getByText(/plano gratuito da The Cat API/i)).toBeInTheDocument();
  });

  test('shows unavailable indicators in dashboard and comparison table', () => {
    const { rerender } = renderWithProviders(
      <StatsDashboard breeds={[breedWithoutRatings]} />
    );
    expect(screen.getAllByText('N/D').length).toBeGreaterThan(0);
    expect(screen.queryByText('0.0/5')).not.toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <LanguageProvider>
          <ComparisonTable breeds={[breedWithoutRatings]} />
        </LanguageProvider>
      </ThemeProvider>
    );
    expect(screen.getAllByText('N/D').length).toBeGreaterThan(0);
  });

  test('shows basic-data average indicators and sample sizes in the dashboard', () => {
    renderWithProviders(
      <StatsDashboard
        breeds={[
          { ...breedWithoutRatings, id: 'one', life_span: '12 - 16', weight: { metric: '3 - 5' } },
          { ...breedWithoutRatings, id: 'two', life_span: '10 - 14', weight: { metric: '4 - 6' } }
        ]}
      />
    );

    expect(screen.getByText('13.0 anos')).toBeInTheDocument();
    expect(screen.getByText('4.5 kg')).toBeInTheDocument();
    expect(screen.getAllByText(/2 raças com dados/i)).toHaveLength(2);
    expect(screen.getAllByText(/ponto médio do intervalo da API/i)).toHaveLength(2);
  });

  test('does not render a rating chart or allow the quiz to start without source traits', () => {
    const { container, rerender } = renderWithProviders(
      <EnergyExerciseLevelsChart breeds={[breedWithoutRatings]} />
    );
    expect(screen.getByText(/plano gratuito da The Cat API/i)).toBeInTheDocument();
    expect(container.querySelector('canvas')).not.toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <LanguageProvider>
          <QuizWelcome isAvailable={false} onStart={() => {}} />
        </LanguageProvider>
      </ThemeProvider>
    );
    expect(screen.getByRole('button', { name: /começar quiz/i })).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent(/não exibiremos recomendações fictícias/i);
  });
});
