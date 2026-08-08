import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';

import { ExpenseModal } from './components/ExpenseModal';
import { IncomeModal } from './components/IncomeModal';
import { BudgetModal } from './components/BudgetModal';
import { GoalModal } from './components/GoalModal';
import { BillModal } from './components/BillModal';
import { ReceiptScanModal } from './components/ReceiptScanModal';
import { AIReportModal } from './components/AIReportModal';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { IncomePage } from './pages/IncomePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { BudgetPage } from './pages/BudgetPage';
import { GoalsPage } from './pages/GoalsPage';
import { BillsPage } from './pages/BillsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

import { Expense } from './types';

// Protected Workspace Layout Wrapper
const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col">
      <Navbar />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 pt-20 pb-12 flex-1 grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="hidden md:block md:col-span-3 lg:col-span-2">
          <Sidebar />
        </aside>

        <main className="md:col-span-9 lg:col-span-10">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

// Main App Inner with Modals State
const AppContent: React.FC = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>(undefined);

  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [targetGoalId, setTargetGoalId] = useState<string | null>(null);

  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isReceiptScanModalOpen, setIsReceiptScanModalOpen] = useState(false);
  const [isAIReportModalOpen, setIsAIReportModalOpen] = useState(false);

  const handleOpenExpenseModal = (expense?: Expense) => {
    setEditingExpense(expense);
    setIsExpenseModalOpen(true);
  };

  const handleOpenGoalModal = (goalId?: string) => {
    setTargetGoalId(goalId || null);
    setIsGoalModalOpen(true);
  };

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Dashboard & Module Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <DashboardPage
                onOpenExpenseModal={() => handleOpenExpenseModal()}
                onOpenIncomeModal={() => setIsIncomeModalOpen(true)}
                onOpenReceiptScanModal={() => setIsReceiptScanModalOpen(true)}
                onOpenAIReportModal={() => setIsAIReportModalOpen(true)}
              />
            </ProtectedLayout>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedLayout>
              <ExpensesPage
                onOpenExpenseModal={handleOpenExpenseModal}
                onOpenReceiptScanModal={() => setIsReceiptScanModalOpen(true)}
              />
            </ProtectedLayout>
          }
        />

        <Route
          path="/income"
          element={
            <ProtectedLayout>
              <IncomePage onOpenIncomeModal={() => setIsIncomeModalOpen(true)} />
            </ProtectedLayout>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedLayout>
              <AnalyticsPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/budget"
          element={
            <ProtectedLayout>
              <BudgetPage onOpenBudgetModal={() => setIsBudgetModalOpen(true)} />
            </ProtectedLayout>
          }
        />

        <Route
          path="/goals"
          element={
            <ProtectedLayout>
              <GoalsPage onOpenGoalModal={handleOpenGoalModal} />
            </ProtectedLayout>
          }
        />

        <Route
          path="/bills"
          element={
            <ProtectedLayout>
              <BillsPage onOpenBillModal={() => setIsBillModalOpen(true)} />
            </ProtectedLayout>
          }
        />

        <Route
          path="/ai-assistant"
          element={
            <ProtectedLayout>
              <AIAssistantPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedLayout>
              <SettingsPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedLayout>
              <ProfilePage />
            </ProtectedLayout>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedLayout>
              <NotFoundPage />
            </ProtectedLayout>
          }
        />
      </Routes>

      {/* Global Action Modals */}
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        initialExpense={editingExpense}
      />

      <IncomeModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
      />

      <BudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
      />

      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        topUpGoalId={targetGoalId}
      />

      <BillModal
        isOpen={isBillModalOpen}
        onClose={() => setIsBillModalOpen(false)}
      />

      <ReceiptScanModal
        isOpen={isReceiptScanModalOpen}
        onClose={() => setIsReceiptScanModalOpen(false)}
      />

      <AIReportModal
        isOpen={isAIReportModalOpen}
        onClose={() => setIsAIReportModalOpen(false)}
      />
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
