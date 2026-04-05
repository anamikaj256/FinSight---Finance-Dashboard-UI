// import React, { useState, useMemo } from 'react';
// import { Pencil, Trash, Plus, MagnifyingGlass } from '@phosphor-icons/react';
// import { useApp } from '../context/AppContext';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from './ui/table';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './ui/select';
// import TransactionModal from './TransactionModal';
// import { format } from 'date-fns';

// const TransactionsTable = () => {
//   const { transactions, role, filters, setFilters, deleteTransaction, theme } = useApp();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTransaction, setEditingTransaction] = useState(null);

//   const categories = useMemo(() => {
//     const uniqueCategories = [...new Set(transactions.map((t) => t.category))];
//     return uniqueCategories.sort();
//   }, [transactions]);

//   const filteredAndSortedTransactions = useMemo(() => {
//     let filtered = transactions.filter((t) => {
//       const matchesSearch =
//         !filters.search ||
//         t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
//         t.category.toLowerCase().includes(filters.search.toLowerCase());
//       const matchesCategory = filters.category === 'all' || t.category === filters.category;
//       const matchesType = filters.type === 'all' || t.type === filters.type;
//       return matchesSearch && matchesCategory && matchesType;
//     });

//     filtered.sort((a, b) => {
//       const aValue = filters.sortBy === 'date' ? new Date(a.date) : a.amount;
//       const bValue = filters.sortBy === 'date' ? new Date(b.date) : b.amount;

//       if (filters.sortOrder === 'asc') {
//         return aValue > bValue ? 1 : -1;
//       } else {
//         return aValue < bValue ? 1 : -1;
//       }
//     });

//     return filtered;
//   }, [transactions, filters]);

//   const handleEdit = (transaction) => {
//     setEditingTransaction(transaction);
//     setIsModalOpen(true);
//   };

//   const handleAdd = () => {
//     setEditingTransaction(null);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this transaction?')) {
//       deleteTransaction(id);
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(amount);
//   };

//   return (
//     <div className={`glass-panel ${
//       theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
//     } p-6 animate-in fade-in slide-in-from-bottom-4`}
//     style={{ animationDelay: '500ms', animationDuration: '600ms' }}
//     data-testid="transactions-table">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
//         <h2 className="text-lg font-light tracking-tight">Transactions</h2>
//         {role === 'admin' && (
//           <Button onClick={handleAdd} className={`gap-2 rounded-full hover:scale-105 transition-all duration-300 ${
//             theme === 'dark' 
//               ? 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300' 
//               : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-700'
//           }`} data-testid="add-transaction-button">
//             <Plus size={18} weight="bold" />
//             Add Transaction
//           </Button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div className="relative">
//           <MagnifyingGlass
//             size={18}
//             className={`absolute left-3 top-1/2 -translate-y-1/2 ${
//               theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
//             }`}
//           />
//           <Input
//             placeholder="Search transactions..."
//             value={filters.search}
//             onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//             className={`pl-10 rounded-full ${
//               theme === 'dark'
//                 ? 'bg-white/5 border-white/10 focus:border-indigo-500/50'
//                 : 'bg-slate-900/5 border-slate-900/10 focus:border-indigo-600/50'
//             }`}
//             data-testid="search-input"
//           />
//         </div>

//         <Select
//           value={filters.category}
//           onValueChange={(value) => setFilters({ ...filters, category: value })}
//         >
//           <SelectTrigger className={`rounded-full ${
//             theme === 'dark'
//               ? 'bg-white/5 border-white/10'
//               : 'bg-slate-900/5 border-slate-900/10'
//           }`} data-testid="category-filter">
//             <SelectValue placeholder="Category" />
//           </SelectTrigger>
//           <SelectContent className={`glass-panel ${
//             theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
//           }`}>
//             <SelectItem value="all">All Categories</SelectItem>
//             {categories.map((cat) => (
//               <SelectItem key={cat} value={cat}>
//                 {cat}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Select
//           value={filters.type}
//           onValueChange={(value) => setFilters({ ...filters, type: value })}
//         >
//           <SelectTrigger className={`rounded-full ${
//             theme === 'dark'
//               ? 'bg-white/5 border-white/10'
//               : 'bg-slate-900/5 border-slate-900/10'
//           }`} data-testid="type-filter">
//             <SelectValue placeholder="Type" />
//           </SelectTrigger>
//           <SelectContent className={`glass-panel ${
//             theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
//           }`}>
//             <SelectItem value="all">All Types</SelectItem>
//             <SelectItem value="income">Income</SelectItem>
//             <SelectItem value="expense">Expense</SelectItem>
//           </SelectContent>
//         </Select>

