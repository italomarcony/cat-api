import React, { useState } from 'react';
import BreedDetailModal from '../Breed/BreedDetailModal';
import { getBreedRating, getBreedTemperament } from '../../utils/breedData';
import { getBreedDescription } from '../../utils/breedTranslations';
import { useLanguage } from '../../hooks/useLanguage';
import { translateText } from '../../utils/i18n';

/**
 * QuizResults - Exibe os resultados do quiz com top 3 matches
 */
function QuizResults({ matches, onRestart }) {
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();

  const handleViewDetails = (breed) => {
    setSelectedBreed(breed);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBreed(null);
  };

  // Medalhas para top 3
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {translateText('Seus Matches Perfeitos!', language)}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {translateText('Com base nos seus dados disponíveis, estas são as raças que mais combinam com suas respostas.', language)}
        </p>
      </div>

      {/* Top 3 Matches */}
      {matches.length === 0 ? (
        <p role="status" className="mb-10 rounded-xl border border-amber-300 bg-amber-50 p-6 text-center text-amber-900 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-200">
          {translateText('Não há dados suficientes para calcular recomendações confiáveis.', language)}
        </p>
      ) : <div className="space-y-6 mb-10">
        {matches.map((match, index) => {
          const breed = match.breed;
          const percentage = match.percentage;

          // Imagem do gato
          const imageUrl = breed.image?.url ||
            (breed.reference_image_id
              ? `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
              : 'https://via.placeholder.com/400x300?text=No+Image');

          return (
            <div
              key={breed.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all transform hover:scale-[1.02] duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Imagem */}
                <div className="relative md:col-span-1">
                  <img
                    src={imageUrl}
                    alt={breed.name}
                    className="w-full h-full object-cover min-h-[250px] md:min-h-full"
                  />
                  <div className="absolute top-4 left-4 text-6xl drop-shadow-lg">
                    {medals[index]}
                  </div>
                </div>

                {/* Informações */}
                <div className="md:col-span-2 p-6">
                  {/* Cabeçalho */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                          Match #{index + 1}
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {breed.name}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {breed.origin || translateText('N/D', language)}
                      </p>
                    </div>

                    {/* Percentage Circle */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 h-24">
                        <svg className="transform -rotate-90 w-24 h-24">
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            className="text-gray-200 dark:text-gray-700"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
                            className="text-primary-500 transition-all duration-1000 ease-out"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {percentage}%
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{translateText('compatível', language)}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {match.availableCriteria}/{match.totalCriteria} {translateText('critérios com dados', language)}
                      </span>
                    </div>
                  </div>

                  {/* Descrição */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                    {getBreedDescription(breed.name, breed.description, language)}
                  </p>

                  {/* Temperamento */}
                  {breed.temperament && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{translateText('Temperamento', language)}</h4>
                      <div className="flex flex-wrap gap-2">
                        {getBreedTemperament(breed.temperament, language).split(',').slice(0, 4).map((trait, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full"
                          >
                            {trait.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Características Principais */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl mb-1">❤️</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{translateText('Afeto', language)}</div>
                      <div className="font-bold text-gray-900 dark:text-white">{getBreedRating(breed, 'affection_level') ?? translateText('N/D', language)}{getBreedRating(breed, 'affection_level') === null ? '' : '/5'}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl mb-1">⚡</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{translateText('Energia', language)}</div>
                      <div className="font-bold text-gray-900 dark:text-white">{getBreedRating(breed, 'energy_level') ?? translateText('N/D', language)}{getBreedRating(breed, 'energy_level') === null ? '' : '/5'}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl mb-1">🧠</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{translateText('Inteligência', language)}</div>
                      <div className="font-bold text-gray-900 dark:text-white">{getBreedRating(breed, 'intelligence') ?? translateText('N/D', language)}{getBreedRating(breed, 'intelligence') === null ? '' : '/5'}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl mb-1">👶</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{translateText('C/ Crianças', language)}</div>
                      <div className="font-bold text-gray-900 dark:text-white">{getBreedRating(breed, 'child_friendly') ?? translateText('N/D', language)}{getBreedRating(breed, 'child_friendly') === null ? '' : '/5'}</div>
                    </div>
                  </div>

                  {/* Botão Ver Detalhes */}
                  <button
                    onClick={() => handleViewDetails(breed)}
                    className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]"
                  >
                    {translateText('Ver Detalhes Completos', language)} →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>}

      {/* Ações */}
      <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-center border border-primary-100 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {translateText('Quer tentar novamente?', language)}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {translateText('Suas preferências mudaram? Refaça o quiz para encontrar novos matches!', language)}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            🔄 {translateText('Refazer Quiz', language)}
          </button>
          <a
            href="#breeds"
            className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-gray-200 dark:border-gray-600"
          >
            🐱 {translateText('Ver Todas as Raças', language)}
          </a>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedBreed && (
        <BreedDetailModal
          breed={selectedBreed}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default QuizResults;
