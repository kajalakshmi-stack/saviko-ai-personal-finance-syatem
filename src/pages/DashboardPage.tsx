import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, TrendingUp, TrendingDown, Wallet, CreditCard, 
  Target, Plus, Scan, Bot, ArrowUpRight, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { HealthScoreGauge } from '../components/HealthScoreGauge';

interface DashboardPageProps {
  onOpenExpenseModal: () => void;
  onOpenIncomeModal: () => void;
  onOpenReceiptScanModal: () => void;
  onOpenAIReportModal: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onOpenExpenseModal,
  onOpenIncomeModal,
  onOpenReceiptScanModal,
  onOpenAIReportModal
}) => {
  const { user } = useAuth();
  const { 
    totalBalance, monthlyIncomeTotal, monthlyExpenseTotal, 
    totalSavingsTotal, financialHealthScore, expenses, budgets, goals, aiReport 
  } = useData();

  const netSavingsRate = monthlyIncomeTotal > 0 
    ? (((monthlyIncomeTotal - monthlyExpenseTotal) / monthlyIncomeTotal) * 100).toFixed(1) 
    : '0';

  const recentTransactions = expenses.slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      
      {/* Welcome Banner Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-slate-950 border border-emerald-500/20 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Financial Audit Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good day, {user?.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your portfolio is performing with a <b className="text-emerald-400">+{netSavingsRate}% savings rate</b>. AI detected no critical anomalies today.
          </p>
        </div>

        {/* Quick Action Button Group */}
        <div className="flex flex-wrap items-center gap-2.5 z-10 w-full sm:w-auto">
          <button
            onClick={onOpenExpenseModal}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Expense</span>
          </button>

          <button
            onClick={onOpenReceiptScanModal}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-slate-900 border border-emerald-500/30 hover:bg-slate-800 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <Scan className="w-4 h-4" />
            <span>Scan Receipt</span>
          </button>

          <Link
            to="/ai-assistant"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI</span>
          </Link>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Total Balance */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Total Net Worth</span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+${(monthlyIncomeTotal - monthlyExpenseTotal).toFixed(2)} cashflow</span>
          </div>
        </div>

        {/* Stat 2: Monthly Income */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Monthly Income</span>
            <button onClick={onOpenIncomeModal} title="Add Income" className="p-2 rounded-xl bg-teal-500/15 text-teal-300 hover:bg-teal-500/25 transition-all">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="text-2xl font-black text-teal-300 tracking-tight">
            ${monthlyIncomeTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            {monthlyIncomeTotal > 0 ? 'Salary + Dividends + Freelance' : 'No income logged'}
          </div>
        </div>

        {/* Stat 3: Monthly Expenses */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Monthly Outflow</span>
            <div className="p-2 rounded-xl bg-rose-500/15 text-rose-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-100 tracking-tight">
            ${monthlyExpenseTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2 text-[11px] text-rose-400 font-medium flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>{expenses.length} transactions recorded</span>
          </div>
        </div>

        {/* Stat 4: Savings Goals Total */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Savings Saved</span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 tracking-tight">
            ${totalSavingsTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Across {goals.length} active goal funds
          </div>
        </div>

      </div>

      {/* Middle Row: Financial Health Score & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Health Score Gauge */}
        <div className="lg:col-span-1">
          <HealthScoreGauge score={financialHealthScore} savingsRate={Number(netSavingsRate)} onOpenAIReport={onOpenAIReportModal} />
        </div>

        {/* AI Recommendations Card */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white">Saviko AI Insights & Action Items</h3>
              </div>
              <button
                onClick={onOpenAIReportModal}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium"
              >
                <span>Full Audit</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {aiReport?.recommendations?.slice(0, 3).map((rec, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-200 leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Predicted Balance at month-end: <b className="text-emerald-400">${aiReport?.predictedEndBalance?.toLocaleString() || '11,840.10'}</b></span>
            <Link to="/analytics" className="text-emerald-400 hover:underline font-medium">View Analytics →</Link>
          </div>
        </div>

      </div>

      {/* Bottom Section: Recent Transactions & Budget Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Recent Transactions</h3>
            <Link to="/expenses" className="text-xs text-emerald-400 hover:underline font-medium flex items-center gap-1">
              <span>View All ({expenses.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="pb-3 pl-2">Title</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right pr-2">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentTransactions.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 pl-2 font-medium text-white max-w-[200px] truncate">
                      {exp.title}
                    </td>
                    <td className="py-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-emerald-300 border border-slate-800 text-[10px] font-semibold">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400">{exp.date}</td>
                    <td className="py-3 text-right pr-2 font-bold text-rose-400">
                      -${exp.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Budget Progress Preview */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Monthly Budgets</h3>
              <Link to="/budget" className="text-xs text-emerald-400 hover:underline font-medium">Manage</Link>
            </div>

            <div className="space-y-4">
              {budgets.slice(0, 4).map((b) => {
                const pct = Math.min(100, Math.round((b.spentAmount / b.limitAmount) * 100));
                const isOver = b.spentAmount > b.limitAmount;
                return (
                  <div key={b.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-200">{b.category}</span>
                      <span className={`font-bold ${isOver ? 'text-rose-400' : 'text-slate-300'}`}>
                        ${b.spentAmount.toFixed(0)} / ${b.limitAmount}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isOver ? 'bg-rose-500' : pct > 80 ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            to="/budget"
            className="mt-6 w-full py-2.5 px-3 text-xs font-semibold text-center text-slate-300 hover:text-white bg-slate-950 border border-slate-800 hover:border-emerald-500/30 rounded-2xl transition-all block"
          >
            Adjust Budget Allocations
          </Link>
        </div>

      </div>

    </div>
  );
};
