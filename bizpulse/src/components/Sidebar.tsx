import { LayoutDashboard, ReceiptText, BrainCircuit, LogOut } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
  onLogout: () => void;
}

export function Sidebar({ currentView, setView, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'aiInsights', label: 'AI Insights', icon: BrainCircuit },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed">
      <div className="p-6">
        <h1 className="text-white font-bold text-2xl tracking-tight">BizPulse<span className="text-blue-500">.</span></h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">B2B Analytics</p>
      </div>
      <nav className="flex-1 mt-6">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <li key={item.id} className="mb-1 px-4">
                <button
                  onClick={() => setView(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                    isActive ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut size={20} className="text-slate-400" />
          <span className="font-medium text-sm">Log out</span>
        </button>
      </div>
    </div>
  );
}
