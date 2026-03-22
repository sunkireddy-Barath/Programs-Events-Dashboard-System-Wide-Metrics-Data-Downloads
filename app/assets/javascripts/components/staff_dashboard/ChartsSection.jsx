// ChartsSection.jsx
// Three Recharts charts: Programs by Type (bar), Monthly Active Editors (line),
// Programs by Wiki Language (horizontal bar).
// Handles loading skeleton, error, and empty states.

import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { t } from './i18n';

// ── Colour palette (consistent with WikiEduDashboard blue scheme) ──
const BLUE      = '#3a6fa8';
const GREEN     = '#27ae60';
const ORANGE    = '#e67e22';
const PURPLE    = '#8e44ad';
const TYPE_COLORS = [BLUE, GREEN, ORANGE, PURPLE];

// ── Skeleton placeholder shown while data loads ───────────────
function ChartSkeleton() {
  return (
    <div className="skeleton skeleton--chart" aria-hidden="true" />
  );
}

// ── Error block ───────────────────────────────────────────────
function ChartError({ onRetry }) {
  return (
    <div className="state-box state-box--error">
      <p className="state-box__text">{t('loading_error')}</p>
      <button id="charts-retry-btn" className="btn btn--primary" onClick={onRetry}>
        {t('retry_button')}
      </button>
    </div>
  );
}

// ── Chart 1: Programs by Type (vertical bar) ──────────────────
function ProgramsByTypeChart({ data }) {
  if (!data || Object.keys(data).length === 0) return null;

  const chartData = [
    { name: t('type_education'), value: data.education,  fill: TYPE_COLORS[0] },
    { name: t('type_editathon'), value: data.edit_a_thon, fill: TYPE_COLORS[1] },
    { name: t('type_contest'),   value: data.contest,    fill: TYPE_COLORS[2] },
    { name: t('type_other'),     value: data.other,      fill: TYPE_COLORS[3] },
  ];

  return (
    <div className="chart-block">
      <div className="chart-block__title">{t('chart_programs_by_type_title')}</div>
      <div className="chart-responsive-wrapper">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
            margin={{ top: 4, right: 24, left: 0, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e8eef5" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: '#3a3a3a' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#888888' }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #c5d5ea' }}
              cursor={{ fill: '#f0f4f9' }}
            />
            <Bar dataKey="value" name={t('chart_count_label')} radius={[2, 2, 0, 0]}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Chart 2: Monthly Active Editors Trend (line) ──────────────
function MonthlyEditorsTrendChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="chart-block">
      <div className="chart-block__title">{t('chart_monthly_editors_title')}</div>
      <div className="chart-responsive-wrapper">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={data}
            margin={{ top: 4, right: 24, left: 0, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e8eef5" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#3a3a3a' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#888888' }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #c5d5ea' }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="editors"
              name={t('chart_editors_label')}
              stroke={BLUE}
              strokeWidth={2}
              dot={{ r: 4, fill: BLUE, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Chart 3: Programs by Wiki Language (horizontal bar) ───────
function ProgramsByLanguageChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="chart-block">
      <div className="chart-block__title">{t('chart_programs_by_language_title')}</div>
      <div className="chart-responsive-wrapper">
        <ResponsiveContainer width="100%" height={340}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 24, left: 72, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e8eef5" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: '#888888' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="language"
              tick={{ fontSize: 12, fill: '#3a3a3a' }}
              axisLine={false}
              tickLine={false}
              width={68}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #c5d5ea' }}
              cursor={{ fill: '#f0f4f9' }}
            />
            <Bar
              dataKey="count"
              name={t('chart_count_label')}
              fill={BLUE}
              radius={[0, 2, 2, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
function ChartsSection({ metrics, loading, error, onRetry }) {
  if (loading) {
    return (
      <div className="charts-section">
        <div className="chart-block">
          <div className="skeleton skeleton--text" style={{ width: 200, marginBottom: 16 }} />
          <ChartSkeleton />
        </div>
        <div className="chart-block">
          <div className="skeleton skeleton--text" style={{ width: 220, marginBottom: 16 }} />
          <ChartSkeleton />
        </div>
        <div className="chart-block">
          <div className="skeleton skeleton--text" style={{ width: 240, marginBottom: 16 }} />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-block">
        <ChartError onRetry={onRetry} />
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="chart-block">
        <div className="state-box state-box--empty">
          <p className="state-box__text">{t('no_data_message')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="charts-section">
      <ProgramsByTypeChart data={metrics.programs_by_type} />
      <MonthlyEditorsTrendChart data={metrics.monthly_active_editors_trend} />
      <ProgramsByLanguageChart data={metrics.programs_by_wiki_language} />
    </div>
  );
}

export default ChartsSection;
