import React, { useState, useEffect } from 'react';
import { t } from '../i18n';
import { requestExport, fetchExportStatus } from '../mockApi';

function ExportPanel({ filters }) {
  const [jobId, setJobId]   = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simple polling logic using useEffect
  useEffect(() => {
    let timer;
    if (jobId && (status === 'queued' || status === 'processing')) {
      timer = setInterval(() => {
        fetchExportStatus(jobId)
          .then(res => {
            setStatus(res.status);
            if (res.status === 'complete' || res.status === 'failed') clearInterval(timer);
          })
          .catch(() => {
            setStatus('failed');
            clearInterval(timer);
          });
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [jobId, status]);

  const handleStartExport = () => {
    setLoading(true);
    requestExport(filters)
      .then(res => {
        setJobId(res.job_id);
        setStatus(res.status);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setStatus('failed');
      });
  };

  const handleReset = () => {
    setJobId(null);
    setStatus(null);
  };

  const isPending = status === 'queued' || status === 'processing';

  return (
    <div className="section export-section">
      <div className="section-title">{t('export_title')}</div>
      <p className="export-desc">{t('export_description')}</p>

      <div className="export-workflow-preview">
        <span className={status === 'queued' ? 'active' : ''}>{t('export_flow_step1')}</span>
        <span className="sep">→</span>
        <span className={status === 'processing' ? 'active' : ''}>{t('export_flow_step2')}</span>
        <span className="sep">→</span>
        <span className={status === 'complete' ? 'active' : ''}>{t('export_flow_step3')}</span>
      </div>

      <div className="export-fields-box">
        <div className="lbl">{t('export_csv_fields_label')}</div>
        <div className="txt">{t('export_csv_fields')}</div>
      </div>

      <div className="export-footer">
        {!status || status === 'failed' ? (
          <button className="btn btn-primary btn-lg" onClick={handleStartExport} disabled={loading}>
            {loading ? t('loading_label') : t('export_button')}
          </button>
        ) : (
          <div className={`status-box ${status}`}>
            {isPending && <div className="simple-spinner"></div>}
            <span className="status-text">{t(`export_${status}`)}</span>
            {status === 'complete' && (
              <button className="btn btn-secondary btn-sm" onClick={handleReset} style={{marginLeft: 15}}>
                {t('export_another_button')}
              </button>
            )}
          </div>
        )}
        <div className="limit-notice">{t('rate_limit_notice')}</div>
      </div>
    </div>
  );
}

export default ExportPanel;
