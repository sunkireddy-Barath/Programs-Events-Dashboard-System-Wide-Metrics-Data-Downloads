import React, { useState, useEffect } from 'react';
import { t } from '../i18n';

const WIKI_LANGS = [
  { v: '',            l: 'lang_all' }, 
  { v: 'english',    l: 'lang_english' },
  { v: 'hindi',      l: 'lang_hindi' },  
  { v: 'tamil',      l: 'lang_tamil' },
  { v: 'french',     l: 'lang_french' },  
  { v: 'spanish',    l: 'lang_spanish' },
  { v: 'german',     l: 'lang_german' },  
  { v: 'arabic',     l: 'lang_arabic' },
  { v: 'portuguese', l: 'lang_portuguese' },  
  { v: 'bengali',    l: 'lang_bengali' },
];

const PROG_TYPES = [
  { v: '',          l: 'type_all' }, 
  { v: 'education', l: 'type_education' },
  { v: 'editathon', l: 'type_editathon' }, 
  { v: 'contest',   l: 'type_contest' },
  { v: 'other',     l: 'type_other' },
];

function defaultStart() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d.toISOString().slice(0, 10);
}
function defaultEnd() { return new Date().toISOString().slice(0, 10); }

export const initFilters = {
  startDate: defaultStart(),
  endDate:   defaultEnd(),
  lang:      '',
  type:      '',
};

function FilterPanel({ onApply, onReset, disabled }) {
  const [f, setF] = useState(initFilters);
  const [showSuccess, setShowSuccess] = useState(false);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleApply = () => {
    onApply(f);
    setShowSuccess(true);
  };

  const handleReset = () => {
    setF(initFilters);
    onReset(initFilters);
    setShowSuccess(false);
  };

  return (
    <div className="section">
      <div className="section-title">{t('filter_panel_title')}</div>
      <div className="filter-row">

        {/* Date Range */}
        <div className="filter-group">
          <div className="filter-label">{t('date_range_label')}</div>
          <div className="date-pair">
            <input
              id="fp-start" className="filter-input" type="date"
              value={f.startDate} max={f.endDate}
              aria-label={t('start_date_label')}
              onChange={(e) => set('startDate', e.target.value)}
            />
            <span className="date-sep">–</span>
            <input
              id="fp-end" className="filter-input" type="date"
              value={f.endDate} min={f.startDate}
              aria-label={t('end_date_label')}
              onChange={(e) => set('endDate', e.target.value)}
            />
          </div>
        </div>

        {/* Wiki Language */}
        <div className="filter-group">
          <label className="filter-label" htmlFor="fp-lang">{t('wiki_language_label')}</label>
          <select id="fp-lang" className="filter-select" value={f.lang}
            onChange={(e) => set('lang', e.target.value)}>
            {WIKI_LANGS.map((o) => <option key={o.v} value={o.v}>{t(o.l)}</option>)}
          </select>
        </div>

        {/* Program Type */}
        <div className="filter-group">
          <label className="filter-label" htmlFor="fp-type">{t('program_type_label')}</label>
          <select id="fp-type" className="filter-select" value={f.type}
            onChange={(e) => set('type', e.target.value)}>
            {PROG_TYPES.map((o) => <option key={o.v} value={o.v}>{t(o.l)}</option>)}
          </select>
        </div>

        {/* Actions */}
        <div className="filter-actions">
          {showSuccess && <span className="filter-success-msg">{t('filters_applied_success')}</span>}
          <button id="fp-apply" className="btn btn-primary" disabled={disabled}
            onClick={handleApply}>{t('apply_filters_button')}</button>
          <button id="fp-reset" className="btn btn-secondary" disabled={disabled}
            onClick={handleReset}>
            {t('reset_button')}
          </button>
        </div>

      </div>
    </div>
  );
}

export default FilterPanel;
