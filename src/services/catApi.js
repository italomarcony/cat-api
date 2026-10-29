// Serviço centralizado para chamadas à Cat API

const API_BASE_URL = 'https://api.thecatapi.com/v1';

// Opcional: adicione sua API key para maior limite de requisições
// Obtenha em: https://thecatapi.com/signup
const API_KEY = process.env.REACT_APP_CAT_API_KEY || '';

const headers = API_KEY ? { 'x-api-key': API_KEY } : {};

const createApiError = (response, resource) => {
  if (response.status === 403) {
    return new Error(
      'A The Cat API recusou o acesso (403). Verifique se REACT_APP_CAT_API_KEY está configurada com uma chave válida.'
    );
  }

  return new Error(`Erro ao buscar ${resource}: ${response.status}`);
};

/**
 * Busca todas as raças de gatos
 * @param {number} limit - Limite de raças a retornar
 * @returns {Promise<Array>} Array de raças
 */
export const fetchBreeds = async (limit = null) => {
  try {
    const url = limit
      ? `${API_BASE_URL}/breeds?limit=${limit}`
      : `${API_BASE_URL}/breeds`;

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw createApiError(response, 'raças');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar raças:', error);
    throw error;
  }
};

/**
 * Busca imagens de uma raça específica
 * @param {string} breedId - ID da raça
 * @param {number} limit - Número de imagens a retornar
 * @returns {Promise<Array>} Array de objetos de imagem
 */
export const fetchBreedImages = async (breedId, limit = 5) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/images/search?breed_ids=${breedId}&limit=${limit}`,
      { headers }
    );

    if (!response.ok) {
      throw createApiError(response, 'imagens');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
    throw error;
  }
};

/**
 * Busca uma raça específica por ID
 * @param {string} breedId - ID da raça
 * @returns {Promise<Object>} Dados da raça
 */
export const fetchBreedById = async (breedId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/breeds/${breedId}`, { headers });

    if (!response.ok) {
      throw createApiError(response, 'raça');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar raça:', error);
    throw error;
  }
};
