import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { getBreedRating, getBreedTemperament } from '../../utils/breedData';
import { getBreedDescription } from '../../utils/breedTranslations';
import { translateText } from '../../utils/i18n';

function CatBreedCard({ breed, onClick }) {
  const { language } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = breed.image?.url || (
    breed.reference_image_id
      ? `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
      : null
  );
  const ratings = [
    { field: 'affection_level', label: 'Afeto', color: 'bg-pink-500' },
    { field: 'energy_level', label: 'Energia', color: 'bg-orange-500' },
    { field: 'intelligence', label: 'Inteligência', color: 'bg-blue-500' },
    { field: 'child_friendly', label: 'C/ Crianças', color: 'bg-green-500' }
  ];

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer group border border-gray-100 dark:border-gray-700"
    >
      {/* Imagem */}
      {imageUrl && (
        <div className="relative h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden group-hover:opacity-95 transition-opacity">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse">
              <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                {translateText('Carregando...', language)}
              </div>
            </div>
          )}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
              {translateText('Imagem não disponível', language)}
            </div>
          )}
          <img
            src={imageUrl}
            alt={breed.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </div>
      )}

      {/* Conteúdo */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{breed.name}</h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {breed.origin || translateText('N/D', language)}
          </span>
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
          {getBreedDescription(breed.name, breed.description, language)}
        </p>

        {/* Tags de Temperamento */}
        {breed.temperament && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {getBreedTemperament(breed.temperament, language).split(',').slice(0, 3).map((trait, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full"
                >
                  {trait.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          {ratings.map(({ field, label, color }) => {
            const rating = getBreedRating(breed, field);

            return (
              <div key={field} className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {translateText(label, language)}
                </div>
                <div
                  className="flex justify-center gap-1"
                  aria-label={`${translateText(label, language)}: ${rating === null ? translateText('Dados indisponíveis', language) : `${rating}/5`}`}
                  title={rating === null ? translateText('Dados indisponíveis', language) : `${rating}/5`}
                >
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        rating !== null && index < rating
                          ? color
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                    {rating === null ? translateText('N/D', language) : `${rating}/5`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botão Ver Detalhes */}
        <button className="w-full mt-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg transition-colors font-medium">
          {translateText('Ver Detalhes', language)}
        </button>
      </div>
    </div>
  );
}

export default CatBreedCard;
