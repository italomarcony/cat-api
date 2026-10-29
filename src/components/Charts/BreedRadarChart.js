import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useTheme } from '../../hooks/useTheme';
import { getBreedRating, hasAnyBreedRatings } from '../../utils/breedData';
import { useLanguage } from '../../hooks/useLanguage';
import { translateText } from '../../utils/i18n';

/**
 * BreedRadarChart - Gráfico radar com características de uma raça
 */
function BreedRadarChart({ breed }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const { language } = useLanguage();

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    if (!breed || !canvasRef.current) return;

    const characteristics = [
      ['Afeto', 'affection_level'],
      ['Energia', 'energy_level'],
      ['Inteligência', 'intelligence'],
      ['Sociabilidade', 'social_needs'],
      ['C/ Crianças', 'child_friendly'],
      ['C/ Cães', 'dog_friendly'],
      ['Adaptabilidade', 'adaptability'],
      ['Vocalização', 'vocalisation']
    ];

    const labels = characteristics.map(([label]) => translateText(label, language));
    const data = characteristics.map(([, field]) => getBreedRating(breed, field));

    const isDark = theme === 'dark';

    const ctx = canvasRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: breed.name,
          data: data,
          fill: true,
          backgroundColor: 'rgba(14, 165, 233, 0.2)',
          borderColor: 'rgb(14, 165, 233)',
          pointBackgroundColor: 'rgb(14, 165, 233)',
          pointBorderColor: isDark ? '#1f2937' : '#fff',
          pointHoverBackgroundColor: isDark ? '#1f2937' : '#fff',
          pointHoverBorderColor: 'rgb(14, 165, 233)',
          pointRadius: 4,
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1,
              font: {
                size: 12
              },
              color: isDark ? '#d1d5db' : '#374151'
            },
            pointLabels: {
              font: {
                size: 13,
                weight: 'bold'
              },
              color: isDark ? '#d1d5db' : '#374151'
            },
            grid: {
              color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.parsed.r}/5`;
              }
            }
          }
        }
      }
    });

    chartRef.current = newChart;

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [breed, theme, language]);

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
        {translateText('Características', language)}
      </h3>
      {hasAnyBreedRatings([breed]) ? (
        <div style={{ height: '350px' }}>
          <canvas ref={canvasRef}></canvas>
        </div>
      ) : (
        <p className="py-16 text-center text-gray-600 dark:text-gray-300">
          {translateText('O plano gratuito da The Cat API fornece apenas dados básicos; as notas e características necessárias para este gráfico não estão disponíveis.', language)}
        </p>
      )}
    </div>
  );
}

export default BreedRadarChart;
