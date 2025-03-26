import { YearlySummary } from '@/types/income';
import BarChart from './BarChart';

interface AnnualBarChartProps {
  data: YearlySummary[];
}

const AnnualBarChart: React.FC<AnnualBarChartProps> = ({ data }) => {
  const chartData = data.map((yearly) => ({
    name: yearly.year.toString(),
    regularPay: yearly.regularPay,
    overtimePay: yearly.overtimePay,
    bonusPay: yearly.bonusPay,
  }));

  return (
    <BarChart
      data={chartData}
      keys={[
        { key: 'regularPay', color: '#38bdf8', name: 'Regular Pay' },
        { key: 'overtimePay', color: '#4ade80', name: 'Overtime Pay' },
        { key: 'bonusPay', color: '#f97316', name: 'Bonus Pay' },
      ]}
      xAxisDataKey="name"
      height={300}
    />
  );
};

export default AnnualBarChart;