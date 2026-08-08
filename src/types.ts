export type ExpenseCategory = 
  | 'Food & Dining' 
  | 'Shopping' 
  | 'Housing & Rent' 
  | 'Transportation' 
  | 'Utilities' 
  | 'Entertainment' 
  | 'Healthcare' 
  | 'Education' 
  | 'Travel' 
  | 'Personal Care' 
  | 'Investments' 
  | 'Other';

export type IncomeCategory = 
  | 'Salary' 
  | 'Freelance' 
  | 'Business' 
  | 'Investment' 
  | 'Rental' 
  | 'Gift' 
  | 'Other';

export type BillCategory = 
  | 'Electricity' 
  | 'Water' 
  | 'Internet' 
  | 'Rent' 
  | 'EMI' 
  | 'Insurance' 
  | 'Subscription' 
  | 'Other';

export type GoalCategory = 
  | 'Emergency Fund' 
  | 'Car' 
  | 'Bike' 
  | 'Laptop' 
  | 'Vacation' 
  | 'House' 
  | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  currency: string;
  monthlySalary: number;
  darkMode: boolean;
  emailNotifications: boolean;
  createdAt: string;
}

export interface Expense {
  id: string;
  userId: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // YYYY-MM-DD
  paymentMethod: 'Credit Card' | 'Debit Card' | 'Cash' | 'Bank Transfer' | 'UPI';
  notes?: string;
  isRecurring?: boolean;
  receiptUrl?: string;
  tags?: string[];
  createdAt: string;
}

export interface Income {
  id: string;
  userId: string;
  title: string;
  amount: number;
  category: IncomeCategory;
  date: string;
  paymentMethod: 'Bank Transfer' | 'Direct Deposit' | 'Cash' | 'Cheque' | 'Crypto';
  notes?: string;
  isRecurring?: boolean;
  createdAt: string;
}

export interface Budget {
  id: string;
  userId: string;
  category: ExpenseCategory;
  limitAmount: number;
  spentAmount: number;
  month: number; // 1-12
  year: number;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  category: GoalCategory;
  deadline: string; // YYYY-MM-DD
  icon?: string;
  createdAt: string;
}

export interface Bill {
  id: string;
  userId: string;
  title: string;
  amount: number;
  dueDate: string; // YYYY-MM-DD
  category: BillCategory;
  isPaid: boolean;
  isRecurring: boolean;
  reminderDays: number; // Days before due date
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'budget_alert' | 'bill_reminder' | 'savings_milestone' | 'ai_report' | 'system';
  date: string;
  isRead: boolean;
}

export interface AIReport {
  id: string;
  userId: string;
  title: string;
  summary: string;
  healthScore: number;
  savingsRate: number;
  recommendations: string[];
  anomaliesDetected: string[];
  predictedEndBalance: number;
  topSpendingCategories: { category: string; amount: number; percentage: number }[];
  generatedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
}
