// StaffDashboard.jsx
// Main container page for /staff/dashboard.
// Fetches metrics on mount and when filters change.
// Passes metrics state down to all child components.

import React, { useState, useEffect, useCallback } from 'react';
import { t } from './i18n';
import { fetchMetrics } from './mockApi';
import FilterPanel   from './FilterPanel';
import MetricsCards  from './MetricsCards';
import ChartsSection from './ChartsSection';
import ExportPanel   from './ExportPanel';

// Default filters (mirrors FilterPanel defaults)
function buildDefaultFilters() {
  const end   = new Date();
  const start = new Date();
  start.setFullYear(start.getFullYear() - 1);
  return {
    startDate:    start.toISOString().slice(0, 10),
    endDate:      end.toISOString().slice(0, 10),
    wikiLanguage: '',
    programType:  '',
  };
}

function StaffDashboard() {
  const [metrics,  setMetrics]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(false);
  const [filters,  setFilters]  = useState(buildDefaultFilters());

  const loadMetrics = useCallback(async (currentFilters) => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchMetrics(currentFilters);
      setMetrics(data);
    } catch {
      setError(true);
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on first mount with default filters
  useEffect(() => {
    loadMetrics(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleApplyFilters(newFilters) {
    setFilters(newFilters);
    loadMetrics(newFilters);
  }

  function handleResetFilters(defaultFilters) {
    setFilters(defaultFilters);
    loadMetrics(defaultFilters);
  }

  function handleRetry() {
    loadMetrics(filters);
  }

  const sharedProps = { metrics, loading, error, onRetry: handleRetry };

  return (
    <div className="staff-dashboard">

      {/* Page header */}
      <div className="staff-dashboard__header">
        <h1 className="staff-dashboard__title">{t('page_title')}</h1>
        <p className="staff-dashboard__subtitle">{t('page_subtitle')}</p>
      </div>

      {/* Main content */}
      <div className="staff-dashboard__body">

        {/* 1 — Filters */}
        <FilterPanel
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
          disabled={loading}
        />

        {/* 2 — Metric cards */}
        <MetricsCards {...sharedProps} />

        {/* 3 — Charts */}
        <ChartsSection {...sharedProps} />

        {/* 4 — CSV Export */}
        <ExportPanel filters={filters} />

      </div>
    </div>
  );
}

export default StaffDashboard;
