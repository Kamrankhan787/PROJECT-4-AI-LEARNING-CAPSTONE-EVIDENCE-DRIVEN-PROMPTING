import React, { useState } from 'react';
import { PROMPT_TEMPLATES } from '../data/prompts';

export default function RubricScoring({
  topic,
  rubric,
  onChange,
  onLogPrompt
}) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const criteriaKeys = ['clarity', 'accuracy', 'ageFit', 'usefulnessForRevision'];

  const promptText = PROMPT_TEMPLATES.rubricPrompt.template({
    topic,
    draftExcerpt: 'Evaluate my draft textbook chapter across Clarity, Accuracy, Age-fit, and Revision Usefulness (1-10 with smallest useful edit).'
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleField = (key, field, value) => {
    onChange({
      ...rubric,
      [key]: {
        ...rubric[key],
        [field]: value
      }
    });
  };

  const totalScore = criteriaKeys.reduce((acc, key) => {
    return acc + (Number(rubric[key]?.score) || 0);
  }, 0);

  const averageScore = (totalScore / 4).toFixed(1);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h2>Step 5A — Rubric Scoring (Four Pedagogical Criteria)</h2>
          <p className="card-subtitle">
            Evaluate pedagogical quality on a 1–10 scale. Identify the single smallest useful edit for each dimension.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleCopy}
          >
            {copiedPrompt ? '✓ Copied!' : 'Copy Rubric Prompt'}
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() =>
              onLogPrompt({
                stage: '7. Rubric scoring',
                prompt: promptText,
                aiResponseNotes: `Scored ${totalScore}/40 across Clarity, Accuracy, Age-fit, Usefulness for revision`
              })
            }
          >
            Log Rubric Prompt
          </button>
        </div>
      </div>

      {/* Critical Pedagogical Disclaimer Required by Spec */}
      <div
        style={{
          background: 'rgba(245, 158, 11, 0.08)',
          borderLeft: '4px solid var(--accent-amber)',
          padding: '12px 16px',
          borderRadius: '4px',
          marginBottom: '20px',
          fontSize: '13px',
          color: '#fef3c7'
        }}
      >
        <strong>⚠️ Critical Requirement:</strong> A high numerical score (e.g. 10/10 in "Accuracy") does <em>not</em> constitute independent factual verification. Factual claims must be independently cross-examined in the Fact Checker below using authoritative named sources.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {criteriaKeys.map((key) => {
          const item = rubric[key] || { name: key, score: 0, explanation: '', smallestUsefulEdit: '' };
          const score = Number(item.score) || 0;

          return (
            <div
              key={key}
              style={{
                background: 'rgba(0, 0, 0, 0.25)',
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
                  marginBottom: '12px',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <div>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#fff' }}>
                    {item.name || key}
                  </span>
                  <span style={{ marginLeft: '10px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    Scale: 1 (Poor) to 10 (Mastery)
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label htmlFor={`score-${key}`} style={{ fontWeight: '700' }}>Score (1–10):</label>
                  <input
                    id={`score-${key}`}
                    type="number"
                    min="1"
                    max="10"
                    style={{ width: '70px', textAlign: 'center', fontWeight: '800', color: 'var(--accent-cyan)' }}
                    value={item.score || ''}
                    onChange={(e) => handleField(key, 'score', e.target.value)}
                  />
                  <span style={{ fontWeight: '700', color: 'var(--text-dim)' }}>/ 10</span>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor={`expl-${key}`}>Evaluative Explanation / Diagnostic Critique *</label>
                  <textarea
                    id={`expl-${key}`}
                    rows="2"
                    placeholder={`Why did you assign this score for ${item.name}? What worked well?`}
                    value={item.explanation || ''}
                    onChange={(e) => handleField(key, 'explanation', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`edit-${key}`} style={{ color: '#38bdf8' }}>Smallest Useful Edit *</label>
                  <textarea
                    id={`edit-${key}`}
                    rows="2"
                    placeholder="What is the single most targeted micro-edit to improve this dimension?"
                    value={item.smallestUsefulEdit || ''}
                    onChange={(e) => handleField(key, 'smallestUsefulEdit', e.target.value)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '16px',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>Overall Rubric Score:</span>
          <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent-blue)', marginLeft: '12px' }}>
            {totalScore} / 40
          </span>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '12px' }}>
            (Average: {averageScore} / 10)
          </span>
        </div>
      </div>
    </div>
  );
}
