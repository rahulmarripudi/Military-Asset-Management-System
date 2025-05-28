import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Shield, 
  Menu, 
  X, 
  Home,
  Truck, 
  Map, 
  BarChart,
  Settings,
  Search, 
  Bell,
  User
} from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    onMenuToggle();
  };
  
  return (
    <header className="bg-[black] text-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-lg font-bold">MILITARY ASSET</span>
            </div>
            
            {/* Desktop navigation */}
            <nav className="hidden md:ml-10 md:flex md:items-center md:space-x-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-[#193566] text-white' 
                      : 'text-gray-300 hover:bg-[#193566] hover:text-white'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/assets" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-[#193566] text-white' 
                      : 'text-gray-300 hover:bg-[#193566] hover:text-white'
                  }`
                }
              >
                Assets
              </NavLink>
              <NavLink 
                to="/locations" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-[#193566] text-white' 
                      : 'text-gray-300 hover:bg-[#193566] hover:text-white'
                  }`
                }
              >
                Locations
              </NavLink>
              <NavLink 
                to="/reports" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-[#193566] text-white' 
                      : 'text-gray-300 hover:bg-[#193566] hover:text-white'
                  }`
                }
              >
                Reports
              </NavLink>
            </nav>
          </div>
          
          {/* Search, notifications, and profile dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search assets..."
                className="bg-[#193566] h-9 px-4 pl-10 pr-3 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button className="p-2 rounded-md text-gray-300 hover:text-white focus:outline-none">
              <Bell className="h-5 w-5" />
            </button>
            
            <div className="ml-3 relative">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://th.bing.com/th/id/OIP.QZv9zpg9zkH8t8ArbLX-bAHaNJ?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                    alt="User profile"
                  />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-[#193566] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {showMobileMenu ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive 
                    ? 'bg-[#193566] text-white' 
                    : 'text-gray-300 hover:bg-[#193566] hover:text-white'
                }`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              <div className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </div>
            </NavLink>
            <NavLink 
              to="/assets" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive 
                    ? 'bg-[#193566] text-white' 
                    : 'text-gray-300 hover:bg-[#193566] hover:text-white'
                }`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              <div className="flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Assets
              </div>
            </NavLink>
            <NavLink 
              to="/locations" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive 
                    ? 'bg-[#193566] text-white' 
                    : 'text-gray-300 hover:bg-[#193566] hover:text-white'
                }`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              <div className="flex items-center">
                <Map className="mr-2 h-5 w-5" />
                Locations
              </div>
            </NavLink>
            <NavLink 
              to="/reports" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive 
                    ? 'bg-[#193566] text-white' 
                    : 'text-gray-300 hover:bg-[#193566] hover:text-white'
                }`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              <div className="flex items-center">
                <BarChart className="mr-2 h-5 w-5" />
                Reports
              </div>
            </NavLink>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive 
                    ? 'bg-[#193566] text-white' 
                    : 'text-gray-300 hover:bg-[#193566] hover:text-white'
                }`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              <div className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </div>
            </NavLink>
          </div>
          
          {/* Mobile profile and search */}
          <div className="pt-4 pb-3 border-t border-[#193566]">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="User profile"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">Col. James Anderson</div>
                <div className="text-sm font-medium text-gray-400">j.anderson@mil.gov</div>
              </div>
              <button className="ml-auto p-1 rounded-full text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Bell className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#193566] hover:text-white"
              >
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Your Profile
                </div>
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#193566] hover:text-white"
              >
                <div className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </div>
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#193566] hover:text-white"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};