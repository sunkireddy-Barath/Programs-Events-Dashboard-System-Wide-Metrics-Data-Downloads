import React, { useState } from 'react';

function ExportData({ filters }) {
  const [status, setStatus] = useState('Off');
  const [loading, setLoading] = useState(false);

  const startExport = () => {
    setLoading(true);
    setStatus('Queued');
    setTimeout(() => setStatus('Processing'), 1500);
    setTimeout(() => {
      setStatus('Email Sent');
      setLoading(false);
    }, 4000);
  };

  return (
    <div className="card export-card">
      <h3>Download Program Data</h3>
      <p>Export all program data as a CSV file. The link will be sent to your staff email.</p>
      
      <div className="export-status-flow">
        <span className={status === 'Queued' ? 'active' : ''}>Queued</span>
        <span className="arrow">→</span>
        <span className={status === 'Processing' ? 'active' : ''}>Processing</span>
        <span className="arrow">→</span>
        <span className={status === 'Email Sent' ? 'active' : ''}>Email Sent</span>
      </div>

      <div className="export-actions">
        <button className="btn primary lg" onClick={startExport} disabled={loading}>
          {loading ? 'Requesting...' : 'Request CSV Export'}
        </button>
      </div>
      
      <p className="limit">Maximum 5 exports per hour.</p>
    </div>
  );
}

export default ExportData;
