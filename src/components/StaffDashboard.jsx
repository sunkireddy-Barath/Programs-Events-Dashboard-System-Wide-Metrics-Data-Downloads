import React, { useState, useEffect } from 'react';
import { t } from '../i18n';
import { fetchMetrics } from '../mockApi';
import FilterPanel, { initFilters } from './FilterPanel';
import MetricsCards from './MetricsCards';
import ChartsSection from './ChartsSection';
import ExportPanel from './ExportPanel';
import SystemWorkflow from './SystemWorkflow';

function StaffDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(initFilters);
  const [lastUpdated, setLastUpdated] = useState('');

  const loadData = (currentFilters) => {
    setLoading(true);
    setError(false);
    fetchMetrics(currentFilters)
      .then((data) => {
        setMetrics(data);
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastUpdated(time);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData(filters);
  }, []); // Initial load only

  const handleApply = (newFilters) => {
    setFilters(newFilters);
    loadData(newFilters);
  };

  const handleReset = (defaultFilters) => {
    setFilters(defaultFilters);
    loadData(defaultFilters);
  };

  return (
    <div className="staff-dashboard">
      <div className="sd-header">
        <h1 className="sd-title">{t('page_title')}</h1>
        <p className="sd-subtitle">{t('page_subtitle')}</p>
      </div>

      <div className="sd-body">
        <SystemWorkflow />
        <FilterPanel onApply={handleApply} onReset={handleReset} disabled={loading} />
        
        <div className="section metrics-section">
          <MetricsCards 
            metrics={metrics} 
            loading={loading} 
            error={error} 
            onRetry={() => loadData(filters)} 
          />
          {lastUpdated && !loading && !error && (
            <div className="metrics-footer">
              <span className="footer-notice">{t('data_cached_notice')}</span>
              <span className="footer-timestamp">{t('last_updated_lbl')} {lastUpdated}</span>
            </div>
          )}
        </div>

        <ChartsSection metrics={metrics} loading={loading} error={error} />
        <ExportPanel filters={filters} />
      </div>
    </div>
  );
}

export default StaffDashboard;
