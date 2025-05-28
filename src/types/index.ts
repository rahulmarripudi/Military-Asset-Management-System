export type AssetStatus = 'operational' | 'maintenance' | 'damaged' | 'decommissioned' | 'deployed';

export type AssetType = 'vehicle' | 'weapon' | 'equipment' | 'device' | 'aircraft' | 'vessel';

export type AssetCondition = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';

export interface Location {
  id: string;
  name: string;
  type: 'base' | 'outpost' | 'facility' | 'depot' | 'field';
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
  assetCount: number;
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  type: 'routine' | 'repair' | 'overhaul' | 'inspection';
  description: string;
  technician: string;
  cost: number;
  parts: string[];
  status: 'completed' | 'scheduled' | 'in-progress';
}

export interface DeploymentRecord {
  id: string;
  startDate: string;
  endDate: string | null;
  location: string;
  mission: string;
  status: 'active' | 'completed' | 'planned';
}

export interface Asset {
  id: string;
  name: string;
  serialNumber: string;
  type: AssetType;
  subtype: string;
  status: AssetStatus;
  condition: AssetCondition;
  acquisitionDate: string;
  acquisitionCost: number;
  manufacturer: string;
  model: string;
  description: string;
  location: string;
  assignedTo: string | null;
  lastServiced: string | null;
  nextServiceDue: string | null;
  maintenanceHistory: MaintenanceRecord[];
  deploymentHistory: DeploymentRecord[];
  notes: string;
  images: string[];
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  rank: string;
  email: string;
  role: 'admin' | 'manager' | 'operator' | 'viewer';
  unit: string;
  avatar: string;
}

export interface SummaryStats {
  totalAssets: number;
  operationalAssets: number;
  inMaintenanceAssets: number;
  deployedAssets: number;
  criticalConditionAssets: number;
  assetsByType: Record<AssetType, number>;
  assetsByLocation: Record<string, number>;
  assetsByStatus: Record<AssetStatus, number>;
  recentlyUpdated: Asset[];
  upcomingMaintenance: Asset[];
}