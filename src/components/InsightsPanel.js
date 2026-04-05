import React, { useMemo } from 'react';
import { ArrowUp, ArrowDown, TrendUp, TrendDown } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { getMonthlyComparison, getHighestSpendingCategory } from '../utils/calculations';

const InsightsPanel = () => {
  const { transactions, theme } = useApp();
  
  const monthlyComp = useMemo(() => getMonthlyComparison(transactions), [transactions]);
  const highestCategory = useMemo(() => getHighestSpendingCategory(transactions), [transactions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={`glass-panel ${
      theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
    } p-6 animate-in fade-in slide-in-from-bottom-4`}
    style={{ animationDelay: '600ms', animationDuration: '600ms' }}
    data-testid="insights-panel">
      <h2 className="text-lg font-light tracking-tight mb-6">Insights</h2>
      
      <div className="space-y-6">
        {highestCategory && (
          <div className={`p-4 rounded-2xl ${
            theme === 'dark' ? 'bg-white/5' : 'bg-slate-900/5'
          }`} data-testid="highest-spending-insight">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <TrendDown size={20} weight="duotone" className="text-white" />
              </div>
              <div className="flex-1">
                <p className={`text-xs font-medium mb-1 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>Top Category</p>
                <p className="text-base font-medium">{highestCategory.category}</p>
                <p className="text-xl font-light text-rose-400 mt-1">
                  {formatCurrency(highestCategory.amount)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div data-testid="monthly-comparison-insight">
          <p className={`text-xs font-medium mb-3 ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>Monthly Comparison</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">This Month</span>
              <span className="font-medium">
                {formatCurrency(monthlyComp.currentMonth)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Last Month</span>
              <span className="font-medium">
                {formatCurrency(monthlyComp.lastMonth)}
              </span>
            </div>
            <div className={`pt-3 border-t ${
              theme === 'dark' ? 'border-white/10' : 'border-slate-900/10'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Change</span>
                <div className="flex items-center gap-2">
                  {monthlyComp.percentChange >= 0 ? (
                    <>
                      <ArrowUp size={14} className="text-rose-400" weight="bold" />
                      <span className="font-medium text-rose-400">
                        +{monthlyComp.percentChange.toFixed(1)}%
                      </span>
                    </>
                  ) : (
                    <>
                      <ArrowDown size={14} className="text-emerald-400" weight="bold" />
                      <span className="font-medium text-emerald-400">
                        {monthlyComp.percentChange.toFixed(1)}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`pt-6 border-t ${
          theme === 'dark' ? 'border-white/10' : 'border-slate-900/10'
        }`} data-testid="transactions-count-insight">
          <div className="flex justify-between items-center">
            <span className={`text-sm ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>Total Transactions</span>
            <span className="text-2xl font-light">{transactions.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;