import React, { useState, useMemo } from 'react';
import { 
  CreditCard, Search, Filter, Plus, Scan, Trash2, Edit2, 
  Sparkles, Calendar, DollarSign, Download, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { ExpenseCategory, Expense } from '../types';

interface ExpensesPageProps {
  onOpenExpenseModal: (expense?: Expense) => void;
  onOpenReceiptScanModal: () => void;
}

const CATEGORIES: (ExpenseCategory | 'All')[] = [
  'All', 'Food & Dining', 'Shopping', 'Housing & Rent', 'Transportation',
  'Utilities', 'Entertainment', 'Healthcare', 'Education',
  'Travel', 'Personal Care', 'Investments', 'Other'
];

export const ExpensesPage: React.FC<ExpensesPageProps> = ({ onOpenExpenseModal, onOpenReceiptScanModal }) => {
  const { expenses, deleteExpense } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | 'All'>('All');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtered expenses
  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (exp.notes && exp.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (exp.tags && exp.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      
      const matchesCategory = selectedCategory === 'All' || exp.category === selectedCategory;
      const matchesDate = !dateFilter || exp.date === dateFilter;

      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [expenses, searchQuery, selectedCategory, dateFilter]);

  const totalFilteredSum = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Pagination
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage) || 1;
  const paginatedExpenses = filteredExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExportCSV = () => {
    const headers = 'ID,Title,Amount,Category,Date,PaymentMethod,Notes\n';
    const rows = filteredExpenses.map(e => `"${e.id}","${e.title}",${e.amount},"${e.category}","${e.date}","${e.paymentMethod}","${e.notes || ''}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Saviko_Expenses_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-400" />
            <span>Expense Ledger</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Search, filter, auto-categorize, and export your transaction logs
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenReceiptScanModal}
            className="px-3.5 py-2 rounded-2xl bg-slate-900 border border-emerald-500/30 text-emerald-300 hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Scan Receipt AI</span>
          </button>

          <button
            onClick={() => onOpenExpenseModal()}
            className="px-4 py-2 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="p-4 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search expenses, notes, or tags..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value as any); setCurrentPage(1); }}
              className="w-full px-3.5 py-2.5 text-xs rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>Category: {cat}</option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => { setDateFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3.5 py-2.5 text-xs rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Summary Counter Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          <span>Showing <b>{filteredExpenses.length}</b> transactions</span>
          {dateFilter && (
            <button onClick={() => setDateFilter('')} className="text-emerald-400 hover:underline">Clear Date Filter</button>
          )}
          <span>Total Outflow: <b className="text-rose-400 font-bold">${totalFilteredSum.toFixed(2)}</b></span>
        </div>
      </div>

      {/* Main Expenses Table */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="pb-3 pl-2">Title & Merchant</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Payment Method</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right pr-2">Amount</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedExpenses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">
                    No matching expenses found.
                  </td>
                </tr>
              ) : (
                paginatedExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 pl-2">
                      <div className="font-semibold text-white">{exp.title}</div>
                      {exp.notes && <div className="text-[11px] text-slate-400 mt-0.5">{exp.notes}</div>}
                    </td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-slate-950 text-emerald-300 border border-slate-800 text-[10px] font-semibold">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-300">{exp.paymentMethod}</td>
                    <td className="py-3.5 text-slate-400">{exp.date}</td>
                    <td className="py-3.5 text-right pr-2 font-extrabold text-rose-400 text-sm">
                      -${exp.amount.toFixed(2)}
                    </td>
                    <td className="py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onOpenExpenseModal(exp)}
                          title="Edit"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteExpense(exp.id)}
                          title="Delete"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800 text-xs text-slate-400">
            <span>Page {currentPage} of {totalPages}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-slate-950 border border-slate-800 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-slate-950 border border-slate-800 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
