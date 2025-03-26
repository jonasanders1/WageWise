import { useTheme } from '@/hooks/useTheme';  
import { ProjectSummary } from '@/types/income';
import BarChart from './BarChart';

interface ProjectBarChartProps {
  data: ProjectSummary[];
}

const ProjectBarChart: React.FC<ProjectBarChartProps> = ({ data }) => {
  const { colors } = useTheme();
  // Sort data by total pay (highest first)
  const sortedData = [...data].sort((a, b) => b.totalPay - a.totalPay);
  
  // Format for display
  const chartData = sortedData.map((project) => ({
    name: project.projectName,
    regularPay: project.regularPay,
    overtimePay: project.overtimePay,
    bonusPay: project.bonusPay,
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

export default ProjectBarChart;