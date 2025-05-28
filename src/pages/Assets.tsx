import React from 'react';
import { assets } from '../data/mockData';
import { AssetList } from '../components/assets/AssetList';
import { Button } from '../components/ui/Button';
import { PlusCircle } from 'lucide-react';

const Assets: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Assets</h1>
        <Button className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Asset
        </Button>
      </div>
      
      <AssetList assets={assets} />
    </div>
  );
};

export default Assets;