import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatisticCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  isUp?: boolean;
  changePercentage?: string;
  className?: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  icon,
  isUp,
  changePercentage,
  className,
}) => {
  return (
    <Card className={cn("glass", className)}>
      <CardContent className="p-6 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold">{value}</p>
          {changePercentage && (
            <div className="flex items-center text-xs">
              <span className={cn(
                "font-medium mr-1",
                isUp ? "text-green-500" : "text-red-500"
              )}>
                {isUp ? "↑" : "↓"} {changePercentage}
              </span>
              <span className="text-muted-foreground">from previous period</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticCard;