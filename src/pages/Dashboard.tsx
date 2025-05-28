import React from 'react';
import { 
  Truck, 
  Wrench, 
  AlertTriangle, 
  Map as MapIcon,
  ShieldCheck,
  Plane
} from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { AssetStatusChart, prepareAssetStatusChartData } from '../components/dashboard/AssetStatusChart';
import { AssetTypeChart, prepareAssetTypeChartData } from '../components/dashboard/AssetTypeChart';
import { RecentMaintenanceList } from '../components/dashboard/RecentMaintenanceList';
import { summaryStats } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

const Dashboard: React.FC = () => {
  // Prepare data for charts
  const statusChartData = prepareAssetStatusChartData(summaryStats.assetsByStatus);
  const typeChartData = prepareAssetTypeChartData(summaryStats.assetsByType);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Assets"
          value={summaryStats.totalAssets}
          icon={<Truck className="h-6 w-6 text-blue-600" />}
          trend={{ value: 5, label: "from last month", isPositive: true }}
        />
        
        <StatCard
          title="Operational Assets"
          value={summaryStats.operationalAssets}
          icon={<ShieldCheck className="h-6 w-6 text-green-600" />}
          trend={{ value: 3, label: "from last month", isPositive: true }}
        />
        
        <StatCard
          title="In Maintenance"
          value={summaryStats.inMaintenanceAssets}
          icon={<Wrench className="h-6 w-6 text-amber-600" />}
          trend={{ value: 2, label: "from last month", isPositive: false }}
        />
        
        <StatCard
          title="Deployed Assets"
          value={summaryStats.deployedAssets}
          icon={<Plane className="h-6 w-6 text-blue-600" />}
          trend={{ value: 10, label: "from last month", isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AssetStatusChart data={statusChartData} />
        </div>
        
        <div>
          <AssetTypeChart data={typeChartData} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentMaintenanceList 
          assets={summaryStats.upcomingMaintenance} 
          title="Upcoming Maintenance"
        />
        
        <RecentMaintenanceList 
          assets={summaryStats.recentlyUpdated} 
          title="Recently Updated Assets"
        />
      </div>
    </div>
  );
};

export default Dashboard;