import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { translateText } from '../../utils/i18n';

function FilterBar({
  sortBy,
  onSortChange,
  energyFilter,
  onEnergyFilterChange,
  originFilter,
  onOriginFilterChange,
  childFriendlyFilter,
  onChildFriendlyFilterChange,
  dogFriendlyFilter,
  onDogFriendlyFilterChange,
  indoorFilter,
  onIndoorFilterChange,
  availableOrigins = [],
  availableRatings = {},
  onClearFilters
}) {
  const { language } = useLanguage();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const hasRating = (key) => availableRatings[key] !== false;

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      {/* Filtros Básicos */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="flex flex-wrap gap-4 mb-4">
          {/* Ordenação */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📊 {translateText('Ordenar por:', language)}
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all"
            >
              <option value="name">{translateText('Nome (A-Z)', language)}</option>
              <option value="affection" disabled={!hasRating('affection')}>{translateText('Nível de Afeto', language)}</option>
              <option value="energy" disabled={!hasRating('energy')}>{translateText('Nível de Energia', language)}</option>
              <option value="intelligence" disabled={!hasRating('intelligence')}>{translateText('Inteligência', language)}</option>
            </select>
          </div>

          {/* Filtro de Energia */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ⚡ {translateText('Nível de Energia:', language)}
            </label>
            <select
              value={energyFilter}
              title={!hasRating('energy') ? translateText('Esta informação não é fornecida pelo plano atual da The Cat API.', language) : undefined}
              onChange={(e) => onEnergyFilterChange(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all"
            >
              <option value="all">{translateText('Todos', language)}</option>
              <option value="low" disabled={!hasRating('energy')}>{translateText('Baixa (1-2)', language)}</option>
              <option value="medium" disabled={!hasRating('energy')}>{translateText('Média (3-4)', language)}</option>
              <option value="high" disabled={!hasRating('energy')}>{translateText('Alta (5)', language)}</option>
            </select>
          </div>

          {/* Filtro de Origem */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              🌍 {translateText('Origem:', language)}
            </label>
            <select
              value={originFilter}
              onChange={(e) => onOriginFilterChange(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all"
            >
              <option value="all">{translateText('Todos os Países', language)}</option>
              {availableOrigins.map((origin) => (
                <option key={origin} value={origin}>
                  {origin}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botão Filtros Avançados */}
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
          >
            <svg
              className={`w-5 h-5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {translateText(showAdvanced ? 'Ocultar Filtros Avançados' : 'Mostrar Filtros Avançados', language)}
          </button>

          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {translateText('Limpar Filtros', language)}
            </button>
          )}
        </div>

        {/* Filtros Avançados (Collapsible) */}
        {showAdvanced && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6 animate-slide-up">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🔍 {translateText('Filtros Avançados', language)}
            </h3>
            {(!hasRating('childFriendly') || !hasRating('dogFriendly') || !hasRating('indoor')) && (
              <p role="note" className="text-sm text-amber-700 dark:text-amber-300">
                {translateText('Alguns filtros estão desativados porque a resposta da API não inclui essas características.', language)}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Compatibilidade com Crianças */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  👶 {translateText('Compatibilidade com Crianças:', language)} {childFriendlyFilter === 'all' ? translateText('Todos', language) : `${childFriendlyFilter}+`}
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    disabled={!hasRating('childFriendly')}
                    title={!hasRating('childFriendly') ? translateText('Esta informação não é fornecida pelo plano atual da The Cat API.', language) : undefined}
                    value={childFriendlyFilter === 'all' ? 0 : childFriendlyFilter}
                    onChange={(e) => onChildFriendlyFilterChange(e.target.value === '0' ? 'all' : e.target.value)}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between mt-2 px-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{translateText('Todos', language)}</span>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <span
                        key={level}
                        className={`text-xs ${
                          childFriendlyFilter !== 'all' && parseInt(childFriendlyFilter) >= level
                            ? 'text-primary-600 dark:text-primary-400 font-semibold'
                            : 'text-gray-400 dark:text-gray-600'
                        }`}
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compatibilidade com Cães */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  🐕 {translateText('Compatibilidade com Cães:', language)} {dogFriendlyFilter === 'all' ? translateText('Todos', language) : `${dogFriendlyFilter}+`}
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    disabled={!hasRating('dogFriendly')}
                    title={!hasRating('dogFriendly') ? translateText('Esta informação não é fornecida pelo plano atual da The Cat API.', language) : undefined}
                    value={dogFriendlyFilter === 'all' ? 0 : dogFriendlyFilter}
                    onChange={(e) => onDogFriendlyFilterChange(e.target.value === '0' ? 'all' : e.target.value)}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between mt-2 px-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{translateText('Todos', language)}</span>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <span
                        key={level}
                        className={`text-xs ${
                          dogFriendlyFilter !== 'all' && parseInt(dogFriendlyFilter) >= level
                            ? 'text-primary-600 dark:text-primary-400 font-semibold'
                            : 'text-gray-400 dark:text-gray-600'
                        }`}
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Checkbox Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Indoor */}
              <label className={`flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors ${hasRating('indoor') ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600' : 'opacity-60 cursor-not-allowed'}`}>
                <input
                  type="checkbox"
                  disabled={!hasRating('indoor')}
                  title={!hasRating('indoor') ? translateText('Esta informação não é fornecida pelo plano atual da The Cat API.', language) : undefined}
                  checked={indoorFilter}
                  onChange={(e) => onIndoorFilterChange(e.target.checked)}
                  className="w-5 h-5 text-primary-600 bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 rounded focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xl">🏠</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {translateText('Adequado para Ambientes Internos', language)}
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
