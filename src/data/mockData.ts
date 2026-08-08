import { User, Expense, Income, Budget, Goal, Bill, Notification, AIReport } from '../types';

export const initialUser: User = {
  id: 'usr_1',
  name: 'Alex Rivera',
  email: 'alex.rivera@saviko.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  currency: '$',
  monthlySalary: 7500,
  darkMode: true,
  emailNotifications: true,
  createdAt: '2026-01-15'
};

const today = new Date().toISOString().split('T')[0];
const getPastDate = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const initialExpenses: Expense[] = [
  {
    id: 'exp_1',
    userId: 'usr_1',
    title: 'Whole Foods Market Organic Groceries',
    amount: 142.50,
    category: 'Food & Dining',
    date: today,
    paymentMethod: 'Credit Card',
    notes: 'Weekly fresh groceries and household essentials',
    isRecurring: true,
    tags: ['Groceries', 'Organic'],
    createdAt: today
  },
  {
    id: 'exp_2',
    userId: 'usr_1',
    title: 'Equinox Fitness Monthly Pass',
    amount: 220.00,
    category: 'Healthcare',
    date: getPastDate(1),
    paymentMethod: 'Credit Card',
    notes: 'Monthly gym membership',
    isRecurring: true,
    tags: ['Fitness', 'Health'],
    createdAt: getPastDate(1)
  },
  {
    id: 'exp_3',
    userId: 'usr_1',
    title: 'Apple Store - Studio Display Mount',
    amount: 199.00,
    category: 'Shopping',
    date: getPastDate(2),
    paymentMethod: 'Credit Card',
    notes: 'Desk setup upgrade',
    tags: ['Tech', 'Apple'],
    createdAt: getPastDate(2)
  },
  {
    id: 'exp_4',
    userId: 'usr_1',
    title: 'Shell Gasoline Full Tank',
    amount: 58.40,
    category: 'Transportation',
    date: getPastDate(3),
    paymentMethod: 'Debit Card',
    notes: 'Commute fuel',
    tags: ['Fuel', 'Car'],
    createdAt: getPastDate(3)
  },
  {
    id: 'exp_5',
    userId: 'usr_1',
    title: 'Ooma Electric Utility',
    amount: 115.20,
    category: 'Utilities',
    date: getPastDate(5),
    paymentMethod: 'Bank Transfer',
    notes: 'July Electricity Bill',
    isRecurring: true,
    tags: ['Utilities', 'Bills'],
    createdAt: getPastDate(5)
  },
  {
    id: 'exp_6',
    userId: 'usr_1',
    title: 'Blue Bottle Coffee & Pastries',
    amount: 18.75,
    category: 'Food & Dining',
    date: getPastDate(6),
    paymentMethod: 'UPI',
    notes: 'Coffee meeting with client',
    tags: ['Coffee', 'Meeting'],
    createdAt: getPastDate(6)
  },
  {
    id: 'exp_7',
    userId: 'usr_1',
    title: 'Netflix & Spotify Family Premium',
    amount: 34.99,
    category: 'Entertainment',
    date: getPastDate(8),
    paymentMethod: 'Credit Card',
    notes: 'Monthly digital streaming bundles',
    isRecurring: true,
    tags: ['Subscription', 'Media'],
    createdAt: getPastDate(8)
  },
  {
    id: 'exp_8',
    userId: 'usr_1',
    title: 'Nordstrom Designer Coat Sale',
    amount: 310.00,
    category: 'Shopping',
    date: getPastDate(10),
    paymentMethod: 'Credit Card',
    notes: 'Winter wardrobe purchase',
    tags: ['Fashion'],
    createdAt: getPastDate(10)
  }
];

export const initialIncome: Income[] = [
  {
    id: 'inc_1',
    userId: 'usr_1',
    title: 'Senior Fintech Engineer Monthly Salary',
    amount: 7500.00,
    category: 'Salary',
    date: getPastDate(2),
    paymentMethod: 'Direct Deposit',
    notes: 'Stripe Direct Deposit Paycheck',
    isRecurring: true,
    createdAt: getPastDate(2)
  },
  {
    id: 'inc_2',
    userId: 'usr_1',
    title: 'UI Design System Retainer - Acme Corp',
    amount: 1850.00,
    category: 'Freelance',
    date: getPastDate(7),
    paymentMethod: 'Bank Transfer',
    notes: 'Q3 Design System milestone',
    createdAt: getPastDate(7)
  },
  {
    id: 'inc_3',
    userId: 'usr_1',
    title: 'Vanguard Index Dividend Yield',
    amount: 320.50,
    category: 'Investment',
    date: getPastDate(12),
    paymentMethod: 'Direct Deposit',
    notes: 'Quarterly ETF payout',
    createdAt: getPastDate(12)
  }
];

