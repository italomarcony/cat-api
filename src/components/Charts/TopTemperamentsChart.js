import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartContainer from '../UI/ChartContainer';
import { getBreedTemperament } from '../../utils/breedData';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { translateText } from '../../utils/i18n';

/**
 * Gráfico de Top 10 Temperamentos mais Comuns
 */
function TopTemperamentsChart({ breeds }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { language } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    // Destruir gráfico anterior se existir
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    if (!breeds || breeds.length === 0 || !canvasRef.current) return;

    // Contar temperamentos
    const temperamentCounts = {};
    breeds.forEach(breed => {
      if (breed.temperament) {
        new Set(getBreedTemperament(breed.temperament, language).split(',')).forEach(trait => {
          const t = trait.trim();
          temperamentCounts[t] = (temperamentCounts[t] || 0) + 1;
        });
      }
    });

    // Top 10
    const sortedTemperaments = Object.entries(temperamentCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const labels = sortedTemperaments.map(([trait]) => trait);
    const data = sortedTemperaments.map(([, count]) => count);

    const isDark = theme === 'dark';

    const ctx = canvasRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: translateText('Raças', language),
          data: data,
          backgroundColor: 'rgba(139, 92, 246, 0.6)', // purple
          borderColor: 'rgba(139, 92, 246, 1)',
          borderWidth: 2,
          borderRadius: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y', // Barras horizontais
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.parsed.x} ${translateText('raças', language)}`;
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: isDark ? '#d1d5db' : '#374151'
            },
            grid: {
              display: true,
              color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
            }
          },
          y: {
            ticks: {
              color: isDark ? '#d1d5db' : '#374151'
            },
            grid: {
              display: false
            }
          }
        }
      }
    });

    chartRef.current = newChart;

    // Cleanup ao desmontar
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [breeds, language, theme]);

  return (
    <ChartContainer
      title={translateText('Temperamentos Mais Comuns', language)}
      icon="😸"
      footer={translateText('Top 10 características de temperamento encontradas', language)}
    >
      {breeds?.some((breed) => typeof breed.temperament === 'string' && breed.temperament.trim()) ? (
        <div style={{ height: '400px' }}>
          <canvas ref={canvasRef}></canvas>
        </div>
      ) : (
        <p className="py-12 text-center text-gray-600 dark:text-gray-300">
          {translateText('Não há dados válidos para calcular esta estatística.', language)}
        </p>
      )}
    </ChartContainer>
  );
}

export default TopTemperamentsChart;
