import { format, startOfMonth, endOfMonth, subMonths, isWithinInterval, parseISO } from 'date-fns';

export const calculateTotals = (transactions) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return { income, expenses, balance };
};

export const getCategoryBreakdown = (transactions) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const categoryTotals = {};

  expenses.forEach((t) => {
    if (!categoryTotals[t.category]) {
      categoryTotals[t.category] = 0;
    }
    categoryTotals[t.category] += t.amount;
  });

  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};

export const getBalanceTrend = (transactions) => {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let runningBalance = 0;
  const trendData = [];

  sortedTransactions.forEach((t) => {
    if (t.type === 'income') {
      runningBalance += t.amount;
    } else {
      runningBalance -= t.amount;
    }
    trendData.push({
      date: t.date,
      balance: runningBalance,
    });
  });

  const last30Days = trendData.slice(-30);
  return last30Days;
};

export const getMonthlyComparison = (transactions) => {
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));

  const currentMonthTransactions = transactions.filter((t) =>
    isWithinInterval(parseISO(t.date), {
      start: currentMonthStart,
      end: currentMonthEnd,
    })
  );

  const lastMonthTransactions = transactions.filter((t) =>
    isWithinInterval(parseISO(t.date), {
      start: lastMonthStart,
      end: lastMonthEnd,
    })
  );

  const currentExpenses = currentMonthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const lastExpenses = lastMonthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const change = currentExpenses - lastExpenses;
  const percentChange = lastExpenses > 0 ? (change / lastExpenses) * 100 : 0;

  return {
    currentMonth: currentExpenses,
    lastMonth: lastExpenses,
    change,
    percentChange,
  };
};

export const getHighestSpendingCategory = (transactions) => {
  const breakdown = getCategoryBreakdown(transactions);
  return breakdown.length > 0 ? breakdown[0] : null;
};