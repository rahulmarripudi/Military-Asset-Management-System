import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import AssetView from './pages/AssetView';
import Locations from './pages/Locations';
import Reports from './pages/Reports';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50">
        <Header onMenuToggle={toggleSidebar} />
        
        <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/assets/:id" element={<AssetView />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      
    </Router>
  );
}

export default App;