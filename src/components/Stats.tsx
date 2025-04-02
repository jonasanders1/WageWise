import React from 'react';
import { DollarSign, Clock, Briefcase, TrendingUp, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/context/DataContext';
import { getTotalStats, formatCurrency, formatHours } from '@/utils/incomeCalculator';

const StatisticCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  isUp?: boolean;
  changePercentage?: number;
  subtitle?: string;
}> = ({ title, value, icon, isUp, changePercentage, subtitle }) => (
  <Card className="glass">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      {changePercentage !== undefined && (
        <p className={`text-xs ${isUp ? 'text-green-500' : 'text-red-500'}`}>
          {isUp ? '↑' : '↓'} {Math.abs(changePercentage).toFixed(1)}%
        </p>
      )}
    </CardContent>
  </Card>
);

const Stats: React.FC = () => {
  const { entries, bonuses } = useData();
  const totals = getTotalStats(entries, bonuses);

  // Calculate changes from previous period
  const previousPeriod = entries
    .filter(entry => {
      const entryDate = new Date(entry.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return entryDate < thirtyDaysAgo;
    });

  const previousTotals = getTotalStats(previousPeriod, bonuses);
  
  const earningsChange = previousTotals.totalPay > 0
    ? ((totals.totalPay - previousTotals.totalPay) / previousTotals.totalPay) * 100
    : 0;

  const hoursChange = previousTotals.hoursWorked > 0
    ? ((totals.hoursWorked - previousTotals.hoursWorked) / previousTotals.hoursWorked) * 100
    : 0;

  const isEarningsUp = earningsChange > 0;
  const isHoursUp = hoursChange > 0;

  // Calculate unique projects
  const uniqueProjects = new Set([
    ...entries.map(entry => entry.projectName),
    ...bonuses.map(bonus => bonus.projectName)
  ]);

  // Calculate effective hourly rate including bonuses
  const effectiveHourlyRate = totals.hoursWorked > 0 
    ? totals.totalPay / totals.hoursWorked 
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatisticCard
        title="Total Earnings"
        value={formatCurrency(totals.totalPay)}
        icon={<DollarSign size={18} />}
        isUp={isEarningsUp}
        changePercentage={earningsChange}
        subtitle={`${formatCurrency(totals.regularPay)} regular + ${formatCurrency(totals.overtimePay)} overtime`}
      />
      <StatisticCard
        title="Bonus Earnings"
        value={formatCurrency(totals.bonusPay)}
        icon={<Gift size={18} />}
        subtitle="Project bonuses"
      />
      <StatisticCard
        title="Total Hours"
        value={formatHours(totals.hoursWorked)}
        icon={<Clock size={18} />}
        isUp={isHoursUp}
        changePercentage={hoursChange}
      />
      <StatisticCard
        title="Projects"
        value={uniqueProjects.size.toString()}
        icon={<Briefcase size={18} />}
        subtitle="Active projects"
      />
      <StatisticCard
        title="Effective Rate"
        value={formatCurrency(effectiveHourlyRate)}
        icon={<TrendingUp size={18} />}
        subtitle="Including bonuses"
      />
    </div>
  );
};

export default Stats;