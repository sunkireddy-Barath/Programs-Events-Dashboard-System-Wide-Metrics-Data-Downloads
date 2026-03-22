// FilterPanel.jsx
// Horizontal filter bar — date range, wiki language, program type.
// Calls onApply(filters) when Apply is clicked; onReset() when Reset is clicked.

import React, { useState } from 'react';
import { t } from './i18n';

// Default date helpers
function defaultStartDate() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d.toISOString().slice(0, 10);
}

function defaultEndDate() {
  return new Date().toISOString().slice(0, 10);
}

const WIKI_LANGUAGES = [
  { value: '',            label: () => t('lang_all') },
  { value: 'english',    label: () => t('lang_english') },
  { value: 'hindi',      label: () => t('lang_hindi') },
  { value: 'tamil',      label: () => t('lang_tamil') },
  { value: 'french',     label: () => t('lang_french') },
  { value: 'spanish',    label: () => t('lang_spanish') },
  { value: 'german',     label: () => t('lang_german') },
  { value: 'arabic',     label: () => t('lang_arabic') },
  { value: 'portuguese', label: () => t('lang_portuguese') },
  { value: 'bengali',    label: () => t('lang_bengali') },
];

const PROGRAM_TYPES = [
  { value: '',          label: () => t('type_all') },
  { value: 'education', label: () => t('type_education') },
  { value: 'editathon', label: () => t('type_editathon') },
  { value: 'contest',   label: () => t('type_contest') },
  { value: 'other',     label: () => t('type_other') },
];

const initialFilters = {
  startDate:    defaultStartDate(),
  endDate:      defaultEndDate(),
  wikiLanguage: '',
  programType:  '',
};

function FilterPanel({ onApply, onReset, disabled }) {
  const [filters, setFilters] = useState(initialFilters);

  function handleChange(field, value) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  function handleApply(e) {
    e.preventDefault();
    if (onApply) onApply(filters);
  }

  function handleReset() {
    setFilters(initialFilters);
    if (onReset) onReset(initialFilters);
  }

  return (
    <div className="staff-section">
      <div className="staff-section__title">{t('filter_panel_title')}</div>
      <form className="filter-panel__grid" onSubmit={handleApply}>

        {/* Date Range */}
        <div className="filter-panel__group">
          <label className="filter-panel__label">{t('date_range_label')}</label>
          <div className="filter-panel__date-row">
            <input
              id="filter-start-date"
              className="filter-panel__input"
              type="date"
              value={filters.startDate}
              max={filters.endDate}
              aria-label={t('start_date_label')}
              onChange={(e) => handleChange('startDate', e.target.value)}
            />
            <span className="filter-panel__date-sep">–</span>
            <input
              id="filter-end-date"
              className="filter-panel__input"
              type="date"
              value={filters.endDate}
              min={filters.startDate}
              aria-label={t('end_date_label')}
              onChange={(e) => handleChange('endDate', e.target.value)}
            />
          </div>
        </div>

        {/* Wiki Language */}
        <div className="filter-panel__group">
          <label htmlFor="filter-wiki-language" className="filter-panel__label">
            {t('wiki_language_label')}
          </label>
          <select
            id="filter-wiki-language"
            className="filter-panel__select"
            value={filters.wikiLanguage}
            onChange={(e) => handleChange('wikiLanguage', e.target.value)}
          >
            {WIKI_LANGUAGES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label()}
              </option>
            ))}
          </select>
        </div>

        {/* Program Type */}
        <div className="filter-panel__group">
          <label htmlFor="filter-program-type" className="filter-panel__label">
            {t('program_type_label')}
          </label>
          <select
            id="filter-program-type"
            className="filter-panel__select"
            value={filters.programType}
            onChange={(e) => handleChange('programType', e.target.value)}
          >
            {PROGRAM_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label()}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="filter-panel__actions">
          <button
            id="filter-apply-btn"
            type="submit"
            className="btn btn--primary"
            disabled={disabled}
          >
            {t('apply_filters_button')}
          </button>
          <button
            id="filter-reset-btn"
            type="button"
            className="btn btn--secondary"
            disabled={disabled}
            onClick={handleReset}
          >
            {t('reset_button')}
          </button>
        </div>

      </form>
    </div>
  );
}

export default FilterPanel;
