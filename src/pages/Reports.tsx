import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { assets } from '../data/mockData';
import { FileText, Download, Filter } from 'lucide-react';

// Sample maintenance cost data for charts
const maintenanceCostData = [
  { month: 'Jan', cost: 15000 },
  { month: 'Feb', cost: 22000 },
  { month: 'Mar', cost: 18500 },
  { month: 'Apr', cost: 25000 },
  { month: 'May', cost: 16500 },
  { month: 'Jun', cost: 19800 },
  { month: 'Jul', cost: 23400 },
  { month: 'Aug', cost: 17900 },
];

// Asset acquisition data by year
const acquisitionData = [
  { year: '2018', count: 12 },
  { year: '2019', count: 19 },
  { year: '2020', count: 15 },
  { year: '2021', count: 22 },
  { year: '2022', count: 28 },
  { year: '2023', count: 23 },
  { year: '2024', count: 5 },
];

// Prepare maintenance type data
const maintenanceTypeData = assets.reduce((acc, asset) => {
  asset.maintenanceHistory.forEach(record => {
    if (!acc[record.type]) {
      acc[record.type] = {
        count: 0,
        cost: 0
      };
    }
    acc[record.type].count += 1;
    acc[record.type].cost += record.cost;
  });
  return acc;
}, {} as Record<string, { count: number, cost: number }>);

const maintenanceTypeChartData = Object.entries(maintenanceTypeData).map(([type, data]) => ({
  type: type.charAt(0).toUpperCase() + type.slice(1),
  count: data.count,
  cost: data.cost
}));

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Reports</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Costs by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={maintenanceCostData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Maintenance Cost']} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="cost" 
                    name="Maintenance Cost"
                    stroke="#4A5D23" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Asset Acquisitions by Year</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={acquisitionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value} assets`, 'Assets Acquired']} 
                  />
                  <Legend />
                  <Bar 
                    dataKey="count" 
                    name="Assets Acquired"
                    fill="#0A2342" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Maintenance by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={maintenanceTypeChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis yAxisId="left" orientation="left" stroke="#4E6E81" />
                <YAxis yAxisId="right" orientation="right" stroke="#F97316" />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="count" 
                  name="Number of Incidents"
                  fill="#4E6E81" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  yAxisId="right"
                  dataKey="cost" 
                  name="Total Cost ($)"
                  fill="#F97316" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Asset Inventory Report', description: 'Complete list of all assets with current status and location' },
                { title: 'Maintenance Cost Analysis', description: 'Breakdown of maintenance costs by asset type and category' },
                { title: 'Asset Utilization Report', description: 'Analysis of asset deployment and operational hours' },
                { title: 'Condition Assessment Report', description: 'Detailed overview of asset conditions and required maintenance' },
                { title: 'Acquisition Timeline Report', description: 'History of asset acquisitions and procurement timeline' },
                { title: 'Maintenance Compliance Report', description: 'Analysis of scheduled vs. actual maintenance activities' }
              ].map((report, index) => (
                <div key={index} className="p-4 border border-neutral-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-blue-100 mr-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-800">{report.title}</h3>
                      <p className="text-sm text-neutral-500 mt-1">{report.description}</p>
                      <Button variant="ghost" size="sm" className="mt-2 text-blue-600 p-0 hover:bg-transparent hover:text-blue-800">
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;