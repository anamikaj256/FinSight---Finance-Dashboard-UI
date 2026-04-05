import { parse } from 'date-fns';

export const parseCSV = (csvText) => {
  const lines = csvText.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  const transactions = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    
    if (values.length < 4) continue; // Skip invalid rows
    
    const transaction = {};
    headers.forEach((header, index) => {
      transaction[header] = values[index];
    });
    
    // Map to our transaction format
    const mapped = {
      id: `txn_import_${Date.now()}_${i}`,
      serialNumber: 1000 + transactions.length,
      date: transaction.date || new Date().toISOString().split('T')[0],
      description: transaction.description || transaction.desc || 'Imported Transaction',
      category: transaction.category || 'Shopping',
      type: transaction.type?.toLowerCase() === 'income' ? 'income' : 'expense',
      amount: parseFloat(transaction.amount) || 0,
      notes: transaction.notes || '',
      receipt: null,
    };
    
    transactions.push(mapped);
  }
  
  return transactions;
};

export const parseBankStatement = (csvText) => {
  // Bank statement format: Date,Description,Debit,Credit,Balance
  const lines = csvText.split('\n').filter(line => line.trim());
  const transactions = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    
    if (values.length < 4) continue;
    
    const [date, description, debit, credit] = values;
    
    const isIncome = credit && parseFloat(credit) > 0;
    const amount = isIncome ? parseFloat(credit) : parseFloat(debit || 0);
    
    if (amount === 0) continue;
    
    transactions.push({
      id: `txn_bank_${Date.now()}_${i}`,
      serialNumber: 1000 + transactions.length,
      date: formatBankDate(date),
      description: description || 'Bank Transaction',
      category: categorizeBankTransaction(description),
      type: isIncome ? 'income' : 'expense',
      amount: Math.abs(amount),
      notes: 'Imported from bank statement',
      receipt: null,
    });
  }
  
  return transactions;
};

const formatBankDate = (dateStr) => {
  try {
    // Try common date formats
    const formats = ['MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy-MM-dd', 'dd-MM-yyyy'];
    
    for (const format of formats) {
      try {
        const parsed = parse(dateStr, format, new Date());
        if (!isNaN(parsed)) {
          return parsed.toISOString().split('T')[0];
        }
      } catch (e) {
        continue;
      }
    }
    
    return new Date().toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
};

const categorizeBankTransaction = (description) => {
  const desc = description.toLowerCase();
  
  if (desc.includes('grocery') || desc.includes('walmart') || desc.includes('supermarket')) {
    return 'Food & Dining';
  }
  if (desc.includes('gas') || desc.includes('fuel') || desc.includes('uber')) {
    return 'Transportation';
  }
  if (desc.includes('amazon') || desc.includes('shop')) {
    return 'Shopping';
  }
  if (desc.includes('netflix') || desc.includes('spotify') || desc.includes('movie')) {
    return 'Entertainment';
  }
  if (desc.includes('electricity') || desc.includes('water') || desc.includes('internet')) {
    return 'Bills & Utilities';
  }
  if (desc.includes('salary') || desc.includes('payroll')) {
    return 'Salary';
  }
  
  return 'Shopping';
};

export const validateImport = (transactions) => {
  const errors = [];
  const warnings = [];
  
  transactions.forEach((t, index) => {
    if (!t.date) {
      errors.push(`Row ${index + 1}: Missing date`);
    }
    if (!t.amount || t.amount <= 0) {
      errors.push(`Row ${index + 1}: Invalid amount`);
    }
    if (!t.description) {
      warnings.push(`Row ${index + 1}: Missing description`);
    }
  });
  
  return { errors, warnings, isValid: errors.length === 0 };
};
