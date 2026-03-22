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
    <div className="section workflow-simple">
      <div className="workflow-title-row">
        <span className="workflow-main-title">{t('workflow_title')}</span>
      </div>
      <div className="workflow-list">
        {steps.map((s, i) => (
          <div key={i} className="workflow-item">
            <div className="workflow-item-header">
              <span className="workflow-number">{i + 1}</span>
              <span className="workflow-item-title">{s.title.replace(/^\d\.\s/, '')}</span>
            </div>
            <p className="workflow-item-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SystemWorkflow;
