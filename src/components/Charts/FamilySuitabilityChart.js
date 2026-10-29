import React from 'react';
import BreedRatingCategoriesChart from './BreedRatingCategoriesChart';

const categories = [
  { field: 'adaptability', label: 'Alta Adaptabilidade', minimum: 4 },
  { field: 'affection_level', label: 'Alto Afeto', minimum: 4 },
  { field: 'child_friendly', label: 'Amigável com Crianças', minimum: 4 },
  { field: 'dog_friendly', label: 'Amigável com Cães', minimum: 4 }
];

function FamilySuitabilityChart({ breeds }) {
  return (
    <BreedRatingCategoriesChart
      breeds={breeds}
      title="Comparação de Adequação Familiar"
      icon="👨‍👩‍👧‍👦"
      footer="Cada contagem usa apenas raças com nota disponível para a característica."
      categories={categories}
    />
  );
}

export default FamilySuitabilityChart;
