import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Bell, Sun, Moon, Search, Plus, 
  Scan, LogOut, User as UserIcon, Settings as SettingsIcon, CheckCheck, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

interface NavbarProps {
  onOpenExpenseModal: () => void;
  onOpenReceiptScanModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenExpenseModal, onOpenReceiptScanModal }) => {
  const { user, logout, updateUser } = useAuth();
  const { notifications, markNotificationRead, clearAllNotifications } = useData();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const toggleDarkMode = () => {
    if (user) {
      updateUser({ darkMode: !user.darkMode });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/expenses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-emerald-950/20 border-b border-emerald-500/10 px-4 sm:px-8 py-3.5 transition-colors">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        
        {/* Left: Brand Logo & Mobile Sidebar trigger */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold tracking-tight text-white flex items-center gap-1">
                Saviko <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Smart Wealth Engine</span>
            </div>
          </Link>
        </div>

        {/* Middle: Global Search */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions, bills, categories or AI insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-slate-900/60 border border-emerald-500/15 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Quick Action: Add Expense */}
          <button
            onClick={onOpenExpenseModal}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-full shadow-md shadow-emerald-500/20 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Expense</span>
          </button>

          {/* Quick Scan Receipt */}
          <button
            onClick={onOpenReceiptScanModal}
            title="AI Receipt Scan"
            className="p-2 rounded-full bg-slate-900/80 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all active:scale-95"
          >
            <Scan className="w-4 h-4" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-slate-900/80 border border-emerald-500/20 text-slate-300 hover:text-white hover:bg-slate-800 transition-all active:scale-95"
            title="Toggle Theme"
          >
            {user?.darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Notification Popover Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full bg-slate-900/80 border border-emerald-500/20 text-slate-300 hover:text-white hover:bg-slate-800 relative transition-all active:scale-95"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Menu */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900/95 border border-emerald-500/20 backdrop-blur-2xl shadow-2xl z-50 p-4 text-white animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold">Notifications</span>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2.5 my-3 pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-center text-xs text-slate-500 py-6">No new notifications</p>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          n.isRead 
                            ? 'bg-slate-950/40 border-slate-800/60 opacity-60' 
                            : 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-medium text-emerald-300">{n.title}</span>
                          <span className="text-[10px] text-slate-500 whitespace-nowrap">{n.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1 leading-snug">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 rounded-full border border-emerald-500/20 hover:border-emerald-500/50 transition-all focus:outline-none"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 border border-emerald-500/20 backdrop-blur-2xl shadow-2xl z-50 p-2 text-white animate-in fade-in zoom-in-95">
                <div className="p-3 border-b border-slate-800">
                  <p className="text-xs font-semibold text-white">{user?.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                  <div className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 inline-block font-semibold">
                    PRO Member • {user?.currency} USD
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>User Profile</span>
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors"
                  >
                    <SettingsIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Settings & Currency</span>
                  </Link>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                      navigate('/');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
