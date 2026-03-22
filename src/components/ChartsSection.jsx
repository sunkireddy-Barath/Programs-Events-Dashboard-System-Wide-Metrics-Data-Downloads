import React from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { t } from '../i18n';

const COLORS = {
  blue: '#3a6fa8',
  green: '#27ae60',
  orange: '#e67e22',
  purple: '#8e44ad',
  grey: '#eee'
};

function ChartsSection({ metrics, loading, error }) {
  if (loading || error || !metrics) {
    return (
      <div className="charts-list">
        <div className="chart-item loading-chart"></div>
        <div className="chart-item loading-chart"></div>
        <div className="chart-item loading-chart"></div>
      </div>
    );
  }

  const typeData = [
    { name: t('type_education'), count: metrics.programs_by_type.education,   color: COLORS.blue },
    { name: t('type_editathon'), count: metrics.programs_by_type.edit_a_thon, color: COLORS.green },
    { name: t('type_contest'),   count: metrics.programs_by_type.contest,     color: COLORS.orange },
    { name: t('type_other'),     count: metrics.programs_by_type.other,       color: COLORS.purple }
  ];

  return (
    <div className="charts-list">
      {/* 1. Bar Chart */}
      <div className="chart-item">
        <div className="chart-header">{t('chart_programs_by_type')}</div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={typeData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.grey} />
            <XAxis dataKey="name" fontSize={12} tickLine={false} />
            <YAxis fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip cursor={{fill: '#f5f5f5'}} />
            <Bar dataKey="count" name={t('lbl_count')}>
              {typeData.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 2. Line Chart */}
      <div className="chart-item">
        <div className="chart-header">{t('chart_monthly_active_editors')}</div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={metrics.monthly_active_editors_trend}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.grey} />
            <XAxis dataKey="month" fontSize={12} tickLine={false} />
            <YAxis fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" dataKey="editors" name={t('lbl_editors')} 
              stroke={COLORS.blue} strokeWidth={2} dot={{r: 4}} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Horizontal Bar Chart */}
      <div className="chart-item">
        <div className="chart-header">{t('chart_programs_by_wiki_language')}</div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={metrics.programs_by_wiki_language} layout="vertical" margin={{left: 40}}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={COLORS.grey} />
            <XAxis type="number" fontSize={11} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="language" fontSize={12} tickLine={false} width={60} />
            <Tooltip cursor={{fill: '#f5f5f5'}} />
            <Bar dataKey="count" name={t('lbl_count')} fill={COLORS.blue} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartsSection;
