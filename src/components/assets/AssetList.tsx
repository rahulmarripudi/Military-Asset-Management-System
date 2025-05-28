import React, { useState } from 'react';
import { Asset, AssetType, AssetStatus } from '../../types';
import { AssetCard } from './AssetCard';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface AssetListProps {
  assets: Asset[];
}

type FilterOptions = {
  type: AssetType | 'all';
  status: AssetStatus | 'all';
  searchTerm: string;
};

export const AssetList: React.FC<AssetListProps> = ({ assets }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'all',
    status: 'all',
    searchTerm: '',
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, type: e.target.value as AssetType | 'all' });
  };
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, status: e.target.value as AssetStatus | 'all' });
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const clearFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      searchTerm: '',
    });
  };
  
  const filteredAssets = assets.filter((asset) => {
    const matchesType = filters.type === 'all' || asset.type === filters.type;
    const matchesStatus = filters.status === 'all' || asset.status === filters.status;
    const matchesSearch = filters.searchTerm === '' || 
      asset.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      asset.manufacturer.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      asset.model.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });
  
  const hasActiveFilters = filters.type !== 'all' || filters.status !== 'all' || filters.searchTerm !== '';
  
  return (
    <div>
      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search assets by name, serial number, manufacturer..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={filters.searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant={showFilters ? "primary" : "outline"} 
            className="flex items-center" 
            onClick={toggleFilters}
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters {hasActiveFilters && !showFilters && <span className="ml-1 text-xs bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded-full">Active</span>}
          </Button>
          
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="flex items-center text-neutral-600">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {showFilters && (
        <div className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Asset Type
              </label>
              <select
                id="type-filter"
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={filters.type}
                onChange={handleTypeChange}
              >
                <option value="all">All Types</option>
                <option value="vehicle">Vehicles</option>
                <option value="weapon">Weapons</option>
                <option value="equipment">Equipment</option>
                <option value="device">Devices</option>
                <option value="aircraft">Aircraft</option>
                <option value="vessel">Vessels</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={filters.status}
                onChange={handleStatusChange}
              >
                <option value="all">All Statuses</option>
                <option value="operational">Operational</option>
                <option value="maintenance">In Maintenance</option>
                <option value="damaged">Damaged</option>
                <option value="decommissioned">Decommissioned</option>
                <option value="deployed">Deployed</option>
              </select>
            </div>
          </div>
        </div>
      )}
      
      {filteredAssets.length === 0 ? (
        <div className="text-center py-12 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-neutral-100">
            <Search className="h-12 w-12 text-neutral-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-neutral-900">No assets found</h3>
          <p className="mt-2 text-sm text-neutral-500">
            Try adjusting your search or filter criteria.
          </p>
          <Button variant="outline" onClick={clearFilters} className="mt-4">
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </div>
  );
};