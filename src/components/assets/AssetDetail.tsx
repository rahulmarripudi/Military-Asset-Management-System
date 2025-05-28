import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Asset, Location, MaintenanceRecord } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { Badge } from '../ui/Badge';
import { formatDate, formatCurrency, getConditionColorClass } from '../../utils/formatters';
import {
  ArrowLeft,
  Edit,
  Truck,
  Calendar,
  DollarSign,
  Factory,
  MapPin,
  User,
  Clock,
  ClipboardList,
  History,
  PlusCircle,
  Plane,
  Anchor,
  Zap,
  Shield,
  Hammer,
} from 'lucide-react';

interface AssetDetailProps {
  assets: Asset[];
  locations: Location[];
}

const getAssetTypeIcon = (type: string) => {
  switch (type) {
    case 'vehicle':
      return <Truck className="h-5 w-5" />;
    case 'aircraft':
      return <Plane className="h-5 w-5" />;
    case 'vessel':
      return <Anchor className="h-5 w-5" />;
    case 'weapon':
      return <Shield className="h-5 w-5" />;
    case 'equipment':
      return <Hammer className="h-5 w-5" />;
    case 'device':
      return <Zap className="h-5 w-5" />;
    default:
      return <Truck className="h-5 w-5" />;
  }
};

