import { Asset, Location, User, SummaryStats, AssetType, AssetStatus } from '../types';

// Mock Locations
export const locations: Location[] = [
  {
    id: '1',
    name: 'Fort Bradley',
    type: 'base',
    coordinates: { lat: 38.7849, lng: -76.7723 },
    country: 'USA',
    assetCount: 156
  },
  {
    id: '2',
    name: 'Camp Sentinel',
    type: 'outpost',
    coordinates: { lat: 36.1699, lng: -115.1398 },
    country: 'USA',
    assetCount: 89
  },
  {
    id: '3',
    name: 'Delta Forward Operating Base',
    type: 'facility',
    coordinates: { lat: 33.9416, lng: -118.4085 },
    country: 'USA',
    assetCount: 112
  },
  {
    id: '4',
    name: 'Eagle Depot',
    type: 'depot',
    coordinates: { lat: 40.7128, lng: -74.006 },
    country: 'USA',
    assetCount: 203
  },
  {
    id: '5',
    name: 'Thunder Outpost',
    type: 'outpost',
    coordinates: { lat: 29.7604, lng: -95.3698 },
    country: 'USA',
    assetCount: 67
  }
];

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Col. James Anderson',
    rank: 'Colonel',
    email: 'j.anderson@mil.gov',
    role: 'admin',
    unit: 'HQ Command',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'Maj. Sarah Johnson',
    rank: 'Major',
    email: 's.johnson@mil.gov',
    role: 'manager',
    unit: 'Logistics Division',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'Capt. Michael Rodriguez',
    rank: 'Captain',
    email: 'm.rodriguez@mil.gov',
    role: 'operator',
    unit: 'Field Operations',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '4',
    name: 'Lt. David Chen',
    rank: 'Lieutenant',
    email: 'd.chen@mil.gov',
    role: 'operator',
    unit: 'Technical Support',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '5',
    name: 'Sgt. Emily Patel',
    rank: 'Sergeant',
    email: 'e.patel@mil.gov',
    role: 'viewer',
    unit: 'Maintenance Crew',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

