import React, { useState } from 'react';
import { Settings, Sun, Moon, DollarSign, Bell, ShieldCheck, Download, Trash2, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { expenses, income, budgets, goals, bills } = useData();

  const [currency, setCurrency] = useState(user?.currency || '$');
  const [emailNotifications, setEmailNotifications] = useState(user?.emailNotifications ?? true);

  const handleSaveCurrency = (newCurr: string) => {
    setCurrency(newCurr);
    if (user) updateUser({ currency: newCurr });
  };

  const handleToggleNotifications = () => {
    const nextVal = !emailNotifications;
    setEmailNotifications(nextVal);
    if (user) updateUser({ emailNotifications: nextVal });
  };

  const handleExportJSON = () => {
    const backupData = {
      user,
      expenses,
      income,
      budgets,
      goals,
      bills,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Saviko_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-emerald-400" />
          <span>System Settings & Preferences</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure currency formatting, notification rules, theme appearance, and backup archives
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        
        {/* Currency & Locale */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Currency & Display Format</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {['$', '€', '£', '₹', '¥', 'C$', 'A$'].map((symbol) => (
              <button
                key={symbol}
                onClick={() => handleSaveCurrency(symbol)}
                className={`py-3 px-4 rounded-2xl border font-bold transition-all ${
                  currency === symbol 
                    ? 'bg-emerald-400 text-slate-950 border-emerald-400' 
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-emerald-500/30'
                }`}
              >
                {symbol} Currency
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>AI Alerts & Push Reminders</span>
          </h3>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <div>
              <span className="font-semibold text-white block">Email Budget & Bill Notifications</span>
              <span className="text-[11px] text-slate-400">Receive weekly financial summaries and urgent bill alerts</span>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={handleToggleNotifications}
              className="w-5 h-5 accent-emerald-500 rounded"
            />
          </div>
        </div>

        {/* Backup & Export Data */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Data Export & Security</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <div>
              <span className="font-semibold text-white block">Export Complete Portfolio Backup</span>
              <span className="text-[11px] text-slate-400">Download all expenses, income, budgets, goals, and bills as JSON</span>
            </div>
            <button
              onClick={handleExportJSON}
              className="px-4 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 transition-all shrink-0"
            >
              Export JSON Backup
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
