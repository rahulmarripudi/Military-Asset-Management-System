import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
}) => {
  return (
    <Card className={cn('h-full', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500">{title}</p>
            <h3 className="mt-2 text-2xl font-semibold text-neutral-800">{value}</h3>
            
            {trend && (
              <div className="mt-2 flex items-center">
                <span
                  className={cn(
                    'text-xs font-medium',
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {trend.isPositive ? '↑' : '↓'} {trend.value}%
                </span>
                <span className="ml-1 text-xs text-neutral-500">{trend.label}</span>
              </div>
            )}
          </div>
          
          <div className="p-2 rounded-full bg-blue-100">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};