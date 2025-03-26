import React from 'react';
import { useIncome } from '@/context/IncomeContext';
import { formatCurrency } from '@/utils/incomeCalculator';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

const BonusTable: React.FC = () => {
  const { bonuses, deleteBonus } = useIncome();

  // Sort bonuses by date (newest first)
  const sortedBonuses = [...bonuses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this bonus entry?');
    if (confirmDelete) {
      deleteBonus(id);
    }
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-xl">Bonus History</CardTitle>
        <CardDescription>
          Your recorded project bonuses
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sortedBonuses.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No bonus entries yet. Add your first project bonus to see it here.
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedBonuses.map((bonus) => (
                  <TableRow key={bonus.id}>
                    <TableCell>
                      {new Date(bonus.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>{bonus.projectName}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(bonus.amount)}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {bonus.description || '-'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(bonus.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BonusTable;