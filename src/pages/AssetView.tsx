import React from 'react';
import { assets, locations } from '../data/mockData';
import { AssetDetail } from '../components/assets/AssetDetail';

const AssetView: React.FC = () => {
  return <AssetDetail assets={assets} locations={locations} />;
};

export default AssetView;