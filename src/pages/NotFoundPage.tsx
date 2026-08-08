import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 text-white space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
        <Sparkles className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold">404 - Page Not Found</h1>
      <p className="text-slate-400 max-w-md text-xs leading-relaxed">
        The financial page or report you requested does not exist or has been moved.
      </p>
      <Link
        to="/dashboard"
        className="px-6 py-3 rounded-2xl bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 hover:bg-emerald-300 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
};
