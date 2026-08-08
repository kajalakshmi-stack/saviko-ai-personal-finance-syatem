import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Expense, Income, Budget, Goal, Bill, Notification, AIReport, ChatMessage,
  ExpenseCategory, IncomeCategory, BillCategory, GoalCategory 
} from '../types';
import { 
  initialExpenses, initialIncome, initialBudgets, 
  initialGoals, initialBills, initialNotifications, initialAIReport 
} from '../data/mockData';

interface DataContextType {
  expenses: Expense[];
  income: Income[];
  budgets: Budget[];
  goals: Goal[];
  bills: Bill[];
  notifications: Notification[];
  aiReport: AIReport | null;
  chatMessages: ChatMessage[];
  totalBalance: number;
  monthlyIncomeTotal: number;
  monthlyExpenseTotal: number;
  totalSavingsTotal: number;
  financialHealthScore: number;
  
  // Actions
  addExpense: (expense: Omit<Expense, 'id' | 'userId' | 'createdAt'>) => Promise<Expense>;
  editExpense: (id: string, updates: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  
  addIncome: (inc: Omit<Income, 'id' | 'userId' | 'createdAt'>) => void;
  editIncome: (id: string, updates: Partial<Income>) => void;
  deleteIncome: (id: string) => void;
  
  setBudget: (category: ExpenseCategory, limitAmount: number) => void;
  
  addGoal: (goal: Omit<Goal, 'id' | 'userId' | 'createdAt' | 'currentAmount'>) => void;
  topUpGoal: (goalId: string, amount: number) => void;
  deleteGoal: (id: string) => void;
  
  addBill: (bill: Omit<Bill, 'id' | 'userId' | 'createdAt' | 'isPaid'>) => void;
  toggleBillPaid: (id: string) => void;
  deleteBill: (id: string) => void;
  
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  
  generateAIReport: () => Promise<AIReport>;
  sendAIChatMessage: (text: string) => Promise<string>;
  scanReceiptAI: (receiptText?: string, imageBase64?: string) => Promise<any>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const s = localStorage.getItem('saviko_expenses');
    return s ? JSON.parse(s) : initialExpenses;
  });

  const [income, setIncome] = useState<Income[]>(() => {
    const s = localStorage.getItem('saviko_income');
    return s ? JSON.parse(s) : initialIncome;
  });

  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const s = localStorage.getItem('saviko_budgets');
    return s ? JSON.parse(s) : initialBudgets;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const s = localStorage.getItem('saviko_goals');
    return s ? JSON.parse(s) : initialGoals;
  });

  const [bills, setBills] = useState<Bill[]>(() => {
    const s = localStorage.getItem('saviko_bills');
    return s ? JSON.parse(s) : initialBills;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const s = localStorage.getItem('saviko_notifications');
    return s ? JSON.parse(s) : initialNotifications;
  });

  const [aiReport, setAiReport] = useState<AIReport | null>(() => {
    const s = localStorage.getItem('saviko_ai_report');
    return s ? JSON.parse(s) : initialAIReport;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'ai',
      text: "👋 Hi Alex! I'm Saviko AI, your intelligent financial assistant. I've audited your latest monthly transactions. How can I help optimize your money today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: '📊 Analyze Dining Spending', action: 'Analyze Dining Spending' },
        { label: '🔮 Predict End-of-Month Balance', action: 'Predict End-of-Month Balance' },
        { label: '💡 How to save $500 this month?', action: 'How to save $500 this month?' },
        { label: '📄 Generate Monthly Report', action: 'Generate Monthly Report' }
      ]
    }
  ]);

  // Save to local storage
  useEffect(() => { localStorage.setItem('saviko_expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('saviko_income', JSON.stringify(income)); }, [income]);
  useEffect(() => { localStorage.setItem('saviko_budgets', JSON.stringify(budgets)); }, [budgets]);
  useEffect(() => { localStorage.setItem('saviko_goals', JSON.stringify(goals)); }, [goals]);
  useEffect(() => { localStorage.setItem('saviko_bills', JSON.stringify(bills)); }, [bills]);
  useEffect(() => { localStorage.setItem('saviko_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { if (aiReport) localStorage.setItem('saviko_ai_report', JSON.stringify(aiReport)); }, [aiReport]);

  // Recalculate spentAmount in budgets whenever expenses change
  useEffect(() => {
    setBudgets(prevBudgets =>
      prevBudgets.map(b => {
        const spent = expenses
          .filter(e => e.category === b.category)
          .reduce((sum, e) => sum + e.amount, 0);
        return { ...b, spentAmount: Number(spent.toFixed(2)) };
      })
    );
  }, [expenses]);

  // Totals calculations
  const monthlyIncomeTotal = income.reduce((sum, i) => sum + i.amount, 0);
  const monthlyExpenseTotal = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalSavingsTotal = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalBalance = 25000 + monthlyIncomeTotal - monthlyExpenseTotal; // Baseline cash + net cashflow

  // Dynamic health score calculation
  const savingsRate = monthlyIncomeTotal > 0 ? ((monthlyIncomeTotal - monthlyExpenseTotal) / monthlyIncomeTotal) * 100 : 0;
  const budgetOverCount = budgets.filter(b => b.spentAmount > b.limitAmount).length;
  const healthBase = Math.min(100, Math.max(30, Math.round(50 + savingsRate * 0.8 - budgetOverCount * 10)));
  const financialHealthScore = Math.min(100, healthBase);

  // Expense CRUD
  const addExpense = async (expData: Omit<Expense, 'id' | 'userId' | 'createdAt'>): Promise<Expense> => {
    const todayStr = new Date().toISOString().split('T')[0];
    let category = expData.category;
    let tags = expData.tags || [];

    // Optional AI auto-categorize if unspecified
    if (!category || category === 'Other') {
      try {
        const res = await fetch('/api/ai/categorize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: expData.title, amount: expData.amount, notes: expData.notes })
        });
        const catRes = await res.json();
        if (catRes.category) category = catRes.category as ExpenseCategory;
        if (catRes.tags) tags = catRes.tags;
      } catch (err) {
        console.warn('AI categorization fallback');
      }
    }

    const newExp: Expense = {
      ...expData,
      id: `exp_${Date.now()}`,
      userId: 'usr_1',
      category: category || 'Other',
      tags,
      createdAt: todayStr
    };

    setExpenses(prev => [newExp, ...prev]);

    // Check if budget limit reached & trigger notification
    const matchedBudget = budgets.find(b => b.category === newExp.category);
    if (matchedBudget) {
      const newSpent = matchedBudget.spentAmount + newExp.amount;
      if (newSpent > matchedBudget.limitAmount) {
        const alertNotif: Notification = {
          id: `notif_${Date.now()}`,
          userId: 'usr_1',
          title: `⚠️ Budget Exceeded: ${newExp.category}`,
          message: `Spending on ${newExp.category} has reached $${newSpent.toFixed(2)} (Limit: $${matchedBudget.limitAmount}).`,
          type: 'budget_alert',
          date: todayStr,
          isRead: false
        };
        setNotifications(prev => [alertNotif, ...prev]);
      }
    }

    return newExp;
  };

  const editExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  // Income CRUD
  const addIncome = (incData: Omit<Income, 'id' | 'userId' | 'createdAt'>) => {
    const newInc: Income = {
      ...incData,
      id: `inc_${Date.now()}`,
      userId: 'usr_1',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setIncome(prev => [newInc, ...prev]);
  };

  const editIncome = (id: string, updates: Partial<Income>) => {
    setIncome(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const deleteIncome = (id: string) => {
    setIncome(prev => prev.filter(i => i.id !== id));
  };

  // Budget
  const setBudget = (category: ExpenseCategory, limitAmount: number) => {
    const spent = expenses.filter(e => e.category === category).reduce((sum, e) => sum + e.amount, 0);
    setBudgets(prev => {
      const exists = prev.find(b => b.category === category);
      if (exists) {
        return prev.map(b => b.category === category ? { ...b, limitAmount } : b);
      }
      return [...prev, {
        id: `b_${Date.now()}`,
        userId: 'usr_1',
        category,
        limitAmount,
        spentAmount: Number(spent.toFixed(2)),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      }];
    });
  };

  // Goals
  const addGoal = (goalData: Omit<Goal, 'id' | 'userId' | 'createdAt' | 'currentAmount'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: `g_${Date.now()}`,
      userId: 'usr_1',
      currentAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const topUpGoal = (goalId: string, amount: number) => {
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        const updatedAmount = g.currentAmount + amount;
        if (updatedAmount >= g.targetAmount && g.currentAmount < g.targetAmount) {
          // Trigger milestone notification
          const notif: Notification = {
            id: `notif_${Date.now()}`,
            userId: 'usr_1',
            title: `🏆 Goal Completed: ${g.title}!`,
            message: `Congratulations! You have reached 100% of your $${g.targetAmount.toLocaleString()} target.`,
            type: 'savings_milestone',
            date: new Date().toISOString().split('T')[0],
            isRead: false
          };
          setNotifications(n => [notif, ...n]);
        }
        return { ...g, currentAmount: updatedAmount };
      }
      return g;
    }));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  // Bills
  const addBill = (billData: Omit<Bill, 'id' | 'userId' | 'createdAt' | 'isPaid'>) => {
    const newBill: Bill = {
      ...billData,
      id: `bill_${Date.now()}`,
      userId: 'usr_1',
      isPaid: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBills(prev => [...prev, newBill]);
  };

  const toggleBillPaid = (id: string) => {
    setBills(prev => prev.map(b => b.id === id ? { ...b, isPaid: !b.isPaid } : b));
  };

  const deleteBill = (id: string) => {
    setBills(prev => prev.filter(b => b.id !== id));
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // AI Services
  const generateAIReport = async (): Promise<AIReport> => {
    try {
      const res = await fetch('/api/ai/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expenses, income, budgets, goals })
      });
      const data = await res.json();
      const report: AIReport = {
        id: `rep_${Date.now()}`,
        userId: 'usr_1',
        title: data.title || 'AI Monthly Financial Audit',
        summary: data.summary || 'Strong savings rate with high capital retention.',
        healthScore: data.healthScore || financialHealthScore,
        savingsRate: data.savingsRate || savingsRate,
        recommendations: data.recommendations || ['Maintain current savings rate'],
        anomaliesDetected: data.anomaliesDetected || [],
        predictedEndBalance: data.predictedEndBalance || totalBalance + 3500,
        topSpendingCategories: [
          { category: 'Shopping', amount: 509, percentage: 36.8 },
          { category: 'Healthcare', amount: 220, percentage: 15.9 },
          { category: 'Food & Dining', amount: 161.25, percentage: 11.6 }
        ],
        generatedAt: new Date().toISOString().split('T')[0]
      };
      setAiReport(report);
      return report;
    } catch (e) {
      console.warn('AI report generation error, returning current report');
      return initialAIReport;
    }
  };

  const sendAIChatMessage = async (text: string): Promise<string> => {
    const userMsg: ChatMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            monthlyIncome: monthlyIncomeTotal,
            monthlyExpenses: monthlyExpenseTotal,
            totalSavings: totalSavingsTotal,
            goalsCount: goals.length,
            healthScore: financialHealthScore
          }
        })
      });
      const data = await res.json();
      const replyText = data.text || "I've analyzed your financial query. Based on your current income and expenses, keeping a 20% savings buffer will yield optimal net growth!";

      const aiMsg: ChatMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
      return replyText;
    } catch (e) {
      const fallbackText = "I am processing your query. You currently have a positive monthly surplus of $" + (monthlyIncomeTotal - monthlyExpenseTotal).toFixed(2) + ".";
      const aiMsg: ChatMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'ai',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
      return fallbackText;
    }
  };

  const scanReceiptAI = async (receiptText?: string, imageBase64?: string) => {
    const res = await fetch('/api/ai/receipt-scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ receiptText, imageBase64 })
    });
    return await res.json();
  };

  return (
    <DataContext.Provider value={{
      expenses,
      income,
      budgets,
      goals,
      bills,
      notifications,
      aiReport,
      chatMessages,
      totalBalance,
      monthlyIncomeTotal,
      monthlyExpenseTotal,
      totalSavingsTotal,
      financialHealthScore,
      addExpense,
      editExpense,
      deleteExpense,
      addIncome,
      editIncome,
      deleteIncome,
      setBudget,
      addGoal,
      topUpGoal,
      deleteGoal,
      addBill,
      toggleBillPaid,
      deleteBill,
      markNotificationRead,
      clearAllNotifications,
      generateAIReport,
      sendAIChatMessage,
      scanReceiptAI
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
