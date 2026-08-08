import React from 'react';
import { Sparkles, ShieldCheck, AlertCircle, ArrowUpRight } from 'lucide-react';

interface HealthScoreGaugeProps {
  score: number;
  savingsRate?: number;
  onOpenAIReport?: () => void;
}

export const HealthScoreGauge: React.FC<HealthScoreGaugeProps> = ({ score, savingsRate = 38.2, onOpenAIReport }) => {
  // Determine rating label & color
  let ratingLabel = 'Excellent';
  let strokeColor = '#10B981'; // emerald-500
  let badgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';

  if (score < 60) {
    ratingLabel = 'Attention Needed';
    strokeColor = '#F43F5E'; // rose-500
    badgeClass = 'bg-rose-500/20 text-rose-400 border-rose-500/30';
  } else if (score < 75) {
    ratingLabel = 'Moderate';
    strokeColor = '#F59E0B'; // amber-500
    badgeClass = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  } else if (score < 88) {
    ratingLabel = 'Strong';
    strokeColor = '#14B8A6'; // teal-500
    badgeClass = 'bg-teal-500/20 text-teal-400 border-teal-500/30';
  }

  // Circular gauge math
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="p-5 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
      
      {/* Background glow */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold text-white">Financial Health Score</span>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeClass}`}>
          {ratingLabel}
        </span>
      </div>

      {/* Center Ring & Gauge */}
      <div className="flex items-center justify-between gap-4 py-2">
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-slate-800"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Animated Score Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke={strokeColor}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-white tracking-tight">{score}</span>
            <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">out of 100</span>
          </div>
        </div>

        {/* Right Stats Summary */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Savings Rate</span>
            <span className="text-sm font-bold text-emerald-400">+{savingsRate}% <span className="text-[10px] font-normal text-slate-400">of income</span></span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">AI Audit</span>
            <span className="text-xs font-semibold text-slate-200">Optimal Liquidity Buffer</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      {onOpenAIReport && (
        <button
          onClick={onOpenAIReport}
          className="mt-3 w-full py-2 px-3 text-xs font-medium text-emerald-300 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center gap-1.5 transition-all"
        >
          <span>View Full AI Report</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      )}

    </div>
  );
};
