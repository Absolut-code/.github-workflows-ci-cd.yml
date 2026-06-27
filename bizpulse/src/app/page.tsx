'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AuthView } from '@/components/views/AuthView';
import { DashboardView } from '@/components/views/DashboardView';
import { TransactionsView } from '@/components/views/TransactionsView';
import { AiInsightsView } from '@/components/views/AiInsightsView';
import { Menu, X } from 'lucide-react';
import { mockTransactions } from '@/lib/mockData';
import { Transaction } from '@/lib/types';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  if (!isAuthenticated) {
    return <AuthView onLogin={() => setIsAuthenticated(true)} />;
  }

  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const tx: Transaction = {
      ...newTx,
      id: `t${Date.now()}` // Generate temporary ID
    };
    setTransactions(prev => [...prev, tx]);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView transactions={transactions} />;
      case 'transactions':
        return <TransactionsView transactions={transactions} onAddTransaction={handleAddTransaction} />;
      case 'aiInsights':
        return <AiInsightsView />;
      default:
        return <DashboardView transactions={transactions} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-slate-900 text-white rounded-md shadow-md"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar with mobile overlay */}
      <div className={`
        fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar
          currentView={currentView}
          setView={(view) => {
            setCurrentView(view);
            setIsMobileMenuOpen(false);
          }}
          onLogout={() => {
            setIsAuthenticated(false);
            setCurrentView('dashboard');
          }}
        />
      </div>

      {/* Overlay to close menu on mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full lg:ml-64 overflow-y-auto pt-16 lg:pt-0">
        {renderView()}
      </main>
    </div>
  );
}
