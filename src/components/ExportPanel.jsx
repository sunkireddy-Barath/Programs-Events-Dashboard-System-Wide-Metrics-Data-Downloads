import React, { useState, useEffect, useRef } from 'react';
import { t } from '../i18n';
import { requestExport, fetchExportStatus } from '../mockApi';

const JOB_CLS  = { queued: 'job-queued', processing: 'job-processing', complete: 'job-complete', failed: 'job-failed' };
const JOB_TEXT = { queued: 'export_queued', processing: 'export_processing', complete: 'export_complete', failed: 'export_failed' };

function StatusIcon({ status }) {
  if (status === 'queued')     return <span className="spinner" />;
  if (status === 'processing') return <span className="spinner" />;
  if (status === 'complete')   return <span style={{color:'#27ae60'}}>✓</span>;
  if (status === 'failed')     return <span style={{color:'#c0392b'}}>✗</span>;
  return null;
}

function ExportPanel({ filters }) {
  const [jobId,  setJobId]  = useState(null);
  const [status, setStatus] = useState(null);
  const [busy,   setBusy]   = useState(false);
  const [subErr, setSubErr] = useState(false);
  const poll = useRef(null);

  useEffect(() => () => { if (poll.current) clearInterval(poll.current); }, []);

  useEffect(() => {
    if (!jobId || status === 'complete' || status === 'failed') {
      if (poll.current) clearInterval(poll.current);
      return;
    }
    poll.current = setInterval(async () => {
      try {
        const r = await fetchExportStatus(jobId);
        setStatus(r.status);
        if (r.status === 'complete' || r.status === 'failed') clearInterval(poll.current);
      } catch {
        setStatus('failed');
        clearInterval(poll.current);
      }
    }, 5000);
    return () => clearInterval(poll.current);
  }, [jobId, status]);

  async function handleRequest() {
    setBusy(true); setSubErr(false);
    try {
      const r = await requestExport(filters);
      setJobId(r.job_id);
      setStatus(r.status);
    } catch {
      setSubErr(true);
    } finally {
      setBusy(false);
    }
  }

  function handleReset() {
    if (poll.current) clearInterval(poll.current);
    setJobId(null); setStatus(null); setSubErr(false);
  }

  const showBtn     = !status || status === 'failed';
  const btnDisabled = busy || (!!status && status !== 'failed' && status !== 'complete');

  return (
    <div className="section">
      <div className="section-title">{t('export_title')}</div>
      <p className="export-desc">{t('export_description')}</p>

      {/* Simple Step Flow */}
      <div className="export-flow-preview">
        <div className="flow-title">{t('export_flow_title')}</div>
        <div className="flow-steps">
          <span className={`flow-step ${status === 'queued' ? 'active' : ''}`}>{t('export_flow_step1')}</span>
          <span className="flow-arrow">→</span>
          <span className={`flow-step ${status === 'processing' ? 'active' : ''}`}>{t('export_flow_step2')}</span>
          <span className="flow-arrow">→</span>
          <span className={`flow-step ${status === 'complete' ? 'active' : ''}`}>{t('export_flow_step3')}</span>
        </div>
      </div>

      <div className="export-fields">
        <div className="export-fields-lbl">{t('export_csv_fields_label')}</div>
        <div className="export-fields-txt">{t('export_csv_fields')}</div>
      </div>

      <div className="export-actions">
        {showBtn && (
          <button
            className="btn btn-primary btn-lg"
            onClick={handleRequest} disabled={btnDisabled}
          >
            {busy ? t('loading_label') : t('export_button')}
          </button>
        )}

        {status && (
          <div className={`job-box ${JOB_CLS[status]}`} role="status">
            <StatusIcon status={status} />
            <div>
              <div className="job-text">{t(JOB_TEXT[status])}</div>
              {status === 'complete' && (
                <button
                  className="btn btn-secondary"
                  style={{ marginTop: 10, fontSize: 13 }} onClick={handleReset}
                >
                  {t('export_another_button')}
                </button>
              )}
            </div>
          </div>
        )}

        {subErr && <div style={{color:'#c0392b', fontSize:13, marginTop:10}}>{t('export_failed')}</div>}
        <span className="footer-notice" style={{marginTop:10}}>{t('rate_limit_notice')}</span>
      </div>
    </div>
  );
}

export default ExportPanel;
