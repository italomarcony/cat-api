import React, { useState, useEffect } from 'react';
import Modal from '../UI/Modal';
import ImageGallery from '../UI/ImageGallery';
import ShareButtons from '../UI/ShareButtons';
import BreedRadarChart from '../Charts/BreedRadarChart';
import { fetchBreedImages } from '../../services/catApi';
import { useLanguage } from '../../hooks/useLanguage';
import { getBreedTemperament, parseBoolean } from '../../utils/breedData';
import { getBreedDescription } from '../../utils/breedTranslations';
import { translateText } from '../../utils/i18n';

/**
 * BreedDetailModal - Modal com detalhes completos da raça
 */
function BreedDetailModal({ breed, isOpen, onClose, onNavigate, canNavigatePrev, canNavigateNext }) {
  const { language } = useLanguage();
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

  // Buscar imagens da raça
  useEffect(() => {
    if (!breed || !isOpen) return;
    let isCurrent = true;
    setImages([]);
    setLoadingImages(true);

    const loadImages = async () => {
      try {
        const imageData = await fetchBreedImages(breed.id, 5);
        const imageUrls = imageData.map(img => img.url).filter(Boolean);

        // Adicionar imagem de referência se existir
        if (breed.image?.url) {
          if (isCurrent) setImages([breed.image.url, ...imageUrls]);
        } else if (breed.reference_image_id) {
          if (isCurrent) setImages([
            `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`,
            ...imageUrls
          ]);
        } else {
          if (isCurrent) setImages(imageUrls);
        }
      } catch (error) {
        console.error('Erro ao carregar imagens:', error);
        // Fallback para imagem de referência
        if (breed.image?.url) {
          if (isCurrent) setImages([breed.image.url]);
        } else if (breed.reference_image_id) {
          if (isCurrent) setImages([`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`]);
        }
      } finally {
        if (isCurrent) setLoadingImages(false);
      }
    };

    loadImages();

    return () => {
      isCurrent = false;
    };
  }, [breed, isOpen]);

  if (!breed) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        {/* Header com Nome e Navegação */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{breed.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {breed.origin || translateText('N/D', language)}
            </p>
          </div>

          {/* Navegação entre raças */}
          {onNavigate && (
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate('prev')}
                disabled={!canNavigatePrev}
                className={`p-2 rounded-lg transition-colors ${
                  canNavigatePrev
                    ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                }`}
                title={translateText('Raça anterior', language)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => onNavigate('next')}
                disabled={!canNavigateNext}
                className={`p-2 rounded-lg transition-colors ${
                  canNavigateNext
                    ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                }`}
                title={translateText('Próxima raça', language)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Grid de 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coluna Esquerda: Galeria + Descrição */}
          <div className="space-y-6">
            {/* Galeria de Imagens */}
            {loadingImages ? (
              <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500">{translateText('Carregando imagens...', language)}</span>
              </div>
            ) : (
              <ImageGallery key={breed.id} images={images} alt={breed.name} />
            )}

            {/* Descrição */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{translateText('Sobre esta raça', language)}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{getBreedDescription(breed.name, breed.description, language)}</p>
            </div>

            {/* Temperamento */}
            {breed.temperament && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{translateText('Temperamento', language)}</h3>
                <div className="flex flex-wrap gap-2">
                  {getBreedTemperament(breed.temperament, language).split(',').map((trait, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full"
                    >
                      {trait.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Coluna Direita: Gráfico + Informações */}
          <div className="space-y-6">
            {/* Gráfico Radar */}
            <BreedRadarChart breed={breed} />

            {/* Informações Detalhadas */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{translateText('Informações', language)}</h3>
              <div className="space-y-3">
                {breed.life_span && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{translateText('Expectativa de Vida', language)}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{breed.life_span} {translateText('anos', language)}</span>
                  </div>
                )}
                {breed.weight?.metric && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{translateText('Peso', language)}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{breed.weight.metric} kg</span>
                  </div>
                )}
                {breed.origin && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{translateText('Origem', language)}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{breed.origin}</span>
                  </div>
                )}
                {parseBoolean(breed.indoor) !== null && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{translateText('Para Ambientes Internos', language)}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{translateText(parseBoolean(breed.indoor) ? 'Sim' : 'Não', language)}</span>
                  </div>
                )}
                {parseBoolean(breed.lap) !== null && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{translateText('Gosta de Colo', language)}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{translateText(parseBoolean(breed.lap) ? 'Sim' : 'Não', language)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Links Externos */}
            {(breed.wikipedia_url || breed.cfa_url || breed.vcahospitals_url) && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{translateText('Saiba Mais', language)}</h3>
                <div className="space-y-2">
                  {breed.wikipedia_url && (
                    <a
                      href={breed.wikipedia_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 12.514h-2.195l-1.007 2.963h-1.39l2.904-7.954h1.594l2.904 7.954h-1.413l-1.007-2.963h-.39zm-8.195 0H7.506l-1.007 2.963H5.11l2.904-7.954h1.594l2.904 7.954H11.1l-1.007-2.963h-.394z"/>
                      </svg>
                      Wikipedia
                    </a>
                  )}
                  {breed.cfa_url && (
                    <a
                      href={breed.cfa_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                      </svg>
                      Cat Fanciers' Association
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer com Compartilhamento */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{translateText('Compartilhar esta raça', language)}</h3>
          <ShareButtons breed={breed} />
        </div>
      </div>
    </Modal>
  );
}

export default BreedDetailModal;
