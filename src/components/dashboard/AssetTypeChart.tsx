import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { AssetType } from '../../types';

interface AssetTypeChartProps {
  data: {
    name: string;
    count: number;
    color: string;
  }[];
}

export const AssetTypeChart: React.FC<AssetTypeChartProps> = ({ data }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Assets by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip
                formatter={(value: number) => [`${value} assets`, 'Count']}
                labelFormatter={(name) => `Type: ${name}`}
              />
              <Legend />
              <Bar 
                dataKey="count" 
                name="Count"
                fill="#4A5D23"
                radius={[0, 4, 4, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to convert asset type data to chart format
export const prepareAssetTypeChartData = (
  typeData: Record<AssetType, number>
) => {
  const typeColors: Record<AssetType, string> = {
    vehicle: '#4A5D23',    // olive green
    weapon: '#991B1B',     // red
    equipment: '#0369A1',  // blue
    device: '#7C3AED',     // purple
    aircraft: '#0EA5E9',   // sky blue
    vessel: '#0891B2',     // cyan
  };

  const typeLabels: Record<AssetType, string> = {
    vehicle: 'Vehicles',
    weapon: 'Weapons',
    equipment: 'Equipment',
    device: 'Devices',
    aircraft: 'Aircraft',
    vessel: 'Vessels',
  };

  return Object.entries(typeData)
    .filter(([_, count]) => count > 0)
    .map(([type, count]) => ({
      name: typeLabels[type as AssetType] || type,
      count,
      color: typeColors[type as AssetType] || '#CBD5E1',
    }))
    .sort((a, b) => b.count - a.count);
};