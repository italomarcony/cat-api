import React, { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartContainer from '../UI/ChartContainer';
import { parseLifeSpan } from '../../utils/breedData';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { translateText } from '../../utils/i18n';

function HealthAndWellnessChart({ breeds }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { language } = useLanguage();
  const { theme } = useTheme();
  const lifespanGroups = useMemo(() => {
    const groups = [
      { label: 'Menos de 12 anos', count: 0 },
      { label: '12 a 14 anos', count: 0 },
      { label: '15 anos ou mais', count: 0 }
    ];

    breeds.forEach((breed) => {
      const lifespan = parseLifeSpan(breed.life_span);
      if (lifespan === null) return;
      if (lifespan < 12) groups[0].count += 1;
      else if (lifespan < 15) groups[1].count += 1;
      else groups[2].count += 1;
    });

    return groups;
  }, [breeds]);
  const sampleSize = lifespanGroups.reduce((total, group) => total + group.count, 0);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    if (!sampleSize || !canvasRef.current) return undefined;

    const isDark = theme === 'dark';
    chartRef.current = new Chart(canvasRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: lifespanGroups.map((group) => translateText(group.label, language)),
        datasets: [{
          label: translateText('Raças', language),
          data: lifespanGroups.map((group) => group.count),
          backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(34, 197, 94, 0.6)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(34, 197, 94, 1)'],
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0, color: isDark ? '#d1d5db' : '#374151' },
            grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
          },
          x: {
            ticks: { color: isDark ? '#d1d5db' : '#374151' },
            grid: { display: false }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `${context.parsed.y} ${translateText('raças', language)}`
            }
          }
        }
      }
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [language, lifespanGroups, sampleSize, theme]);

  return (
    <ChartContainer
      title={translateText('Distribuição da Expectativa de Vida', language)}
      icon="❤️"
      footer={translateText('A expectativa de vida vem da API; notas de saúde não estão disponíveis no plano atual.', language)}
    >
      {sampleSize ? (
        <div style={{ height: '350px' }}>
          <canvas ref={canvasRef} />
        </div>
      ) : (
        <p className="py-12 text-center text-gray-600 dark:text-gray-300">
          {translateText('Não há dados válidos para calcular esta estatística.', language)}
        </p>
      )}
    </ChartContainer>
  );
}

export default HealthAndWellnessChart;