// Mock Assets
export const assets: Asset[] = [
  {
    id: '1',
    name: 'M1A2 Abrams',
    serialNumber: 'TA-31452-B',
    type: 'vehicle',
    subtype: 'Tank',
    status: 'operational',
    condition: 'good',
    acquisitionDate: '2019-06-12',
    acquisitionCost: 8200000,
    manufacturer: 'General Dynamics',
    model: 'M1A2 SEPv3',
    description: 'Main battle tank with 120mm smoothbore cannon',
    location: '1', // Fort Bradley
    assignedTo: '3', // Capt. Michael Rodriguez
    lastServiced: '2023-11-15',
    nextServiceDue: '2024-05-15',
    maintenanceHistory: [
      {
        id: 'm1',
        date: '2023-11-15',
        type: 'routine',
        description: 'Annual maintenance and systems check',
        technician: 'Tech Sgt. Wilson',
        cost: 12500,
        parts: ['Air filters', 'Track pads', 'Engine oil'],
        status: 'completed'
      },
      {
        id: 'm2',
        date: '2023-03-22',
        type: 'repair',
        description: 'Turret rotation mechanism repair',
        technician: 'Spec. Thomas',
        cost: 35000,
        parts: ['Hydraulic pump', 'Control module'],
        status: 'completed'
      }
    ],
    deploymentHistory: [
      {
        id: 'd1',
        startDate: '2021-04-15',
        endDate: '2021-09-30',
        location: 'Joint Training Center',
        mission: 'Operation Unified Front',
        status: 'completed'
      }
    ],
    notes: 'Last deployment showed excellent mobility in rough terrain.',
    images: [
      'https://th.bing.com/th/id/OIP.Kz4f9xCug8XPq-TMzS5ImQHaE8?w=278&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    ],
    tags: ['armored', 'heavy', 'tracked']
  },
  {
    id: '2',
    name: 'UH-60 Black Hawk',
    serialNumber: 'HT-19876-A',
    type: 'aircraft',
    subtype: 'Helicopter',
    status: 'maintenance',
    condition: 'fair',
    acquisitionDate: '2018-02-08',
    acquisitionCost: 21500000,
    manufacturer: 'Sikorsky',
    model: 'UH-60M',
    description: 'Medium-lift utility helicopter',
    location: '3', // Delta Forward Operating Base
    assignedTo: '2', // Maj. Sarah Johnson
    lastServiced: '2024-01-10',
    nextServiceDue: '2024-04-10',
    maintenanceHistory: [
      {
        id: 'm3',
        date: '2024-01-10',
        type: 'overhaul',
        description: 'Engine overhaul and avionics update',
        technician: 'Chief Warrant Officer Davis',
        cost: 175000,
        parts: ['Turbine components', 'Avionics module', 'Rotor bearings'],
        status: 'completed'
      }
    ],
    deploymentHistory: [
      {
        id: 'd2',
        startDate: '2022-07-18',
        endDate: '2023-01-22',
        location: 'Forward Operating Base Sierra',
        mission: 'Operation Mountain Shield',
        status: 'completed'
      }
    ],
    notes: 'Scheduled for avionics upgrade in Q3 2024.',
    images: [
      'https://th.bing.com/th/id/OIP.BBfQYzByiWVr3u1QTsYIIgHaFj?w=246&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    ],
    tags: ['rotary', 'transport', 'medevac']
  },
  {
    id: '3',
    name: 'M4A1 Carbine',
    serialNumber: 'RA-67421-C',
    type: 'weapon',
    subtype: 'Rifle',
    status: 'operational',
    condition: 'excellent',
    acquisitionDate: '2021-09-05',
    acquisitionCost: 1200,
    manufacturer: 'Colt',
    model: 'M4A1',
    description: '5.56mm carbine with rail interface system',
    location: '2', // Camp Sentinel
    assignedTo: '4', // Lt. David Chen
    lastServiced: '2023-12-05',
    nextServiceDue: '2024-06-05',
    maintenanceHistory: [
      {
        id: 'm4',
        date: '2023-12-05',
        type: 'inspection',
        description: 'Barrel inspection and bolt carrier group cleaning',
        technician: 'Armorer Jenkins',
        cost: 150,
        parts: ['Spring kit', 'Buffer'],
        status: 'completed'
      }
    ],
    deploymentHistory: [],
    notes: 'Recently upgraded with SOPMOD Block II accessories.',
    images: [
      'https://th.bing.com/th/id/OIP.yaP2zNjjIx0e6kefICZbsgHaEK?w=297&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    ],
    tags: ['infantry', 'standard-issue', 'small-arms']
  },
  {
    id: '4',
    name: 'HMMWV (Humvee)',
    serialNumber: 'MV-92145-D',
    type: 'vehicle',
    subtype: 'Utility Vehicle',
    status: 'deployed',
    condition: 'good',
    acquisitionDate: '2017-11-22',
    acquisitionCost: 220000,
    manufacturer: 'AM General',
    model: 'M1151',
    description: 'High Mobility Multipurpose Wheeled Vehicle with armor kit',
    location: '5', // Thunder Outpost
    assignedTo: null,
    lastServiced: '2023-10-18',
    nextServiceDue: '2024-04-18',
    maintenanceHistory: [
      {
        id: 'm5',
        date: '2023-10-18',
        type: 'routine',
        description: 'Transmission service and brake system inspection',
        technician: 'Tech Sgt. Rivera',
        cost: 4800,
        parts: ['Brake pads', 'Transmission fluid', 'Air filters'],
        status: 'completed'
      }
    ],
    deploymentHistory: [
      {
        id: 'd3',
        startDate: '2024-01-15',
        endDate: null,
        location: 'Operation Eastern Shield',
        mission: 'Border security patrol',
        status: 'active'
      }
    ],
    notes: 'Equipped with enhanced communications package.',
    images: [
      'https://th.bing.com/th/id/OIP.qHnRT-Erc0NzmiKCar_yzAHaFj?w=245&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    ],
    tags: ['wheeled', 'armored', 'transport']
  },
  {
    id: '5',
    name: 'Tactical Radio System',
    serialNumber: 'EC-45982-F',
    type: 'equipment',
    subtype: 'Communications',
    status: 'operational',
    condition: 'excellent',
    acquisitionDate: '2022-03-15',
    acquisitionCost: 85000,
    manufacturer: 'Harris',
    model: 'AN/PRC-163',
    description: 'Multi-channel tactical radio with encryption',
    location: '1', // Fort Bradley
    assignedTo: null,
    lastServiced: '2024-02-10',
    nextServiceDue: '2024-08-10',
    maintenanceHistory: [
      {
        id: 'm6',
        date: '2024-02-10',
        type: 'inspection',
        description: 'Firmware update and system calibration',
        technician: 'Comms Specialist Wong',
        cost: 1200,
        parts: [],
        status: 'completed'
      }
    ],
    deploymentHistory: [],
    notes: 'Recently upgraded with latest encryption standards.',
    images: [
      'https://th.bing.com/th/id/OIP.95LDJ2_uFvVmTnTy7ZDgSQAAAA?w=289&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    ],
    tags: ['comms', 'encrypted', 'field-gear']
  },
  {
    id: '6',
    name: 'EOD Robot',
    serialNumber: 'RB-12347-G',
    type: 'device',
    subtype: 'Robotics',
    status: 'operational',
    condition: 'good',
    acquisitionDate: '2020-08-19',
    acquisitionCost: 195000,
    manufacturer: 'iRobot',
    model: 'PackBot 510',
    description: 'Explosive Ordnance Disposal robot with manipulator arm',
    location: '4', // Eagle Depot
    assignedTo: '5', // Sgt. Emily Patel
    lastServiced: '2023-09-22',
    nextServiceDue: '2024-03-22',
    maintenanceHistory: [
      {
        id: 'm7',
        date: '2023-09-22',
        type: 'repair',
        description: 'Camera system repair and battery replacement',
        technician: 'Robotics Tech Martinez',
        cost: 7800,
        parts: ['Camera module', 'Battery pack', 'Tread assembly'],
        status: 'completed'
      }
    ],
    deploymentHistory: [
      {
        id: 'd4',
        startDate: '2022-03-05',
        endDate: '2022-06-18',
        location: 'Urban Training Center',
        mission: 'EOD Training Exercise',
        status: 'completed'
      }
    ],
    notes: 'Has successfully neutralized 14 simulated explosive devices during training.',
    images: [
      'https://th.bing.com/th/id/OIP.vXWJc0oi_va0t_e5Fu7sHgHaEH?w=270&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    ],
    tags: ['EOD', 'robotic', 'remote-operated']
  },
  {
    id: '7',
    name: 'MRAP Vehicle',
    serialNumber: 'AV-78521-H',
    type: 'vehicle',
    subtype: 'Armored Personnel Carrier',
    status: 'maintenance',
    condition: 'fair',
    acquisitionDate: '2016-05-30',
    acquisitionCost: 1450000,
    manufacturer: 'Oshkosh Defense',
    model: 'M-ATV',
    description: 'Mine-Resistant Ambush Protected Vehicle',
    location: '2', // Camp Sentinel
    assignedTo: null,
    lastServiced: '2023-12-15',
    nextServiceDue: '2024-03-15',
    maintenanceHistory: [
      {
        id: 'm8',
        date: '2023-12-15',
        type: 'repair',
        description: 'Suspension system repair and armor inspection',
        technician: 'Master Sgt. Blackwell',
        cost: 28500,
        parts: ['Shock absorbers', 'Control arms', 'Diagnostic module'],
        status: 'completed'
      },
      {
        id: 'm9',
        date: '2024-02-28',
        type: 'overhaul',
        description: 'Engine overhaul and transmission replacement',
        technician: 'Tech Sgt. Rivera',
        cost: 65000,
        parts: ['Engine block', 'Transmission', 'Cooling system'],
        status: 'in-progress'
      }
    ],
    deploymentHistory: [
      {
        id: 'd5',
        startDate: '2018-06-12',
        endDate: '2019-01-25',
        location: 'Forward Operating Base Delta',
        mission: 'Operation Desert Guardian',
        status: 'completed'
      }
    ],
    notes: 'Scheduled for upgraded armor package once maintenance is complete.',
    images: [
      'https://th.bing.com/th/id/OIP.2N0khnYkJe647Nm1YaX4PwHaFL?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'  
    ],
    tags: ['armored', 'MRAP', 'transport']
  },
  {
    id: '8',
    name: 'Tactical Drone',
    serialNumber: 'UA-36914-J',
    type: 'aircraft',
    subtype: 'UAV',
    status: 'operational',
    condition: 'excellent',
    acquisitionDate: '2022-11-08',
    acquisitionCost: 125000,
    manufacturer: 'AeroVironment',
    model: 'RQ-20 Puma',
    description: 'Small tactical unmanned aerial vehicle with EO/IR payload',
    location: '3', // Delta Forward Operating Base
    assignedTo: '2', // Maj. Sarah Johnson
    lastServiced: '2024-01-05',
    nextServiceDue: '2024-07-05',
    maintenanceHistory: [
      {
        id: 'm10',
        date: '2024-01-05',
        type: 'routine',
        description: 'Propulsion system check and camera calibration',
        technician: 'UAV Tech Specialist Lee',
        cost: 3800,
        parts: ['Propeller set', 'Battery'],
        status: 'completed'
      }
    ],
    deploymentHistory: [
      {
        id: 'd6',
        startDate: '2023-09-10',
        endDate: '2023-12-05',
        location: 'Northern Border Region',
        mission: 'Operation Eagle Eye',
        status: 'completed'
      }
    ],
    notes: 'Exceptional performance in high wind conditions during last deployment.',
    images: [
      'https://th.bing.com/th/id/OIP.UT4MFeQvFhgKrrfEVtc2UQHaHa?w=159&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    ],
    tags: ['UAV', 'surveillance', 'reconnaissance']
  }
];

// Calculate summary statistics from mock data
export const summaryStats: SummaryStats = {
  totalAssets: assets.length,
  operationalAssets: assets.filter(a => a.status === 'operational').length,
  inMaintenanceAssets: assets.filter(a => a.status === 'maintenance').length,
  deployedAssets: assets.filter(a => a.status === 'deployed').length,
  criticalConditionAssets: assets.filter(a => a.condition === 'critical').length,
  
  // Group assets by type
  assetsByType: assets.reduce((acc, asset) => {
    if (!acc[asset.type]) acc[asset.type] = 0;
    acc[asset.type]++;
    return acc;
  }, {} as Record<AssetType, number>),
  
  // Group assets by location
  assetsByLocation: assets.reduce((acc, asset) => {
    if (!acc[asset.location]) acc[asset.location] = 0;
    acc[asset.location]++;
    return acc;
  }, {} as Record<string, number>),
  
  // Group assets by status
  assetsByStatus: assets.reduce((acc, asset) => {
    if (!acc[asset.status]) acc[asset.status] = 0;
    acc[asset.status]++;
    return acc;
  }, {} as Record<AssetStatus, number>),
  
  // Recently updated assets (using maintenance date)
  recentlyUpdated: assets
    .filter(a => a.maintenanceHistory.length > 0)
    .sort((a, b) => {
      const dateA = new Date(a.maintenanceHistory[0].date).getTime();
      const dateB = new Date(b.maintenanceHistory[0].date).getTime();
      return dateB - dateA;
    })
    .slice(0, 5),
  
  // Assets with upcoming maintenance
  upcomingMaintenance: assets
    .filter(a => a.nextServiceDue !== null)
    .sort((a, b) => {
      const dateA = new Date(a.nextServiceDue || '').getTime();
      const dateB = new Date(b.nextServiceDue || '').getTime();
      return dateA - dateB;
    })
    .slice(0, 5)
};