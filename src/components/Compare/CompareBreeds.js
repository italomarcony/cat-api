import React, { useState } from 'react';
import { useCatBreeds } from '../../hooks/useCatBreeds';
import BreedSelector from './BreedSelector';
import ComparisonTable from './ComparisonTable';
import ComparisonRadarChart from './ComparisonRadarChart';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';
import { useLanguage } from '../../hooks/useLanguage';
import { translateText } from '../../utils/i18n';

function CompareBreeds() {
  const { language } = useLanguage();
  const { breeds, loading, error } = useCatBreeds();
  const [selectedBreeds, setSelectedBreeds] = useState([null, null, null]);

  const handleBreedSelect = (index, breed) => {
    const newSelected = [...selectedBreeds];
    newSelected[index] = breed;
    setSelectedBreeds(newSelected);
  };

  const handleRemoveBreed = (index) => {
    const newSelected = [...selectedBreeds];
    newSelected[index] = null;
    setSelectedBreeds(newSelected);
  };

  const handleClearAll = () => {
    setSelectedBreeds([null, null, null]);
  };

  const selectedCount = selectedBreeds.filter(breed => breed !== null).length;
  const canCompare = selectedCount >= 2;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner message={translateText('Carregando raças...', language)} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message={`${translateText('Erro ao carregar raças:', language)} ${error}`}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          🔄 {translateText('Comparador de Raças', language)}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {translateText('Compare até 3 raças lado a lado e veja suas diferenças', language)}
        </p>
      </div>

      {/* Breed Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[0, 1, 2].map((index) => (
          <BreedSelector
            key={index}
            index={index}
            breeds={breeds}
            selectedBreed={selectedBreeds[index]}
            otherSelectedBreeds={selectedBreeds.filter((_, i) => i !== index)}
            onSelect={(breed) => handleBreedSelect(index, breed)}
            onRemove={() => handleRemoveBreed(index)}
          />
        ))}
      </div>

      {/* Action Buttons */}
      {selectedCount > 0 && (
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {translateText('Limpar Tudo', language)}
          </button>
        </div>
      )}

      {/* Comparison Content */}
      {canCompare ? (
        <div className="space-y-8">
          {/* Radar Chart Comparison */}
          <ComparisonRadarChart breeds={selectedBreeds.filter(b => b !== null)} />

          {/* Detailed Comparison Table */}
          <ComparisonTable breeds={selectedBreeds.filter(b => b !== null)} />
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
            <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {translateText('Selecione pelo menos 2 raças para comparar', language)}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {translateText('Use os campos de busca acima para escolher as raças que deseja comparar. Você pode comparar até 3 raças simultaneamente.', language)}
          </p>
        </div>
      )}
    </div>
  );
}

export default CompareBreeds;
