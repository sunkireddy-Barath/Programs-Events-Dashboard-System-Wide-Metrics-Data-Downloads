import React, { useState, useEffect, useCallback } from 'react';
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
  const [error,   setError]   = useState(false);
  const [filters, setFilters] = useState(initFilters);
  const [lastUpdated, setLastUpdated] = useState(null);

  const load = useCallback(async (f) => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchMetrics(f);
      setMetrics(data);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch {
      setError(true);
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => { load(filters); }, []); // eslint-disable-line

  function handleApply(f)  { setFilters(f); load(f); }
  function handleReset(f)  { setFilters(f); load(f); }

  const shared = { metrics, loading, error, onRetry: () => load(filters), lastUpdated };

  return (
    <div>
      {/* Page header */}
      <div className="sd-header">
        <h1 className="sd-title">{t('page_title')}</h1>
        <p className="sd-subtitle">{t('page_subtitle')}</p>
      </div>

      {/* Main content */}
      <div className="sd-body">
        {/* Addition: System Workflow Overview */}
        <SystemWorkflow />

        {/* Filters */}
        <FilterPanel onApply={handleApply} onReset={handleReset} disabled={loading} />
        
        {/* Metric Cards */}
        <div className="section">
          <MetricsCards {...shared} />
          {metrics && !loading && !error && (
            <div className="metrics-footer">
              <span className="footer-notice">{t('data_cached_notice')}</span>
              <span className="footer-timestamp">{t('last_updated_lbl')} {lastUpdated}</span>
            </div>
          )}
        </div>

        {/* Charts and Export */}
        <ChartsSection {...shared} />
        <ExportPanel filters={filters} />
      </div>
    </div>
  );
}

export default StaffDashboard;
