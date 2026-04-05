import { startOfDay, startOfWeek, startOfMonth, isAfter, parseISO } from 'date-fns';

export const calculatePeriodSpending = (transactions, period) => {
  const now = new Date();
  let startDate;

  switch (period) {
    case 'daily':
      startDate = startOfDay(now);
      break;
    case 'weekly':
      startDate = startOfWeek(now);
      break;
    case 'monthly':
      startDate = startOfMonth(now);
      break;
    default:
      startDate = startOfDay(now);
  }

  const periodTransactions = transactions.filter((t) => {
    try {
      const tDate = parseISO(t.date);
      return t.type === 'expense' && isAfter(tDate, startDate);
    } catch (e) {
      return false;
    }
  });

  const totalSpending = periodTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  return {
    totalSpending,
    transactionCount: periodTransactions.length,
    transactions: periodTransactions,
  };
};

export const checkSpendingAlert = (transactions, alertSettings) => {
  if (!alertSettings.enabled) return { exceeded: false };

  const { totalSpending, transactionCount, transactions: periodTransactions } = 
    calculatePeriodSpending(transactions, alertSettings.period);

  const exceeded = totalSpending > alertSettings.threshold;
  const percentUsed = (totalSpending / alertSettings.threshold) * 100;

  return {
    exceeded,
    totalSpending,
    threshold: alertSettings.threshold,
    remaining: Math.max(0, alertSettings.threshold - totalSpending),
    percentUsed: Math.min(100, percentUsed),
    transactionCount,
    period: alertSettings.period,
    transactions: periodTransactions,
  };
};
