// i18n.js — All UI strings for the Staff Dashboard.
// Includes requested fix for subtitle, casing, and new workflow section.

const strings = {
  page_title: "Staff Dashboard",
  page_subtitle: "System-wide metrics and data downloads — WMF Staff Only",
  filter_panel_title: "Filter Programs",
  date_range_label: "Date range",
  start_date_label: "Start Date",
  end_date_label: "End Date",
  wiki_language_label: "Wiki Language",
  program_type_label: "Program Type",
  apply_filters_button: "Apply Filters",
  reset_button: "Reset",
  filters_applied_success: "Filters applied",

  // Workflow Section
  workflow_title: "How it works — Staff Dashboard Workflow",
  workflow_step1_title: "1. Filter Data",
  workflow_step1_desc: "Select a date range, language, and program type to narrow down system-wide metrics.",
  workflow_step2_title: "2. Real-time Metrics",
  workflow_step2_desc: "View aggregated statistics and trends across all Wikimedia programs instantly.",
  workflow_step3_title: "3. Background Export",
  workflow_step3_desc: "Request a full CSV data export for offline analysis — processed as a Sidekiq job.",
  workflow_step4_title: "4. Email Delivery",
  workflow_step4_desc: "Receive a secure download link via email once your CSV file is ready.",

  // Metric Card Titles
  total_programs_title: "Total Programs",
  monthly_active_editors_title: "Monthly Active Editors",
  total_edits_title: "Total Edits",
  articles_improved_title: "Articles Improved",
  new_programs_title: "New Programs This Month",
  retention_rate_title: "Editor Retention Rate",

  // Metric Card Subtitles
  total_programs_subtitle: "across all wikis",
  monthly_active_editors_subtitle: "unique editors this month",
  total_edits_subtitle: "Wikipedia edits made",
  articles_improved_subtitle: "articles across all programs",
  new_programs_subtitle: "programs started this month",
  retention_rate_subtitle: "editors with 5+ edits",
  
  // Metric Card Cache Footer
  data_cached_notice: "Data cached — refreshes every hour",
  last_updated_lbl: "Last updated:",

  // Export Panel
  export_title: "Download Program Data",
  export_description: "Export all program data matching your current filters as a CSV file. The export runs in the background and you will receive an email with the download link when it is ready.",
  export_button: "Request CSV Export",
  
  // Export Status Flow (Pre-click info)
  export_flow_title: "Export Process:",
  export_flow_step1: "Queued",
  export_flow_step2: "Processing",
  export_flow_step3: "Email sent",

  // Live Export Status
  export_queued: "Your export is being prepared...",
  export_processing: "Building your CSV file...",
  export_complete: "Your CSV is ready. Check your email for the download link.",
  export_failed: "Export failed. Please try again.",
  rate_limit_notice: "Maximum 5 exports per hour",
  
  // Status and Error
  loading_error: "Failed to load data. Please try again.",
  retry_button: "Retry",
  no_data_message: "No programs found matching your filters.",

  // Chart titles
  chart_programs_by_type: "Programs by Type",
  chart_monthly_active_editors: "Monthly Active Editors",
  chart_programs_by_wiki_language: "Programs by Wiki Language",

  // Language options
  lang_all: "All Languages",
  lang_english: "English", lang_hindi: "Hindi", lang_tamil: "Tamil",
  lang_french: "French", lang_spanish: "Spanish", lang_german: "German",
  lang_arabic: "Arabic", lang_portuguese: "Portuguese", lang_bengali: "Bengali",

  // Type options
  type_all: "All Types",
  type_education: "Education", type_editathon: "Edit-a-thon",
  type_contest: "Contest", type_other: "Other",

  // Axis/Legend labels
  lbl_count: "Count", lbl_editors: "Editors",
  export_csv_fields_label: "CSV columns included:",
  export_csv_fields: "Program Name, Organiser, Program Type, Start Date, End Date, Participants, Total Edits, Articles Improved, Articles Created, Bytes Added, Wiki Language, Region",
  export_another_button: "Request Another Export",
  loading_label: "Loading...",
};

export const t = (key) => strings[key] !== undefined ? strings[key] : key;
