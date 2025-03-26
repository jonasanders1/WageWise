import React, { useState } from 'react';
import { useIncome } from '@/context/IncomeContext';
import { BonusEntry } from '@/types/income';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const BonusEntryForm: React.FC = () => {
  const { addBonus } = useIncome();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [projectName, setProjectName] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !projectName || amount <= 0) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const newBonus: BonusEntry = {
      id: Date.now().toString(),
      date,
      projectName,
      amount,
      description
    };

    addBonus(newBonus);
    
    // Reset form
    setDate(new Date().toISOString().split('T')[0]);
    setProjectName('');
    setAmount(0);
    setDescription('');
  };

  return (
    <Card className="w-full glass">
      <CardHeader>
        <CardTitle className="text-xl">Add New Bonus</CardTitle>
        <CardDescription>
          Enter details about your project bonuses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bonusDate">Date</Label>
              <Input
                id="bonusDate"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bonusProjectName">Project Name</Label>
              <Input
                id="bonusProjectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bonusAmount">Bonus Amount ($)</Label>
              <Input
                id="bonusAmount"
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="transition-all"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bonusDescription">Description (Optional)</Label>
              <Textarea
                id="bonusDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter details about this bonus"
                className="transition-all resize-none h-20"
              />
            </div>
          </div>

          <CardFooter className="px-0 pt-2">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 transition-colors">
              Add Bonus
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default BonusEntryForm;