//         <Select
//           value={`${filters.sortBy}-${filters.sortOrder}`}
//           onValueChange={(value) => {
//             const [sortBy, sortOrder] = value.split('-');
//             setFilters({ ...filters, sortBy, sortOrder });
//           }}
//         >
//           <SelectTrigger className={`rounded-full ${
//             theme === 'dark'
//               ? 'bg-white/5 border-white/10'
//               : 'bg-slate-900/5 border-slate-900/10'
//           }`} data-testid="sort-filter">
//             <SelectValue placeholder="Sort" />
//           </SelectTrigger>
//           <SelectContent className={`glass-panel ${
//             theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
//           }`}>
//             <SelectItem value="date-desc">Date (Newest)</SelectItem>
//             <SelectItem value="date-asc">Date (Oldest)</SelectItem>
//             <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
//             <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {filteredAndSortedTransactions.length === 0 ? (
//         <div className="text-center py-12" data-testid="empty-transactions-state">
//           <p className={`text-lg ${
//             theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
//           }`}>No transactions found</p>
//           <p className={`text-sm mt-2 ${
//             theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
//           }`}>
//             {role === 'admin' ? 'Add a transaction to get started' : 'Check back later'}
//           </p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className={theme === 'dark' ? 'border-white/10' : 'border-slate-900/10'}>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Type</TableHead>
//                 <TableHead className="text-right">Amount</TableHead>
//                 {role === 'admin' && <TableHead className="text-right">Actions</TableHead>}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredAndSortedTransactions.map((transaction) => (
//                 <TableRow 
//                   key={transaction.id} 
//                   data-testid={`transaction-row-${transaction.id}`}
//                   className={`${
//                     theme === 'dark' 
//                       ? 'border-white/10 hover:bg-white/5' 
//                       : 'border-slate-900/10 hover:bg-slate-900/5'
//                   }`}
//                 >
//                   <TableCell className="font-mono text-sm">
//                     {format(new Date(transaction.date), 'MMM dd, yyyy')}
//                   </TableCell>
//                   <TableCell>{transaction.description}</TableCell>
//                   <TableCell>
//                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                       theme === 'dark'
//                         ? 'bg-white/10'
//                         : 'bg-slate-900/10'
//                     }`}>
//                       {transaction.category}
//                     </span>
//                   </TableCell>
//                   <TableCell>
//                     <span
//                       className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
//                         transaction.type === 'income'
//                           ? theme === 'dark' 
//                             ? 'bg-emerald-500/20 text-emerald-400'
//                             : 'bg-emerald-600/20 text-emerald-700'
//                           : theme === 'dark'
//                             ? 'bg-rose-500/20 text-rose-400'
//                             : 'bg-rose-600/20 text-rose-700'
//                       }`}
//                     >
//                       {transaction.type}
//                     </span>
//                   </TableCell>
//                   <TableCell
//                     className={`text-right font-mono font-medium ${
//                       transaction.type === 'income'
//                         ? 'text-emerald-400'
//                         : 'text-rose-400'
//                     }`}
//                   >
//                     {transaction.type === 'income' ? '+' : '-'}
//                     {formatCurrency(transaction.amount)}
//                   </TableCell>
//                   {role === 'admin' && (
//                     <TableCell className="text-right">
//                       <div className="flex justify-end gap-2">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleEdit(transaction)}
//                           className={`rounded-full hover:scale-110 transition-all duration-300 ${
//                             theme === 'dark' 
//                               ? 'hover:bg-white/10' 
//                               : 'hover:bg-slate-900/10'
//                           }`}
//                           data-testid={`edit-button-${transaction.id}`}
//                         >
//                           <Pencil size={16} weight="regular" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDelete(transaction.id);
//                           }}
//                           className={`rounded-full hover:scale-110 transition-all duration-300 ${
//                             theme === 'dark' 
//                               ? 'hover:bg-rose-500/20 hover:text-rose-400' 
//                               : 'hover:bg-rose-600/20 hover:text-rose-600'
//                           }`}
//                           data-testid={`delete-button-${transaction.id}`}
//                         >
//                           <Trash size={16} weight="regular" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   )}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       )}

