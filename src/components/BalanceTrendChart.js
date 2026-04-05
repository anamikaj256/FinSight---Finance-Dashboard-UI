import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useApp } from '../context/AppContext';
import { getBalanceTrend } from '../utils/calculations';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BalanceTrendChart = () => {
  const { transactions, theme } = useApp();
  const trendData = getBalanceTrend(transactions);

  const labels = trendData.map((d) => format(new Date(d.date), 'MMM dd'));
  const data = trendData.map((d) => d.balance);

  const isDark = theme === 'dark';

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Balance',
        data,
        borderColor: isDark ? 'rgba(129, 140, 248, 1)' : 'rgba(79, 70, 229, 1)',
        backgroundColor: isDark
          ? 'rgba(129, 140, 248, 0.1)'
          : 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: isDark ? '#818cf8' : '#4f46e5',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDark ? '#fff' : '#0f172a',
        bodyColor: isDark ? '#fff' : '#0f172a',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => {
            return `$${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
          maxTicksLimit: 8,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
          callback: (value) => `$${value.toLocaleString()}`,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={`glass-panel ${
      theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
    } p-6 animate-in fade-in slide-in-from-bottom-4`} 
    style={{ animationDelay: '300ms', animationDuration: '600ms' }}
    data-testid="balance-trend-chart">
      <h2 className="text-lg font-light tracking-tight mb-6">Balance Trend</h2>
      <div className="h-[300px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BalanceTrendChart;