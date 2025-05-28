import React from 'react';
import { locations } from '../data/mockData';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PlusCircle, Map, MapPin, Building, Warehouse, Tent } from 'lucide-react';

const Locations: React.FC = () => {
  const getLocationTypeIcon = (type: string) => {
    switch (type) {
      case 'base':
        return <Building className="h-5 w-5 text-blue-600" />;
      case 'outpost':
        return <Tent className="h-5 w-5 text-green-600" />;
      case 'facility':
        return <Building className="h-5 w-5 text-purple-600" />;
      case 'depot':
        return <Warehouse className="h-5 w-5 text-amber-600" />;
      default:
        return <MapPin className="h-5 w-5 text-red-600" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Locations</h1>
        <Button className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Location
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <Card key={location.id} className="transition-transform hover:translate-y-[-4px] hover:shadow-lg">
            <CardContent className="p-0">
              <div className="relative h-40 bg-neutral-100 rounded-t-lg flex items-center justify-center">
                <Map className="h-12 w-12 text-neutral-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {getLocationTypeIcon(location.type)}
                    <p className="mt-2 text-sm font-medium text-neutral-500 capitalize">
                      {location.type}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-neutral-800 text-lg mb-2">{location.name}</h3>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-neutral-500">{location.country}</span>
                  <Badge variant="outline" className="capitalize">
                    {location.type}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Total Assets:</span>
                  <span className="font-semibold text-neutral-800">{location.assetCount}</span>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Locations;