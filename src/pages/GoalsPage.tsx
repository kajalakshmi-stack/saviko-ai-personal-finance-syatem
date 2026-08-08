import React, { useState } from 'react';
import { Target, Plus, ShieldCheck, Car, Laptop, Plane, Home, DollarSign, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

interface GoalsPageProps {
  onOpenGoalModal: (goalId?: string) => void;
}

export const GoalsPage: React.FC<GoalsPageProps> = ({ onOpenGoalModal }) => {
  const { goals, deleteGoal } = useData();

  const totalTargetSum = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSavedSum = goals.reduce((sum, g) => sum + g.currentAmount, 0);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Emergency Fund': return ShieldCheck;
      case 'Car': return Car;
      case 'Laptop': return Laptop;
      case 'Vacation': return Plane;
      case 'House': return Home;
      default: return Target;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-400" />
            <span>Savings Goals Portfolio</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build wealth reserves for emergency safety nets, purchases, and vacations
          </p>
        </div>

        <button
          onClick={() => onOpenGoalModal()}
          className="px-4 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Savings Goal</span>
        </button>
      </div>

      {/* Top Portfolio Summary */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">Total Saved Across All Goals</span>
          <span className="text-3xl font-black text-emerald-400 mt-1 block">
            ${totalSavedSum.toLocaleString()} <span className="text-sm font-normal text-slate-400">/ ${totalTargetSum.toLocaleString()}</span>
          </span>
        </div>

        <div className="w-full md:w-72 space-y-2">
          <div className="flex justify-between text-xs text-slate-300 font-medium">
            <span>Overall Milestone Progress</span>
            <span>{Math.round((totalSavedSum / (totalTargetSum || 1)) * 100)}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((totalSavedSum / (totalTargetSum || 1)) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((g) => {
          const Icon = getIcon(g.category);
          const pct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
          const isCompleted = g.currentAmount >= g.targetAmount;

          return (
            <div
              key={g.id}
              className={`p-6 rounded-3xl bg-slate-900/60 border backdrop-blur-xl flex flex-col justify-between transition-all ${
                isCompleted ? 'border-emerald-500/60 shadow-lg shadow-emerald-500/10' : 'border-emerald-500/20 hover:border-emerald-500/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{g.title}</h3>
                      <p className="text-[11px] text-slate-400">Target Date: {g.deadline}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    isCompleted 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-slate-950 text-slate-300 border-slate-800'
                  }`}>
                    {isCompleted ? 'Target Achieved 🎉' : `${pct}% Saved`}
                  </span>
                </div>

                <div className="text-2xl font-black text-white mb-2">
                  ${g.currentAmount.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ ${g.targetAmount.toLocaleString()}</span>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800 my-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-4">
                <button
                  onClick={() => deleteGoal(g.id)}
                  className="text-xs text-rose-400 hover:underline font-medium"
                >
                  Remove Goal
                </button>

                <button
                  onClick={() => onOpenGoalModal(g.id)}
                  className="px-4 py-2 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Top Up Deposit</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
