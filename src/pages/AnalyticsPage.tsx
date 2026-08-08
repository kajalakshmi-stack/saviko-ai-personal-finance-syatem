import React from 'react';
import { 
  PieChart as PieChartIcon, BarChart3, TrendingUp, Sparkles, AlertCircle 
} from 'lucide-react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend 
} from 'recharts';
import { useData } from '../context/DataContext';

export const AnalyticsPage: React.FC = () => {
  const { expenses, income, monthlyIncomeTotal, monthlyExpenseTotal, aiReport } = useData();

  // Category breakdown for Pie Chart
  const categoryMap: { [key: string]: number } = {};
  expenses.forEach(e => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
  });

  const pieData = Object.keys(categoryMap).map(cat => ({
    name: cat,
    value: categoryMap[cat]
  }));

  const COLORS = ['#10B981', '#14B8A6', '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899', '#F43F5E', '#F59E0B'];

  // Income vs Expense Comparison Bar Chart Data
  const comparisonData = [
    { name: 'Income', amount: monthlyIncomeTotal },
    { name: 'Expenses', amount: monthlyExpenseTotal },
    { name: 'Net Surplus', amount: Math.max(0, monthlyIncomeTotal - monthlyExpenseTotal) }
  ];

  // 6-Month Historical Trend Data
  const trendData = [
    { month: 'Mar', income: 7200, expense: 1850 },
    { month: 'Apr', income: 7500, expense: 1920 },
    { month: 'May', income: 8100, expense: 2100 },
    { month: 'Jun', income: 7800, expense: 1750 },
    { month: 'Jul', income: 9200, expense: 2300 },
    { month: 'Aug (Current)', income: monthlyIncomeTotal, expense: monthlyExpenseTotal }
  ];

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <PieChartIcon className="w-6 h-6 text-emerald-400" />
          <span>Financial Analytics & Predictive Intelligence</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Deep-dive visual analysis into category distribution, historical cash flows, and AI projections
        </p>
      </div>

      {/* Top 2 Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Category Expense Distribution (Pie Chart) */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 text-emerald-400" />
            <span>Category Outflow Distribution</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`$${Number(val).toFixed(2)}`, 'Spent']}
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#10B981', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] text-slate-300">
            {pieData.map((entry, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span>{entry.name}: <b>${entry.value.toFixed(0)}</b></span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Cash Inflow vs Outflow Comparison (Bar Chart) */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Income vs Outflow Overview</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  formatter={(val: any) => [`$${Number(val).toFixed(2)}`, 'Amount']}
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#10B981', borderRadius: '12px' }}
                />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                  <Cell fill="#10B981" />
                  <Cell fill="#F43F5E" />
                  <Cell fill="#14B8A6" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Chart 3: Historical Trend Line Chart */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>6-Month Cash Flow Momentum</span>
        </h3>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                formatter={(val: any) => [`$${Number(val).toFixed(2)}`, '']}
                contentStyle={{ backgroundColor: '#020617', borderColor: '#10B981', borderRadius: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="income" name="Monthly Income" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="expense" name="Monthly Expense" stroke="#F43F5E" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
