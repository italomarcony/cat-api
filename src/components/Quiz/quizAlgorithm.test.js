import { calculateMatches, hasQuizData } from './quizAlgorithm';

describe('quizAlgorithm', () => {
  test('does not return matches when breeds have no traits used by the quiz', () => {
    const breeds = [{ id: 'basic', name: 'Basic breed', origin: 'Thailand' }];

    expect(hasQuizData(breeds)).toBe(false);
    expect(calculateMatches({ 0: 'very_active' }, breeds)).toEqual([]);
  });

  test('uses available ratings and excludes missing ratings instead of treating them as zero', () => {
    const breeds = [
      { id: 'active', name: 'Active', energy_level: 5, adaptability: 4 },
      { id: 'calm', name: 'Calm', energy_level: 1, adaptability: 2 },
      { id: 'missing', name: 'Missing' }
    ];

    const matches = calculateMatches({ 0: 'very_active' }, breeds);

    expect(matches.map(({ breed }) => breed.id)).toEqual(['active', 'calm']);
    expect(matches[0].percentage).toBe(100);
    expect(matches[1].percentage).toBeLessThan(100);
    expect(matches[0].coverage).toBe(1);
  });

  test('parses boolean traits without confusing missing values with false', () => {
    const breeds = [
      { id: 'indoor', name: 'Indoor', indoor: '1' },
      { id: 'outdoor', name: 'Outdoor', indoor: 0 },
      { id: 'missing', name: 'Missing' }
    ];

    const matches = calculateMatches({ 1: 'small' }, breeds);

    expect(matches.map(({ breed }) => breed.id)).toEqual(['indoor', 'outdoor']);
    expect(matches[0].percentage).toBe(100);
    expect(matches[1].percentage).toBeLessThan(100);
  });
});
