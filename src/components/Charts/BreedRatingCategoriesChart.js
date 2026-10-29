import React, { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartContainer from '../UI/ChartContainer';
import { calculateRatingCategoryCounts } from '../../utils/breedData';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { translateText } from '../../utils/i18n';

function BreedRatingCategoriesChart({ breeds, title, icon, footer, categories }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { language } = useLanguage();
  const { theme } = useTheme();
  const counts = useMemo(
    () => calculateRatingCategoryCounts(breeds, categories),
    [breeds, categories]
  );
  const hasData = counts.some((category) => category.sampleSize > 0);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    if (!hasData || !canvasRef.current) return undefined;

    const isDark = theme === 'dark';
    chartRef.current = new Chart(canvasRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: counts.map((category) => translateText(category.label, language)),
        datasets: [{
          label: translateText('Raças', language),
          data: counts.map((category) => category.count),
          backgroundColor: 'rgba(139, 92, 246, 0.6)',
          borderColor: 'rgba(139, 92, 246, 1)',
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
              label: (context) => {
                const category = counts[context.dataIndex];
                return `${context.parsed.y} ${translateText('raças', language)} (${category.sampleSize} ${translateText('com dados', language)})`;
              }
            }
          }
        }
      }
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [counts, hasData, language, theme]);

  return (
    <ChartContainer
      title={translateText(title, language)}
      icon={icon}
      footer={translateText(footer, language)}
    >
      {hasData ? (
        <div style={{ height: '350px' }}>
          <canvas ref={canvasRef} />
        </div>
      ) : (
        <p className="py-12 text-center text-gray-600 dark:text-gray-300">
          {translateText('O plano gratuito da The Cat API fornece apenas dados básicos; as notas e características necessárias para este gráfico não estão disponíveis.', language)}
        </p>
      )}
    </ChartContainer>
  );
}

export default BreedRatingCategoriesChart;
