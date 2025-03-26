import React, { useState } from 'react';
import { useIncome } from '@/context/IncomeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, formatHours } from '@/utils/incomeCalculator';
import { Trash2, ArrowUpDown } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

type SortField = 'date' | 'projectName' | 'payRate' | 'timeSpent' | 'totalPay';
type SortDirection = 'asc' | 'desc';

const IncomeTable: React.FC = () => {
  const { entries, deleteEntry } = useIncome();
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [search, setSearch] = useState('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredEntries = entries.filter((entry) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      entry.projectName.toLowerCase().includes(searchLower) ||
      entry.date.includes(search)
    );
  });

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case 'date':
        comparison = a.date.localeCompare(b.date);
        break;
      case 'projectName':
        comparison = a.projectName.localeCompare(b.projectName);
        break;
      case 'payRate':
        comparison = a.payRate - b.payRate;
        break;
      case 'timeSpent':
        comparison = a.timeSpent - b.timeSpent;
        break;
      case 'totalPay':
        comparison = a.totalPay - b.totalPay;
        break;
      default:
        comparison = 0;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDeleteEntry = (id: string) => {
    deleteEntry(id);
  };

  return (
    <Card className="w-full glass">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Income Entries</CardTitle>
        <div className="w-1/3">
          <Input
            placeholder="Search entries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <TableRow>
                  <TableHead onClick={() => handleSort('date')} className="cursor-pointer w-[100px]">
                    <div className="flex items-center">
                      Date
                      {sortField === 'date' && (
                        <ArrowUpDown size={16} className="ml-1" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('projectName')} className="cursor-pointer">
                    <div className="flex items-center">
                      Project
                      {sortField === 'projectName' && (
                        <ArrowUpDown size={16} className="ml-1" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('payRate')} className="cursor-pointer text-right">
                    <div className="flex items-center justify-end">
                      Rate
                      {sortField === 'payRate' && (
                        <ArrowUpDown size={16} className="ml-1" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('timeSpent')} className="cursor-pointer text-right">
                    <div className="flex items-center justify-end">
                      Hours
                      {sortField === 'timeSpent' && (
                        <ArrowUpDown size={16} className="ml-1" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Regular</TableHead>
                  <TableHead className="text-right">Overtime</TableHead>
                  <TableHead onClick={() => handleSort('totalPay')} className="cursor-pointer text-right">
                    <div className="flex items-center justify-end">
                      Total
                      {sortField === 'totalPay' && (
                        <ArrowUpDown size={16} className="ml-1" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEntries.length > 0 ? (
                  sortedEntries.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-sm">{formatDate(entry.date)}</TableCell>
                      <TableCell className="max-w-[70px] truncate" title={entry.projectName}>
                        {entry.projectName}
                      </TableCell>
                      <TableCell className="text-right text-sm">{formatCurrency(entry.payRate)}</TableCell>
                      <TableCell className="text-right text-sm">{formatHours(entry.timeSpent)}</TableCell>
                      <TableCell className="text-right text-sm">{formatCurrency(entry.regularPay)}</TableCell>
                      <TableCell className="text-right text-sm">{formatCurrency(entry.overtimePay)}</TableCell>
                      <TableCell className="text-right font-medium text-sm">{formatCurrency(entry.totalPay)}</TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Entry</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this income entry? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteEntry(entry.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                      {search ? 'No matching entries found' : 'No income entries yet. Add your first one above!'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeTable;