import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Percent, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockChartData } from '@/lib/mockData';
import { Transaction } from '@/lib/types';

interface DashboardViewProps {
  transactions: Transaction[];
}

export function DashboardView({ transactions }: DashboardViewProps) {
  // Calculate dynamic totals from transactions state
  const totalRevenue = transactions.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0);
  const totalOpEx = transactions.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalRevenue - totalOpEx;
  const margin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : '0.0';

  // OpEx Breakdown
  const rent = transactions.filter(t => t.type === 'EXPENSE' && t.category.toLowerCase().includes('rent')).reduce((sum, t) => sum + t.amount, 0);
  const payroll = transactions.filter(t => t.type === 'EXPENSE' && t.category.toLowerCase().includes('payroll')).reduce((sum, t) => sum + t.amount, 0);
  const purchases = transactions.filter(t => t.type === 'EXPENSE' && t.category.toLowerCase().includes('purchase')).reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
        <p className="text-slate-500 mt-2">Overview of your financial performance.</p>
      </div>

      {/* KPI Widgets */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> Based on live transactions
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${netProfit.toLocaleString()}</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> Live calculated
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Margin</CardTitle>
            <Percent className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{margin}%</div>
            <p className="text-xs text-slate-500 mt-1">
              Net Profit / Revenue
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">OpEx</CardTitle>
            <TrendingDown className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${totalOpEx.toLocaleString()}</div>
            <div className="text-xs text-slate-500 mt-1 flex gap-2">
              <span title="Rent">R: ${rent > 0 ? `${(rent/1000).toFixed(1)}k` : '0'}</span>
              <span title="Payroll">P: ${payroll > 0 ? `${(payroll/1000).toFixed(1)}k` : '0'}</span>
              <span title="Purchases">S: ${purchases > 0 ? `${(purchases/1000).toFixed(1)}k` : '0'}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="bg-rose-50 border-rose-200 shadow-sm">
        <CardContent className="p-4 flex items-start gap-4 text-rose-900">
          <AlertCircle className="h-5 w-5 text-rose-600 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold text-rose-900">Potential Cash Gap Detected</h4>
            <p className="text-sm mt-1 text-rose-700">
              Expenses for &apos;Store 2 - Suburbs&apos; are projected to exceed revenue pace by $2,500 next week due to upcoming inventory purchases.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <Card className="border-slate-200 shadow-sm col-span-4">
        <CardHeader>
          <CardTitle className="text-lg text-slate-800">Income vs Expenses (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `$${value/1000}k`} dx={-10} />
                <Tooltip
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number | string) => {
                    const numValue = Number(value);
                    return [`$${isNaN(numValue) ? value : numValue.toLocaleString()}`, undefined];
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="income" name="Income" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="expense" name="Expenses" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
