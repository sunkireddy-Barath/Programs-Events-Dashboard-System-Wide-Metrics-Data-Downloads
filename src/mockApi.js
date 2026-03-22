// mockApi.js — Simulating backend API for development

export function fetchMetrics(filters) {
  console.log("Mock API: Fetching metrics with", filters);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total_programs: 12847,
        monthly_active_editors: 45210,
        total_edits: 18450000,
        articles_improved: 95500,
        new_programs_this_month: 245,
        editor_retention_rate: 68.5,
        programs_by_type: { education: 45, edit_a_thon: 25, contest: 15, other: 15 },
        monthly_active_editors_trend: [
          {month: 'Jan', editors: 42000}, {month: 'Feb', editors: 43500}, 
          {month: 'Mar', editors: 45000}, {month: 'Apr', editors: 44200},
          {month: 'May', editors: 46000}, {month: 'Jun', editors: 47500}, 
          {month: 'Jul', editors: 48000}, {month: 'Aug', editors: 47000},
          {month: 'Sep', editors: 49000}, {month: 'Oct', editors: 51000}, 
          {month: 'Nov', editors: 52500}, {month: 'Dec', editors: 54000}
        ],
        programs_by_wiki_language: [
          {language: 'English', count: 5500}, {language: 'Hindi', count: 1200},
          {language: 'French', count: 950}, {language: 'Spanish', count: 880},
          {language: 'German', count: 720}, {language: 'Portuguese', count: 650}
        ]
      });
    }, 800);
  });
}

export function requestExport(filters) {
  console.log("Mock API: Export requested", filters);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ job_id: "job_" + Date.now(), status: "queued" });
    }, 500);
  });
}

export function fetchExportStatus(jobId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const statuses = ["queued", "processing", "processing", "complete"];
      const rand = Math.floor(Math.random() * statuses.length);
      resolve({ job_id: jobId, status: "complete" }); // Force complete for faster preview
    }, 300);
  });
}
