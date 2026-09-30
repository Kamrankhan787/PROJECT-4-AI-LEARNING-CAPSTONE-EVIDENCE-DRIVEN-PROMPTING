import React from 'react';

export default function Reflection({ reflection, onChange }) {
  const isObject = typeof reflection === 'object' && reflection !== null;

  const mainText = isObject ? reflection.text || '' : reflection || '';
  const learnings = isObject ? reflection.learnings || '' : '';
  const modifications = isObject ? reflection.modifications || '' : '';
  const promptingInsights = isObject ? reflection.promptingInsights || '' : '';
  const checkedClaimsSummary = isObject ? reflection.checkedClaimsSummary || '' : '';
  const futureImprovements = isObject ? reflection.futureImprovements || '' : '';

  // Calculate live word count across all reflection inputs
  const combinedText = [
    mainText,
    learnings,
    modifications,
    promptingInsights,
    checkedClaimsSummary,
    futureImprovements
  ].join(' ').trim();

  const wordCount = combinedText ? combinedText.split(/\s+/).filter(Boolean).length : 0;
  const isSufficient = wordCount >= 50;

  const handleField = (field, val) => {
    if (isObject) {
      onChange({ ...reflection, [field]: val });
    } else {
      onChange({ text: val });
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h3>Student Learning Reflection</h3>
          <p className="card-subtitle">
            Synthesize what you learned about the subject matter and the meta-process of directing, questioning, and verifying AI.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className={`badge ${isSufficient ? 'badge-accept' : 'badge-checking'}`}>
            Word Count: {wordCount} {isSufficient ? '(✓ Met minimum 50 words)' : '(Minimum 50 words)'}
          </span>
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '16px' }}>
        <label htmlFor="ref-main">Comprehensive Reflection Essay *</label>
        <textarea
          id="ref-main"
          rows="5"
          placeholder="Reflect on your complete capstone experience: from weak prompting to evidence verification..."
          value={mainText}
          onChange={(e) => handleField('text', e.target.value)}
        />
      </div>

      {/* Guided Reflection Prompts Required by Spec */}
      <h4 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
        Guided Reflection Prompts:
      </h4>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="ref-learnings">1. What did I learn about the topic?</label>
          <textarea
            id="ref-learnings"
            rows="2"
            placeholder="Key conceptual breakthroughs in your understanding..."
            value={learnings}
            onChange={(e) => handleField('learnings', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ref-modifications">2. What did I change in the AI output?</label>
          <textarea
            id="ref-modifications"
            rows="2"
            placeholder="Corrections made to errors, confusing explanations, or incorrect facts..."
            value={modifications}
            onChange={(e) => handleField('modifications', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ref-insights">3. Which prompting approach worked better?</label>
          <textarea
            id="ref-insights"
            rows="2"
            placeholder="Comparing weak prompt vs context prompt vs 3-options synthesis..."
            value={promptingInsights}
            onChange={(e) => handleField('promptingInsights', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ref-claims">4. Which claims did I check?</label>
          <textarea
            id="ref-claims"
            rows="2"
            placeholder="Summary of critical claims verified or refuted against named sources..."
            value={checkedClaimsSummary}
            onChange={(e) => handleField('checkedClaimsSummary', e.target.value)}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="ref-improvements">5. What would I improve next time?</label>
          <textarea
            id="ref-improvements"
            rows="2"
            placeholder="Next steps for your AI-assisted learning workflow..."
            value={futureImprovements}
            onChange={(e) => handleField('futureImprovements', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
