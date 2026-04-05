// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { generateMockTransactions } from '../utils/mockData';

// const AppContext = createContext();

// export const useApp = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useApp must be used within AppProvider');
//   }
//   return context;
// };

// export const AppProvider = ({ children }) => {
//   const [initialized, setInitialized] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [role, setRole] = useState(() => {
//     const saved = localStorage.getItem('role');
//     return saved || 'admin';
//   });
//   const [theme, setTheme] = useState(() => {
//     const saved = localStorage.getItem('theme');
//     return saved || 'light';
//   });
//   const [filters, setFilters] = useState({
//     search: '',
//     category: 'all',
//     type: 'all',
//     sortBy: 'date',
//     sortOrder: 'desc'
//   });

//   useEffect(() => {
//     if (initialized) return;
    
//     console.log('AppContext: Initializing...');
//     const savedTransactions = localStorage.getItem('transactions');

//     if (savedTransactions) {
//       try {
//         const parsed = JSON.parse(savedTransactions);
//         console.log('AppContext: Loading saved transactions', parsed.length);
//         setTransactions(parsed);
//       } catch (e) {
//         console.error('AppContext: Error parsing saved transactions', e);
//         const mockData = generateMockTransactions(120);
//         console.log('AppContext: Generated', mockData.length, 'transactions');
//         setTransactions(mockData);
//         localStorage.setItem('transactions', JSON.stringify(mockData));
//       }
//     } else {
//       console.log('AppContext: Generating mock transactions');
//       const mockData = generateMockTransactions(120);
//       console.log('AppContext: Generated', mockData.length, 'transactions');
//       setTransactions(mockData);
//       localStorage.setItem('transactions', JSON.stringify(mockData));
//     }
    
//     // Apply theme on mount
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark');
//     }
    
//     setInitialized(true);
//     console.log('AppContext: Initialization complete');
//   }, [initialized, theme]);

//   useEffect(() => {
//     if (initialized && transactions.length > 0) {
//       localStorage.setItem('transactions', JSON.stringify(transactions));
//     }
//   }, [transactions, initialized]);

//   useEffect(() => {
//     if (initialized) {
//       localStorage.setItem('role', role);
//     }
//   }, [role, initialized]);

//   useEffect(() => {
//     if (initialized) {
//       localStorage.setItem('theme', theme);
//       if (theme === 'dark') {
//         document.documentElement.classList.add('dark');
//       } else {
//         document.documentElement.classList.remove('dark');
//       }
//     }
//   }, [theme, initialized]);

//   const addTransaction = (transaction) => {
//     setTransactions([transaction, ...transactions]);
//   };

//   const updateTransaction = (id, updatedTransaction) => {
//     setTransactions(
//       transactions.map((t) => (t.id === id ? { ...t, ...updatedTransaction } : t))
//     );
//   };

//   const deleteTransaction = (id) => {
//     setTransactions(transactions.filter((t) => t.id !== id));
//   };

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
//   };

//   const value = {
//     transactions,
//     role,
//     setRole,
//     theme,
//     toggleTheme,
//     filters,
//     setFilters,
//     addTransaction,
//     updateTransaction,
//     deleteTransaction,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };


import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateMockTransactions } from '../utils/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem('role');
    return saved || 'admin';
  });
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    type: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
    dateRange: { start: null, end: null },
  });

  const [spendingAlert, setSpendingAlert] = useState({
    enabled: true,
    threshold: 1000,
    period: 'daily', // daily, weekly, monthly
  });

  useEffect(() => {
    if (initialized) return;
    
    console.log('AppContext: Initializing...');
    const savedTransactions = localStorage.getItem('transactions');

    if (savedTransactions) {
      try {
        const parsed = JSON.parse(savedTransactions);
        console.log('AppContext: Loading saved transactions', parsed.length);
        setTransactions(parsed);
      } catch (e) {
        console.error('AppContext: Error parsing saved transactions', e);
        const mockData = generateMockTransactions(120);
        console.log('AppContext: Generated', mockData.length, 'transactions');
        setTransactions(mockData);
        localStorage.setItem('transactions', JSON.stringify(mockData));
      }
    } else {
      console.log('AppContext: Generating mock transactions');
      const mockData = generateMockTransactions(120);
      console.log('AppContext: Generated', mockData.length, 'transactions');
      setTransactions(mockData);
      localStorage.setItem('transactions', JSON.stringify(mockData));
    }
    
    // Apply theme on mount
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    
    setInitialized(true);
    console.log('AppContext: Initialization complete');
  }, [initialized, theme]);

  useEffect(() => {
    if (initialized && transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions, initialized]);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('role', role);
    }
  }, [role, initialized]);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, initialized]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      serialNumber: transactions.length > 0 
        ? Math.max(...transactions.map(t => t.serialNumber || 0)) + 1 
        : 1000,
      notes: transaction.notes || '',
      receipt: transaction.receipt || null,
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const bulkAddTransactions = (newTransactions) => {
    let currentSerial = transactions.length > 0 
      ? Math.max(...transactions.map(t => t.serialNumber || 0)) + 1 
      : 1000;
    
    const withSerials = newTransactions.map(t => ({
      ...t,
      serialNumber: currentSerial++,
      notes: t.notes || '',
      receipt: t.receipt || null,
    }));
    
    setTransactions([...withSerials, ...transactions]);
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, ...updatedTransaction } : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const bulkDeleteTransactions = (ids) => {
    setTransactions(transactions.filter((t) => !ids.includes(t.id)));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      type: 'all',
      sortBy: 'date',
      sortOrder: 'desc',
      dateRange: { start: null, end: null },
    });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = {
    transactions,
    role,
    setRole,
    theme,
    toggleTheme,
    filters,
    setFilters,
    clearFilters,
    addTransaction,
    bulkAddTransactions,
    updateTransaction,
    deleteTransaction,
    bulkDeleteTransactions,
    spendingAlert,
    setSpendingAlert,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};