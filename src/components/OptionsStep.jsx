import React, { useState } from 'react';
import { PROMPT_TEMPLATES } from '../data/prompts';

export default function OptionsStep({
  topic,
  studentInfo,
  options,
  optionsDecisionNotes,
  onOptionsChange,
  onNotesChange,
  onLogPrompt,
  onNext
}) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const promptText = PROMPT_TEMPLATES.optionsPrompt.template({
    topic,
    audience: studentInfo.classAudience,
    learningGoal: studentInfo.learningGoal
  });

  const feedbackPromptText = PROMPT_TEMPLATES.feedbackPrompt.template({
    topic,
    selectedOption: options.find((o) => o.status === 'selected')?.label || 'Option 1',
    rejectedOptions: options
      .filter((o) => o.status === 'rejected')
      .map((o) => o.label)
      .join(', ') || 'other options',
    studentFeedback: optionsDecisionNotes
  });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleOptionField = (index, field, value) => {
    const updated = [...options];
    updated[index] = { ...updated[index], [field]: value };
    onOptionsChange(updated);
  };

  const handleSelectOption = (selectedIndex) => {
    const updated = options.map((opt, i) => ({
      ...opt,
      status: i === selectedIndex ? 'selected' : 'rejected'
    }));
    onOptionsChange(updated);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h2>Step 3 — Options &amp; Feedback: Pedagogical Comparison</h2>
          <p className="card-subtitle">
            Request 3 distinct ways to explain your topic from AI. Select one, reject the others with evidence-based reasons, and synthesize your preferred outline.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => handleCopy(promptText)}
          >
            {copiedPrompt ? '✓ Copied!' : 'Copy 3-Options Prompt'}
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() =>
              onLogPrompt({
                stage: '4. Options',
                prompt: promptText,
                aiResponseNotes: options.map((o) => `${o.label}: ${o.approachName || 'Approach'}`).join(' | ')
              })
            }
          >
            Log to History
          </button>
        </div>
      </div>

      <div className="prompt-box">
        <div className="prompt-box-header">
          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent-cyan)' }}>
            AI PROMPT TEMPLATE (COPY TO CHATGPT/CLAUDE/GEMINI):
          </span>
        </div>
        <div className="prompt-code">{promptText}</div>
      </div>

      <div className="options-grid">
        {options.map((opt, idx) => {
          const isSelected = opt.status === 'selected';
          const isRejected = opt.status === 'rejected';

          return (
            <div
              key={opt.id}
              className={`option-card ${isSelected ? 'selected' : ''} ${isRejected ? 'rejected' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '800', letterSpacing: '0.05em', color: isSelected ? 'var(--accent-emerald)' : '#fff' }}>
                  {opt.label.toUpperCase()}
                </span>
                <span
                  className={`badge ${
                    isSelected ? 'badge-accept' : isRejected ? 'badge-reject' : 'badge-checking'
                  }`}
                >
                  {isSelected ? '✓ SELECTED' : isRejected ? '✗ REJECTED' : 'PENDING'}
                </span>
              </div>

              <div className="form-group">
                <label>Approach Name / Pedagogical Style</label>
                <input
                  type="text"
                  placeholder="e.g. Narrative Storyline / Thermodynamic Math / Inquiry"
                  value={opt.approachName || ''}
                  onChange={(e) => handleOptionField(idx, 'approachName', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Explanation Summary</label>
                <textarea
                  rows="3"
                  placeholder="How does this option explain the concept?"
                  value={opt.explanation || ''}
                  onChange={(e) => handleOptionField(idx, 'explanation', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label style={{ color: '#34d399' }}>Strengths</label>
                <textarea
                  rows="2"
                  placeholder="What makes this approach pedagogically effective?"
                  value={opt.strengths || ''}
                  onChange={(e) => handleOptionField(idx, 'strengths', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label style={{ color: '#fb7185' }}>Weaknesses / Pitfalls</label>
                <textarea
                  rows="2"
                  placeholder="Where does this approach fall short or confuse learners?"
                  value={opt.weaknesses || ''}
                  onChange={(e) => handleOptionField(idx, 'weaknesses', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Student's Decision &amp; Rationale *</label>
                <textarea
                  rows="2"
                  placeholder={
                    isSelected
                      ? 'Why did you select this approach for your chapter?'
                      : 'Why did you reject this approach?'
                  }
                  value={opt.studentReason || ''}
                  onChange={(e) => handleOptionField(idx, 'studentReason', e.target.value)}
                />
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                <button
                  type="button"
                  className={`btn ${isSelected ? 'btn-success' : 'btn-secondary'} btn-sm`}
                  style={{ width: '100%' }}
                  onClick={() => handleSelectOption(idx)}
                >
                  {isSelected ? '✓ Selected as Preferred Approach' : `Select ${opt.label} & Reject Others`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decision Summary & Synthesis Outline */}
      <div style={{ marginTop: '28px', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '15px', color: '#fff' }}>Decision Summary &amp; Revised Outline Feedback</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Synthesize your chosen pedagogical model before building your chapter.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleCopy(feedbackPromptText)}
            >
              Copy Feedback Prompt
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() =>
                onLogPrompt({
                  stage: '5. Feedback',
                  prompt: feedbackPromptText,
                  aiResponseNotes: optionsDecisionNotes || ''
                })
              }
            >
              Log Feedback Prompt
            </button>
          </div>
        </div>

        <textarea
          rows="4"
          placeholder="Record your combined outline strategy (e.g. Taking Option 1's narrative journey and infusing Option 3's misconception alerts)..."
          value={optionsDecisionNotes || ''}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-primary" onClick={onNext}>
          Continue to Step 4: Chapter Builder →
        </button>
      </div>
    </div>
  );
}
