import React, { useState } from 'react';
import SourcesTable from './SourcesTable';
import PromptLog from './PromptLog';
import Reflection from './Reflection';

export default function ProcessNotebook({
  state,
  completion,
  onSourcesChange,
  onPromptLogChange,
  onReflectionChange
}) {
  const [activeSubTab, setActiveSubTab] = useState('summary');

  const { studentInfo, briefing, options, optionsDecisionNotes, chapter, rubric, factChecks, sources, promptLog, reflection } = state;
  const sections = chapter?.sections || [];

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h2>Step 6 — Process Notebook &amp; Unified Evidence Dossier</h2>
          <p className="card-subtitle">
            The full record of your prompting journey: directing, questioning, comparing, correcting, verifying, and reflecting.
          </p>
        </div>
        <div className={`badge ${completion.isComplete ? 'badge-accept' : 'badge-checking'}`}>
          {completion.status} ({completion.passedCount}/{completion.totalCount} Requirements)
        </div>
      </div>

      {/* Completion Status Checklist Dashboard */}
      <div
        style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
            Official Capstone Verification Checklist
          </span>
          <span style={{ fontSize: '13px', fontWeight: '800', color: completion.isComplete ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
            {completion.percentage}% Complete
          </span>
        </div>

        <div className="checklist-grid">
          {Object.entries(completion.checklist || {}).map(([key, item]) => (
            <div key={key} className={`checklist-item ${item.ok ? 'passed' : ''}`}>
              <div className={`check-icon ${item.ok ? 'passed' : 'pending'}`}>
                {item.ok ? '✓' : '○'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: item.ok ? '#fff' : 'var(--text-muted)' }}>
                  {item.label}
                </span>
                <span style={{ fontSize: '11px', color: item.ok ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                  {item.current} (Target: {item.target})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notebook Navigation Sub-Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`pill-btn ${activeSubTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('summary')}
        >
          📋 Unified Dossier Summary
        </button>
        <button
          type="button"
          className={`pill-btn ${activeSubTab === 'sources' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('sources')}
        >
          📚 Sources Table ({sources?.length || 0})
        </button>
        <button
          type="button"
          className={`pill-btn ${activeSubTab === 'promptLog' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('promptLog')}
        >
          📜 Prompt History Log ({promptLog?.length || 0})
        </button>
        <button
          type="button"
          className={`pill-btn ${activeSubTab === 'reflection' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('reflection')}
        >
          💡 Final Reflection ({completion.refWords} words)
        </button>
      </div>

      {/* Sub-Tab 1: Unified Dossier Summary */}
      {activeSubTab === 'summary' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Topic Brief Summary */}
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '14px', color: 'var(--accent-cyan)', marginBottom: '8px' }}>
              1. Topic Brief &amp; Student Information
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '13px' }}>
              <div><strong>Student:</strong> {studentInfo?.studentName || 'Not entered'}</div>
              <div><strong>Class / Audience:</strong> {studentInfo?.classAudience || 'Not entered'}</div>
              <div><strong>Topic:</strong> {studentInfo?.topic || 'Not entered'}</div>
              <div><strong>AI Tool:</strong> {studentInfo?.aiToolUsed || 'Not entered'}</div>
              <div style={{ gridColumn: '1 / -1' }}><strong>Goal:</strong> {studentInfo?.learningGoal || 'Not entered'}</div>
            </div>
          </div>

          {/* Prompt Briefing Distinction Summary */}
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '14px', color: 'var(--accent-blue)', marginBottom: '8px' }}>
              2. Prompt Briefing Distinction
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', fontSize: '13px' }}>
              <div>
                <span className="badge badge-source" style={{ marginBottom: '6px' }}>SUPPORTED BY SOURCE</span>
                <p style={{ marginTop: '4px', color: 'var(--text-muted)' }}>
                  {briefing?.sourcePrompt?.supportedBySource || 'No source-supported points recorded yet.'}
                </p>
              </div>
              <div>
                <span className="badge badge-ai" style={{ marginBottom: '6px' }}>ADDITIONAL AI INFORMATION</span>
                <p style={{ marginTop: '4px', color: 'var(--text-muted)' }}>
                  {briefing?.sourcePrompt?.additionalAiInfo || 'No extra AI information recorded yet.'}
                </p>
              </div>
            </div>
          </div>

          {/* Options & Pedagogical Choice Summary */}
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '14px', color: 'var(--accent-purple)', marginBottom: '8px' }}>
              3. Pedagogical Options &amp; Decision
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              {options?.map((opt) => (
                <div key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge ${opt.status === 'selected' ? 'badge-accept' : opt.status === 'rejected' ? 'badge-reject' : 'badge-checking'}`}>
                    {opt.label}: {opt.status.toUpperCase()}
                  </span>
                  <span><strong>{opt.approachName || 'Unnamed'}:</strong> {opt.studentReason || 'No rationale recorded'}</span>
                </div>
              ))}
              {optionsDecisionNotes && (
                <p style={{ marginTop: '6px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Decision synthesis: {optionsDecisionNotes}
                </p>
              )}
            </div>
          </div>

          {/* Chapter Outline Summary */}
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '14px', color: 'var(--accent-emerald)', marginBottom: '8px' }}>
              4. Mini Textbook Chapter ({sections.filter((s) => s.explanation?.trim()).length}/10 Sections Filled)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', fontSize: '12px' }}>
              {sections.slice(0, 10).map((sec, i) => (
                <div key={sec.id || i} style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                  <strong>{sec.title || `Section ${i + 1}`}:</strong> {sec.explanation ? '✓ Written' : '○ Empty'}
                </div>
              ))}
            </div>
          </div>

          {/* Rubric & Fact Checks Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '14px', color: 'var(--accent-amber)', marginBottom: '8px' }}>
                5. Rubric Evaluation
              </h4>
              <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>Clarity: {rubric?.clarity?.score || 0}/10</div>
                <div>Accuracy: {rubric?.accuracy?.score || 0}/10</div>
                <div>Age-fit: {rubric?.ageFit?.score || 0}/10</div>
                <div>Usefulness for Revision: {rubric?.usefulnessForRevision?.score || 0}/10</div>
                <div style={{ marginTop: '6px', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                  Total: {['clarity', 'accuracy', 'ageFit', 'usefulnessForRevision'].reduce((acc, k) => acc + (Number(rubric?.[k]?.score) || 0), 0)} / 40
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '14px', color: 'var(--accent-rose)', marginBottom: '8px' }}>
                6. Fact Checking Summary
              </h4>
              <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>Accepted: {factChecks?.filter((f) => f.decision === 'Accept').length || 0}</div>
                <div>Rejected: {factChecks?.filter((f) => f.decision === 'Reject').length || 0}</div>
                <div>Modified: {factChecks?.filter((f) => f.decision === 'Modify').length || 0}</div>
                <div>Needs Checking: {factChecks?.filter((f) => f.decision === 'Needs checking').length || 0}</div>
                <div style={{ marginTop: '6px', fontWeight: '700', color: 'var(--text-main)' }}>
                  Total Checked Claims: {factChecks?.length || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Sources Table */}
      {activeSubTab === 'sources' && (
        <SourcesTable sources={sources || []} onChange={onSourcesChange} />
      )}

      {/* Sub-Tab 3: Prompt Log */}
      {activeSubTab === 'promptLog' && (
        <PromptLog promptLog={promptLog || []} onChange={onPromptLogChange} />
      )}

      {/* Sub-Tab 4: Reflection */}
      {activeSubTab === 'reflection' && (
        <Reflection reflection={reflection || {}} onChange={onReflectionChange} />
      )}
    </div>
  );
}
