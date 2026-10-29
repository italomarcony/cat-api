import React from 'react';
import StatsDashboard from '../components/Charts/StatsDashboard';
import OriginDistributionChart from '../components/Charts/OriginDistributionChart';
import TopTemperamentsChart from '../components/Charts/TopTemperamentsChart';
import TemperamentAndSocialNeedsChart from '../components/Charts/TemperamentAndSocialNeedsChart';
import HealthAndWellnessChart from '../components/Charts/HealthAndWellnessChart';
import FamilySuitabilityChart from '../components/Charts/FamilySuitabilityChart';
import EnergyExerciseLevelsChart from '../components/Charts/EnergyExerciseLevelsChart';
import PopularityAvailabilityChart from '../components/Charts/PopularityAvailabilityChart';
import NativeEnvironmentEffectChart from '../components/Charts/NativeEnvironmentEffectChart';
import { useCatBreeds } from '../hooks/useCatBreeds';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';
import { useLanguage } from '../hooks/useLanguage';
import { translateText } from '../utils/i18n';

/**
 * StatsPage - Página de estatísticas e dashboard
 */
function StatsPage() {
  const { breeds, loading, error } = useCatBreeds();
  const { language } = useLanguage();

  if (loading) {
    return <LoadingSpinner message={translateText('Carregando estatísticas...', language)} />;
  }

  if (error) {
    return <ErrorMessage message={`${translateText('Erro ao carregar raças:', language)} ${error}`} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* KPI Dashboard */}
      <StatsDashboard breeds={breeds} />

      {/* Grid de Gráficos - 2 colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OriginDistributionChart breeds={breeds} />
        <TopTemperamentsChart breeds={breeds} />
      </div>

      {/* Gráficos Existentes Melhorados */}
      <EnergyExerciseLevelsChart breeds={breeds} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TemperamentAndSocialNeedsChart breeds={breeds} />
        <HealthAndWellnessChart breeds={breeds} />
      </div>

      <FamilySuitabilityChart breeds={breeds} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PopularityAvailabilityChart breeds={breeds} />
        <NativeEnvironmentEffectChart breeds={breeds} />
      </div>
    </div>
  );
}

export default StatsPage;
