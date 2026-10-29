import React from 'react';
import BreedRatingCategoriesChart from './BreedRatingCategoriesChart';

const categories = [
  { field: 'energy_level', label: 'Baixa (1-2)', minimum: 1, maximum: 2 },
  { field: 'energy_level', label: 'Média (3-4)', minimum: 3, maximum: 4 },
  { field: 'energy_level', label: 'Alta (5)', minimum: 5, maximum: 5 }
];

function EnergyExerciseLevelsChart({ breeds }) {
  return (
    <BreedRatingCategoriesChart
      breeds={breeds}
      title="Níveis de Energia e Exercício"
      icon="⚡"
      footer="Classificação por nível de atividade; são contadas apenas raças com nota disponível."
      categories={categories}
    />
  );
}

export default EnergyExerciseLevelsChart;
