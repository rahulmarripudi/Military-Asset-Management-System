import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import { Badge } from '../ui/Badge';
import { Asset } from '../../types';
import { formatDate } from '../../utils/formatters';
import { Truck, Plane, Anchor, Zap, Shield, Hammer } from 'lucide-react';

interface AssetCardProps {
  asset: Asset;
}

const getAssetTypeIcon = (type: string) => {
  switch (type) {
    case 'vehicle':
      return <Truck className="h-5 w-5 text-[#4A5D23]" />;
    case 'aircraft':
      return <Plane className="h-5 w-5 text-[#0EA5E9]" />;
    case 'vessel':
      return <Anchor className="h-5 w-5 text-[#0891B2]" />;
    case 'weapon':
      return <Shield className="h-5 w-5 text-[#991B1B]" />;
    case 'equipment':
      return <Hammer className="h-5 w-5 text-[#0369A1]" />;
    case 'device':
      return <Zap className="h-5 w-5 text-[#7C3AED]" />;
    default:
      return <Truck className="h-5 w-5 text-[#4A5D23]" />;
  }
};

export const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  return (
    <Link to={`/assets/${asset.id}`} className="block hover:no-underline">
      <Card className="h-full transition-transform hover:translate-y-[-4px] hover:shadow-lg">
        <CardContent className="p-0">
          {asset.images && asset.images.length > 0 ? (
            <div className="relative h-40 overflow-hidden rounded-t-lg">
              <img 
                src={asset.images[0]} 
                alt={asset.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <StatusBadge status={asset.status} showLabel={false} />
              </div>
            </div>
          ) : (
            <div className="h-40 bg-neutral-100 rounded-t-lg flex items-center justify-center">
              {getAssetTypeIcon(asset.type)}
            </div>
          )}
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {getAssetTypeIcon(asset.type)}
                <span className="ml-1 text-sm font-medium text-neutral-500 capitalize">
                  {asset.subtype}
                </span>
              </div>
              <StatusBadge status={asset.status} />
            </div>
            
            <h3 className="font-semibold text-neutral-800 text-lg mb-1">{asset.name}</h3>
            
            <div className="text-sm text-neutral-600 mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-neutral-500">Serial:</span>
                <span className="font-medium">{asset.serialNumber}</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-neutral-500">Location:</span>
                <span className="font-medium">
                  {asset.location === '1' ? 'Fort Bradley' : 
                   asset.location === '2' ? 'Camp Sentinel' :
                   asset.location === '3' ? 'Delta FOB' :
                   asset.location === '4' ? 'Eagle Depot' :
                   asset.location === '5' ? 'Thunder Outpost' : 'Unknown'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Last service:</span>
                <span className="font-medium">{formatDate(asset.lastServiced)}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {asset.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};