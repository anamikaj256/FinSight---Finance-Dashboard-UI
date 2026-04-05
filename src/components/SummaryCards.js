import React from 'react';
import { TrendUp, TrendDown, Wallet } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { calculateTotals } from '../utils/calculations';

const SummaryCards = () => {
  const { transactions, theme } = useApp();
  const { balance, income, expenses } = calculateTotals(transactions);

  const cards = [
    {
      title: 'Total Balance',
      value: balance,
      icon: Wallet,
      gradient: 'from-indigo-500 to-purple-500',
      testId: 'summary-card-balance',
    },
    {
      title: 'Income',
      value: income,
      icon: TrendUp,
      gradient: 'from-emerald-500 to-teal-500',
      testId: 'summary-card-income',
    },
    {
      title: 'Expenses',
      value: expenses,
      icon: TrendDown,
      gradient: 'from-rose-500 to-pink-500',
      testId: 'summary-card-expenses',
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className={`glass-panel ${
            theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
          } p-6 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4`}
          style={{ animationDelay: `${index * 100}ms`, animationDuration: '500ms' }}
          data-testid={card.testId}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className={`text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {card.title}
              </p>
              <p className="text-3xl font-light tracking-tight">
                {formatCurrency(card.value)}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300`}>
              <card.icon size={24} weight="duotone" className="text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;