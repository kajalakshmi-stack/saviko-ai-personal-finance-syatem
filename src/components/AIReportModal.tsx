import React, { useState } from 'react';
import { X, Sparkles, FileText, CheckCircle2, AlertTriangle, TrendingUp, Download, RefreshCw } from 'lucide-react';
import { useData } from '../context/DataContext';

interface AIReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIReportModal: React.FC<AIReportModalProps> = ({ isOpen, onClose }) => {
  const { aiReport, generateAIReport } = useData();
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleReGenerate = async () => {
    setIsGenerating(true);
    await generateAIReport();
    setIsGenerating(false);
  };

  const handleDownloadReport = () => {
    if (!aiReport) return;
    const content = `SAVIKO AI FINANCIAL AUDIT REPORT
Title: ${aiReport.title}
Date: ${aiReport.generatedAt}
Health Score: ${aiReport.healthScore}/100
Savings Rate: ${aiReport.savingsRate}%

SUMMARY:
${aiReport.summary}

RECOMMENDATIONS:
${aiReport.recommendations.map(r => `• ${r}`).join('\n')}

ANOMALIES DETECTED:
${aiReport.anomaliesDetected.map(a => `• ${a}`).join('\n')}

PREDICTED END-OF-MONTH BALANCE:
$${aiReport.predictedEndBalance.toLocaleString()}
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Saviko_AI_Report_${aiReport.generatedAt}.txt`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-emerald-500/30 p-6 shadow-2xl text-white relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{aiReport?.title || 'AI Monthly Financial Report'}</h3>
              <p className="text-[11px] text-slate-400">Generated on {aiReport?.generatedAt || new Date().toISOString().split('T')[0]}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {aiReport && (
          <div className="space-y-5 text-xs">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Health Score</span>
                <span className="text-xl font-bold text-emerald-400 mt-0.5 block">{aiReport.healthScore}/100</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Savings Rate</span>
                <span className="text-xl font-bold text-teal-300 mt-0.5 block">+{aiReport.savingsRate}%</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Predicted Balance</span>
                <span className="text-xl font-bold text-white mt-0.5 block">${aiReport.predictedEndBalance?.toLocaleString()}</span>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
              <h4 className="font-semibold text-emerald-300 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>Executive Summary</span>
              </h4>
              <p className="text-slate-200 leading-relaxed">{aiReport.summary}</p>
            </div>

            {/* AI Action Recommendations */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <h4 className="font-semibold text-white mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>AI Personalized Recommendations</span>
              </h4>
              <ul className="space-y-2">
                {aiReport.recommendations?.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Anomalies & Spending Risks */}
            {aiReport.anomaliesDetected && aiReport.anomaliesDetected.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <h4 className="font-semibold text-rose-400 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Anomalies & Over-spending Alerts</span>
                </h4>
                <ul className="space-y-1.5">
                  {aiReport.anomaliesDetected.map((anom, i) => (
                    <li key={i} className="text-slate-300 flex items-start gap-2">
                      <span className="text-rose-400">•</span>
                      <span>{anom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={handleReGenerate}
                disabled={isGenerating}
                className="px-4 py-2.5 rounded-2xl bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Analyzing...' : 'Regenerate Audit'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-2xl bg-slate-800 text-slate-300 hover:text-white transition-all"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleDownloadReport}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Report</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
