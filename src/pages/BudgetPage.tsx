import React from 'react';
import { Target, Plus, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

interface BudgetPageProps {
  onOpenBudgetModal: () => void;
}

export const BudgetPage: React.FC<BudgetPageProps> = ({ onOpenBudgetModal }) => {
  const { budgets, setBudget } = useData();

  const totalBudgetLimit = budgets.reduce((sum, b) => sum + b.limitAmount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spentAmount, 0);

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-400" />
            <span>Category Budget Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Set monthly category spending caps and monitor live threshold alerts
          </p>
        </div>

        <button
          onClick={onOpenBudgetModal}
          className="px-4 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Set Category Budget</span>
        </button>
      </div>

      {/* Top Total Summary Card */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">Total Monthly Allocated Budget</span>
          <span className="text-3xl font-black text-white mt-1 block">
            ${totalSpent.toFixed(2)} <span className="text-sm font-normal text-slate-400">/ ${totalBudgetLimit.toFixed(2)}</span>
          </span>
        </div>

        <div className="w-full md:w-72 space-y-2">
          <div className="flex justify-between text-xs text-slate-300 font-medium">
            <span>Overall Capacity</span>
            <span>{Math.round((totalSpent / (totalBudgetLimit || 1)) * 100)}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((totalSpent / (totalBudgetLimit || 1)) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Budget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((b) => {
          const pct = Math.min(100, Math.round((b.spentAmount / b.limitAmount) * 100));
          const isOver = b.spentAmount > b.limitAmount;
          const remaining = b.limitAmount - b.spentAmount;

          return (
            <div
              key={b.id}
              className={`p-6 rounded-3xl bg-slate-900/60 border backdrop-blur-xl transition-all ${
                isOver ? 'border-rose-500/50 shadow-lg shadow-rose-500/10' : 'border-emerald-500/20 hover:border-emerald-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-white text-sm">{b.category}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isOver 
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' 
                    : pct > 80 
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                }`}>
                  {isOver ? 'Exceeded' : `${pct}% Used`}
                </span>
              </div>

              <div className="text-xl font-bold text-white mb-2">
                ${b.spentAmount.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ ${b.limitAmount}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800 my-3">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isOver ? 'bg-rose-500' : pct > 80 ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>{isOver ? 'Over budget by:' : 'Remaining:'}</span>
                <span className={`font-bold ${isOver ? 'text-rose-400' : 'text-emerald-400'}`}>
                  ${Math.abs(remaining).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
