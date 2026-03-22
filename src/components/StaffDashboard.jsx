import React, { useState, useEffect } from 'react';
import './style.css';
import DashboardFilters from './components/DashboardFilters';
import MetricsGrid from './components/MetricsGrid';
import DashboardCharts from './components/DashboardCharts';
import ExportData from './components/ExportData';

// Mock data directly in the file
const DATA = {
  total_programs: 12500,
  editors: 45000,
  edits: 18000000,
  articles: 95000,
  new_programs: 240,
  retention: 68.2,
  by_type: [
    { name: 'Education', count: 45 },
    { name: 'Edit-a-thons', count: 25 },
    { name: 'Contest', count: 15 },
    { name: 'Other', count: 15 }
  ],
  trend: [
    { month: 'Jan', editors: 42000 }, { month: 'Feb', editors: 43500 },
    { month: 'Mar', editors: 45000 }, { month: 'Apr', editors: 44200 },
    { month: 'May', editors: 46000 }, { month: 'Jun', editors: 47500 },
    { month: 'Jul', editors: 48000 }, { month: 'Aug', editors: 47000 },
    { month: 'Sep', editors: 49000 }, { month: 'Oct', editors: 51000 },
    { month: 'Nov', editors: 52500 }, { month: 'Dec', editors: 54000 }
  ],
  languages: [
    { name: 'English', count: 5500 }, { name: 'Hindi', count: 1210 },
    { name: 'French', count: 960 }, { name: 'Spanish', count: 885 }
  ]
};

function StaffDashboard() {
  const [filters, setFilters] = useState({ start: '2025-01-01', end: '2026-01-01', type: 'All' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleApply = (f) => {
    setFilters(f);
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  return (
    <div className="dashboard-container">
      <header className="main-header">
        <h1>Staff Dashboard</h1>
        <p>System-wide metrics and data downloads — WMF Staff Only</p>
      </header>

      <main className="dashboard-content">
        <DashboardFilters 
          filters={filters} 
          onApply={handleApply} 
          disabled={loading} 
        />
        <MetricsGrid data={DATA} loading={loading} />
        <DashboardCharts data={DATA} loading={loading} />
        <ExportData filters={filters} />
      </main>
    </div>
  );
}

export default StaffDashboard;
