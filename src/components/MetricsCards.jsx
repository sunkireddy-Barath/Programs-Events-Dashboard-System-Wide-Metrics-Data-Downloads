import React from 'react';
import { t } from '../i18n';

function SkeletonCard() {
  return (
    <div className="card">
      <div className="skel skel-line" style={{ width: '60%' }} />
      <div className="skel skel-line" style={{ width: '40%', height: 28, marginTop: 10 }} />
      <div className="skel skel-line" style={{ width: '75%', marginTop: 10 }} />
    </div>
  );
}

const CARDS = [
  { key: 'total_programs',             title: 'total_programs_title',          sub: 'total_programs_subtitle' },
  { key: 'monthly_active_editors',     title: 'monthly_active_editors_title',  sub: 'monthly_active_editors_subtitle' },
  { key: 'total_edits',                title: 'total_edits_title',             sub: 'total_edits_subtitle' },
  { key: 'articles_improved',          title: 'articles_improved_title',       sub: 'articles_improved_subtitle' },
  { key: 'new_programs_this_month',    title: 'new_programs_title',            sub: 'new_programs_subtitle' },
  { key: 'editor_retention_rate',      title: 'retention_rate_title',          sub: 'retention_rate_subtitle', suffix: '%' },
];

const format = (val, isPct) => {
  if (val == null) return '—';
  return isPct ? val.toFixed(1) + '%' : Number(val).toLocaleString();
};

function MetricsCards({ metrics, loading, error, onRetry }) {
  if (loading) {
    return (
      <div className="cards-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-error">
        <p className="state-msg">{t('loading_error')}</p>
        <button className="btn btn-primary" onClick={onRetry}>{t('retry_button')}</button>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="state-empty">
        <p className="state-msg">{t('no_data_message')}</p>
      </div>
    );
  }

  return (
    <div className="cards-grid">
      {CARDS.map((card) => (
        <div key={card.key} className="card">
          <div className="card-title">{t(card.title)}</div>
          <div className="card-value">
            {format(metrics[card.key], card.key === 'editor_retention_rate')}
          </div>
          <div className="card-sub">{t(card.sub)}</div>
        </div>
      ))}
    </div>
  );
}

export default MetricsCards;
