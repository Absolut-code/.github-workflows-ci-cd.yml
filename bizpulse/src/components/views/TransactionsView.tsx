import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Filter } from 'lucide-react';
import { Transaction, TransactionType } from '@/lib/types';
import { mockFacilities } from '@/lib/mockData';

interface TransactionsViewProps {
  transactions: Transaction[];
  onAddTransaction: (tx: Omit<Transaction, 'id'>) => void;
}

export function TransactionsView({ transactions, onAddTransaction }: TransactionsViewProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTx, setNewTx] = useState({
    type: 'EXPENSE' as TransactionType,
    amount: '',
    category: '',
    facilityId: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSave = () => {
    if (!newTx.amount || !newTx.category || !newTx.facilityId || !newTx.date) return;

    onAddTransaction({
      date: newTx.date,
      category: newTx.category,
      amount: parseFloat(newTx.amount),
      type: newTx.type,
      facilityId: newTx.facilityId,
      status: 'COMPLETED' // Default to completed for simplicity
    });

    setIsDialogOpen(false);
    setNewTx({
      type: 'EXPENSE' as TransactionType,
      amount: '',
      category: '',
      facilityId: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Transactions Ledger</h2>
          <p className="text-slate-500 mt-2">Manage and track all income and expenses.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer">
              <span><Plus className="mr-2 h-4 w-4 inline-block" /> Add Transaction</span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
              <DialogDescription>
                Record a new income or expense for a facility.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <div className="col-span-3">
                  <Select value={newTx.type} onValueChange={(val: string | null) => val && setNewTx({...newTx, type: val as TransactionType})}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INCOME">Income</SelectItem>
                      <SelectItem value="EXPENSE">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">Amount</Label>
                <Input id="amount" type="number" placeholder="0.00" className="col-span-3" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Input id="category" placeholder="e.g. Rent" className="col-span-3" value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="facility" className="text-right">Facility</Label>
                <div className="col-span-3">
                  <Select value={newTx.facilityId} onValueChange={(val: string | null) => val && setNewTx({...newTx, facilityId: val})}>
                    <SelectTrigger><SelectValue placeholder="Select facility" /></SelectTrigger>
                    <SelectContent>
                      {mockFacilities.map(f => (
                        <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input id="date" type="date" className="col-span-3" value={newTx.date} onChange={e => setNewTx({...newTx, date: e.target.value})} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">Save Transaction</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4 border-b border-slate-100 flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input type="search" placeholder="Search transactions..." className="pl-9 bg-slate-50 border-slate-200" />
            </div>
            <Button variant="outline" size="icon" className="border-slate-200 text-slate-500">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100">
                <TableHead className="font-medium text-slate-500">Date</TableHead>
                <TableHead className="font-medium text-slate-500">Category</TableHead>
                <TableHead className="font-medium text-slate-500">Facility</TableHead>
                <TableHead className="font-medium text-slate-500">Status</TableHead>
                <TableHead className="text-right font-medium text-slate-500">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((tx) => {
                const facility = mockFacilities.find(f => f.id === tx.facilityId);
                return (
                  <TableRow key={tx.id} className="border-slate-100">
                    <TableCell className="text-slate-600">{format(new Date(tx.date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="font-medium text-slate-800">{tx.category}</TableCell>
                    <TableCell className="text-slate-600">{facility?.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={
                        tx.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                      }>
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${tx.type === 'INCOME' ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {tx.type === 'INCOME' ? '+' : '-'}${tx.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
