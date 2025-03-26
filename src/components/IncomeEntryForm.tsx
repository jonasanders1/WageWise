import React, { useState } from 'react';
import { useIncome } from '@/context/IncomeContext';
import { IncomeEntry } from '@/types/income';
import { calculatePayment } from '@/utils/incomeCalculator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const DEFAULT_STANDARD_HOURS = 1;
const DEFAULT_OVERTIME_RATE = 16;

const IncomeEntryForm: React.FC = () => {
  const { addEntry } = useIncome();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [projectName, setProjectName] = useState('');
  const [payRate, setPayRate] = useState(30);
  const [timeSpent, setTimeSpent] = useState(1);
  const [standardHours, setStandardHours] = useState(DEFAULT_STANDARD_HOURS);
  const [overtimeRate, setOvertimeRate] = useState(DEFAULT_OVERTIME_RATE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !projectName || payRate <= 0 || timeSpent <= 0) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const payment = calculatePayment(timeSpent, standardHours, payRate, overtimeRate);
    
    const newEntry: IncomeEntry = {
      id: Date.now().toString(),
      date,
      projectName,
      payRate,
      timeSpent,
      standardHours,
      overtimeRate,
      regularPay: payment.regularPay,
      overtimePay: payment.overtimePay,
      totalPay: payment.totalPay,
    };

    addEntry(newEntry);
    
    // Reset form (except for default values)
    setDate(new Date().toISOString().split('T')[0]);
    setProjectName('');
    setPayRate(30);
    setTimeSpent(1);
  };

  // Preview calculation
  const payment = calculatePayment(timeSpent, standardHours, payRate, overtimeRate);
  const showPreview = projectName && payRate > 0 && timeSpent > 0;

  return (
    <Card className="w-full glass">
      <CardHeader>
        <CardTitle className="text-xl">Add New Income</CardTitle>
        <CardDescription>
          Enter details about your income
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payRate">Pay Rate ($/hour)</Label>
              <Input
                id="payRate"
                type="number"
                min="0"
                step="0.01"
                value={payRate}
                onChange={(e) => setPayRate(parseFloat(e.target.value))}
                className="transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeSpent">Time Spent (hours)</Label>
              <Input
                id="timeSpent"
                type="number"
                min="0.1"
                step="0.1"
                value={timeSpent}
                onChange={(e) => setTimeSpent(parseFloat(e.target.value))}
                className="transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="standardHours">Standard Hours</Label>
              <Input
                id="standardHours"
                type="number"
                min="0.1"
                step="0.1"
                value={standardHours}
                onChange={(e) => setStandardHours(parseFloat(e.target.value))}
                className="transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overtimeRate">Overtime Rate ($/hour)</Label>
              <Input
                id="overtimeRate"
                type="number"
                min="0"
                step="0.01"
                value={overtimeRate}
                onChange={(e) => setOvertimeRate(parseFloat(e.target.value))}
                className="transition-all"
                required
              />
            </div>
          </div>

          {showPreview && (
            <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
              <h3 className="font-medium mb-2">Payment Preview</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Regular Pay</p>
                  <p className="font-medium">${payment.regularPay.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Overtime Pay</p>
                  <p className="font-medium">${payment.overtimePay.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total</p>
                  <p className="font-medium">${payment.totalPay.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}

          <CardFooter className="px-0 pt-2">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 transition-colors">
              Add Income Entry
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default IncomeEntryForm;