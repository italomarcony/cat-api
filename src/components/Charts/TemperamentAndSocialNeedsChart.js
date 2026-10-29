import React from 'react';
import BreedRatingCategoriesChart from './BreedRatingCategoriesChart';

const categories = [
  { field: 'energy_level', label: 'Alta Atividade', minimum: 4 },
  { field: 'intelligence', label: 'Alta Inteligência', minimum: 4 },
  { field: 'social_needs', label: 'Alta Sociabilidade', minimum: 4 },
  { field: 'vocalisation', label: 'Alta Vocalização', minimum: 4 }
];

function TemperamentAndSocialNeedsChart({ breeds }) {
  return (
    <BreedRatingCategoriesChart
      breeds={breeds}
      title="Comparação de Temperamento e Necessidades Sociais"
      icon="🧠"
      footer="Cada contagem usa apenas raças com nota disponível para a característica."
      categories={categories}
    />
  );
}

export default TemperamentAndSocialNeedsChart;
