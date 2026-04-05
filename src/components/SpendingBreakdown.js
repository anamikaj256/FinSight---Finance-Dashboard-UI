import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useApp } from '../context/AppContext';
import { getCategoryBreakdown } from '../utils/calculations';

ChartJS.register(ArcElement, Tooltip, Legend);

const SpendingBreakdown = () => {
  const { transactions, theme } = useApp();
  const breakdown = getCategoryBreakdown(transactions);

  const isDark = theme === 'dark';

  const chartColors = [
    '#818cf8',
    '#10b981',
    '#f43f5e',
    '#f59e0b',
    '#8b5cf6',
    '#ec4899',
    '#14b8a6',
    '#f97316',
  ];

  const chartData = {
    labels: breakdown.map((b) => b.category),
    datasets: [
      {
        data: breakdown.map((b) => b.amount),
        backgroundColor: chartColors,
        borderColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.8)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDark ? '#fff' : '#0f172a',
          padding: 15,
          font: {
            size: 11,
            weight: '400',
          },
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i];
                return {
                  text: `${label}: $${value.toLocaleString()}`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDark ? '#fff' : '#0f172a',
        bodyColor: isDark ? '#fff' : '#0f172a',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className={`glass-panel ${
      theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
    } p-6 animate-in fade-in slide-in-from-bottom-4`}
    style={{ animationDelay: '400ms', animationDuration: '600ms' }}
    data-testid="spending-breakdown-chart">
      <h2 className="text-lg font-light tracking-tight mb-6">Spending Breakdown</h2>
      <div className="h-[300px]">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SpendingBreakdown;