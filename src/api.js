// api.js — Real API interaction logic
// Manual human-edited version: simple fetch calls.

export function fetchMetrics(filters) {
  const query = new URLSearchParams(filters).toString();
  return fetch(`/staff/metrics?${query}`)
    .then(res => {
      if (!res.ok) throw new Error("API error");
      return res.json();
    });
}

export function requestExport(filters) {
  return fetch('/staff/export', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters)
  }).then(res => {
    if (!res.ok) throw new Error("Export request failed");
    return res.json();
  });
}

export function fetchExportStatus(jobId) {
  return fetch(`/staff/export/status?job_id=${jobId}`)
    .then(res => {
      if (!res.ok) throw new Error("Status check failed");
      return res.json();
    });
}
