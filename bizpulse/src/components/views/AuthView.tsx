import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function AuthView({ onLogin }: { onLogin: () => void }) {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="space-y-1 text-center pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
            BizPulse<span className="text-blue-600">.</span>
          </CardTitle>
          <CardDescription>
            {step === 1 ? 'Sign in to your account' : 'Setup your first facility'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facilityName">Facility Name</Label>
                <Input id="facilityName" placeholder="e.g. Store 1 - Downtown" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area">Area (sqm)</Label>
                  <Input id="area" type="number" placeholder="120" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employees">Employees</Label>
                  <Input id="employees" type="number" placeholder="5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rent">Fixed Rent ($/mo)</Label>
                <Input id="rent" type="number" placeholder="5000" />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-4">
          {step === 1 ? (
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setStep(2)}>
              Sign In
            </Button>
          ) : (
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={onLogin}>
              Complete Setup
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
