import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, ShieldCheck, Zap, TrendingUp, 
  Bot, Scan, Lock, CheckCircle2, Star, PieChart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDemoStart = async () => {
    await login('alex.rivera@saviko.io');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500 selection:text-slate-950 font-sans overflow-x-hidden">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Navigation Bar */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Saviko</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleDemoStart}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Live Demo
          </button>
          <Link
            to="/login"
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 border border-emerald-500/20 hover:border-emerald-500/50 rounded-full transition-all"
          >
            Log In
          </Link>
          <button
            onClick={handleDemoStart}
            className="px-5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-full shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen AI Wealth Intelligence Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15] max-w-4xl mx-auto">
          Personal Finance, Reimagined with <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">Gemini AI</span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
          Track expenses, predict end-of-month cash balances, auto-categorize receipts, and receive tailored financial coaching with an Apple-inspired fintech platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={handleDemoStart}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-sm font-bold shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>Launch Interactive Workspace</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/20 text-white text-sm font-semibold transition-all"
          >
            Sign In with Google
          </Link>
        </div>

        {/* Live Preview Card Showcase */}
        <div className="mt-16 rounded-3xl bg-slate-900/80 border border-emerald-500/20 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-slate-500">app.saviko.io/dashboard</span>
            </div>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active Live Demo Mode
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-left">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Total Net Worth</span>
              <span className="text-2xl font-black text-white mt-1 block">$33,281.56</span>
              <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">↑ +14.2% vs last month</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Monthly Cash Surplus</span>
              <span className="text-2xl font-black text-emerald-400 mt-1 block">+$6,112.00</span>
              <span className="text-xs text-slate-400 mt-1 block">38.2% Savings Rate</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Financial Health Score</span>
              <span className="text-2xl font-black text-teal-300 mt-1 block">88 / 100</span>
              <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">Optimal Reserve Buffer</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Intelligent Features</span>
          <h2 className="text-3xl font-extrabold text-white mt-2">Built for Financial Clarity</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Gemini AI Assistant</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ask questions about your budget, get end-of-month balance predictions, and receive tailored tips on cutting wasteful subscriptions.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Scan className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Instant Receipt Scanning</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload any physical receipt or invoice image. Saviko extracts the merchant, date, tax, and category automatically with vision models.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <PieChart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Smart Budgeting & Goals</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Set category limits and emergency safety nets. Receive proactive alert notifications before you exceed your monthly limits.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 px-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Saviko AI Finance. Designed with Apple Fintech aesthetics.</p>
      </footer>

    </div>
  );
};
