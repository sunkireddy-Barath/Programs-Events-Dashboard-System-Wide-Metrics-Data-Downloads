import React, { useState } from 'react';
import { t } from '../i18n';

export const initFilters = {
  startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  lang: '',
  type: '',
};

function FilterPanel({ onApply, onReset, disabled }) {
  const [f, setF] = useState(initFilters);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleApply = () => {
    onApply(f);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleReset = () => {
    setF(initFilters);
    onReset(initFilters);
    setShowSuccess(false);
  };

  return (
    <div className="section filters-panel">
      <div className="section-title">{t('filter_panel_title')}</div>
      <div className="filter-row">
        <div className="filter-group">
          <div className="filter-label">{t('date_range_label')}</div>
          <div className="date-pair">
            <input 
              className="filter-input" type="date" value={f.startDate} 
              onChange={e => setF({...f, startDate: e.target.value})} 
            />
            <span className="date-sep">–</span>
            <input 
              className="filter-input" type="date" value={f.endDate} 
              onChange={e => setF({...f, endDate: e.target.value})} 
            />
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-label">{t('wiki_language_label')}</div>
          <select 
            className="filter-select" value={f.lang} 
            onChange={e => setF({...f, lang: e.target.value})}
          >
            <option value="">{t('lang_all')}</option>
            <option value="en">{t('lang_english')}</option>
            <option value="hi">{t('lang_hindi')}</option>
            <option value="ta">{t('lang_tamil')}</option>
            <option value="fr">{t('lang_french')}</option>
            <option value="es">{t('lang_spanish')}</option>
            <option value="de">{t('lang_german')}</option>
            <option value="ar">{t('lang_arabic')}</option>
            <option value="pt">{t('lang_portuguese')}</option>
            <option value="bn">{t('lang_bengali')}</option>
          </select>
        </div>

        <div className="filter-group">
          <div className="filter-label">{t('program_type_label')}</div>
          <select 
            className="filter-select" value={f.type} 
            onChange={e => setF({...f, type: e.target.value})}
          >
            <option value="">{t('type_all')}</option>
            <option value="education">{t('type_education')}</option>
            <option value="editathon">{t('type_editathon')}</option>
            <option value="contest">{t('type_contest')}</option>
            <option value="other">{t('type_other')}</option>
          </select>
        </div>

        <div className="filter-actions">
          {showSuccess && <span className="filter-success-msg">{t('filters_applied_success')}</span>}
          <button className="btn btn-primary" onClick={handleApply} disabled={disabled}>{t('apply_filters_button')}</button>
          <button className="btn btn-secondary" onClick={handleReset} disabled={disabled}>{t('reset_button')}</button>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
