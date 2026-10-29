import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { getBreedDescription } from '../../utils/breedTranslations';
import { translateText } from '../../utils/i18n';

function BreedSelector({ index, breeds, selectedBreed, otherSelectedBreeds, onSelect, onRemove }) {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Filtrar raças disponíveis (excluindo as já selecionadas)
  const availableBreeds = useMemo(() => {
    const otherIds = otherSelectedBreeds.filter(b => b !== null).map(b => b.id);
    return breeds.filter(breed => !otherIds.includes(breed.id));
  }, [breeds, otherSelectedBreeds]);

  // Filtrar por busca
  const filteredBreeds = useMemo(() => {
    if (!searchTerm) return availableBreeds;
    return availableBreeds.filter(breed =>
      (breed.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (breed.origin || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableBreeds, searchTerm]);

  const handleSelect = (breed) => {
    onSelect(breed);
    setSearchTerm('');
    setIsOpen(false);
  };

  const colors = [
    'border-blue-500 dark:border-blue-400',
    'border-purple-500 dark:border-purple-400',
    'border-pink-500 dark:border-pink-400'
  ];

  const bgColors = [
    'bg-blue-50 dark:bg-blue-900/20',
    'bg-purple-50 dark:bg-purple-900/20',
    'bg-pink-50 dark:bg-pink-900/20'
  ];

  const textColors = [
    'text-blue-700 dark:text-blue-300',
    'text-purple-700 dark:text-purple-300',
    'text-pink-700 dark:text-pink-300'
  ];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 ${colors[index]} transition-colors`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${textColors[index]}`}>
          {translateText('Raça #', language)}{index + 1}
        </h3>
        {selectedBreed && (
          <button
            onClick={onRemove}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={translateText('Remover raça', language)}
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {selectedBreed ? (
        // Breed Card
        <div className={`${bgColors[index]} rounded-lg p-4 transition-colors`}>
          {/* Image */}
          {(selectedBreed.image?.url || selectedBreed.reference_image_id) && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img
                src={selectedBreed.image?.url || `https://cdn2.thecatapi.com/images/${selectedBreed.reference_image_id}.jpg`}
                alt={selectedBreed.name}
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          {/* Info */}
          <h4 className={`text-xl font-bold ${textColors[index]} mb-2`}>
            {selectedBreed.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            📍 {selectedBreed.origin || translateText('N/D', language)}
          </p>
          <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-3">
            {getBreedDescription(selectedBreed.name, selectedBreed.description, language)}
          </p>
        </div>
      ) : (
        // Search Input
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder={translateText('Buscar ou selecionar raça...', language)}
              className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all"
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Dropdown */}
          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-80 overflow-hidden flex flex-col">
                {/* Search tip */}
                {searchTerm && (
                  <div className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-primary-700 dark:text-primary-300">
                      🔍 {translateText('Buscando', language)}: "{searchTerm}" ({filteredBreeds.length} {translateText('resultados', language)})
                    </p>
                  </div>
                )}

                {/* List */}
                <div className="overflow-y-auto max-h-72">
                  {filteredBreeds.length > 0 ? (
                    filteredBreeds.map((breed) => (
                      <button
                        key={breed.id}
                        onClick={() => handleSelect(breed)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {breed.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              📍 {breed.origin || translateText('N/D', language)}
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <div className="text-gray-400 dark:text-gray-600 mb-2">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">
                        {translateText('Nenhuma raça encontrada', language)}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                        {translateText('Tente buscar por outro nome', language)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Total count */}
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    {availableBreeds.length} {translateText(availableBreeds.length === 1 ? 'raça disponível' : 'raças disponíveis', language)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default BreedSelector;
