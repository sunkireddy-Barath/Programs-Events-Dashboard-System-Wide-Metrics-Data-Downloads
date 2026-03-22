/**
 * api.js — Staff Dashboard API Layer
 * Replaces earlier mock data with real fetch() calls to the Rails backend.
 * 
 * Endpoints:
 * - GET /staff/metrics (returns aggregate data)
 * - POST /staff/export (triggers Sidekiq job)
 * - GET /staff/export/status (polls job status)
 */

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
  }
  return res.json();
};

/**
 * Fetches aggregate metrics for the dashboard.
 * @param {Object} filters - { startDate, endDate, lang, type }
 */
export async function fetchMetrics(filters = {}) {
  const query = new URLSearchParams({
    start: filters.startDate || '',
    end:   filters.endDate   || '',
    lang:  filters.lang      || '',
    type:  filters.type      || '',
  }).toString();

  const response = await fetch(`/staff/metrics?${query}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  
  return handleResponse(response);
}

/**
 * Requests a new CSV export job.
 * @param {Object} filters - current filter state to apply to the export
 */
export async function requestExport(filters = {}) {
  const response = await fetch('/staff/export', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filters }),
  });

  return handleResponse(response);
}

/**
 * Checks the status of a background export job.
 * @param {string} jobId - the ID returned by requestExport
 */
export async function fetchExportStatus(jobId) {
  const response = await fetch(`/staff/export/status?job_id=${jobId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  return handleResponse(response);
}