export const initialBudgets: Budget[] = [
  { id: 'b_1', userId: 'usr_1', category: 'Food & Dining', limitAmount: 600, spentAmount: 161.25, month: 8, year: 2026 },
  { id: 'b_2', userId: 'usr_1', category: 'Shopping', limitAmount: 500, spentAmount: 509.00, month: 8, year: 2026 },
  { id: 'b_3', userId: 'usr_1', category: 'Transportation', limitAmount: 300, spentAmount: 58.40, month: 8, year: 2026 },
  { id: 'b_4', userId: 'usr_1', category: 'Utilities', limitAmount: 250, spentAmount: 115.20, month: 8, year: 2026 },
  { id: 'b_5', userId: 'usr_1', category: 'Entertainment', limitAmount: 200, spentAmount: 34.99, month: 8, year: 2026 },
  { id: 'b_6', userId: 'usr_1', category: 'Healthcare', limitAmount: 300, spentAmount: 220.00, month: 8, year: 2026 }
];

export const initialGoals: Goal[] = [
  {
    id: 'g_1',
    userId: 'usr_1',
    title: '6-Month Emergency Safety Net',
    targetAmount: 25000,
    currentAmount: 18400,
    category: 'Emergency Fund',
    deadline: '2026-12-31',
    icon: 'shield-check',
    createdAt: '2026-01-01'
  },
  {
    id: 'g_2',
    userId: 'usr_1',
    title: 'Tesla Model Y Downpayment',
    targetAmount: 12000,
    currentAmount: 8500,
    category: 'Car',
    deadline: '2026-11-15',
    icon: 'car',
    createdAt: '2026-02-10'
  },
  {
    id: 'g_3',
    userId: 'usr_1',
    title: 'M3 Max MacBook Pro 16"',
    targetAmount: 3800,
    currentAmount: 3200,
    category: 'Laptop',
    deadline: '2026-09-30',
    icon: 'laptop',
    createdAt: '2026-03-01'
  },
  {
    id: 'g_4',
    userId: 'usr_1',
    title: 'Tokyo & Kyoto Autumn Trip',
    targetAmount: 6000,
    currentAmount: 4200,
    category: 'Vacation',
    deadline: '2026-10-20',
    icon: 'plane',
    createdAt: '2026-04-15'
  }
];

export const initialBills: Bill[] = [
  {
    id: 'bill_1',
    userId: 'usr_1',
    title: 'High-Speed Fiber Internet 1Gbps',
    amount: 79.99,
    dueDate: getPastDate(-3), // Due in 3 days
    category: 'Internet',
    isPaid: false,
    isRecurring: true,
    reminderDays: 3,
    createdAt: '2026-01-01'
  },
  {
    id: 'bill_2',
    userId: 'usr_1',
    title: 'Luxury Apartment Rent',
    amount: 2450.00,
    dueDate: getPastDate(-5), // Due in 5 days
    category: 'Rent',
    isPaid: false,
    isRecurring: true,
    reminderDays: 5,
    createdAt: '2026-01-01'
  },
  {
    id: 'bill_3',
    userId: 'usr_1',
    title: 'Comprehensive Auto Insurance',
    amount: 145.00,
    dueDate: getPastDate(-10),
    category: 'Insurance',
    isPaid: true,
    isRecurring: true,
    reminderDays: 4,
    createdAt: '2026-01-01'
  }
];

export const initialNotifications: Notification[] = [
  {
    id: 'notif_1',
    userId: 'usr_1',
    title: 'Budget Alert: Shopping Category',
    message: 'You have reached 101.8% ($509 / $500) of your monthly Shopping limit.',
    type: 'budget_alert',
    date: today,
    isRead: false
  },
  {
    id: 'notif_2',
    userId: 'usr_1',
    title: 'Upcoming Bill: Fiber Internet',
    message: '$79.99 is due in 3 days on ' + getPastDate(-3),
    type: 'bill_reminder',
    date: today,
    isRead: false
  },
  {
    id: 'notif_3',
    userId: 'usr_1',
    title: 'Savings Milestone Achieved! 🎉',
    message: 'Your MacBook Pro savings goal reached 84% completion!',
    type: 'savings_milestone',
    date: getPastDate(1),
    isRead: true
  }
];

export const initialAIReport: AIReport = {
  id: 'rep_1',
  userId: 'usr_1',
  title: 'August 2026 AI Financial Audit & Outlook',
  summary: 'Your financial portfolio demonstrates exceptional momentum with an active savings rate of 38.2%. Net monthly cash flow remains positive (+ $4,121.56). Primary spending acceleration was recorded in Nordstorm shopping purchases ($310).',
  healthScore: 88,
  savingsRate: 38.2,
  recommendations: [
    'Shopping limit exceeded by $9.00. Consider shifting $50 from Transportation buffer to offset.',
    'Automate $500 weekly transfer to Emergency Fund to reach $25,000 target 18 days earlier.',
    'Consolidate digital subscriptions (Netflix, Spotify) under family plan savings.'
  ],
  anomaliesDetected: [
    'Shopping expense spike of $310 at Nordstrom on ' + getPastDate(10) + ' is 180% above your 30-day baseline.'
  ],
  predictedEndBalance: 11840.10,
  topSpendingCategories: [
    { category: 'Shopping', amount: 509.00, percentage: 36.8 },
    { category: 'Healthcare', amount: 220.00, percentage: 15.9 },
    { category: 'Food & Dining', amount: 161.25, percentage: 11.6 },
    { category: 'Utilities', amount: 115.20, percentage: 8.3 }
  ],
  generatedAt: today
};
