import React from 'react';
import { useIncome } from '@/context/IncomeContext';
import { getMonthlySummaries, getYearlySummaries, formatCurrency, formatHours, getTotalStats } from '@/utils/incomeCalculator';
import StatisticCard from './StatisticCard';
import { DollarSign, Clock, Briefcase, TrendingUp } from 'lucide-react';

const Stats: React.FC = () => {
  const { entries, bonuses } = useIncome();
  
  const monthlySummaries = getMonthlySummaries(entries, bonuses);
  const yearlySummaries = getYearlySummaries(entries, bonuses);
  const totals = getTotalStats(entries, bonuses);

  // Get unique projects
  const uniqueProjects = new Set([
    ...entries.map(entry => entry.projectName),
    ...bonuses.map(bonus => bonus.projectName)
  ]);

  // Calculate this month vs last month for percentage change
  const getPercentageChange = (currentValue: number, previousValue: number) => {
    if (previousValue === 0) return "N/A";
    const change = ((currentValue - previousValue) / previousValue) * 100;
    return `${Math.abs(change).toFixed(1)}%`;
  };

  // Get current and previous month data
  const currentMonth = monthlySummaries[0];
  const previousMonth = monthlySummaries[1];
  
  // Determine if earnings increased
  const isEarningsUp = previousMonth ? currentMonth?.totalPay > previousMonth?.totalPay : true;
  const earningsChange = previousMonth ? getPercentageChange(currentMonth?.totalPay || 0, previousMonth?.totalPay || 0) : undefined;
  
  // Determine if hours increased
  const isHoursUp = previousMonth ? currentMonth?.hoursWorked > previousMonth?.hoursWorked : true;
  const hoursChange = previousMonth ? getPercentageChange(currentMonth?.hoursWorked || 0, previousMonth?.hoursWorked || 0) : undefined;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatisticCard
        title="Total Earnings"
        value={formatCurrency(totals.totalPay)}
        icon={<DollarSign size={18} />}
        isUp={isEarningsUp}
        changePercentage={earningsChange}
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
      />
      <StatisticCard
        title="Avg. Hourly Rate"
        value={formatCurrency(totals.hoursWorked ? totals.totalPay / totals.hoursWorked : 0)}
        icon={<TrendingUp size={18} />}
      />
    </div>
  );
};

export default Stats;