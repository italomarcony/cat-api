import { getBreedRating, parseBoolean } from '../../utils/breedData';
import { questions } from './quizQuestions';

const BOOLEAN_TRAITS = new Set(['indoor', 'lap']);
const NON_RATING_TRAITS = new Set(['origin', ...BOOLEAN_TRAITS]);

export function hasQuizData(breeds = []) {
  const ratingTraits = questions.flatMap((question) => question.options)
    .flatMap((option) => Object.keys(option.weight || {}))
    .filter((trait) => !NON_RATING_TRAITS.has(trait));

  return breeds.some((breed) => (
    ratingTraits.some((trait) => getBreedRating(breed, trait) !== null) ||
    [...BOOLEAN_TRAITS].some((trait) => parseBoolean(breed[trait]) !== null)
  ));
}

export function calculateMatches(answers, breeds) {
  const totalCriteria = Object.entries(answers).reduce((total, [questionIndex, answer]) => {
    const option = questions[questionIndex]?.options.find(({ value }) => value === answer);
    return total + Object.keys(option?.weight || {}).length;
  }, 0);

  return breeds.map((breed) => {
    let score = 0;
    let maxScore = 0;
    let availableCriteria = 0;

    Object.entries(answers).forEach(([questionIndex, answer]) => {
      const option = questions[questionIndex]?.options.find(({ value }) => value === answer);
      if (!option?.weight) return;

      Object.entries(option.weight).forEach(([trait, preference]) => {
        if (trait === 'origin') {
          if (typeof breed.origin !== 'string' || !Array.isArray(preference) || !preference.length) return;
          const preferredOrigins = preference.map((origin) => origin.toLowerCase());
          if (preferredOrigins.includes(breed.origin.toLowerCase())) score += 15;
          maxScore += 15;
          availableCriteria += 1;
          return;
        }

        if (BOOLEAN_TRAITS.has(trait)) {
          const value = parseBoolean(breed[trait]);
          if (value === null) return;

          const maxPoints = trait === 'indoor' ? 10 : 8;
          if (preference === 0.5) {
            score += maxPoints / 2;
          } else if (value === (preference === 1)) {
            score += maxPoints;
          }
          maxScore += maxPoints;
          availableCriteria += 1;
          return;
        }

        const breedValue = getBreedRating(breed, trait);
        if (breedValue === null) return;

        const points = 10 * (1 - Math.abs(preference - breedValue) / 5);
        score += points;
        maxScore += 10;
        availableCriteria += 1;
      });
    });

    return {
      breed,
      score,
      maxScore,
      availableCriteria,
      totalCriteria,
      coverage: totalCriteria ? availableCriteria / totalCriteria : 0,
      percentage: maxScore ? Math.round((score / maxScore) * 100) : null
    };
  })
    .filter((match) => match.maxScore > 0)
    .sort((a, b) => b.percentage - a.percentage || b.coverage - a.coverage || a.breed.name.localeCompare(b.breed.name))
    .slice(0, 3);
}

export function getMatchReasons(answers, breed) {
  const reasons = [];

  Object.entries(answers).forEach(([questionIndex, answer]) => {
    const option = questions[questionIndex]?.options.find(({ value }) => value === answer);
    if (!option?.weight) return;

    Object.entries(option.weight).forEach(([trait, preference]) => {
      const rating = getBreedRating(breed, trait);
      const isIndoor = trait === 'indoor' ? parseBoolean(breed.indoor) : null;

      if (trait === 'energy_level' && preference >= 4 && rating !== null && rating >= 4) {
        reasons.push({ icon: '⚡', text: 'Alto nível de energia combina com seu estilo ativo' });
      } else if (trait === 'affection_level' && preference >= 4 && rating !== null && rating >= 4) {
        reasons.push({ icon: '❤️', text: 'Muito carinhoso, perfeito para quem adora atenção' });
      } else if (trait === 'child_friendly' && preference >= 4 && rating !== null && rating >= 4) {
        reasons.push({ icon: '👶', text: 'Excelente com crianças' });
      } else if (trait === 'dog_friendly' && preference >= 4 && rating !== null && rating >= 4) {
        reasons.push({ icon: '🐕', text: 'Convive muito bem com cachorros' });
      } else if (trait === 'adaptability' && preference >= 4 && rating !== null && rating >= 4) {
        reasons.push({ icon: '🔄', text: 'Altamente adaptável a diferentes ambientes' });
      } else if (trait === 'indoor' && preference === 1 && isIndoor === true) {
        reasons.push({ icon: '🏠', text: 'Ideal para ambientes internos' });
      } else if (trait === 'grooming' && preference <= 2 && rating !== null && rating <= 2) {
        reasons.push({ icon: '✨', text: 'Baixa manutenção de pelagem' });
      } else if (trait === 'intelligence' && rating !== null && rating >= 4) {
        reasons.push({ icon: '🧠', text: 'Muito inteligente e fácil de treinar' });
      }
    });
  });

  return reasons
    .filter((reason, index, allReasons) => allReasons.findIndex((item) => item.text === reason.text) === index)
    .slice(0, 4);
}
