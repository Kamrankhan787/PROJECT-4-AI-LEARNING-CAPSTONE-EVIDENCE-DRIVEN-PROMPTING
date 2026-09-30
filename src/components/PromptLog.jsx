import React from 'react';

const STAGES = [
  '1. Weak prompt',
  '2. Context prompt',
  '3. Source prompt',
  '4. Options',
  '5. Feedback',
  '6. Think-hard draft',
  '7. Rubric scoring',
  '8. Verification'
];

export default function PromptLog({ promptLog, onChange }) {
  const handleField = (index, field, value) => {
    const updated = [...promptLog];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAddEntry = () => {
    const newEntry = {
      id: `log-${Date.now()}`,
      stage: STAGES[promptLog.length % STAGES.length] || 'Additional Prompt',
      prompt: '',
      aiResponseNotes: '',
      studentComments: '',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    onChange([...promptLog, newEntry]);
  };

  const handleDeleteEntry = (index) => {
    const updated = promptLog.filter((_, i) => i !== index);
    onChange(updated);
  };

  const validCount = promptLog.filter((p) => p.prompt?.trim()).length;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h3>Prompt History Log (Minimum 8 Prompts Required)</h3>
          <p className="card-subtitle">
            Document each interaction stage used to direct, question, compare, and correct AI.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className={`badge ${validCount >= 8 ? 'badge-accept' : 'badge-checking'}`}>
            {validCount >= 8 ? `✓ ${validCount} Prompts Logged` : `${validCount}/8 Prompts Logged`}
          </span>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddEntry}>
            + Add Prompt Log Entry
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {promptLog.map((entry, idx) => (
          <div
            key={entry.id || idx}
            style={{
              background: 'rgba(0,0,0,0.25)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--accent-cyan)' }}>
                  Entry #{idx + 1}
                </span>
                <select
                  value={entry.stage || STAGES[0]}
                  style={{ width: 'auto', padding: '4px 8px', fontSize: '12px' }}
                  onChange={(e) => handleField(idx, 'stage', e.target.value)}
                >
                  {STAGES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                  <option value="Additional Iteration">Additional Iteration</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Date / Time"
                  style={{ width: '150px', padding: '4px 8px', fontSize: '11px', textAlign: 'center' }}
                  value={entry.timestamp || ''}
                  onChange={(e) => handleField(idx, 'timestamp', e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  style={{ padding: '2px 8px', fontSize: '11px' }}
                  onClick={() => handleDeleteEntry(idx)}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '10px' }}>
              <label>Prompt Sent to AI *</label>
              <textarea
                rows="2"
                placeholder="Exact text or template sent to external AI..."
                value={entry.prompt || ''}
                onChange={(e) => handleField(idx, 'prompt', e.target.value)}
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>AI Response / Summary Notes</label>
                <textarea
                  rows="2"
                  placeholder="Key outputs, tone, structure, or flaws produced by the model..."
                  value={entry.aiResponseNotes || ''}
                  onChange={(e) => handleField(idx, 'aiResponseNotes', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Student's Critical Comments &amp; Next Action</label>
                <textarea
                  rows="2"
                  placeholder="What did you learn? What needed correcting or refocusing?"
                  value={entry.studentComments || ''}
                  onChange={(e) => handleField(idx, 'studentComments', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
