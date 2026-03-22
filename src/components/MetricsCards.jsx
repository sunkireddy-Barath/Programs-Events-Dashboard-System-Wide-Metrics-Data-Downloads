import React from 'react';
import { t } from '../i18n';

function MetricsCards({ metrics, loading, error, onRetry }) {
  if (loading) {
    return (
      <div className="metrics-grid">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="card loading-card">
            <div className="shimmer-line" style={{ width: '50%' }}></div>
            <div className="shimmer-line" style={{ width: '30%', height: 24, marginTop: 10 }}></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-box">
        <p>{t('loading_error')}</p>
        <button className="btn btn-primary" onClick={onRetry}>{t('retry_button')}</button>
      </div>
    );
  }

  if (!metrics) return null;

  const cardList = [
    { label: 'total_programs_title',       val: metrics.total_programs.toLocaleString(),               sub: 'total_programs_subtitle' },
    { label: 'monthly_active_editors_title', val: metrics.monthly_active_editors.toLocaleString(),       sub: 'monthly_active_editors_subtitle' },
    { label: 'total_edits_title',          val: metrics.total_edits.toLocaleString(),                  sub: 'total_edits_subtitle' },
    { label: 'articles_improved_title',    val: metrics.articles_improved.toLocaleString(),             sub: 'articles_improved_subtitle' },
    { label: 'new_programs_title',         val: metrics.new_programs_this_month.toLocaleString(),       sub: 'new_programs_subtitle' },
    { label: 'retention_rate_title',       val: metrics.editor_retention_rate.toFixed(1) + '%',         sub: 'retention_rate_subtitle' },
  ];

  return (
    <div className="metrics-grid">
      {cardList.map((c, i) => (
        <div key={i} className="card">
          <div className="card-lbl">{t(c.label)}</div>
          <div className="card-val">{c.val}</div>
          <div className="card-sub">{t(c.sub)}</div>
        </div>
      ))}
    </div>
  );
}

export default MetricsCards;
