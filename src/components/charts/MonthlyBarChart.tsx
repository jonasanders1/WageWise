import { MonthlySummary } from '@/types/income';
import BarChart from './BarChart';
import { getMonthName } from '@/utils/incomeCalculator';
import { useTheme } from '@/hooks/useTheme';
interface MonthlyBarChartProps {
  data: MonthlySummary[];
}

const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ data }) => {
  const { colors } = useTheme();
  // Sort data by month (chronologically)
  const sortedData = [...data].sort((a, b) => a.month.localeCompare(b.month));
  
  // Format for display
  const chartData = sortedData.map((monthly) => ({
    name: getMonthName(monthly.month),
    month: monthly.month, // Keep the raw month for tooltip/sorting
    regularPay: monthly.regularPay,
    overtimePay: monthly.overtimePay,
    bonusPay: monthly.bonusPay,
  }));

  return (
    <BarChart
      data={chartData}
      keys={[
        { key: 'regularPay', color: colors.regularPay, name: 'Regular Pay' },
        { key: 'overtimePay', color: colors.overtimePay, name: 'Overtime Pay' },
        { key: 'bonusPay', color: colors.bonusPay, name: 'Bonus Pay' },
      ]}
      xAxisDataKey="name"
      height={300}
    />
  );
};

export default MonthlyBarChart;