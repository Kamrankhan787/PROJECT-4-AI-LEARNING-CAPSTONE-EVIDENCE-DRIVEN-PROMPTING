import React, { useState } from 'react';
import { PROMPT_TEMPLATES } from '../data/prompts';

export default function BriefingStep({ topic, studentInfo, briefing, onChange, onLogPrompt, onNext }) {
  const [copiedStage, setCopiedStage] = useState(null);

  const copyToClipboard = (text, stageKey) => {
    navigator.clipboard.writeText(text);
    setCopiedStage(stageKey);
    setTimeout(() => setCopiedStage(null), 2500);
  };

  // Stage 1 Weak prompt
  const weakPromptText = PROMPT_TEMPLATES.weakPrompt.template(topic);

  // Stage 2 Context prompt
  const contextPromptText = PROMPT_TEMPLATES.contextPrompt.template({
    topic,
    audience: briefing.contextPrompt?.audience || studentInfo.classAudience,
    learnerLevel: briefing.contextPrompt?.learnerLevel || 'Beginner to Intermediate',
    learningGoal: briefing.contextPrompt?.learningGoal || studentInfo.learningGoal,
    requirements: briefing.contextPrompt?.requirements
  });

  // Stage 3 Source prompt
  const sourcePromptText = PROMPT_TEMPLATES.sourcePrompt.template({
    topic,
    sourceNotes: briefing.sourcePrompt?.sourceNotes
  });

  const handleContextChange = (field, val) => {
    onChange({
      ...briefing,
      contextPrompt: {
        ...briefing.contextPrompt,
        [field]: val,
        assembledPrompt: contextPromptText
      }
    });
  };

  const handleSourceChange = (field, val) => {
    onChange({
      ...briefing,
      sourcePrompt: {
        ...briefing.sourcePrompt,
        [field]: val,
        assembledPrompt: sourcePromptText
      }
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h2>Step 2 — Prompt Briefing (Three Stages)</h2>
          <p className="card-subtitle">
            Progress from a weak default prompt to a context-rich prompt, then bind AI to source material.
          </p>
        </div>
        <span className="badge badge-source">External AI Workspace</span>
      </div>

      {/* Stage 1: Weak Prompt */}
      <div style={{ marginBottom: '28px', borderLeft: '3px solid var(--accent-amber)', paddingLeft: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '16px', color: '#f59e0b' }}>Stage 1 — Weak Prompt</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Start with an uncalibrated command to observe default AI responses.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => copyToClipboard(weakPromptText, 'weak')}
            >
              {copiedStage === 'weak' ? '✓ Copied!' : 'Copy Weak Prompt'}
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onLogPrompt({
                stage: '1. Weak prompt',
                prompt: weakPromptText,
                aiResponseNotes: briefing.weakPromptOutput || ''
              })}
            >
              Log to History
            </button>
          </div>
        </div>

        <div className="prompt-box">
          <div className="prompt-code">{weakPromptText}</div>
        </div>

        <div className="form-group" style={{ marginTop: '10px' }}>
          <label htmlFor="weak-output">AI Response / Your Observations:</label>
          <textarea
            id="weak-output"
            rows="3"
            placeholder="Paste or summarize the AI's response here to document what was missing or overly generic..."
            value={briefing.weakPromptOutput || ''}
            onChange={(e) => onChange({ ...briefing, weakPromptOutput: e.target.value })}
          />
        </div>
      </div>

      {/* Stage 2: Context Prompt */}
      <div style={{ marginBottom: '28px', borderLeft: '3px solid var(--accent-blue)', paddingLeft: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '16px', color: '#60a5fa' }}>Stage 2 — Context Prompt</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Add target class level, pedagogical constraints, and specific goals.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => copyToClipboard(contextPromptText, 'context')}
            >
              {copiedStage === 'context' ? '✓ Copied!' : 'Copy Context Prompt'}
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onLogPrompt({
                stage: '2. Context prompt',
                prompt: contextPromptText,
                aiResponseNotes: briefing.contextPrompt?.output || ''
              })}
            >
              Log to History
            </button>
          </div>
        </div>

        <div className="form-grid" style={{ marginTop: '12px' }}>
          <div className="form-group">
            <label htmlFor="ctx-audience">Target Class / Audience</label>
            <input
              id="ctx-audience"
              type="text"
              placeholder={studentInfo.classAudience || 'e.g. Grade 9'}
              value={briefing.contextPrompt?.audience || ''}
              onChange={(e) => handleContextChange('audience', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ctx-level">Learner Level</label>
            <input
              id="ctx-level"
              type="text"
              placeholder="e.g. Introductory / No prior calculus"
              value={briefing.contextPrompt?.learnerLevel || ''}
              onChange={(e) => handleContextChange('learnerLevel', e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="ctx-reqs">Explanation Requirements &amp; Pedagogy</label>
            <input
              id="ctx-reqs"
              type="text"
              placeholder="e.g. Use everyday analogies, highlight common errors, limit jargon"
              value={briefing.contextPrompt?.requirements || ''}
              onChange={(e) => handleContextChange('requirements', e.target.value)}
            />
          </div>
        </div>

        <div className="prompt-box">
          <div className="prompt-code">{contextPromptText}</div>
        </div>

        <div className="form-group" style={{ marginTop: '10px' }}>
          <label htmlFor="ctx-output">AI Context Response / Observations:</label>
          <textarea
            id="ctx-output"
            rows="3"
            placeholder="Paste or summarize how the response improved after adding context..."
            value={briefing.contextPrompt?.output || ''}
            onChange={(e) => handleContextChange('output', e.target.value)}
          />
        </div>
      </div>

      {/* Stage 3: Source Prompt */}
      <div style={{ marginBottom: '16px', borderLeft: '3px solid var(--accent-purple)', paddingLeft: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '16px', color: '#c084fc' }}>Stage 3 — Optional Source Prompt</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Supply textbook or teacher notes and enforce evidence-backed labeling.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => copyToClipboard(sourcePromptText, 'source')}
            >
              {copiedStage === 'source' ? '✓ Copied!' : 'Copy Source Prompt'}
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onLogPrompt({
                stage: '3. Source prompt',
                prompt: sourcePromptText,
                aiResponseNotes: `Supported: ${briefing.sourcePrompt?.supportedBySource || 'None'} | Extra: ${briefing.sourcePrompt?.additionalAiInfo || 'None'}`
              })}
            >
              Log to History
            </button>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '12px' }}>
          <label htmlFor="source-notes">Source Notes / Textbook Text Provided to AI:</label>
          <textarea
            id="source-notes"
            rows="3"
            placeholder="Paste excerpts from textbook, syllabus, or teacher notes..."
            value={briefing.sourcePrompt?.sourceNotes || ''}
            onChange={(e) => handleSourceChange('sourceNotes', e.target.value)}
          />
        </div>

        <div className="prompt-box">
          <div className="prompt-code">{sourcePromptText}</div>
        </div>

        {/* Clear Evidence Distinction Requirements */}
        <div className="form-grid" style={{ marginTop: '16px' }}>
          <div className="form-group">
            <label htmlFor="supported-source" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge badge-source">SUPPORTED BY PROVIDED SOURCE</span>
            </label>
            <textarea
              id="supported-source"
              rows="3"
              placeholder="Record points in the AI response that directly align with your provided text..."
              value={briefing.sourcePrompt?.supportedBySource || ''}
              onChange={(e) => handleSourceChange('supportedBySource', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="additional-ai" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge badge-ai">ADDITIONAL AI INFORMATION</span>
            </label>
            <textarea
              id="additional-ai"
              rows="3"
              placeholder="Record points in the AI response NOT in your text (do not pretend it was in source!)..."
              value={briefing.sourcePrompt?.additionalAiInfo || ''}
              onChange={(e) => handleSourceChange('additionalAiInfo', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-primary" onClick={onNext}>
          Continue to Step 3: Options →
        </button>
      </div>
    </div>
  );
}
