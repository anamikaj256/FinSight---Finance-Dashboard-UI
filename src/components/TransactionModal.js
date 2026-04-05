import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { format } from 'date-fns';

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

const TransactionModal = ({ open, onOpenChange, transaction }) => {
  const { addTransaction, updateTransaction, theme } = useApp();
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
    category: '',
    type: 'expense',
    amount: '',
    notes: '',
    receipt: null,
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        date: transaction.date,
        description: transaction.description,
        category: transaction.category,
        type: transaction.type,
        amount: transaction.amount.toString(),
        notes: transaction.notes || '',
        receipt: transaction.receipt || null,
      });
    } else {
      setFormData({
        date: format(new Date(), 'yyyy-MM-dd'),
        description: '',
        category: '',
        type: 'expense',
        amount: '',
        notes: '',
        receipt: null,
      });
    }
  }, [transaction, open]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactionData = {
      id: transaction ? transaction.id : `txn_${Date.now()}`,
      serialNumber: transaction ? transaction.serialNumber : undefined,
      date: formData.date,
      description: formData.description,
      category: formData.category,
      type: formData.type,
      amount: parseFloat(formData.amount),
      notes: formData.notes,
      receipt: formData.receipt,
    };

    if (transaction) {
      updateTransaction(transaction.id, transactionData);
    } else {
      addTransaction(transactionData);
    }

    onOpenChange(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, receipt: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const availableCategories = categories.filter((c) => c.type === formData.type);

  const isFormValid =
    formData.date &&
    formData.description.trim() &&
    formData.category &&
    formData.amount &&
    parseFloat(formData.amount) > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`glass-panel ${
        theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
      } sm:max-w-[500px]`} data-testid="transaction-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light tracking-tight">
            {transaction ? 'Edit Transaction' : 'Add Transaction'}
          </DialogTitle>
          <DialogDescription>
            {transaction ? 'Update transaction details below.' : 'Fill in the transaction details below.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className={`rounded-xl ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10'
                    : 'bg-slate-900/5 border-slate-900/10'
                }`}
                data-testid="transaction-date-input"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value, category: '' })
                }
              >
                <SelectTrigger id="type" className={`rounded-xl ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10'
                    : 'bg-slate-900/5 border-slate-900/10'
                }`} data-testid="transaction-type-select">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className={`glass-panel ${
                  theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
                }`}>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="category" className={`rounded-xl ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10'
                    : 'bg-slate-900/5 border-slate-900/10'
                }`} data-testid="transaction-category-select">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className={`glass-panel ${
                  theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
                }`}>
                  {availableCategories.map((cat) => (
                    <SelectItem key={cat.name} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description"
                required
                className={`rounded-xl ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10'
                    : 'bg-slate-900/5 border-slate-900/10'
                }`}
                data-testid="transaction-description-input"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                required
                className={`rounded-xl ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10'
                    : 'bg-slate-900/5 border-slate-900/10'
                }`}
                data-testid="transaction-amount-input"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add notes about this transaction..."
                rows={3}
                className={`w-full px-3 py-2 rounded-xl border ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-slate-900/5 border-slate-900/10 text-slate-900'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                data-testid="transaction-notes-input"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="receipt">Receipt/Attachment (Optional)</Label>
              <input
                id="receipt"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className={`rounded-xl ${
                  theme === 'dark'
                    ? 'file:bg-white/10 file:text-white file:border-0'
                    : 'file:bg-slate-900/10 file:text-slate-900 file:border-0'
                } file:px-4 file:py-2 file:rounded-lg file:mr-4 cursor-pointer`}
                data-testid="transaction-receipt-input"
              />
              {formData.receipt && (
                <p className="text-sm text-emerald-400">✓ Receipt attached</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className={`rounded-full ${
                theme === 'dark'
                  ? 'border-white/10 hover:bg-white/5'
                  : 'border-slate-900/10 hover:bg-slate-900/5'
              }`}
              data-testid="transaction-cancel-button"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!isFormValid} 
              className={`rounded-full ${
                theme === 'dark'
                  ? 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300'
                  : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-700'
              }`}
              data-testid="transaction-submit-button"
            >
              {transaction ? 'Update' : 'Add'} Transaction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;