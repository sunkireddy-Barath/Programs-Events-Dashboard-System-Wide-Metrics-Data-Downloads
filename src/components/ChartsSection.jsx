import React from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';
import { t } from '../i18n';

const BLUE = '#3a6fa8', GREEN = '#27ae60', ORANGE = '#e67e22', PURPLE = '#8e44ad';
// Simplified tooltip style (no custom borders/shadows)
const TT_STYLE = { borderRadius: 0, border: '1px solid #ccc', fontSize: 13 };

function SkeletonChart() {
  return (
    <div className="chart-block">
      <div className="skel skel-line" style={{ width: 220, marginBottom: 15 }} />
      <div className="skel skel-chart" />
    </div>
  );
}

function ChartsSection({ metrics, loading, error, onRetry }) {
  if (loading) {
    return (
      <div className="charts-col">
        <SkeletonChart /><SkeletonChart /><SkeletonChart />
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-block">
        <div className="state-error">
          <p className="state-msg">{t('loading_error')}</p>
          <button className="btn btn-primary" onClick={onRetry}>{t('retry_button')}</button>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="chart-block">
        <div className="state-empty"><p className="state-msg">{t('no_data_message')}</p></div>
      </div>
    );
  }

  const byType = [
    { name: t('type_education'), value: metrics.programs_by_type.education,  fill: BLUE   },
    { name: t('type_editathon'), value: metrics.programs_by_type.edit_a_thon, fill: GREEN  },
    { name: t('type_contest'),   value: metrics.programs_by_type.contest,     fill: ORANGE },
    { name: t('type_other'),     value: metrics.programs_by_type.other,       fill: PURPLE },
  ];

  return (
    <div className="charts-col">

      {/* Chart 1 — Programs by Type */}
      <div className="chart-block">
        <div className="chart-title">{t('chart_programs_by_type')}</div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={byType} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={{ stroke: '#ddd' }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} width={45} />
            <Tooltip contentStyle={TT_STYLE} cursor={{ fill: '#f9f9f9' }} />
            <Bar dataKey="value" name={t('lbl_count')} radius={0}>
              {byType.map((d) => <Cell key={d.name} fill={d.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2 — Monthly Active Editors */}
      <div className="chart-block">
        <div className="chart-title">{t('chart_monthly_active_editors')}</div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={metrics.monthly_active_editors_trend} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#666' }} axisLine={{ stroke: '#ddd' }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} width={45} />
            <Tooltip contentStyle={TT_STYLE} />
            <Legend wrapperStyle={{ fontSize: 13, paddingTop: 10 }} />
            <Line
              type="monotone" dataKey="editors" name={t('lbl_editors')}
              stroke={BLUE} strokeWidth={2}
              dot={{ r: 3, fill: BLUE, strokeWidth: 0 }} activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3 — Programs by Wiki Language */}
      <div className="chart-block">
        <div className="chart-title">{t('chart_programs_by_wiki_language')}</div>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart
            data={metrics.programs_by_wiki_language}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 60, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="language" tick={{ fontSize: 12, fill: '#666' }} axisLine={{ stroke: '#ddd' }} tickLine={false} width={65} />
            <Tooltip contentStyle={TT_STYLE} cursor={{ fill: '#f9f9f9' }} />
            <Bar dataKey="count" name={t('lbl_count')} fill={BLUE} radius={0} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default ChartsSection;
