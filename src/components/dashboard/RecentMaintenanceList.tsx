import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Asset } from '../../types';
import { formatDate, timeUntil } from '../../utils/formatters';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../ui/StatusBadge';

interface RecentMaintenanceListProps {
  assets: Asset[];
  title?: string;
}

export const RecentMaintenanceList: React.FC<RecentMaintenanceListProps> = ({ 
  assets, 
  title = "Upcoming Maintenance"
}) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{title}</CardTitle>
        <Link 
          to="/assets?filter=maintenance" 
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
        >
          View all
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assets.length === 0 ? (
            <p className="text-neutral-500 text-sm">No assets scheduled for maintenance.</p>
          ) : (
            assets.map((asset) => (
              <div 
                key={asset.id} 
                className="flex items-center justify-between border-b border-neutral-100 last:border-0 pb-3 last:pb-0"
              >
                <div className="flex flex-col">
                  <Link 
                    to={`/assets/${asset.id}`}
                    className="font-medium text-neutral-900 hover:text-blue-600 transition-colors"
                  >
                    {asset.name}
                  </Link>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={asset.status} showLabel={false} />
                    <span className="text-sm text-neutral-500">{asset.type}</span>
                    <span className="text-sm text-neutral-500">•</span>
                    <span className="text-sm text-neutral-500">{asset.serialNumber}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {formatDate(asset.nextServiceDue)}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {timeUntil(asset.nextServiceDue)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};