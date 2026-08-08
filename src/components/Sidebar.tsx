import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, CreditCard, Wallet, PieChart, 
  Target, Receipt, Bot, Settings, User, Sparkles, ChevronRight, Scan
} from 'lucide-react';

interface SidebarProps {
  onOpenExpenseModal: () => void;
  onOpenReceiptScanModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenExpenseModal, onOpenReceiptScanModal }) => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Expenses', path: '/expenses', icon: CreditCard },
    { label: 'Income', path: '/income', icon: Wallet },
    { label: 'Analytics', path: '/analytics', icon: PieChart },
    { label: 'Budget', path: '/budget', icon: Target },
    { label: 'Savings Goals', path: '/goals', icon: Target },
    { label: 'Bills & Reminders', path: '/bills', icon: Receipt },
    { label: 'AI Assistant', path: '/ai-assistant', icon: Bot, badge: 'AI' },
    { label: 'Settings', path: '/settings', icon: Settings },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col gap-6 p-4 border-r border-emerald-500/10 bg-slate-950/40 backdrop-blur-xl min-h-[calc(100vh-61px)]">
      
      {/* Primary Navigation List */}
      <nav className="flex flex-col gap-1.5 flex-1">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Main Menu
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-300 border border-emerald-500/30 shadow-md shadow-emerald-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-emerald-400/80 group-hover:text-emerald-400 transition-colors" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* AI Assistant Promo Banner Widget */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-emerald-950/60 to-slate-900/90 border border-emerald-500/30 relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform" />
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-white">Saviko Intelligence</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
          Instant receipt parsing, budget predictions, and automated spending recommendations.
        </p>
        <button
          onClick={onOpenReceiptScanModal}
          className="w-full py-2 px-3 text-[11px] font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
        >
          <Scan className="w-3.5 h-3.5" />
          <span>Scan Receipt AI</span>
        </button>
      </div>

    </aside>
  );
};
