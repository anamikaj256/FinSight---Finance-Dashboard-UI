
import { format, subDays, subMonths } from 'date-fns';

const categories = [
  { name: 'Food & Dining', type: 'expense' },
  { name: 'Transportation', type: 'expense' },
  { name: 'Shopping', type: 'expense' },
  { name: 'Entertainment', type: 'expense' },
  { name: 'Bills & Utilities', type: 'expense' },
  { name: 'Healthcare', type: 'expense' },
  { name: 'Education', type: 'expense' },
  { name: 'Travel', type: 'expense' },
  { name: 'Salary', type: 'income' },
  { name: 'Freelance', type: 'income' },
  { name: 'Investments', type: 'income' },
  { name: 'Gifts', type: 'income' },
];

const descriptions = {
  'Food & Dining': ['Grocery Store', 'Restaurant', 'Coffee Shop', 'Fast Food', 'Food Delivery'],
  'Transportation': ['Uber', 'Gas Station', 'Public Transit', 'Parking', 'Car Maintenance'],
  'Shopping': ['Amazon', 'Clothing Store', 'Electronics', 'Home Goods', 'Online Shopping'],
  'Entertainment': ['Movie Theater', 'Concert', 'Streaming Service', 'Gaming', 'Books'],
  'Bills & Utilities': ['Electricity', 'Water', 'Internet', 'Phone', 'Rent'],
  'Healthcare': ['Doctor Visit', 'Pharmacy', 'Gym Membership', 'Health Insurance', 'Dental'],
  'Education': ['Course Fee', 'Books', 'Online Learning', 'Tuition', 'Supplies'],
  'Travel': ['Hotel', 'Flight', 'Vacation', 'Airbnb', 'Travel Insurance'],
  'Salary': ['Monthly Salary', 'Bonus', 'Commission'],
  'Freelance': ['Project Payment', 'Consulting Fee', 'Design Work'],
  'Investments': ['Dividend', 'Stock Sale', 'Interest', 'Crypto Gain'],
  'Gifts': ['Birthday Gift', 'Holiday Money', 'Prize Money'],
};

export const generateMockTransactions = (count = 120) => {
  const transactions = [];
  const today = new Date();
  let serialNumber = 1000; // Starting serial number

  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 180);
    const date = subDays(today, daysAgo);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const descArray = descriptions[category.name];
    const description = descArray[Math.floor(Math.random() * descArray.length)];

    let amount;
    if (category.type === 'income') {
      amount = Math.floor(Math.random() * 4000) + 500;
    } else {
      amount = Math.floor(Math.random() * 500) + 10;
    }

    transactions.push({
      id: `txn_${Date.now()}_${i}`,
      serialNumber: serialNumber++,
      date: format(date, 'yyyy-MM-dd'),
      description,
      category: category.name,
      type: category.type,
      amount: parseFloat(amount.toFixed(2)),
      notes: '',
      receipt: null,
    });
  }

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};