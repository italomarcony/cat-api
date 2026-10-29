const RATING_FIELDS = [
  'adaptability',
  'affection_level',
  'child_friendly',
  'dog_friendly',
  'energy_level',
  'grooming',
  'health_issues',
  'intelligence',
  'shedding_level',
  'social_needs',
  'stranger_friendly',
  'vocalisation'
];

export function parseRating(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value !== 'number' && typeof value !== 'string') return null;
  if (typeof value === 'string' && !value.trim()) return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 1 && parsed <= 5 ? parsed : null;
}

export function getBreedRating(breed, field) {
  return parseRating(breed?.[field]);
}

export function hasAnyBreedRatings(breeds = []) {
  return breeds.some((breed) => RATING_FIELDS.some((field) => getBreedRating(breed, field) !== null));
}

export function calculateRatingCategoryCounts(breeds = [], categories = []) {
  return categories.map((category) => {
    const ratings = breeds
      .map((breed) => getBreedRating(breed, category.field))
      .filter((rating) => rating !== null);
    const matchingCount = ratings.filter((rating) => (
      rating >= category.minimum &&
      (category.maximum === undefined || rating <= category.maximum)
    )).length;

    return {
      label: category.label,
      count: ratings.length ? matchingCount : null,
      sampleSize: ratings.length
    };
  });
}

export function parseBoolean(value) {
  if (value === true || value === 1 || value === '1') return true;
  if (value === false || value === 0 || value === '0') return false;
  if (typeof value === 'string') {
    const normalizedValue = value.trim().toLowerCase();
    if (normalizedValue === 'true') return true;
    if (normalizedValue === 'false') return false;
  }
  return null;
}

export function parseNumericRange(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return null;

  const values = String(value)
    .trim()
    .split(/\s*[-–—]\s*/)
    .map((part) => Number(part.trim()));

  if (
    values.length < 1 ||
    values.length > 2 ||
    values.some((part) => !Number.isFinite(part) || part <= 0) ||
    (values.length === 2 && values[0] > values[1])
  ) return null;

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function parseLifeSpan(lifeSpan) {
  return parseNumericRange(lifeSpan);
}

export function getBreedAverageWeight(breed) {
  return parseNumericRange(breed?.weight?.metric);
}

export function getBreedTemperament(temperament, language) {
  if (typeof temperament !== 'string' || !temperament.trim()) return '';

  return temperament
    .split(',')
    .map((trait) => translateTrait(trait, language))
    .join(', ');
}

export function translateTrait(trait, language) {
  const trimmedTrait = typeof trait === 'string' ? trait.trim() : '';
  if (language !== 'pt-BR' || !trimmedTrait) return trimmedTrait;

  return temperamentTranslations[trimmedTrait.toLowerCase()] || trimmedTrait;
}

const temperamentTranslations = {
  active: 'Ativo',
  adaptable: 'Adaptável',
  adventurous: 'Aventureiro',
  affectionate: 'Afetuoso',
  agile: 'Ágil',
  alert: 'Alerta',
  athletic: 'Atlético',
  calm: 'Calmo',
  charming: 'Encantador',
  cheerful: 'Alegre',
  clever: 'Esperto',
  confident: 'Confiante',
  curious: 'Curioso',
  'daily brushing to prevent mats': 'Escovação diária para evitar nós',
  demanding: 'Exigente',
  dependent: 'Dependente',
  devoted: 'Devotado',
  docile: 'Dócil',
  'easily leash-trained': 'Acostuma-se facilmente à guia',
  'easy going': 'Tranquilo',
  easygoing: 'Tranquilo',
  energetic: 'Energético',
  expressive: 'Expressivo',
  'extremely affectionate': 'Extremamente afetuoso',
  friendly: 'Amigável',
  'fun-loving': 'Divertido',
  gentle: 'Gentil',
  'highly intelligent': 'Muito inteligente',
  'highly interactive': 'Muito interativo',
  independent: 'Independente',
  inquisitive: 'Investigador',
  intelligent: 'Inteligente',
  interactive: 'Interativo',
  lively: 'Vivaz',
  loving: 'Amoroso',
  loyal: 'Leal',
  'minimal grooming needed': 'Poucos cuidados com a pelagem',
  mischievous: 'Travesso',
  'not applicable - wild animal': 'Não aplicável — animal selvagem',
  observant: 'Observador',
  outgoing: 'Extrovertido',
  patient: 'Paciente',
  peaceful: 'Pacífico',
  'people-oriented': 'Orientado às pessoas',
  personable: 'Sociável',
  playful: 'Brincalhão',
  quiet: 'Quieto',
  'regular skin care - bathing and moisturizing needed': 'Cuidados regulares com a pele: banhos e hidratação',
  'regular skin care - weekly bathing to remove oils': 'Cuidados regulares com a pele: banho semanal para remover oleosidade',
  relaxed: 'Relaxado',
  reserved: 'Reservado',
  sedate: 'Tranquilo',
  sensible: 'Sensato',
  sensitive: 'Sensível',
  shy: 'Tímido',
  silly: 'Brincalhão',
  sociable: 'Sociável',
  social: 'Sociável',
  sweet: 'Dócil',
  'sweet-tempered': 'De temperamento dócil',
  talkative: 'Tagarela',
  tenacious: 'Persistente',
  tolerant: 'Tolerante',
  trainable: 'Adestrável',
  vocal: 'Vocal',
  warm: 'Afetuoso',
  'varies by individual - typically affectionate': 'Varia conforme o indivíduo — geralmente afetuoso',
  'varies widely - typically friendly': 'Varia bastante — geralmente amigável'
};
