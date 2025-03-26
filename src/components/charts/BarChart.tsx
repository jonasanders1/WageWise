import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  TooltipProps,
} from 'recharts';
import { formatCurrency } from '@/utils/incomeCalculator';
import { useTheme } from '@/hooks/useTheme';

interface BarChartData {
  name: string;
  [key: string]: string | number;
}

interface BarChartProps {
  data: BarChartData[];
  keys: Array<{
    key: string;
    color: string;
    name: string;
  }>;
  xAxisDataKey: string;
  height?: number;
  currency?: boolean;
  layout?: 'horizontal' | 'vertical';
}

interface TooltipPayloadItem {
  value: number;
  dataKey: string;
  color: string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  keys,
  xAxisDataKey,
  height = 300,
  currency = true,
  layout = 'horizontal',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Theme-aware colors with stronger contrast
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : '#f0f0f0';
  const axisColor = isDark ? 'rgba(255,255,255,0.2)' : '#e0e0e0';
  const textColor = isDark ? 'rgba(255,255,255,0.87)' : 'rgba(0,0,0,0.87)';

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover/95 p-3 rounded-lg shadow-md text-sm min-w-[180px] border border-border backdrop-blur-sm">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: TooltipPayloadItem, index: number) => (
            <div key={index} className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-muted-foreground">
                  {keys.find(k => k.key === entry.dataKey)?.name || entry.dataKey}:
                </span>
              </div>
              <span className="font-medium text-foreground">
                {currency ? formatCurrency(entry.value) : entry.value}
              </span>
            </div>
          ))}
          {payload.length > 1 && (
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-medium text-foreground">
                {currency
                  ? formatCurrency(payload.reduce((sum: number, entry: TooltipPayloadItem) => sum + entry.value, 0))
                  : payload.reduce((sum: number, entry: TooltipPayloadItem) => sum + entry.value, 0)}
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey={xAxisDataKey}
            stroke={axisColor}
            tick={{ fill: textColor, fontSize: 12 }}
            axisLine={{ stroke: axisColor }}
          />
          <YAxis
            stroke={axisColor}
            tick={{ fill: textColor, fontSize: 12 }}
            axisLine={{ stroke: axisColor }}
            tickFormatter={value => currency ? formatCurrency(value) : value.toString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              color: textColor,
              fontSize: '12px'
            }}
          />
          {keys.map((item, index) => (
            <Bar
              key={item.key}
              dataKey={item.key}
              fill={item.color}
              name={item.name}
              stackId="stack"
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;