export const AssetDetail: React.FC<AssetDetailProps> = ({ assets, locations }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'maintenance' | 'deployment'>('overview');
  
  const asset = assets.find((a) => a.id === id);
  
  if (!asset) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-neutral-800">Asset not found</h2>
        <p className="mt-2 text-neutral-600">The asset you are looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate('/assets')} className="mt-4">
          Back to Assets
        </Button>
      </div>
    );
  }
  
  const location = locations.find((l) => l.id === asset.location);
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <Button
            variant="ghost"
            className="mr-2 p-2"
            onClick={() => navigate('/assets')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-neutral-800">{asset.name}</h1>
        </div>
        
        <div className="flex space-x-2">
          <StatusBadge status={asset.status} />
          <Button variant="outline" className="flex items-center">
            <Edit className="mr-2 h-4 w-4" />
            Edit Asset
          </Button>
        </div>
      </div>
      
      {asset.images && asset.images.length > 0 && (
        <div className="mb-6 overflow-hidden rounded-lg">
          <img
            src={asset.images[0]}
            alt={asset.name}
            className="w-full h-64 object-cover"
          />
        </div>
      )}
      
      <div className="mb-6">
        <div className="border-b border-neutral-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'maintenance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Maintenance History
            </button>
            <button
              onClick={() => setActiveTab('deployment')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'deployment'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Deployment History
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Type</h4>
                    <p className="flex items-center text-neutral-800">
                      {getAssetTypeIcon(asset.type)}
                      <span className="ml-2 capitalize">{asset.subtype}</span>
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Serial Number</h4>
                    <p className="text-neutral-800">{asset.serialNumber}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Manufacturer</h4>
                    <p className="flex items-center text-neutral-800">
                      <Factory className="h-4 w-4 mr-2 text-neutral-400" />
                      {asset.manufacturer}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Model</h4>
                    <p className="text-neutral-800">{asset.model}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Acquisition Date</h4>
                    <p className="flex items-center text-neutral-800">
                      <Calendar className="h-4 w-4 mr-2 text-neutral-400" />
                      {formatDate(asset.acquisitionDate)}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Acquisition Cost</h4>
                    <p className="flex items-center text-neutral-800">
                      <DollarSign className="h-4 w-4 mr-2 text-neutral-400" />
                      {formatCurrency(asset.acquisitionCost)}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Condition</h4>
                    <p className={`capitalize font-medium ${getConditionColorClass(asset.condition)}`}>
                      {asset.condition}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Location</h4>
                    <p className="flex items-center text-neutral-800">
                      <MapPin className="h-4 w-4 mr-2 text-neutral-400" />
                      {location ? location.name : 'Unknown'}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Assigned To</h4>
                    <p className="flex items-center text-neutral-800">
                      <User className="h-4 w-4 mr-2 text-neutral-400" />
                      {asset.assignedTo ? 'Capt. Michael Rodriguez' : 'Unassigned'}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Last Serviced</h4>
                    <p className="flex items-center text-neutral-800">
                      <Clock className="h-4 w-4 mr-2 text-neutral-400" />
                      {formatDate(asset.lastServiced)}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Next Service Due</h4>
                    <p className="flex items-center text-neutral-800">
                      <ClipboardList className="h-4 w-4 mr-2 text-neutral-400" />
                      {formatDate(asset.nextServiceDue)}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-neutral-500 mb-2">Description</h4>
                  <p className="text-neutral-800">{asset.description}</p>
                </div>
                
                {asset.notes && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-neutral-500 mb-2">Notes</h4>
                    <p className="text-neutral-800">{asset.notes}</p>
                  </div>
                )}
                
                {asset.tags && asset.tags.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-neutral-500 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {asset.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Last Service</h4>
                    <p className="text-neutral-800">{formatDate(asset.lastServiced)}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Next Service Due</h4>
                    <p className="text-neutral-800">{formatDate(asset.nextServiceDue)}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Total Maintenance Records</h4>
                    <p className="text-neutral-800">{asset.maintenanceHistory.length}</p>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-2 flex items-center justify-center" onClick={() => setActiveTab('maintenance')}>
                    <History className="mr-2 h-4 w-4" />
                    View Maintenance History
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Deployment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">Total Deployments</h4>
                    <p className="text-neutral-800">{asset.deploymentHistory.length}</p>
                  </div>
                  
                  {asset.deploymentHistory.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-neutral-500 mb-1">
                        {asset.deploymentHistory.some(d => d.status === 'active') 
                          ? 'Current Deployment' 
                          : 'Last Deployment'
                        }
                      </h4>
                      <p className="text-neutral-800">
                        {asset.deploymentHistory[0].mission}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {formatDate(asset.deploymentHistory[0].startDate)}
                        {asset.deploymentHistory[0].endDate ? ` - ${formatDate(asset.deploymentHistory[0].endDate)}` : ' - Present'}
                      </p>
                    </div>
                  )}
                  
                  <Button variant="outline" className="w-full mt-2 flex items-center justify-center" onClick={() => setActiveTab('deployment')}>
                    <History className="mr-2 h-4 w-4" />
                    View Deployment History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      {activeTab === 'maintenance' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-neutral-800">Maintenance History</h2>
            <Button className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Maintenance Record
            </Button>
          </div>
          
          {asset.maintenanceHistory.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-neutral-500">No maintenance records found for this asset.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {asset.maintenanceHistory.map((record: MaintenanceRecord) => (
                <Card key={record.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <Badge 
                            variant={
                              record.status === 'completed' ? 'success' : 
                              record.status === 'in-progress' ? 'warning' : 'info'
                            }
                            className="capitalize"
                          >
                            {record.status}
                          </Badge>
                          <span className="ml-2 text-sm text-neutral-500">{formatDate(record.date)}</span>
                        </div>
                        
                        <h3 className="text-lg font-medium text-neutral-800 capitalize mb-1">
                          {record.type} - {record.description}
                        </h3>
                        
                        <p className="text-sm text-neutral-600 mb-3">
                          Technician: {record.technician}
                        </p>
                        
                        {record.parts.length > 0 && (
                          <div className="mb-2">
                            <h4 className="text-sm font-medium text-neutral-500 mb-1">Parts Replaced/Used</h4>
                            <div className="flex flex-wrap gap-1">
                              {record.parts.map((part, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {part}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 md:mt-0 text-right">
                        <div className="text-sm text-neutral-500 mb-1">Cost</div>
                        <div className="text-lg font-semibold text-neutral-800">
                          {formatCurrency(record.cost)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'deployment' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-neutral-800">Deployment History</h2>
            <Button className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Deployment Record
            </Button>
          </div>
          
          {asset.deploymentHistory.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-neutral-500">No deployment records found for this asset.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {asset.deploymentHistory.map((deployment) => (
                <Card key={deployment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <Badge 
                            variant={
                              deployment.status === 'active' ? 'info' : 
                              deployment.status === 'completed' ? 'success' : 'warning'
                            }
                            className="capitalize"
                          >
                            {deployment.status}
                          </Badge>
                        </div>
                        
                        <h3 className="text-lg font-medium text-neutral-800 mb-1">
                          {deployment.mission}
                        </h3>
                        
                        <p className="text-sm text-neutral-600 mb-3">
                          Location: {deployment.location}
                        </p>
                        
                        <p className="text-sm text-neutral-500">
                          {formatDate(deployment.startDate)} - {deployment.endDate ? formatDate(deployment.endDate) : 'Present'}
                        </p>
                      </div>
                      
                      <div className="mt-4 md:mt-0">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};