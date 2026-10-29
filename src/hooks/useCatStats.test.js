import { calculateCatStats } from './useCatStats';

describe('calculateCatStats', () => {
  test('does not treat missing or invalid ratings as zero', () => {
    const stats = calculateCatStats([
      { name: 'No ratings', affection_level: null, energy_level: undefined },
      { name: 'Invalid rating', affection_level: 'unknown', energy_level: '' }
    ]);

    expect(stats.averageAffection).toBeNull();
    expect(stats.averageEnergy).toBeNull();
    expect(stats.mostAffectionate).toBeNull();
    expect(stats.mostEnergetic).toBeNull();
    expect(stats.familyFriendlyPercent).toBeNull();
    expect(stats.dogFriendlyPercent).toBeNull();
  });

  test('averages only valid numeric ratings and uses rated breeds as the denominator', () => {
    const stats = calculateCatStats([
      { name: 'A', affection_level: '4', child_friendly: 5, energy_level: 5 },
      { name: 'B', affection_level: 2, child_friendly: null, energy_level: 3 },
      { name: 'C', affection_level: 8, child_friendly: 3, energy_level: 'invalid' }
    ]);

    expect(stats.averageAffection).toBe(3);
    expect(stats.averageEnergy).toBe(4);
    expect(stats.mostAffectionate.name).toBe('A');
    expect(stats.mostEnergetic.name).toBe('A');
    expect(stats.familyFriendlyCount).toBe(1);
    expect(stats.familyFriendlySampleSize).toBe(2);
    expect(stats.familyFriendlyPercent).toBe(50);
    expect(stats.energyDistribution).toEqual({ low: 0, medium: 1, high: 1, sampleSize: 2 });
  });

  test('counts each temperament once per breed and excludes missing origins', () => {
    const stats = calculateCatStats([
      { origin: 'Egypt', temperament: 'Affectionate, Social, Affectionate' },
      { origin: 'Egypt', temperament: 'Social' },
      { temperament: 'Curious' }
    ]);

    expect(stats.topOrigins).toEqual([{ origin: 'Egypt', count: 2 }]);
    expect(stats.topTemperaments).toEqual([
      { trait: 'Social', count: 2 },
      { trait: 'Affectionate', count: 1 },
      { trait: 'Curious', count: 1 }
    ]);
  });

  test('calculates lifespan and weight estimates from available API ranges', () => {
    const stats = calculateCatStats([
      { life_span: '12 - 16', weight: { metric: '3 - 5' } },
      { life_span: '10-14', weight: { metric: '4 - 6' } },
      { life_span: 'unknown', weight: { metric: 'unknown' } }
    ]);

    expect(stats.averageLifeSpan).toBe(13);
    expect(stats.lifeSpanSampleSize).toBe(2);
    expect(stats.averageWeight).toBe(4.5);
    expect(stats.weightSampleSize).toBe(2);
  });

  test('reports unavailable estimates when basic range data is missing', () => {
    const stats = calculateCatStats([{ life_span: '', weight: null }]);

    expect(stats.averageLifeSpan).toBeNull();
    expect(stats.lifeSpanSampleSize).toBe(0);
    expect(stats.averageWeight).toBeNull();
    expect(stats.weightSampleSize).toBe(0);
  });
});
