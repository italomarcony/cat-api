import React from 'react';
import { useCatStats } from '../../hooks/useCatStats';
import { getBreedRating } from '../../utils/breedData';
import { useLanguage } from '../../hooks/useLanguage';
import { translateText } from '../../utils/i18n';
import StatsCard from '../UI/StatsCard';

const formatAverage = (value) => value === null ? 'N/D' : value.toFixed(1);

function StatsDashboard({ breeds }) {
  const stats = useCatStats(breeds);
  const { language } = useLanguage();
  const unavailable = translateText('Esta informação não é fornecida pelo plano atual da The Cat API.', language);
  const affectionDescription = stats.mostAffectionate
    ? `${stats.mostAffectionate.name} (${getBreedRating(stats.mostAffectionate, 'affection_level')}/5)`
    : unavailable;
  const energyDescription = stats.mostEnergetic
    ? `${stats.mostEnergetic.name} (${getBreedRating(stats.mostEnergetic, 'energy_level')}/5)`
    : unavailable;
  const familyDescription = stats.familyFriendlySampleSize
    ? `${stats.familyFriendlyCount}/${stats.familyFriendlySampleSize} ${translateText('raças amigáveis com crianças', language)}`
    : unavailable;
  const dogDescription = stats.dogFriendlySampleSize
    ? `${stats.dogFriendlyCount}/${stats.dogFriendlySampleSize} ${translateText('raças amigáveis com cães', language)}`
    : unavailable;
  const commonOrigin = stats.topOrigins[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={translateText('Total de Raças', language)}
          value={stats.totalBreeds}
          icon="🐱"
          bgColor="bg-blue-50"
          textColor="text-blue-600"
          iconBgColor="bg-blue-100"
          description={translateText('Raças cadastradas na base', language)}
        />
        <StatsCard
          title={translateText('Nível Médio de Afeto', language)}
          value={`${formatAverage(stats.averageAffection)}${stats.averageAffection === null ? '' : '/5'}`}
          icon="❤️"
          bgColor="bg-pink-50"
          textColor="text-pink-600"
          iconBgColor="bg-pink-100"
          description={affectionDescription}
        />
        <StatsCard
          title={translateText('Nível Médio de Energia', language)}
          value={`${formatAverage(stats.averageEnergy)}${stats.averageEnergy === null ? '' : '/5'}`}
          icon="⚡"
          bgColor="bg-orange-50"
          textColor="text-orange-600"
          iconBgColor="bg-orange-100"
          description={energyDescription}
        />
        <StatsCard
          title={translateText('Compatibilidade com Crianças', language)}
          value={stats.familyFriendlyPercent === null ? 'N/D' : `${stats.familyFriendlyPercent}%`}
          icon="👨‍👩‍👧‍👦"
          bgColor="bg-green-50"
          textColor="text-green-600"
          iconBgColor="bg-green-100"
          description={familyDescription}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title={translateText('Inteligência Média', language)}
          value={`${formatAverage(stats.averageIntelligence)}${stats.averageIntelligence === null ? '' : '/5'}`}
          icon="🧠"
          bgColor="bg-purple-50"
          textColor="text-purple-600"
          iconBgColor="bg-purple-100"
          description={stats.averageIntelligence === null ? unavailable : translateText('Média das notas disponíveis', language)}
        />
        <StatsCard
          title={translateText('Compatíveis com Cães', language)}
          value={stats.dogFriendlyPercent === null ? 'N/D' : `${stats.dogFriendlyPercent}%`}
          icon="🐕"
          bgColor="bg-amber-50"
          textColor="text-amber-600"
          iconBgColor="bg-amber-100"
          description={dogDescription}
        />
        <StatsCard
          title={translateText('Origem Mais Comum', language)}
          value={commonOrigin?.origin || 'N/D'}
          icon="🌍"
          bgColor="bg-cyan-50"
          textColor="text-cyan-600"
          iconBgColor="bg-cyan-100"
          description={commonOrigin
            ? `${commonOrigin.count} ${translateText('raças desta origem', language)}`
            : translateText('Não há dados válidos para calcular esta estatística.', language)}
        />
        <StatsCard
          title={translateText('Expectativa de Vida Média (estimada)', language)}
          value={stats.averageLifeSpan === null ? 'N/D' : `${stats.averageLifeSpan.toFixed(1)} ${translateText('anos', language)}`}
          icon="⏳"
          bgColor="bg-indigo-50"
          textColor="text-indigo-600"
          iconBgColor="bg-indigo-100"
          description={stats.lifeSpanSampleSize
            ? `${translateText('Estimativa pelo ponto médio do intervalo da API', language)} (${stats.lifeSpanSampleSize} ${translateText('raças com dados', language)})`
            : translateText('Não há dados válidos para calcular esta estatística.', language)}
        />
        <StatsCard
          title={translateText('Peso Médio por Raça (estimado)', language)}
          value={stats.averageWeight === null ? 'N/D' : `${stats.averageWeight.toFixed(1)} kg`}
          icon="⚖️"
          bgColor="bg-teal-50"
          textColor="text-teal-600"
          iconBgColor="bg-teal-100"
          description={stats.weightSampleSize
            ? `${translateText('Estimativa pelo ponto médio do intervalo da API', language)} (${stats.weightSampleSize} ${translateText('raças com dados', language)})`
            : translateText('Não há dados válidos para calcular esta estatística.', language)}
        />
      </div>
    </div>
  );
}

export default StatsDashboard;
