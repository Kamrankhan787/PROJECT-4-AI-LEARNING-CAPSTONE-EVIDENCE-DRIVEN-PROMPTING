import React from 'react';

const SOURCE_TYPES = [
  'Textbook / Class Source',
  'Teacher Guidance',
  'Trusted Learning Source',
  'Web Source'
];

export default function SourcesTable({ sources, onChange }) {
  const handleField = (index, field, value) => {
    const updated = [...sources];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAddSource = () => {
    const newSource = {
      id: `source-${Date.now()}`,
      title: '',
      sourceType: 'Textbook / Class Source',
      authorOrg: '',
      url: '',
      notes: ''
    };
    onChange([...sources, newSource]);
  };

  const handleDeleteSource = (index) => {
    const updated = sources.filter((_, i) => i !== index);
    onChange(updated);
  };

  const namedCount = sources.filter(
    (s) => s.title?.trim() && (s.authorOrg?.trim() || s.notes?.trim() || s.url?.trim())
  ).length;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h3>Authoritative Sources (Minimum 2 Named Sources Required)</h3>
          <p className="card-subtitle">
            Catalog textbook chapters, teacher guidance, or trusted curriculum references used to direct and verify AI.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className={`badge ${namedCount >= 2 ? 'badge-accept' : 'badge-checking'}`}>
            {namedCount >= 2 ? `✓ ${namedCount} Named Sources` : `${namedCount}/2 Sources Recorded`}
          </span>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddSource}>
            + Add Source
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sources.map((src, idx) => (
          <div
            key={src.id || idx}
            style={{
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--accent-blue)' }}>
                Source #{idx + 1}
              </span>
              {sources.length > 2 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  style={{ padding: '2px 8px', fontSize: '11px' }}
                  onClick={() => handleDeleteSource(idx)}
                >
                  Delete
                </button>
              )}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Title / Chapter Reference *</label>
                <input
                  type="text"
                  placeholder="e.g. Campbell Biology Ch 55 Ecosystems"
                  value={src.title || ''}
                  onChange={(e) => handleField(idx, 'title', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Source Type *</label>
                <select
                  value={src.sourceType || 'Textbook / Class Source'}
                  onChange={(e) => handleField(idx, 'sourceType', e.target.value)}
                >
                  {SOURCE_TYPES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Author / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Pearson / NCERT / Teacher Name"
                  value={src.authorOrg || ''}
                  onChange={(e) => handleField(idx, 'authorOrg', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>URL / Reference Link</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={src.url || ''}
                  onChange={(e) => handleField(idx, 'url', e.target.value)}
                />
              </div>

              <div className="form-group full-width">
                <label>Verification Notes / Relevant Page Numbers</label>
                <input
                  type="text"
                  placeholder="e.g. Pages 1220–1225: Lindeman's 10% trophic efficiency calculations..."
                  value={src.notes || ''}
                  onChange={(e) => handleField(idx, 'notes', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
