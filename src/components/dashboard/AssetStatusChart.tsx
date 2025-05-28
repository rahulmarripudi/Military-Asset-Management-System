import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { AssetStatus } from '../../types';

interface AssetStatusChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const AssetStatusChart: React.FC<AssetStatusChartProps> = ({ data }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Asset Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} assets`, 'Count']} 
                labelFormatter={(name) => `Status: ${name}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to convert asset status data to chart format
export const prepareAssetStatusChartData = (
  statusData: Record<AssetStatus, number>
) => {
  const statusColors: Record<AssetStatus, string> = {
    operational: '#10B981', // green
    maintenance: '#F59E0B', // amber
    damaged: '#F97316',     // orange
    decommissioned: '#6B7280', // gray
    deployed: '#3B82F6',    // blue
  };

  return Object.entries(statusData)
    .filter(([_, count]) => count > 0)
    .map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
      color: statusColors[status as AssetStatus] || '#CBD5E1',
    }));
};