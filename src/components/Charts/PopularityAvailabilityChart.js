import React from 'react';
import ChartContainer from '../UI/ChartContainer';
import { useLanguage } from '../../hooks/useLanguage';
import { translateText } from '../../utils/i18n';

function PopularityAvailabilityChart() {
  const { language } = useLanguage();

  return (
    <ChartContainer
      title={translateText('Análise de Popularidade e Disponibilidade', language)}
      icon="⭐"
      footer={translateText('O conjunto de dados não contém uma métrica de popularidade.', language)}
    >
      <p className="py-12 text-center text-gray-600 dark:text-gray-300">
        {translateText('O conjunto de dados não contém uma métrica de popularidade.', language)}
      </p>
    </ChartContainer>
  );
}

export default PopularityAvailabilityChart;
