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
  const isDark = theme === 'dark';

  // Theme-aware colors
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : '#f0f0f0';
  const axisColor = isDark ? 'rgba(255,255,255,0.2)' : '#e0e0e0';
  const textColor = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';

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
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart 
          data={data} 
          layout={layout}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={gridColor} 
            horizontal={layout === 'vertical'} 
            vertical={layout === 'horizontal'} 
          />
          {layout === 'vertical' ? (
            <>
              <XAxis 
                type="number"
                tickFormatter={(value) => (currency ? `$${value}` : value.toString())}
                tick={{ fontSize: 12, fill: textColor }}
                tickLine={false}
                axisLine={{ stroke: axisColor }}
              />
              <YAxis
                dataKey={xAxisDataKey}
                type="category"
                tick={{ fontSize: 12, fill: textColor }}
                tickLine={false}
                axisLine={{ stroke: axisColor }}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={xAxisDataKey}
                tick={{ fontSize: 12, fill: textColor }}
                tickLine={false}
                axisLine={{ stroke: axisColor }}
              />
              <YAxis
                tickFormatter={(value) => (currency ? `$${value}` : value.toString())}
                tick={{ fontSize: 12, fill: textColor }}
                tickLine={false}
                axisLine={{ stroke: axisColor }}
              />
            </>
          )}
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
          />
          <Legend
            formatter={(value) => {
              return <span className="text-sm text-foreground">{value}</span>;
            }}
          />
          {keys.map((k) => (
            <Bar
              key={k.key}
              dataKey={k.key}
              name={k.name}
              stackId="a"
              fill={k.color}
              radius={layout === 'vertical' ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              animationDuration={1000}
              // Add hover effect
              onMouseEnter={(data, index, e) => {
                (e.target as HTMLElement).style.opacity = '0.8';
                (e.target as HTMLElement).style.transition = 'opacity 0.2s ease';
              }}
              onMouseLeave={(data, index, e) => {
                (e.target as HTMLElement).style.opacity = '1';
                (e.target as HTMLElement).style.transition = 'opacity 0.2s ease';
              }}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;