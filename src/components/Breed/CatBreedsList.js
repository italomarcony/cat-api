import React, { useState, useMemo } from 'react';
import { useCatBreeds } from '../../hooks/useCatBreeds';
import CatBreedCard from './CatBreedCard';
import BreedDetailModal from './BreedDetailModal';
import SearchBar from '../UI/SearchBar';
import FilterBar from '../UI/FilterBar';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';
import { getBreedRating, parseBoolean } from '../../utils/breedData';
import { useLanguage } from '../../hooks/useLanguage';
import { translateText } from '../../utils/i18n';

function CatBreedsList() {
  const { language } = useLanguage();
  const { breeds, loading, error } = useCatBreeds();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [energyFilter, setEnergyFilter] = useState('all');
  const [originFilter, setOriginFilter] = useState('all');
  const [childFriendlyFilter, setChildFriendlyFilter] = useState('all');
  const [dogFriendlyFilter, setDogFriendlyFilter] = useState('all');
  const [indoorFilter, setIndoorFilter] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const availableRatings = useMemo(() => ({
    affection: breeds.some((breed) => getBreedRating(breed, 'affection_level') !== null),
    energy: breeds.some((breed) => getBreedRating(breed, 'energy_level') !== null),
    intelligence: breeds.some((breed) => getBreedRating(breed, 'intelligence') !== null),
    childFriendly: breeds.some((breed) => getBreedRating(breed, 'child_friendly') !== null),
    dogFriendly: breeds.some((breed) => getBreedRating(breed, 'dog_friendly') !== null),
    indoor: breeds.some((breed) => parseBoolean(breed.indoor) !== null)
  }), [breeds]);

  // Extrair todas as origens únicas para o dropdown
  const availableOrigins = useMemo(() => {
    const origins = breeds.map(breed => breed.origin).filter(Boolean);
    return [...new Set(origins)].sort();
  }, [breeds]);

  // Filtrar e ordenar raças
  const filteredAndSortedBreeds = useMemo(() => {
    let filtered = breeds;

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (breed) =>
          breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (breed.origin || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          breed.temperament?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro de energia
    if (energyFilter !== 'all') {
      filtered = filtered.filter((breed) => {
        const rating = getBreedRating(breed, 'energy_level');
        if (rating === null) return false;
        if (energyFilter === 'low') return rating <= 2;
        if (energyFilter === 'medium') return rating >= 3 && rating <= 4;
        if (energyFilter === 'high') return rating === 5;
        return true;
      });
    }

    // Filtro de origem
    if (originFilter !== 'all') {
      filtered = filtered.filter((breed) => breed.origin === originFilter);
    }

    // Filtro de compatibilidade com crianças
    if (childFriendlyFilter !== 'all') {
      filtered = filtered.filter((breed) => (
        (getBreedRating(breed, 'child_friendly') ?? -1) >= parseInt(childFriendlyFilter, 10)
      ));
    }

    // Filtro de compatibilidade com cães
    if (dogFriendlyFilter !== 'all') {
      filtered = filtered.filter((breed) => (
        (getBreedRating(breed, 'dog_friendly') ?? -1) >= parseInt(dogFriendlyFilter, 10)
      ));
    }

    // Filtro indoor
    if (indoorFilter) {
      filtered = filtered.filter((breed) => parseBoolean(breed.indoor) === true);
    }

    // Ordenação
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'affection':
        case 'energy':
        case 'intelligence': {
          const field = { affection: 'affection_level', energy: 'energy_level', intelligence: 'intelligence' }[sortBy];
          const first = getBreedRating(a, field);
          const second = getBreedRating(b, field);
          if (first === null) return second === null ? a.name.localeCompare(b.name) : 1;
          if (second === null) return -1;
          return second - first;
        }
        default:
          return 0;
      }
    });

    return sorted;
  }, [breeds, searchTerm, sortBy, energyFilter, originFilter, childFriendlyFilter, dogFriendlyFilter, indoorFilter]);

  // Limpar todos os filtros
  const handleClearFilters = () => {
    setSearchTerm('');
    setSortBy('name');
    setEnergyFilter('all');
    setOriginFilter('all');
    setChildFriendlyFilter('all');
    setDogFriendlyFilter('all');
    setIndoorFilter(false);
  };

  const handleOpenModal = (breed) => {
    setSelectedBreed(breed);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBreed(null), 300); // Delay para animação
  };

  const handleNavigate = (direction) => {
    const currentIndex = filteredAndSortedBreeds.findIndex(b => b.id === selectedBreed.id);
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredAndSortedBreeds.length - 1;
    } else {
      newIndex = currentIndex < filteredAndSortedBreeds.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedBreed(filteredAndSortedBreeds[newIndex]);
  };

  const canNavigatePrev = selectedBreed && filteredAndSortedBreeds.length > 1;
  const canNavigateNext = selectedBreed && filteredAndSortedBreeds.length > 1;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner message={translateText('Carregando raças de gatos...', language)} />
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
      {/* Busca */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={translateText('Buscar por nome, origem ou temperamento...', language)}
      />

      {/* Filtros */}
      <FilterBar
        sortBy={sortBy}
        onSortChange={setSortBy}
        energyFilter={energyFilter}
        onEnergyFilterChange={setEnergyFilter}
        originFilter={originFilter}
        onOriginFilterChange={setOriginFilter}
        childFriendlyFilter={childFriendlyFilter}
        onChildFriendlyFilterChange={setChildFriendlyFilter}
        dogFriendlyFilter={dogFriendlyFilter}
        onDogFriendlyFilterChange={setDogFriendlyFilter}
        indoorFilter={indoorFilter}
        onIndoorFilterChange={setIndoorFilter}
        availableOrigins={availableOrigins}
        availableRatings={availableRatings}
        onClearFilters={handleClearFilters}
      />

      {/* Contador de resultados */}
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredAndSortedBreeds.length} {translateText(filteredAndSortedBreeds.length === 1 ? 'raça encontrada' : 'raças encontradas', language)}
        </p>
      </div>

      {/* Grid de raças */}
      {filteredAndSortedBreeds.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {translateText('Nenhuma raça encontrada com os filtros selecionados.', language)}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedBreeds.map((breed) => (
            <CatBreedCard
              key={breed.id}
              breed={breed}
              onClick={() => handleOpenModal(breed)}
            />
          ))}
        </div>
      )}

      {/* Modal de Detalhes */}
      <BreedDetailModal
        breed={selectedBreed}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
        canNavigatePrev={canNavigatePrev}
        canNavigateNext={canNavigateNext}
      />
    </div>
  );
}

export default CatBreedsList;
