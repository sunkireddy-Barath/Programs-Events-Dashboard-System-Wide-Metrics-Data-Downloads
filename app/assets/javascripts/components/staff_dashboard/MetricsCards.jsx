// MetricsCards.jsx
// Renders six summary metric cards from the metrics API response.
// Handles loading (skeleton), error, and empty states.

import React from 'react';
import { t } from './i18n';

// Utility: format large numbers with thousand separators
function formatNumber(num) {
  if (num === null || num === undefined) return '—';
  return Number(num).toLocaleString();
}

// Card definitions: maps API key → display strings
const CARD_DEFS = [
  {
    key:      'total_programs',
    title:    () => t('total_programs_title'),
    subtitle: () => t('total_programs_subtitle'),
    format:   formatNumber,
  },
  {
    key:      'monthly_active_editors',
    title:    () => t('monthly_active_editors_title'),
    subtitle: () => t('monthly_active_editors_subtitle'),
    format:   formatNumber,
  },
  {
    key:      'total_edits',
    title:    () => t('total_edits_title'),
    subtitle: () => t('total_edits_subtitle'),
    format:   formatNumber,
  },
  {
    key:      'articles_improved',
    title:    () => t('articles_improved_title'),
    subtitle: () => t('articles_improved_subtitle'),
    format:   formatNumber,
  },
  {
    key:      'new_programs_this_month',
    title:    () => t('new_programs_title'),
    subtitle: () => t('new_programs_subtitle'),
    format:   formatNumber,
  },
  {
    key:      'editor_retention_rate',
    title:    () => t('retention_rate_title'),
    subtitle: () => t('retention_rate_subtitle'),
    format:   (v) => `${Number(v).toFixed(1)}%`,
  },
];

// ── Sub-components ────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="metric-card" aria-hidden="true">
      <div className="skeleton skeleton--text" style={{ width: '60%' }} />
      <div className="skeleton skeleton--text" style={{ width: '40%', height: 28, marginTop: 8 }} />
      <div className="skeleton skeleton--text" style={{ width: '70%', marginTop: 8 }} />
    </div>
  );
}

function MetricCard({ cardDef, value }) {
  return (
    <div className="metric-card">
      <div className="metric-card__title">{cardDef.title()}</div>
      <div className="metric-card__value">{cardDef.format(value)}</div>
      <div className="metric-card__subtitle">{cardDef.subtitle()}</div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────

function MetricsCards({ metrics, loading, error, onRetry }) {
  if (loading) {
    return (
      <div className="staff-section">
        <div className="metrics-cards__grid">
          {CARD_DEFS.map((def) => (
            <SkeletonCard key={def.key} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="staff-section">
        <div className="state-box state-box--error">
          <p className="state-box__text">{t('loading_error')}</p>
          <button id="metrics-retry-btn" className="btn btn--primary" onClick={onRetry}>
            {t('retry_button')}
          </button>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="staff-section">
        <div className="state-box state-box--empty">
          <p className="state-box__text">{t('no_data_message')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="staff-section">
      <div className="metrics-cards__grid">
        {CARD_DEFS.map((def) => (
          <MetricCard key={def.key} cardDef={def} value={metrics[def.key]} />
        ))}
      </div>
    </div>
  );
}

export default MetricsCards;
