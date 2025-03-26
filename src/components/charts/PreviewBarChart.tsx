import BarChart from './BarChart';

interface PreviewBarChartProps {
  colors: {
    regularPay: string;
    overtimePay: string;
    bonusPay: string;
    hoursWorked: string;
  };
}

const PreviewBarChart: React.FC<PreviewBarChartProps> = ({ colors }) => {
  // Mock data for preview - using single entry for cleaner vertical preview
  const previewData = [
    {          
      name: 'Jan',
      regularPay: 2000,
      overtimePay: 800,
      bonusPay: 500,
    },
    { 
      name: 'Feb',
      regularPay: 2200,
      overtimePay: 600,
      bonusPay: 300,
    }
  ];

  const hoursData = [
    { name: 'Jan', hours: 100 },
    { name: 'Feb', hours: 70 },
  ];

  return (
    <div className="hidden md:flex gap-4">
      <div className="flex-1">
        <BarChart
          data={previewData}
          keys={[
            { key: 'regularPay', color: colors.regularPay, name: 'Regular Pay' },
            { key: 'overtimePay', color: colors.overtimePay, name: 'Overtime Pay' },
            { key: 'bonusPay', color: colors.bonusPay, name: 'Bonus Pay' },
          ]}
          xAxisDataKey="name"
          height={200}
          layout="horizontal"
        />
      </div>

      <div className="flex-1">
        <BarChart
          data={hoursData}
          keys={[
            { key: 'hours', color: colors.hoursWorked, name: 'Hours' },
          ]}
          xAxisDataKey="name"
          height={200}
          layout="horizontal"
          currency={false}
        />
      </div>
    </div>
  );
};

export default PreviewBarChart; 