import {
  getBreedRating,
  getBreedTemperament,
  getBreedAverageWeight,
  calculateRatingCategoryCounts,
  parseBoolean,
  parseLifeSpan,
  parseNumericRange,
  parseRating
} from './breedData';

describe('breed data parsing', () => {
  test.each([
    [5, 5],
    ['4', 4],
    [0, null],
    [null, null],
    ['', null],
    [true, null],
    ['   ', null],
    ['not a score', null],
    [6, null]
  ])('parses rating %p as %p', (input, expected) => {
    expect(parseRating(input)).toBe(expected);
  });

  test('reads a missing breed score as unavailable', () => {
    expect(getBreedRating({ affection_level: null }, 'affection_level')).toBeNull();
    expect(getBreedRating({}, 'affection_level')).toBeNull();
  });

  test('counts rating categories only from valid 1-5 scores', () => {
    const categories = calculateRatingCategoryCounts([
      { energy_level: 5 },
      { energy_level: 3 },
      { energy_level: 0 },
      {}
    ], [{ field: 'energy_level', label: 'High', minimum: 4 }]);

    expect(categories).toEqual([{ label: 'High', count: 1, sampleSize: 2 }]);
  });

  test.each([
    [true, true],
    [false, false],
    [1, true],
    [0, false],
    ['false', false],
    [' TRUE ', true],
    [' False ', false],
    [null, null]
  ])('parses boolean %p as %p', (input, expected) => {
    expect(parseBoolean(input)).toBe(expected);
  });

  test('parses a life-span range and rejects invalid values', () => {
    expect(parseLifeSpan('14-17')).toBe(15.5);
    expect(parseLifeSpan('14 – 17')).toBe(15.5);
    expect(parseLifeSpan('unknown')).toBeNull();
    expect(parseLifeSpan(undefined)).toBeNull();
  });

  test('parses weight range midpoints and rejects invalid or reversed ranges', () => {
    expect(parseNumericRange('3 - 5')).toBe(4);
    expect(parseNumericRange('4.5')).toBe(4.5);
    expect(parseNumericRange('5 - 3')).toBeNull();
    expect(parseNumericRange('unknown')).toBeNull();
    expect(getBreedAverageWeight({ weight: { metric: '3 - 5' } })).toBe(4);
    expect(getBreedAverageWeight({ weight: { metric: 'unknown' } })).toBeNull();
  });

  test('translates temperament terms without changing the source text', () => {
    expect(getBreedTemperament('Affectionate, Social, Intelligent', 'pt-BR'))
      .toBe('Afetuoso, Sociável, Inteligente');
    expect(getBreedTemperament('Affectionate, Social', 'en-US'))
      .toBe('Affectionate, Social');
    expect(getBreedTemperament('Unlisted trait', 'pt-BR')).toBe('Unlisted trait');
  });
});
