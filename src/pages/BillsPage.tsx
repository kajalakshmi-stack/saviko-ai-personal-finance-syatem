import React from 'react';
import { Receipt, Plus, CheckCircle2, Clock, Trash2, Calendar } from 'lucide-react';
import { useData } from '../context/DataContext';

interface BillsPageProps {
  onOpenBillModal: () => void;
}

export const BillsPage: React.FC<BillsPageProps> = ({ onOpenBillModal }) => {
  const { bills, toggleBillPaid, deleteBill } = useData();

  const unpaidBillsSum = bills.filter(b => !b.isPaid).reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Receipt className="w-6 h-6 text-emerald-400" />
            <span>Bills & Subscription Reminders</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track utilities, rent, internet, EMI payments, and avoid late payment penalties
          </p>
        </div>

        <button
          onClick={onOpenBillModal}
          className="px-4 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Bill Reminder</span>
        </button>
      </div>

      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">Pending Unpaid Bills</span>
          <span className="text-3xl font-black text-rose-400 mt-1 block">
            ${unpaidBillsSum.toFixed(2)}
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400">
          <Clock className="w-6 h-6" />
        </div>
      </div>

      {/* Bills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((b) => (
          <div
            key={b.id}
            className={`p-6 rounded-3xl bg-slate-900/60 border backdrop-blur-xl flex flex-col justify-between transition-all ${
              b.isPaid ? 'border-emerald-500/30 opacity-70' : 'border-amber-500/30 shadow-lg shadow-amber-500/5'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-950 text-teal-300 border border-slate-800">
                  {b.category}
                </span>

                <button
                  onClick={() => toggleBillPaid(b.id)}
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1 transition-all ${
                    b.isPaid 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-emerald-500/20 hover:text-emerald-300'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{b.isPaid ? 'Paid' : 'Mark as Paid'}</span>
                </button>
              </div>

              <h3 className="text-base font-semibold text-white mb-1">{b.title}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Due Date: {b.dueDate}</span>
              </p>

              <div className="text-2xl font-extrabold text-white my-3">
                ${b.amount.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
              <span>{b.isRecurring ? 'Monthly Recurring' : 'One-time bill'}</span>
              <button
                onClick={() => deleteBill(b.id)}
                className="text-rose-400 hover:underline p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
