import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

function DashboardCharts({ data, loading }) {
  if (loading) return <div className="loading-charts">Loading charts...</div>;

  return (
    <div className="charts-container">
      <div className="card chart-card">
        <h3>Programs by Type</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data.by_type}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="name" fontSize={12} tickLine={false} />
            <YAxis fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3a6fa8" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card chart-card">
        <h3>Monthly Active Editors</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data.trend}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="month" fontSize={12} tickLine={false} />
            <YAxis fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="editors" stroke="#3a6fa8" strokeWidth={2} dot={{r: 4}} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card chart-card">
        <h3>Programs by Wiki Language</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data.languages} layout="vertical" margin={{left: 40}}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
            <XAxis type="number" fontSize={11} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" fontSize={12} tickLine={false} width={80} />
            <Tooltip />
            <Bar dataKey="count" fill="#3a6fa8" barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardCharts;
