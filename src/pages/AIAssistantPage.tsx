import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, ArrowUpRight, Zap, RefreshCw } from 'lucide-react';
import { useData } from '../context/DataContext';

export const AIAssistantPage: React.FC = () => {
  const { chatMessages, sendAIChatMessage } = useData();

  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isSending]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isSending) return;

    setInput('');
    setIsSending(true);
    await sendAIChatMessage(query);
    setIsSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "Predict my end-of-month cash balance",
    "How can I cut $300 from my dining budget?",
    "Should I transfer $500 to my Tesla goal or emergency fund?",
    "Analyze my recurring subscriptions for waste"
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col justify-between space-y-4 animate-in fade-in pb-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-500/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-white flex items-center gap-1.5">
              Saviko Financial Counselor <Sparkles className="w-4 h-4 text-emerald-400" />
            </h1>
            <p className="text-[11px] text-slate-400">Powered by Gemini 3.6 Flash Server Architecture</p>
          </div>
        </div>
      </div>

      {/* Messages Chat Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
              msg.sender === 'user' 
                ? 'bg-slate-800 text-slate-200 border border-slate-700' 
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
              msg.sender === 'user'
                ? 'bg-emerald-500 text-slate-950 font-semibold'
                : 'bg-slate-900/80 border border-emerald-500/20 text-slate-200 backdrop-blur-xl'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <span className={`block text-[9px] ${msg.sender === 'user' ? 'text-slate-900/70' : 'text-slate-500'}`}>
                {msg.timestamp}
              </span>

              {/* Quick Action Chips from AI */}
              {msg.quickActions && msg.quickActions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                  {msg.quickActions.map((qa, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(qa.action)}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium transition-all"
                    >
                      {qa.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 p-3">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Saviko AI is auditing your financial parameters...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts & Input Bar */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        
        {/* Quick Prompts Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px]">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-emerald-500/10 border border-emerald-500/20 text-slate-300 hover:text-emerald-300 whitespace-nowrap transition-all shrink-0"
            >
              💡 {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="relative">
          <textarea
            rows={1}
            placeholder="Ask Saviko AI anything about your money, budget, or savings..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-4 pr-12 py-3.5 text-xs rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none shadow-xl"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isSending}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-emerald-400 text-slate-950 hover:bg-emerald-300 disabled:opacity-40 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