//       <TransactionModal
//         open={isModalOpen}
//         onOpenChange={setIsModalOpen}
//         transaction={editingTransaction}
//       />
//     </div>
//   );
// };

// export default TransactionsTable;





import React, { useState, useMemo } from 'react';
import { Pencil, Trash, Plus, MagnifyingGlass, UploadSimple, X } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import TransactionModal from './TransactionModal';
import BulkUploadModal from './BulkUploadModal';
import { format, isWithinInterval, parseISO } from 'date-fns';

const TransactionsTable = () => {
  const { transactions, role, filters, setFilters, deleteTransaction, theme, clearFilters } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(transactions.map((t) => t.category))];
    return uniqueCategories.sort();
  }, [transactions]);

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter((t) => {
      const matchesSearch =
        !filters.search ||
        t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.serialNumber?.toString().includes(filters.search);
      const matchesCategory = filters.category === 'all' || t.category === filters.category;
      const matchesType = filters.type === 'all' || t.type === filters.type;
      
      let matchesDateRange = true;
      if (filters.dateRange?.start && filters.dateRange?.end) {
        try {
          const tDate = parseISO(t.date);
          const start = parseISO(filters.dateRange.start);
          const end = parseISO(filters.dateRange.end);
          matchesDateRange = isWithinInterval(tDate, { start, end });
        } catch (e) {
          matchesDateRange = true;
        }
      }
      
      return matchesSearch && matchesCategory && matchesType && matchesDateRange;
    });

    filtered.sort((a, b) => {
      const aValue = filters.sortBy === 'date' ? new Date(a.date) : a.amount;
      const bValue = filters.sortBy === 'date' ? new Date(b.date) : b.amount;

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [transactions, filters]);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className={`glass-panel ${
      theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
    } p-6 animate-in fade-in slide-in-from-bottom-4`}
    style={{ animationDelay: '500ms', animationDuration: '600ms' }}
    data-testid="transactions-table">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-light tracking-tight">Transactions</h2>
        {role === 'admin' && (
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsBulkUploadOpen(true)} 
              variant="outline"
              className={`gap-2 rounded-full hover:scale-105 transition-all duration-300 ${
                theme === 'dark' 
                  ? 'border-white/10 hover:bg-white/5' 
                  : 'border-slate-900/10 hover:bg-slate-900/5'
              }`} 
              data-testid="bulk-upload-button"
            >
              <UploadSimple size={18} weight="regular" />
              Bulk Upload
            </Button>
            <Button onClick={handleAdd} className={`gap-2 rounded-full hover:scale-105 transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300' 
                : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-700'
            }`} data-testid="add-transaction-button">
              <Plus size={18} weight="bold" />
              Add Transaction
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <MagnifyingGlass
              size={18}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            />
            <Input
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className={`pl-10 rounded-full ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 focus:border-indigo-500/50'
                  : 'bg-slate-900/5 border-slate-900/10 focus:border-indigo-600/50'
              }`}
              data-testid="search-input"
            />
          </div>

          <Select
            value={filters.category}
            onValueChange={(value) => setFilters({ ...filters, category: value })}
          >
            <SelectTrigger className={`rounded-full ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10'
                : 'bg-slate-900/5 border-slate-900/10'
            }`} data-testid="category-filter">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className={`glass-panel ${
              theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
            }`}>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.type}
            onValueChange={(value) => setFilters({ ...filters, type: value })}
          >
            <SelectTrigger className={`rounded-full ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10'
                : 'bg-slate-900/5 border-slate-900/10'
            }`} data-testid="type-filter">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className={`glass-panel ${
              theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
            }`}>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onValueChange={(value) => {
              const [sortBy, sortOrder] = value.split('-');
              setFilters({ ...filters, sortBy, sortOrder });
            }}
          >
            <SelectTrigger className={`rounded-full ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10'
                : 'bg-slate-900/5 border-slate-900/10'
            }`} data-testid="sort-filter">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent className={`glass-panel ${
              theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
            }`}>
              <SelectItem value="date-desc">Date (Newest)</SelectItem>
              <SelectItem value="date-asc">Date (Oldest)</SelectItem>
              <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
              <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={clearFilters}
            variant="outline"
            className={`rounded-full gap-2 hover:scale-105 transition-all duration-300 ${
              theme === 'dark'
                ? 'border-white/10 hover:bg-rose-500/20 hover:text-rose-400'
                : 'border-slate-900/10 hover:bg-rose-600/20 hover:text-rose-600'
            }`}
            data-testid="clear-filters-button"
          >
            <X size={18} weight="bold" />
            Clear Filters
          </Button>
        </div>

        {/* Date Range Picker */}
        <div className="flex gap-4 items-center">
          <span className="text-sm font-medium">Date Range:</span>
          <Input
            type="date"
            value={filters.dateRange?.start || ''}
            onChange={(e) => setFilters({ 
              ...filters, 
              dateRange: { ...filters.dateRange, start: e.target.value } 
            })}
            className={`rounded-xl w-40 ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10'
                : 'bg-slate-900/5 border-slate-900/10'
            }`}
            data-testid="date-range-start"
          />
          <span className="text-sm">to</span>
          <Input
            type="date"
            value={filters.dateRange?.end || ''}
            onChange={(e) => setFilters({ 
              ...filters, 
              dateRange: { ...filters.dateRange, end: e.target.value } 
            })}
            className={`rounded-xl w-40 ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10'
                : 'bg-slate-900/5 border-slate-900/10'
            }`}
            data-testid="date-range-end"
          />
        </div>
      </div>

      {filteredAndSortedTransactions.length === 0 ? (
        <div className="text-center py-12" data-testid="empty-transactions-state">
          <p className={`text-lg ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>No transactions found</p>
          <p className={`text-sm mt-2 ${
            theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
          }`}>
            {role === 'admin' ? 'Add a transaction to get started' : 'Check back later'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className={theme === 'dark' ? 'border-white/10' : 'border-slate-900/10'}>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                {role === 'admin' && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedTransactions.map((transaction) => (
                <TableRow 
                  key={transaction.id} 
                  data-testid={`transaction-row-${transaction.id}`}
                  className={`${
                    theme === 'dark' 
                      ? 'border-white/10 hover:bg-white/5' 
                      : 'border-slate-900/10 hover:bg-slate-900/5'
                  }`}
                >
                  <TableCell className="font-mono text-xs">
                    #{transaction.serialNumber || '—'}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {format(new Date(transaction.date), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      theme === 'dark'
                        ? 'bg-white/10'
                        : 'bg-slate-900/10'
                    }`}>
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        transaction.type === 'income'
                          ? theme === 'dark' 
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-emerald-600/20 text-emerald-700'
                          : theme === 'dark'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-rose-600/20 text-rose-700'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <span
                            className={`font-mono font-medium cursor-help hover:scale-105 transition-transform duration-200 ${
                              transaction.type === 'income'
                                ? 'text-emerald-400'
                                : 'text-rose-400'
                            }`}
                          >
                            {transaction.type === 'income' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent 
                          className={`glass-panel ${
                            theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
                          } p-0 w-80 border-2 ${
                            transaction.type === 'income'
                              ? 'border-emerald-500/30'
                              : 'border-rose-500/30'
                          }`}
                          sideOffset={5}
                        >
                          {/* Header */}
                          <div className={`p-4 border-b ${
                            theme === 'dark' ? 'border-white/10' : 'border-slate-900/10'
                          } bg-gradient-to-r ${
                            transaction.type === 'income'
                              ? 'from-emerald-500/10 to-teal-500/10'
                              : 'from-rose-500/10 to-pink-500/10'
                          }`}>
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    transaction.type === 'income'
                                      ? 'bg-emerald-500/20 text-emerald-400'
                                      : 'bg-rose-500/20 text-rose-400'
                                  }`}>
                                    #{transaction.serialNumber}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium uppercase ${
                                    transaction.type === 'income'
                                      ? 'bg-emerald-500/20 text-emerald-400'
                                      : 'bg-rose-500/20 text-rose-400'
                                  }`}>
                                    {transaction.type}
                                  </span>
                                </div>
                                <h4 className="font-semibold text-base leading-tight">
                                  {transaction.description}
                                </h4>
                              </div>
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${
                                transaction.type === 'income'
                                  ? 'from-emerald-500 to-teal-500'
                                  : 'from-rose-500 to-pink-500'
                              }`}>
                                {transaction.type === 'income' ? (
                                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                  </svg>
                                ) : (
                                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="p-4 space-y-3">
                            {/* Amount */}
                            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                              <span className="text-sm text-muted-foreground">Amount</span>
                              <span className={`text-2xl font-bold font-mono ${
                                transaction.type === 'income'
                                  ? 'text-emerald-400'
                                  : 'text-rose-400'
                              }`}>
                                {transaction.type === 'income' ? '+' : '-'}
                                {formatCurrency(transaction.amount)}
                              </span>
                            </div>

                            {/* Date */}
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Date
                              </span>
                              <span className="font-medium">
                                {format(new Date(transaction.date), 'MMMM dd, yyyy')}
                              </span>
                            </div>

                            {/* Category */}
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                Category
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                theme === 'dark' ? 'bg-white/10' : 'bg-slate-900/10'
                              }`}>
                                {transaction.category}
                              </span>
                            </div>

                            {/* Notes */}
                            {transaction.notes && (
                              <div className={`pt-3 border-t ${
                                theme === 'dark' ? 'border-white/10' : 'border-slate-900/10'
                              }`}>
                                <span className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                  </svg>
                                  Notes
                                </span>
                                <p className="text-sm pl-6 italic">{transaction.notes}</p>
                              </div>
                            )}

                            {/* Receipt */}
                            {transaction.receipt && (
                              <div className={`flex items-center gap-2 text-emerald-400 text-sm pt-2 border-t ${
                                theme === 'dark' ? 'border-white/10' : 'border-slate-900/10'
                              }`}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Receipt attached
                              </div>
                            )}
                          </div>

                          {/* Footer */}
                          <div className={`px-4 py-2 text-xs text-center border-t ${
                            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-900/10 bg-slate-900/5'
                          }`}>
                            Transaction ID: {transaction.id.slice(0, 20)}...
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  {role === 'admin' && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(transaction)}
                          className={`rounded-full hover:scale-110 transition-all duration-300 ${
                            theme === 'dark' 
                              ? 'hover:bg-white/10' 
                              : 'hover:bg-slate-900/10'
                          }`}
                          data-testid={`edit-button-${transaction.id}`}
                        >
                          <Pencil size={16} weight="regular" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(transaction.id);
                          }}
                          className={`rounded-full hover:scale-110 transition-all duration-300 ${
                            theme === 'dark' 
                              ? 'hover:bg-rose-500/20 hover:text-rose-400' 
                              : 'hover:bg-rose-600/20 hover:text-rose-600'
                          }`}
                          data-testid={`delete-button-${transaction.id}`}
                        >
                          <Trash size={16} weight="regular" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <TransactionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        transaction={editingTransaction}
      />

      <BulkUploadModal
        open={isBulkUploadOpen}
        onOpenChange={setIsBulkUploadOpen}
      />
    </div>
  );
};

export default TransactionsTable;