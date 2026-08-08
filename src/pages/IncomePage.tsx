import React from 'react';
import { Wallet, Plus, Trash2, Edit2, TrendingUp, DollarSign } from 'lucide-react';
import { useData } from '../context/DataContext';

interface IncomePageProps {
  onOpenIncomeModal: () => void;
}

export const IncomePage: React.FC<IncomePageProps> = ({ onOpenIncomeModal }) => {
  const { income, deleteIncome, monthlyIncomeTotal } = useData();

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Wallet className="w-6 h-6 text-emerald-400" />
            <span>Income Tracker</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage salary, freelance retainers, investment yields, and recurring cash inflows
          </p>
        </div>

        <button
          onClick={onOpenIncomeModal}
          className="px-4 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Income Stream</span>
        </button>
      </div>

      {/* Top Total Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">Total Active Monthly Income</span>
          <span className="text-3xl font-black text-emerald-400 mt-1 block">
            ${monthlyIncomeTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
          <TrendingUp className="w-6 h-6" />
        </div>
      </div>

      {/* Income Streams Table */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="pb-3 pl-2">Source Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Payment Method</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right pr-2">Amount</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {income.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">
                    No income streams logged yet. Click "Add Income Stream" to begin.
                  </td>
                </tr>
              ) : (
                income.map((inc) => (
                  <tr key={inc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 pl-2 font-semibold text-white">{inc.title}</td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-slate-950 text-teal-300 border border-slate-800 text-[10px] font-semibold">
                        {inc.category}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-300">{inc.paymentMethod}</td>
                    <td className="py-3.5 text-slate-400">{inc.date}</td>
                    <td className="py-3.5 text-right pr-2 font-extrabold text-emerald-400 text-sm">
                      +${inc.amount.toFixed(2)}
                    </td>
                    <td className="py-3.5 text-center">
                      <button
                        onClick={() => deleteIncome(inc.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
