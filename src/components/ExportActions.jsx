import React, { useState } from 'react';

export default function ExportActions({ onDownloadMarkdown, onCopyMarkdown, onPrint, onClearProject }) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyMarkdown();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmClear = () => {
    onClearProject();
    setShowClearConfirm(false);
  };

  return (
    <div
      className="card export-actions-bar"
      style={{
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.3)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📤</span> Export &amp; Deliverable Actions
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Export your complete process notebook for submission, peer review, or archiving.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onDownloadMarkdown}
            title="Download the full evidence notebook as a .md file"
          >
            ⬇ Download Notebook (.md)
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCopy}
            title="Copy full markdown text to clipboard"
          >
            {copied ? '✓ Copied to Clipboard!' : '📋 Copy as Markdown'}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onPrint}
            title="Open browser print dialog to save as PDF"
          >
            🖨 Print / Save as PDF
          </button>

          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => setShowClearConfirm(true)}
            title="Reset and clear all saved project state"
          >
            🗑 Clear Project
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showClearConfirm && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <h3 style={{ fontSize: '18px', color: 'var(--accent-rose)', marginBottom: '10px' }}>
              Confirm Project Reset
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-main)', marginBottom: '20px', lineHeight: '1.5' }}>
              Are you sure you want to clear the entire capstone project? All entered prompts, chapter sections, rubric scores, sources, and reflections stored in your browser will be permanently deleted.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmClear}
              >
                Yes, Clear All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
