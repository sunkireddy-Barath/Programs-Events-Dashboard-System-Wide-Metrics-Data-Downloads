// mockApi.js — Simulated API responses for development/demo
// Replace these calls with real fetch/axios calls once the Rails backend is ready.

const SIMULATE_DELAY_MS = 800; // Simulate real network latency

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulated metrics data matching the GET /staff/metrics schema
const metricsData = {
  total_programs: 12847,
  monthly_active_editors: 3421,
  total_edits: 847293,
  articles_improved: 156204,
  new_programs_this_month: 143,
  editor_retention_rate: 67.4,
  programs_by_type: {
    education: 7234,
    edit_a_thon: 3102,
    contest: 1456,
    other: 1055,
  },
  monthly_active_editors_trend: [
    { month: 'Jan', editors: 2841 },
    { month: 'Feb', editors: 3012 },
    { month: 'Mar', editors: 3234 },
    { month: 'Apr', editors: 2987 },
    { month: 'May', editors: 3156 },
    { month: 'Jun', editors: 3421 },
    { month: 'Jul', editors: 3289 },
    { month: 'Aug', editors: 3567 },
    { month: 'Sep', editors: 3102 },
    { month: 'Oct', editors: 3445 },
    { month: 'Nov', editors: 3621 },
    { month: 'Dec', editors: 3421 },
  ],
  programs_by_wiki_language: [
    { language: 'English',    count: 5234 },
    { language: 'Hindi',      count: 1823 },
    { language: 'Tamil',      count: 987  },
    { language: 'French',     count: 876  },
    { language: 'Spanish',    count: 743  },
    { language: 'German',     count: 621  },
    { language: 'Arabic',     count: 534  },
    { language: 'Portuguese', count: 498  },
    { language: 'Bengali',    count: 412  },
    { language: 'Other',      count: 1119 },
  ],
};

// GET /staff/metrics
// Accepts optional filter params (ignored by mock — returns same data)
export async function fetchMetrics(filters = {}) {
  await delay(SIMULATE_DELAY_MS);
  // Return a copy so callers cannot mutate the source object
  return JSON.parse(JSON.stringify(metricsData));
}

// POST /staff/export
// Returns 202-style queued response immediately
export async function requestExport(filters = {}) {
  await delay(400);
  return { status: 'queued', job_id: 'mock-job-' + Date.now() };
}

// Tracks when each job was "created" so we can simulate state transitions
const jobStartTimes = {};

// GET /staff/export/status
// Simulates: queued → processing (after 3 s) → complete (after 10 s)
export async function fetchExportStatus(jobId) {
  await delay(300);
  if (!jobStartTimes[jobId]) {
    jobStartTimes[jobId] = Date.now();
  }
  const elapsed = Date.now() - jobStartTimes[jobId];

  if (elapsed < 3000) {
    return { status: 'queued', job_id: jobId };
  } else if (elapsed < 10000) {
    return { status: 'processing', job_id: jobId };
  } else {
    return { status: 'complete', job_id: jobId };
  }
}
