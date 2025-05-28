import React from 'react';
import { cn } from '../../utils/cn';
import { getStatusColorClass } from '../../utils/formatters';
import { AssetStatus } from '../../types';

interface StatusBadgeProps {
  status: AssetStatus;
  className?: string;
  showLabel?: boolean;
}

const statusLabels: Record<AssetStatus, string> = {
  operational: 'Operational',
  maintenance: 'In Maintenance',
  damaged: 'Damaged',
  decommissioned: 'Decommissioned',
  deployed: 'Deployed'
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  className,
  showLabel = true
}) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span 
        className={cn(
          'inline-block w-3 h-3 rounded-full',
          getStatusColorClass(status)
        )}
      />
      {showLabel && (
        <span className="text-sm font-medium">{statusLabels[status]}</span>
      )}
    </div>
  );
};