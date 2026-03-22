// i18n.js — All UI strings for the Staff Dashboard
// Access strings via t('key') to keep JSX free of hard-coded text.

const strings = {
  // Page
  page_title: 'Staff Dashboard',
  page_subtitle: 'System-Wide Metrics & Data Export',

  // FilterPanel
  filter_panel_title: 'Filter Programs',
  date_range_label: 'Date Range',
  start_date_label: 'Start Date',
  end_date_label: 'End Date',
  wiki_language_label: 'Wiki Language',
  program_type_label: 'Program Type',
  apply_filters_button: 'Apply Filters',
  reset_button: 'Reset',

  // Wiki language options
  lang_all: 'All Languages',
  lang_english: 'English',
  lang_hindi: 'Hindi',
  lang_tamil: 'Tamil',
  lang_french: 'French',
  lang_spanish: 'Spanish',
  lang_german: 'German',
  lang_arabic: 'Arabic',
  lang_portuguese: 'Portuguese',
  lang_bengali: 'Bengali',

  // Program type options
  type_all: 'All Types',
  type_education: 'Education',
  type_editathon: 'Edit-a-thon',
  type_contest: 'Contest',
  type_other: 'Other',

  // MetricsCards
  total_programs_title: 'Total Programs',
  total_programs_subtitle: 'across all wikis',
  monthly_active_editors_title: 'Monthly Active Editors',
  monthly_active_editors_subtitle: 'unique editors this month',
  total_edits_title: 'Total Edits',
  total_edits_subtitle: 'Wikipedia edits made',
  articles_improved_title: 'Articles Improved',
  articles_improved_subtitle: 'articles across all programs',
  new_programs_title: 'New Programs This Month',
  new_programs_subtitle: 'programs started this month',
  retention_rate_title: 'Editor Retention Rate',
  retention_rate_subtitle: 'editors with 5+ edits',

  // ChartsSection
  chart_programs_by_type_title: 'Programs by Type',
  chart_monthly_editors_title: 'Monthly Active Editors',
  chart_programs_by_language_title: 'Programs by Wiki Language',
  chart_count_label: 'Count',
  chart_editors_label: 'Editors',
  chart_month_label: 'Month',
  chart_language_label: 'Language',

  // ExportPanel
  export_title: 'Download Program Data',
  export_description:
    'Export all program data matching your current filters as a CSV file. ' +
    'The export runs in the background and you will receive an email with the download link when it is ready.',
  export_csv_fields_label: 'CSV columns included:',
  export_csv_fields:
    'Program Name, Organiser, Program Type, Start Date, End Date, Participants, ' +
    'Total Edits, Articles Improved, Articles Created, Bytes Added, Wiki Language, Region',
  export_button: 'Request CSV Export',
  export_another_button: 'Request Another Export',
  export_queued: 'Your export is being prepared...',
  export_processing: 'Building your CSV file...',
  export_complete: 'Your CSV is ready. Check your email for the download link.',
  export_failed: 'Export failed. Please try again.',
  rate_limit_notice: 'Maximum 5 exports per hour',

  // Status & error
  loading_error: 'Failed to load data. Please try again.',
  retry_button: 'Retry',
  no_data_message: 'No programs found matching your filters. Try adjusting the date range or program type.',

  // Accessibility / misc
  loading_label: 'Loading…',
};

export const t = (key) => strings[key] !== undefined ? strings[key] : key;
