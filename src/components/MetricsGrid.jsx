import React from 'react';

function MetricsGrid({ data, loading }) {
  if (loading) return <div className="loading-grid">Loading metrics...</div>;

  const cards = [
    { title: 'Total Programs', val: data.total_programs.toLocaleString(), sub: 'across all wikis' },
    { title: 'Monthly Active Editors', val: data.editors.toLocaleString(), sub: 'unique editors this month' },
    { title: 'Total Edits', val: data.edits.toLocaleString(), sub: 'Wikipedia edits made' },
    { title: 'Articles Improved', val: data.articles.toLocaleString(), sub: 'articles across all programs' },
    { title: 'New Programs', val: data.new_programs.toLocaleString(), sub: 'programs started this month' },
    { title: 'Retention Rate', val: data.retention.toFixed(1) + '%', sub: 'editors with 5+ edits' }
  ];

  return (
    <div className="metrics-grid">
      {cards.map((c, i) => (
        <div key={i} className="metric-card">
          <span className="metric-title">{c.title}</span>
          <span className="metric-value">{c.val}</span>
          <span className="metric-sub">{c.sub}</span>
        </div>
      ))}
      <div className="metrics-footer">
        Data cached — refreshes every hour. Last updated: 10:45 AM
      </div>
    </div>
  );
}

export default MetricsGrid;
