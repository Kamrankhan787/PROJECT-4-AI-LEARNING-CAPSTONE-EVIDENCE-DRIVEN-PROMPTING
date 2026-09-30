import React, { useState } from 'react';
import { PROMPT_TEMPLATES } from '../data/prompts';

const DECISIONS = ['Accept', 'Reject', 'Modify', 'Needs checking'];

export default function FactChecker({
  topic,
  factChecks,
  onChange,
  onLogPrompt,
  onNext
}) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const promptText = PROMPT_TEMPLATES.verificationPrompt.template({
    topic,
    chapterText: 'Extract 6 to 10 specific, falsifiable empirical statements from the chapter for independent verification.'
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleField = (index, field, value) => {
    const updated = [...factChecks];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAddClaim = () => {
    const newClaim = {
      id: `fact-${Date.now()}`,
      aiStatement: '',
      decision: 'Needs checking',
      evidenceOrReason: '',
      correction: ''
    };
    onChange([...factChecks, newClaim]);
  };

  const handleDeleteClaim = (index) => {
    const updated = factChecks.filter((_, i) => i !== index);
    onChange(updated);
  };

  const validCheckedCount = factChecks.filter(
    (fc) => fc.aiStatement?.trim() && fc.evidenceOrReason?.trim()
  ).length;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h2>Step 5B — Fact Checker (Evidence-Driven Verification)</h2>
          <p className="card-subtitle">
            Cross-examine 6–10 important factual statements extracted from the AI chapter against named sources.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleCopy}
          >
            {copiedPrompt ? '✓ Copied!' : 'Copy Verification Prompt'}
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() =>
              onLogPrompt({
                stage: '8. Verification',
                prompt: promptText,
                aiResponseNotes: `Extracted and fact-checked ${factChecks.length} factual statements`
              })
            }
          >
            Log Verification Prompt
          </button>
        </div>
      </div>

      {/* Critical Verification Warning */}
      <div
        style={{
          background: 'rgba(239, 68, 68, 0.08)',
          borderLeft: '4px solid var(--accent-rose)',
          padding: '12px 16px',
          borderRadius: '4px',
          marginBottom: '20px',
          fontSize: '13px',
          color: '#fecdd3'
        }}
      >
        <strong>🛡️ No Fake Verification Rule:</strong> AI claims are never assumed true. Any claim without explicit verification evidence from a named source remains strictly labeled <strong>"Needs checking"</strong>. Never mark unsupported claims as verified.
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Target: <strong>6–10 claims</strong> | Currently Checked with Evidence: <strong>{validCheckedCount}</strong>
        </span>
        <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddClaim}>
          + Add Factual Claim
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {factChecks.map((claim, idx) => {
          const decision = claim.decision || 'Needs checking';
          let badgeClass = 'badge-checking';
          if (decision === 'Accept') badgeClass = 'badge-accept';
          if (decision === 'Reject') badgeClass = 'badge-reject';
          if (decision === 'Modify') badgeClass = 'badge-modify';

          return (
            <div
              key={claim.id || idx}
              style={{
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontWeight: '800', color: 'var(--accent-blue)', fontSize: '13px' }}>
                    Claim #{idx + 1}
                  </span>
                  <span className={`badge ${badgeClass}`}>{decision}</span>
                </div>

                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  style={{ padding: '2px 8px', fontSize: '11px' }}
                  onClick={() => handleDeleteClaim(idx)}
                >
                  Delete
                </button>
              </div>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor={`claim-stmt-${idx}`}>AI Statement (Verbatim or Paraphrased Claim) *</label>
                  <input
                    id={`claim-stmt-${idx}`}
                    type="text"
                    placeholder="e.g. Energy transfer efficiency between trophic levels averages roughly 10%."
                    value={claim.aiStatement || ''}
                    onChange={(e) => handleField(idx, 'aiStatement', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`claim-dec-${idx}`}>Verification Decision *</label>
                  <select
                    id={`claim-dec-${idx}`}
                    value={claim.decision || 'Needs checking'}
                    onChange={(e) => handleField(idx, 'decision', e.target.value)}
                  >
                    {DECISIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor={`claim-corr-${idx}`}>Correction / Modification (If rejected or modified)</label>
                  <input
                    id={`claim-corr-${idx}`}
                    type="text"
                    placeholder="e.g. Only matter cycles; energy dissipates as heat..."
                    value={claim.correction || ''}
                    onChange={(e) => handleField(idx, 'correction', e.target.value)}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor={`claim-ev-${idx}`}>Evidence / Authoritative Source Reason *</label>
                  <textarea
                    id={`claim-ev-${idx}`}
                    rows="2"
                    placeholder="Cite your named textbook/syllabus source, chapter, or empirical reason supporting this decision..."
                    value={claim.evidenceOrReason || ''}
                    onChange={(e) => handleField(idx, 'evidenceOrReason', e.target.value)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {onNext && (
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-primary" onClick={onNext}>
            Continue to Step 6: Process Notebook &amp; Sources →
          </button>
        </div>
      )}
    </div>
  );
}
