import React from 'react';

const SUGGESTED_TOPICS = [
  'Food chains / energy flow',
  'Fractions / percentages',
  'Electric circuits',
  'Essay introduction',
  'Causes of the 1857 War of Independence'
];

export default function TopicBrief({ studentInfo, onChange, onNext }) {
  const handleChange = (field, value) => {
    onChange({
      ...studentInfo,
      [field]: value
    });
  };

  const handleSelectExample = (topic) => {
    handleChange('topic', topic);
  };

  const isComplete = Boolean(
    studentInfo.studentName?.trim() &&
    studentInfo.classAudience?.trim() &&
    studentInfo.topic?.trim() &&
    studentInfo.learningGoal?.trim() &&
    studentInfo.aiToolUsed?.trim()
  );

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h2>Step 1 — Topic Brief</h2>
          <p className="card-subtitle">
            Define your focused learning objective. Focus on a bite-sized concept rather than a massive domain.
          </p>
        </div>
        <span className={`badge ${isComplete ? 'badge-accept' : 'badge-checking'}`}>
          {isComplete ? '✓ Brief Complete' : 'Pending Details'}
        </span>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="student-name">Student Name *</label>
          <input
            id="student-name"
            type="text"
            placeholder="e.g. Alex Chen"
            value={studentInfo.studentName || ''}
            onChange={(e) => handleChange('studentName', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="class-audience">Class / Target Audience *</label>
          <input
            id="class-audience"
            type="text"
            placeholder="e.g. Grade 9 Biology / Introductory Science"
            value={studentInfo.classAudience || ''}
            onChange={(e) => handleChange('classAudience', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ai-tool">AI Tool Used *</label>
          <input
            id="ai-tool"
            type="text"
            placeholder="e.g. ChatGPT, Claude 3.5 Sonnet, Gemini"
            value={studentInfo.aiToolUsed || ''}
            onChange={(e) => handleChange('aiToolUsed', e.target.value)}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="topic-input">Focused Learning Topic *</label>
          <input
            id="topic-input"
            type="text"
            placeholder="e.g. Food chains / energy flow"
            value={studentInfo.topic || ''}
            onChange={(e) => handleChange('topic', e.target.value)}
          />

          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Curated Capstone Examples:</span>
            {SUGGESTED_TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11px', padding: '4px 10px' }}
                onClick={() => handleSelectExample(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="learning-goal">Specific Learning Goal *</label>
          <textarea
            id="learning-goal"
            rows="3"
            placeholder="e.g. Students must understand why only 10% of energy transfers between trophic levels and calculate energy loss across 4 trophic levels."
            value={studentInfo.learningGoal || ''}
            onChange={(e) => handleChange('learningGoal', e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onNext}
          disabled={!studentInfo.topic}
        >
          Continue to Step 2: Briefing →
        </button>
      </div>
    </div>
  );
}
