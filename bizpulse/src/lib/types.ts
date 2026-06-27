export type Role = 'ADMIN' | 'MANAGER';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
}

export interface Facility {
  id: string;
  name: string;
  area: number;
  rent: number;
  employees: number;
}

export type TransactionType = 'INCOME' | 'EXPENSE';
export type TransactionStatus = 'COMPLETED' | 'PENDING';

export interface Transaction {
  id: string;
  date: string;
  category: string;
  amount: number;
  type: TransactionType;
  facilityId: string;
  status: TransactionStatus;
}

export interface MetricData {
  month: string;
  income: number;
  expense: number;
}
