import React, { useState, useEffect } from 'react';
import { X, Sparkles, Tag, Calendar, DollarSign, CreditCard, FileText } from 'lucide-react';
import { Expense, ExpenseCategory } from '../types';
import { useData } from '../context/DataContext';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenseToEdit?: Expense | null;
}

const CATEGORIES: ExpenseCategory[] = [
  'Food & Dining', 'Shopping', 'Housing & Rent', 'Transportation',
  'Utilities', 'Entertainment', 'Healthcare', 'Education',
  'Travel', 'Personal Care', 'Investments', 'Other'
];

export const ExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose, expenseToEdit }) => {
  const { addExpense, editExpense } = useData();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food & Dining');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Debit Card' | 'Cash' | 'Bank Transfer' | 'UPI'>('Credit Card');
  const [notes, setNotes] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setAmount(expenseToEdit.amount.toString());
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
      setPaymentMethod(expenseToEdit.paymentMethod);
      setNotes(expenseToEdit.notes || '');
      setIsRecurring(!!expenseToEdit.isRecurring);
    } else {
      setTitle('');
      setAmount('');
      setCategory('Food & Dining');
      setDate(new Date().toISOString().split('T')[0]);
      setPaymentMethod('Credit Card');
      setNotes('');
      setIsRecurring(false);
    }
  }, [expenseToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAiAutoCategorize = async () => {
    if (!title.trim()) return;
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/categorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, amount: Number(amount) || 0, notes })
      });
      const data = await res.json();
      if (data.category && CATEGORIES.includes(data.category)) {
        setCategory(data.category);
      }
    } catch (e) {
      console.warn('AI categorization fallback');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    if (expenseToEdit) {
      editExpense(expenseToEdit.id, {
        title,
        amount: Number(amount),
        category,
        date,
        paymentMethod,
        notes,
        isRecurring
      });
    } else {
      await addExpense({
        title,
        amount: Number(amount),
        category,
        date,
        paymentMethod,
        notes,
        isRecurring
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-emerald-500/30 p-6 shadow-2xl text-white relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">{expenseToEdit ? 'Edit Expense' : 'Add New Expense'}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Title & AI Auto-Categorize */}
          <div>
            <label className="block text-slate-400 font-medium mb-1.5">Expense Title *</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="e.g. Whole Foods Groceries, Uber ride..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleAiAutoCategorize}
                disabled={isAiLoading || !title}
                title="AI Auto Categorize"
                className="px-3 py-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 flex items-center gap-1 font-medium transition-all disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isAiLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Auto Category</span>
              </button>
            </div>
          </div>

          {/* Amount & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Amount ($) *</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white font-semibold text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Payment Method */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="UPI">UPI / Digital Wallet</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-slate-400 font-medium mb-1.5">Notes (Optional)</label>
            <textarea
              rows={2}
              placeholder="Add details, merchant info, or receipt notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Is Recurring Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-300 font-medium">Mark as Recurring Monthly Expense</span>
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="w-4 h-4 accent-emerald-500 rounded"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
            >
              {expenseToEdit ? 'Update Expense' : 'Save Expense'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
