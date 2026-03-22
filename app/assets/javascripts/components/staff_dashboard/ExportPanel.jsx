// ExportPanel.jsx
// CSV export card: shows description, column preview, request button.
// After button click, polls for job status every 5 seconds until complete/failed.

import React, { useState, useEffect, useRef } from 'react';
import { t } from './i18n';
import { requestExport, fetchExportStatus } from './mockApi';

// ── Status icon helpers ───────────────────────────────────────
function StatusIcon({ status }) {
  switch (status) {
    case 'queued':
      return <span className="spinner spinner--grey" aria-hidden="true" />;
    case 'processing':
      return <span className="spinner spinner--blue" aria-hidden="true" />;
    case 'complete':
      return <span className="job-status__icon" aria-hidden="true">✓</span>;
    case 'failed':
      return <span className="job-status__icon" aria-hidden="true">✗</span>;
    default:
      return null;
  }
}

function statusText(status) {
  const map = {
    queued:     t('export_queued'),
    processing: t('export_processing'),
    complete:   t('export_complete'),
    failed:     t('export_failed'),
  };
  return map[status] || status;
}

// ── Job Status Box ────────────────────────────────────────────
function JobStatusBox({ status, onReset }) {
  return (
    <div className={`job-status job-status--${status}`} role="status" aria-live="polite">
      <StatusIcon status={status} />
      <div>
        <div className="job-status__text">{statusText(status)}</div>
        {status === 'complete' && (
          <button
            id="export-another-btn"
            className="btn btn--secondary"
            style={{ marginTop: 10, fontSize: 12 }}
            onClick={onReset}
          >
            {t('export_another_button')}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
function ExportPanel({ filters }) {
  const [jobId,       setJobId]       = useState(null);
  const [jobStatus,   setJobStatus]   = useState(null); // null | 'queued' | 'processing' | 'complete' | 'failed'
  const [requesting,  setRequesting]  = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const pollRef = useRef(null);

  // Clear poll interval on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  // Polling: start when we have a jobId and status is not terminal
  useEffect(() => {
    if (!jobId || jobStatus === 'complete' || jobStatus === 'failed') {
      if (pollRef.current) clearInterval(pollRef.current);
      return;
    }

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetchExportStatus(jobId);
        setJobStatus(res.status);
        if (res.status === 'complete' || res.status === 'failed') {
          clearInterval(pollRef.current);
        }
      } catch {
        setJobStatus('failed');
        clearInterval(pollRef.current);
      }
    }, 5000);

    return () => clearInterval(pollRef.current);
  }, [jobId, jobStatus]);

  async function handleRequestExport() {
    setRequesting(true);
    setSubmitError(false);
    try {
      const res = await requestExport(filters);
      setJobId(res.job_id);
      setJobStatus(res.status);
    } catch {
      setSubmitError(true);
    } finally {
      setRequesting(false);
    }
  }

  function handleReset() {
    if (pollRef.current) clearInterval(pollRef.current);
    setJobId(null);
    setJobStatus(null);
    setSubmitError(false);
  }

  const buttonDisabled = requesting || (!!jobStatus && jobStatus !== 'failed' && jobStatus !== 'complete');
  const showButton = !jobStatus || jobStatus === 'failed';

  return (
    <div className="staff-section">
      <div className="staff-section__title">{t('export_title')}</div>

      <p className="export-panel__description">{t('export_description')}</p>

      {/* CSV field preview */}
      <div className="export-panel__fields-box">
        <div className="export-panel__fields-label">{t('export_csv_fields_label')}</div>
        <div className="export-panel__fields-text">{t('export_csv_fields')}</div>
      </div>

      <div className="export-panel__actions">
        {/* Request button — shown when idle or failed */}
        {showButton && (
          <button
            id="export-request-btn"
            className="btn btn--primary btn--lg"
            onClick={handleRequestExport}
            disabled={buttonDisabled}
          >
            {requesting ? t('loading_label') : t('export_button')}
          </button>
        )}

        {/* Submit error */}
        {submitError && (
          <div className="state-box state-box--error" style={{ marginTop: 8, textAlign: 'left' }}>
            <p className="state-box__text">{t('export_failed')}</p>
          </div>
        )}

        {/* Job status — shown once a job is running */}
        {jobStatus && <JobStatusBox status={jobStatus} onReset={handleReset} />}

        {/* Rate limit notice */}
        <span className="export-panel__rate-notice">{t('rate_limit_notice')}</span>
      </div>
    </div>
  );
}

export default ExportPanel;
