import { useMemo } from 'react';
import { getBreedAverageWeight, getBreedRating, parseLifeSpan } from '../utils/breedData';

const getAverage = (breeds, field) => {
  const values = breeds
    .map((breed) => getBreedRating(breed, field))
    .filter((value) => value !== null);

  if (values.length === 0) return null;

  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

const getAverageOf = (breeds, getValue) => {
  const values = breeds
    .map(getValue)
    .filter((value) => value !== null);

  if (values.length === 0) return { average: null, sampleSize: 0 };

  return {
    average: values.reduce((sum, value) => sum + value, 0) / values.length,
    sampleSize: values.length
  };
};

const getTopRatedBreed = (breeds, field) => {
  const ratedBreeds = breeds
    .map((breed) => ({ breed, rating: getBreedRating(breed, field) }))
    .filter(({ rating }) => rating !== null);

  if (ratedBreeds.length === 0) return null;
  return ratedBreeds.reduce((top, item) => item.rating > top.rating ? item : top).breed;
};

const getFriendlyStats = (breeds, field) => {
  const ratedBreeds = breeds
    .map((breed) => ({ breed, rating: getBreedRating(breed, field) }))
    .filter(({ rating }) => rating !== null);
  const friendlyCount = ratedBreeds.filter(({ rating }) => rating >= 4).length;

  return {
    count: friendlyCount,
    sampleSize: ratedBreeds.length,
    percent: ratedBreeds.length
      ? Math.round((friendlyCount / ratedBreeds.length) * 100)
      : null
  };
};

export function calculateCatStats(breeds = []) {
  const validBreeds = Array.isArray(breeds) ? breeds : [];
  const energyRatings = validBreeds
    .map((breed) => getBreedRating(breed, 'energy_level'))
    .filter((rating) => rating !== null);
  const originCounts = validBreeds.reduce((counts, breed) => {
    if (typeof breed.origin !== 'string' || !breed.origin.trim()) return counts;
    counts[breed.origin] = (counts[breed.origin] || 0) + 1;
    return counts;
  }, {});
  const temperamentCounts = {};

  validBreeds.forEach((breed) => {
    const traits = typeof breed.temperament === 'string'
      ? new Set(breed.temperament.split(',').map((trait) => trait.trim()).filter(Boolean))
      : [];

    traits.forEach((trait) => {
      temperamentCounts[trait] = (temperamentCounts[trait] || 0) + 1;
    });
  });

  const familyFriendly = getFriendlyStats(validBreeds, 'child_friendly');
  const dogFriendly = getFriendlyStats(validBreeds, 'dog_friendly');
  const lifeSpanStats = getAverageOf(validBreeds, (breed) => parseLifeSpan(breed.life_span));
  const weightStats = getAverageOf(validBreeds, getBreedAverageWeight);

  return {
    totalBreeds: validBreeds.length,
    averageAffection: getAverage(validBreeds, 'affection_level'),
    averageEnergy: getAverage(validBreeds, 'energy_level'),
    averageIntelligence: getAverage(validBreeds, 'intelligence'),
    averageLifeSpan: lifeSpanStats.average,
    lifeSpanSampleSize: lifeSpanStats.sampleSize,
    averageWeight: weightStats.average,
    weightSampleSize: weightStats.sampleSize,
    mostAffectionate: getTopRatedBreed(validBreeds, 'affection_level'),
    mostEnergetic: getTopRatedBreed(validBreeds, 'energy_level'),
    familyFriendlyCount: familyFriendly.count,
    familyFriendlySampleSize: familyFriendly.sampleSize,
    familyFriendlyPercent: familyFriendly.percent,
    dogFriendlyCount: dogFriendly.count,
    dogFriendlySampleSize: dogFriendly.sampleSize,
    dogFriendlyPercent: dogFriendly.percent,
    topOrigins: Object.entries(originCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 5)
      .map(([origin, count]) => ({ origin, count })),
    energyDistribution: {
      low: energyRatings.filter((rating) => rating <= 2).length,
      medium: energyRatings.filter((rating) => rating >= 3 && rating <= 4).length,
      high: energyRatings.filter((rating) => rating >= 5).length,
      sampleSize: energyRatings.length
    },
    topTemperaments: Object.entries(temperamentCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 10)
      .map(([trait, count]) => ({ trait, count }))
  };
}

export const useCatStats = (breeds) => useMemo(
  () => calculateCatStats(breeds),
  [breeds]
);
