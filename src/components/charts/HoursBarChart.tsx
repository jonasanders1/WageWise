import { useTheme } from '@/hooks/useTheme';
import { MonthlySummary } from '@/types/income';
import BarChart from './BarChart';
import { getMonthName } from '@/utils/incomeCalculator';

interface HoursBarChartProps {
  data: MonthlySummary[];
}

const HoursBarChart: React.FC<HoursBarChartProps> = ({ data }) => {
  const { colors } = useTheme();
  // Sort data by month (chronologically)
  const sortedData = [...data].sort((a, b) => a.month.localeCompare(b.month));
  
  // Format for display
  const chartData = sortedData.map((monthly) => ({
    name: getMonthName(monthly.month),
    month: monthly.month, // Keep the raw month for tooltip/sorting
    hours: monthly.hoursWorked,
  }));

  return (
    <BarChart
      data={chartData}
      keys={[
        { key: 'hours', color: colors.hoursWorked, name: 'Hours Worked' },
      ]}
      xAxisDataKey="name"
      height={300}
      currency={false}
    />
  );
};

export default HoursBarChart;