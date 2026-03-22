import React from 'react';
import { t } from '../i18n';

function SystemWorkflow() {
  const steps = [
    { title: t('workflow_step1_title'), desc: t('workflow_step1_desc') },
    { title: t('workflow_step2_title'), desc: t('workflow_step2_desc') },
    { title: t('workflow_step3_title'), desc: t('workflow_step3_desc') },
    { title: t('workflow_step4_title'), desc: t('workflow_step4_desc') },
  ];

  return (
    <div className="section workflow-box">
      <div className="workflow-title">{t('workflow_title')}</div>
      <div className="workflow-list">
        {steps.map((s, i) => (
          <div key={i} className="workflow-item">
            <div className="workflow-header">
              <span className="workflow-step-num">{i + 1}</span>
              <span className="workflow-step-title">{s.title}</span>
            </div>
            <p className="workflow-step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SystemWorkflow;
