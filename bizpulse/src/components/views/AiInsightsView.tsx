import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { mockForecastData } from '@/lib/mockData';

export function AiInsightsView() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <BrainCircuit className="h-6 w-6 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">AI Insights & Forecasting</h2>
        </div>
        <p className="text-slate-500 mt-2 ml-11">Automated analysis and predictions based on your data.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-indigo-100 shadow-sm bg-gradient-to-br from-white to-indigo-50/30">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-lg">Optimization Opportunity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 text-sm leading-relaxed">
              <strong>Store 2 - Suburbs</strong> is bringing in 15% less profit margin compared to Downtown due to rising logistics and procurement costs.
            </p>
            <div className="mt-4 p-3 bg-white/60 rounded-md border border-indigo-50 text-sm font-medium text-indigo-900">
              Recommendation: Consolidate supplier deliveries to reduce shipping fees by estimated $800/mo.
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-100 shadow-sm bg-gradient-to-br from-white to-emerald-50/30">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <CardTitle className="text-lg">Growth Projection</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 text-sm leading-relaxed">
              Overall revenue is trending upwards at a <strong>+5.1% MoM</strong> rate. If this trend continues, you will hit your Q4 targets 2 weeks early.
            </p>
            <div className="mt-4 p-3 bg-white/60 rounded-md border border-emerald-50 text-sm font-medium text-emerald-900">
              Insight: High performance in &apos;Sales&apos; category on weekends.
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-100 shadow-sm bg-gradient-to-br from-white to-rose-50/30">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
              <CardTitle className="text-lg">Risk Assessment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 text-sm leading-relaxed">
              Payroll expenses have increased by 8% over the last quarter without a proportional increase in revenue for <strong>Store 1</strong>.
            </p>
            <div className="mt-4 p-3 bg-white/60 rounded-md border border-rose-50 text-sm font-medium text-rose-900">
              Action Required: Review staffing levels during off-peak hours (Mon-Wed).
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-slate-800">Payback Forecasting (Break-even Analysis)</CardTitle>
          <CardDescription>Projected cumulative profit showing estimated break-even point.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockForecastData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `$${value/1000}k`} dx={-10} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => {
                    const val = Array.isArray(value) ? value[0] : value;
                    const numValue = Number(val);
                    return [`$${isNaN(numValue) ? val : numValue.toLocaleString()}`, 'Cumulative Profit'];
                  }}
                />
                <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="cumulativeProfit"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
