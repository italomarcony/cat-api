import React from 'react';
import ChartContainer from '../UI/ChartContainer';
import { useLanguage } from '../../hooks/useLanguage';
import { translateText } from '../../utils/i18n';

function NativeEnvironmentEffectChart() {
  const { language } = useLanguage();

  return (
    <ChartContainer
      title={translateText('Influência do Ambiente Nativo no Temperamento e Necessidades', language)}
      icon="🌍"
      footer={translateText('A API não fornece dados sobre clima ou ambiente nativo da raça.', language)}
    >
      <p className="py-12 text-center text-gray-600 dark:text-gray-300">
        {translateText('A API não fornece dados sobre clima ou ambiente nativo da raça.', language)}
      </p>
    </ChartContainer>
  );
}

export default NativeEnvironmentEffectChart;
