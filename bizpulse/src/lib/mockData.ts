import { Facility, Transaction, MetricData } from './types';

export const mockFacilities: Facility[] = [
  { id: 'f1', name: 'Store 1 - Downtown', area: 120, rent: 5000, employees: 5 },
  { id: 'f2', name: 'Store 2 - Suburbs', area: 200, rent: 3500, employees: 8 },
];

export const mockTransactions: Transaction[] = [
  { id: 't1', date: '2023-10-01', category: 'Sales', amount: 12500, type: 'INCOME', facilityId: 'f1', status: 'COMPLETED' },
  { id: 't2', date: '2023-10-02', category: 'Rent', amount: 5000, type: 'EXPENSE', facilityId: 'f1', status: 'COMPLETED' },
  { id: 't3', date: '2023-10-05', category: 'Payroll', amount: 4000, type: 'EXPENSE', facilityId: 'f1', status: 'COMPLETED' },
  { id: 't4', date: '2023-10-10', category: 'Sales', amount: 9800, type: 'INCOME', facilityId: 'f2', status: 'COMPLETED' },
  { id: 't5', date: '2023-10-12', category: 'Purchases', amount: 3200, type: 'EXPENSE', facilityId: 'f2', status: 'COMPLETED' },
  { id: 't6', date: '2023-10-15', category: 'Sales', amount: 4500, type: 'INCOME', facilityId: 'f1', status: 'PENDING' },
];

export const mockChartData: MetricData[] = [
  { month: 'May', income: 45000, expense: 32000 },
  { month: 'Jun', income: 48000, expense: 34000 },
  { month: 'Jul', income: 52000, expense: 38000 },
  { month: 'Aug', income: 49000, expense: 36000 },
  { month: 'Sep', income: 58000, expense: 41000 },
  { month: 'Oct', income: 61000, expense: 43000 },
];

export const mockForecastData = [
  { month: 'Nov', cumulativeProfit: -10000 },
  { month: 'Dec', cumulativeProfit: -2000 },
  { month: 'Jan', cumulativeProfit: 8000 },
  { month: 'Feb', cumulativeProfit: 19000 },
  { month: 'Mar', cumulativeProfit: 32000 },
];
