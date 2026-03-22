import React from 'react';

function DashboardFilters({ filters, onApply, disabled }) {
  const [f, setF] = React.useState(filters);

  return (
    <div className="card filters-card">
      <h3>Filter Programs</h3>
      <div className="filter-row">
        <div className="filter-group">
          <label>Date Range</label>
          <div className="date-inputs">
            <input 
              type="date" value={f.start} 
              onChange={e => setF({...f, start: e.target.value})} 
            />
            <span>–</span>
            <input 
              type="date" value={f.end} 
              onChange={e => setF({...f, end: e.target.value})} 
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Wiki Language</label>
          <select value={f.lang} onChange={e => setF({...f, lang: e.target.value})}>
            <option value="">All Languages</option>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Program Type</label>
          <select value={f.type} onChange={e => setF({...f, type: e.target.value})}>
            <option value="All">All Types</option>
            <option value="Education">Education</option>
            <option value="Editathon">Edit-a-thon</option>
            <option value="Contest">Contest</option>
          </select>
        </div>

        <div className="filter-actions">
          <button className="btn primary" onClick={() => onApply(f)} disabled={disabled}>Apply Filters</button>
          <button className="btn secondary" onClick={() => { setF({start: '2025-01-01', end: '2026-01-01', type: 'All'}); onApply({start: '2025-01-01', end: '2026-01-01', type: 'All'}); }} disabled={disabled}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default DashboardFilters;
