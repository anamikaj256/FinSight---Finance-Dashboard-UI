import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, Warning, CheckCircle, Gear } from '@phosphor-icons/react';
import { Button } from './ui/button';
import { checkSpendingAlert } from '../utils/alerts';
import SpendingAlertsSettings from './SpendingAlertsSettings';

const SpendingAlertsBanner = () => {
  const { transactions, spendingAlert, theme } = useApp();
  const [alertData, setAlertData] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const result = checkSpendingAlert(transactions, spendingAlert);
    setAlertData(result);
    
    // Reset dismissed state when period changes or new threshold
    setDismissed(false);
  }, [transactions, spendingAlert]);

  if (!spendingAlert.enabled || !alertData || dismissed) {
    return null;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getPeriodLabel = () => {
    switch (alertData.period) {
      case 'daily': return 'today';
      case 'weekly': return 'this week';
      case 'monthly': return 'this month';
      default: return 'this period';
    }
  };

  const getAlertLevel = () => {
    if (alertData.exceeded) return 'danger';
    if (alertData.percentUsed >= 80) return 'warning';
    return 'info';
  };

  const alertLevel = getAlertLevel();

  return (
    <>
      <div
        className={`glass-panel ${
          theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
        } p-4 mb-6 animate-in slide-in-from-top-4 duration-500`}
        data-testid="spending-alert-banner"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                alertLevel === 'danger'
                  ? 'bg-rose-500/20'
                  : alertLevel === 'warning'
                  ? 'bg-yellow-500/20'
                  : 'bg-blue-500/20'
              }`}
            >
              {alertLevel === 'danger' ? (
                <Warning size={24} weight="duotone" className="text-rose-400" />
              ) : alertLevel === 'warning' ? (
                <Bell size={24} weight="duotone" className="text-yellow-400" />
              ) : (
                <CheckCircle size={24} weight="duotone" className="text-blue-400" />
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold mb-1">
                {alertLevel === 'danger'
                  ? '⚠️ Spending Limit Exceeded!'
                  : alertLevel === 'warning'
                  ? '⚡ Approaching Spending Limit'
                  : '✓ Spending On Track'}
              </h3>
              <p className="text-sm mb-2">
                You've spent{' '}
                <span className={`font-bold ${
                  alertLevel === 'danger' ? 'text-rose-400' : 
                  alertLevel === 'warning' ? 'text-yellow-400' : 
                  'text-blue-400'
                }`}>
                  {formatCurrency(alertData.totalSpending)}
                </span>{' '}
                {getPeriodLabel()} ({alertData.transactionCount} transactions)
              </p>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className={`h-2 rounded-full overflow-hidden ${
                  theme === 'dark' ? 'bg-white/10' : 'bg-slate-900/10'
                }`}>
                  <div
                    className={`h-full transition-all duration-500 ${
                      alertLevel === 'danger'
                        ? 'bg-gradient-to-r from-rose-500 to-rose-600'
                        : alertLevel === 'warning'
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600'
                    }`}
                    style={{ width: `${Math.min(100, alertData.percentUsed)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span>
                    {alertData.exceeded ? (
                      <>
                        Over by{' '}
                        <span className="font-bold text-rose-400">
                          {formatCurrency(alertData.totalSpending - alertData.threshold)}
                        </span>
                      </>
                    ) : (
                      <>
                        {formatCurrency(alertData.remaining)} remaining of{' '}
                        {formatCurrency(alertData.threshold)}
                      </>
                    )}
                  </span>
                  <span className="font-mono">
                    {alertData.percentUsed.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(true)}
              className={`rounded-full ${
                theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-900/10'
              }`}
              data-testid="alert-settings-button"
            >
              <Gear size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDismissed(true)}
              className={`rounded-full ${
                theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-900/10'
              }`}
              data-testid="dismiss-alert-button"
            >
              <X size={18} />
            </Button>
          </div>
        </div>
      </div>

      <SpendingAlertsSettings
        open={showSettings}
        onOpenChange={setShowSettings}
      />
    </>
  );
};

export default SpendingAlertsBanner;
