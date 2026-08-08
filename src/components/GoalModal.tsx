import React, { useState } from 'react';
import { X, Target, DollarSign, Calendar } from 'lucide-react';
import { GoalCategory } from '../types';
import { useData } from '../context/DataContext';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  topUpGoalId?: string | null;
}

const CATEGORIES: GoalCategory[] = ['Emergency Fund', 'Car', 'Bike', 'Laptop', 'Vacation', 'House', 'Other'];

export const GoalModal: React.FC<GoalModalProps> = ({ isOpen, onClose, topUpGoalId }) => {
  const { addGoal, topUpGoal, goals } = useData();

  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [category, setCategory] = useState<GoalCategory>('Emergency Fund');
  const [deadline, setDeadline] = useState('2026-12-31');
  const [topUpAmount, setTopUpAmount] = useState('');

  if (!isOpen) return null;

  const targetGoal = goals.find(g => g.id === topUpGoalId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (topUpGoalId && targetGoal) {
      if (topUpAmount) {
        topUpGoal(topUpGoalId, Number(topUpAmount));
      }
    } else {
      if (!title || !targetAmount) return;
      addGoal({
        title,
        targetAmount: Number(targetAmount),
        category,
        deadline
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-emerald-500/30 p-6 shadow-2xl text-white relative">
        
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">{topUpGoalId ? `Deposit to ${targetGoal?.title}` : 'Create Savings Goal'}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {topUpGoalId && targetGoal ? (
            <div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 mb-3">
                <p className="text-slate-400 font-medium">Current Progress</p>
                <p className="text-sm font-bold text-emerald-400 mt-1">
                  ${targetGoal.currentAmount.toLocaleString()} / ${targetGoal.targetAmount.toLocaleString()}
                </p>
              </div>

              <label className="block text-slate-400 font-medium mb-1.5">Deposit Amount ($) *</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="number"
                  step="10"
                  required
                  placeholder="250"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white font-semibold text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Goal Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tesla Downpayment, Tokyo Vacation..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Target Amount ($) *</label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="number"
                      step="50"
                      required
                      placeholder="5000"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white font-semibold text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as GoalCategory)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Target Date</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 text-slate-300 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
            >
              {topUpGoalId ? 'Confirm Deposit' : 'Create Goal'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
