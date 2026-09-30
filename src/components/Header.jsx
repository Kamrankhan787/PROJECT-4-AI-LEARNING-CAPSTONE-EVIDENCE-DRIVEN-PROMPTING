import React from 'react';

export default function Header({ completionStatus, completionPercentage, onLoadSample, onReset }) {
  const isComplete = completionStatus === 'CAPSTONE COMPLETE';

  return (
    <header className="header-container">
      <div className="header-inner">
        <div className="header-brand">
          <div className="header-logo-icon" title="Project 4 Capstone">
            P4
          </div>
          <div className="header-titles">
            <h1>AI Learning Capstone</h1>
            <p>Evidence-Driven Prompting &amp; Self-Review — Student Process Workspace</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div className={`header-status-badge ${isComplete ? 'status-complete' : 'status-in-progress'}`}>
            <span className="status-dot"></span>
            <span>{completionStatus} ({completionPercentage}%)</span>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onLoadSample}
            title="Load sample capstone on Food Chains & Lindeman's 10% rule"
          >
            ✦ Load Sample Demo
          </button>
        </div>
      </div>
    </header>
  );
}
