// mockApi.js — Simulated backend responses for development.
// This is restored to allow the frontend to work without a real Rails backend.

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const METRICS = {
  total_programs: 12847,
  monthly_active_editors: 3421,
  total_edits: 847293,
  articles_improved: 156204,
  new_programs_this_month: 143,
  editor_retention_rate: 67.4,
  programs_by_type: { education: 7234, edit_a_thon: 3102, contest: 1456, other: 1055 },
  monthly_active_editors_trend: [
    { month: 'Jan', editors: 2841 }, { month: 'Feb', editors: 3012 },
    { month: 'Mar', editors: 3234 }, { month: 'Apr', editors: 2987 },
    { month: 'May', editors: 3156 }, { month: 'Jun', editors: 3421 },
    { month: 'Jul', editors: 3289 }, { month: 'Aug', editors: 3567 },
    { month: 'Sep', editors: 3102 }, { month: 'Oct', editors: 3445 },
    { month: 'Nov', editors: 3621 }, { month: 'Dec', editors: 3421 },
  ],
  programs_by_wiki_language: [
    { language: 'English', count: 5234 }, { language: 'Hindi', count: 1823 },
    { language: 'Tamil', count: 987 },   { language: 'French', count: 876 },
    { language: 'Spanish', count: 743 },  { language: 'German', count: 621 },
    { language: 'Arabic', count: 534 },   { language: 'Portuguese', count: 498 },
    { language: 'Bengali', count: 412 },  { language: 'Other', count: 1119 },
  ],
};

export async function fetchMetrics(/* filters */) {
  await wait(900);
  return JSON.parse(JSON.stringify(METRICS));
}

export async function requestExport(/* filters */) {
  await wait(400);
  return { status: 'queued', job_id: 'job-' + Date.now() };
}

const jobStarts = {};
export async function fetchExportStatus(jobId) {
  await wait(200);
  if (!jobStarts[jobId]) jobStarts[jobId] = Date.now();
  const elapsed = Date.now() - jobStarts[jobId];
  if (elapsed < 3000)  return { status: 'queued',      job_id: jobId };
  if (elapsed < 10000) return { status: 'processing',  job_id: jobId };
  return { status: 'complete', job_id: jobId };
}
