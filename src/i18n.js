// i18n.js — UI strings for Staff Dashboard
// Manual human-edited version: simple keys and values.

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

  workflow_title: "How it works — Staff Dashboard Workflow",
  workflow_step1_title: "Filter Data",
  workflow_step1_desc: "Select a date range, language, and type.",
  workflow_step2_title: "Real-time Metrics",
  workflow_step2_desc: "View current stats and trends instantly.",
  workflow_step3_title: "Background Export",
  workflow_step3_desc: "Request a CSV export (processed in background).",
  workflow_step4_title: "Email Delivery",
  workflow_step4_desc: "Receive a download link via email when ready.",

  total_programs_title: "Total Programs",
  monthly_active_editors_title: "Monthly Active Editors",
  total_edits_title: "Total Edits",
  articles_improved_title: "Articles Improved",
  new_programs_title: "New Programs This Month",
  retention_rate_title: "Editor Retention Rate",

  total_programs_subtitle: "across all wikis",
  monthly_active_editors_subtitle: "unique editors this month",
  total_edits_subtitle: "Wikipedia edits made",
  articles_improved_subtitle: "articles across all programs",
  new_programs_subtitle: "programs started this month",
  retention_rate_subtitle: "editors with 5+ edits",
  
  data_cached_notice: "Data cached — refreshes every hour",
  last_updated_lbl: "Last updated:",

  export_title: "Download Program Data",
  export_description: "Export filtered program data as a CSV file. Link sent via email.",
  export_button: "Request CSV Export",
  
  export_flow_title: "Export Process:",
  export_flow_step1: "Queued",
  export_flow_step2: "Processing",
  export_flow_step3: "Email sent",

  export_queued: "Your export is being prepared...",
  export_processing: "Building your CSV file...",
  export_complete: "Your CSV is ready. Check your email.",
  export_failed: "Export failed. Please try again.",
  rate_limit_notice: "Maximum 5 exports per hour",
  
  loading_error: "Failed to load data. Please try again.",
  retry_button: "Retry",
  no_data_message: "No programs found matching your filters.",

  chart_programs_by_type: "Programs by Type",
  chart_monthly_active_editors: "Monthly Active Editors",
  chart_programs_by_wiki_language: "Programs by Wiki Language",

  lang_all: "All Languages",
  lang_english: "English", lang_hindi: "Hindi", lang_tamil: "Tamil",
  lang_french: "French", lang_spanish: "Spanish", lang_german: "German",
  lang_arabic: "Arabic", lang_portuguese: "Portuguese", lang_bengali: "Bengali",

  type_all: "All Types",
  type_education: "Education", type_editathon: "Edit-a-thon",
  type_contest: "Contest", type_other: "Other",

  lbl_count: "Count", lbl_editors: "Editors",
  export_csv_fields_label: "CSV columns:",
  export_csv_fields: "Program Name, Organiser, Program Type, Start Date, End Date, Participants, Total Edits, Articles Improved, Articles Created, Bytes Added, Wiki Language, Region",
  export_another_button: "Request Another Export",
  loading_label: "Loading...",
};

export const t = (key) => strings[key] || key;
