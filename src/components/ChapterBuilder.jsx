import React, { useState } from 'react';
import { PROMPT_TEMPLATES } from '../data/prompts';

export default function ChapterBuilder({
  topic,
  chapter,
  onChange,
  onLogPrompt,
  onNext
}) {
  const [activeTab, setActiveTab] = useState('sections');
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [copiedDraftPrompt, setCopiedDraftPrompt] = useState(false);

  const sections = chapter.sections || [];
  const flashcards = chapter.flashcards || [];
  const quiz = chapter.quiz || [];
  const revisionPlan = chapter.revisionPlan || [];

  const draftPromptText = PROMPT_TEMPLATES.chapterDraftPrompt.template({
    topic,
    outlineNotes: 'Ensure all 10 sections include simple language, real-world examples, common pitfalls, and revision summaries.'
  });

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(draftPromptText);
    setCopiedDraftPrompt(true);
    setTimeout(() => setCopiedDraftPrompt(false), 2000);
  };

  const handleSectionField = (index, field, value) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...chapter, sections: updated });
  };

  const handleFlashcardField = (index, field, value) => {
    const updated = [...flashcards];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...chapter, flashcards: updated });
  };

  const handleAddFlashcard = () => {
    const newCard = { id: `fc-${Date.now()}`, question: '', answer: '' };
    onChange({ ...chapter, flashcards: [...flashcards, newCard] });
  };

  const handleDeleteFlashcard = (index) => {
    const updated = flashcards.filter((_, i) => i !== index);
    onChange({ ...chapter, flashcards: updated });
  };

  const handleQuizQuestionField = (index, field, value) => {
    const updated = [...quiz];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...chapter, quiz: updated });
  };

  const handleQuizOption = (quizIndex, optIndex, value) => {
    const updated = [...quiz];
    const opts = [...(updated[quizIndex].options || ['', '', '', ''])];
    opts[optIndex] = value;
    updated[quizIndex] = { ...updated[quizIndex], options: opts };
    onChange({ ...chapter, quiz: updated });
  };

  const handleAddQuiz = () => {
    const newQ = {
      id: `quiz-${Date.now()}`,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    };
    onChange({ ...chapter, quiz: [...quiz, newQ] });
  };

  const handleDeleteQuiz = (index) => {
    const updated = quiz.filter((_, i) => i !== index);
    onChange({ ...chapter, quiz: updated });
  };

  const handleRevisionPlanField = (index, field, value) => {
    const updated = [...revisionPlan];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...chapter, revisionPlan: updated });
  };

  const currentSection = sections[activeSectionIndex] || sections[0] || {};

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h2>Step 4 — Mini Textbook Chapter Builder</h2>
          <p className="card-subtitle">
            Configure all ten sections (Section 1 through Section 10) plus supporting active-recall materials.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleCopyPrompt}
          >
            {copiedDraftPrompt ? '✓ Copied!' : 'Copy Drafting Prompt'}
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() =>
              onLogPrompt({
                stage: '6. Think-hard draft',
                prompt: draftPromptText,
                aiResponseNotes: `Drafted 10 sections with supporting material for ${topic}`
              })
            }
          >
            Log Draft Prompt
          </button>
        </div>
      </div>

      {/* Top Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '20px' }}>
        <button
          type="button"
          className={`pill-btn ${activeTab === 'sections' ? 'active' : ''}`}
          onClick={() => setActiveTab('sections')}
        >
          📖 Ten Chapter Sections ({sections.filter((s) => s.explanation?.trim()).length}/10)
        </button>
        <button
          type="button"
          className={`pill-btn ${activeTab === 'flashcards' ? 'active' : ''}`}
          onClick={() => setActiveTab('flashcards')}
        >
          🗂 Flashcards ({flashcards.length})
        </button>
        <button
          type="button"
          className={`pill-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          ❓ Practice Quiz ({quiz.length})
        </button>
        <button
          type="button"
          className={`pill-btn ${activeTab === 'revision' ? 'active' : ''}`}
          onClick={() => setActiveTab('revision')}
        >
          📅 7-Day Revision Plan
        </button>
      </div>

      {/* TAB 1: TEN CONFIGURABLE SECTIONS */}
      {activeTab === 'sections' && (
        <div>
          {/* Section Selector Pills */}
          <div className="section-nav-pills">
            {sections.slice(0, 10).map((sec, idx) => {
              const hasContent = Boolean(sec.explanation?.trim() && sec.title?.trim());
              return (
                <button
                  key={sec.id || idx}
                  type="button"
                  className={`pill-btn ${activeSectionIndex === idx ? 'active' : ''} ${hasContent ? 'completed' : ''}`}
                  onClick={() => setActiveSectionIndex(idx)}
                >
                  {hasContent ? '✓ ' : ''}
                  {sec.title || `Section ${idx + 1}`}
                </button>
              );
            })}
          </div>

          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="sec-title" style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                Section Title (Configurable — e.g. "Section {activeSectionIndex + 1}: [Your Topic Title]")
              </label>
              <input
                id="sec-title"
                type="text"
                value={currentSection.title || ''}
                onChange={(e) => handleSectionField(activeSectionIndex, 'title', e.target.value)}
                placeholder={`Section ${activeSectionIndex + 1}: Title`}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="sec-explanation">Core Conceptual Explanation (Simple, accessible language) *</label>
              <textarea
                id="sec-explanation"
                rows="5"
                placeholder="Enter clear, accessible conceptual explanation for this section..."
                value={currentSection.explanation || ''}
                onChange={(e) => handleSectionField(activeSectionIndex, 'explanation', e.target.value)}
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="sec-examples">Real-World Examples &amp; Analogies</label>
                <textarea
                  id="sec-examples"
                  rows="3"
                  placeholder="Concrete examples illustrating the concept..."
                  value={currentSection.examples || ''}
                  onChange={(e) => handleSectionField(activeSectionIndex, 'examples', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sec-pitfalls" style={{ color: '#fb7185' }}>Common Student Mistakes &amp; Pitfalls</label>
                <textarea
                  id="sec-pitfalls"
                  rows="3"
                  placeholder="Misconceptions to avoid..."
                  value={currentSection.commonMistakes || ''}
                  onChange={(e) => handleSectionField(activeSectionIndex, 'commonMistakes', e.target.value)}
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="sec-notes" style={{ color: '#38bdf8' }}>Revision Notes &amp; Key Takeaways</label>
                <textarea
                  id="sec-notes"
                  rows="2"
                  placeholder="Bite-sized revision bullet points..."
                  value={currentSection.revisionNotes || ''}
                  onChange={(e) => handleSectionField(activeSectionIndex, 'revisionNotes', e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                disabled={activeSectionIndex === 0}
                onClick={() => setActiveSectionIndex(activeSectionIndex - 1)}
              >
                ← Previous Section
              </button>
              <span style={{ fontSize: '13px', color: 'var(--text-dim)', alignSelf: 'center' }}>
                Section {activeSectionIndex + 1} of 10
              </span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                disabled={activeSectionIndex === 9}
                onClick={() => setActiveSectionIndex(activeSectionIndex + 1)}
              >
                Next Section →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Active-recall prompt &amp; answer pairs for student revision.
            </p>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddFlashcard}>
              + Add Flashcard
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {flashcards.map((fc, idx) => (
              <div
                key={fc.id || idx}
                style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--accent-blue)' }}>
                    Flashcard #{idx + 1}
                  </span>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    style={{ padding: '2px 8px', fontSize: '11px' }}
                    onClick={() => handleDeleteFlashcard(idx)}
                  >
                    Delete
                  </button>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Question (Front of card)</label>
                    <input
                      type="text"
                      placeholder="e.g. What is the 10% rule in trophic dynamics?"
                      value={fc.question || ''}
                      onChange={(e) => handleFlashcardField(idx, 'question', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Answer (Back of card)</label>
                    <input
                      type="text"
                      placeholder="e.g. Only ~10% of energy transfers between successive trophic levels..."
                      value={fc.answer || ''}
                      onChange={(e) => handleFlashcardField(idx, 'answer', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: QUIZ */}
      {activeTab === 'quiz' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Self-assessment quiz questions with multiple choices, correct key, and explanation.
            </p>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddQuiz}>
              + Add Quiz Question
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {quiz.map((q, idx) => (
              <div
                key={q.id || idx}
                style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--accent-purple)' }}>
                    Quiz Question #{idx + 1}
                  </span>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    style={{ padding: '2px 8px', fontSize: '11px' }}
                    onClick={() => handleDeleteQuiz(idx)}
                  >
                    Delete
                  </button>
                </div>

                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label>Question Prompt</label>
                  <input
                    type="text"
                    placeholder="Enter question..."
                    value={q.question || ''}
                    onChange={(e) => handleQuizQuestionField(idx, 'question', e.target.value)}
                  />
                </div>

                <div className="form-grid" style={{ marginBottom: '12px' }}>
                  {[0, 1, 2, 3].map((optIdx) => (
                    <div key={optIdx} className="form-group">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input
                          type="radio"
                          name={`quiz-correct-${idx}`}
                          checked={Number(q.correctAnswer) === optIdx}
                          onChange={() => handleQuizQuestionField(idx, 'correctAnswer', optIdx)}
                        />
                        Option {String.fromCharCode(65 + optIdx)} {Number(q.correctAnswer) === optIdx ? '(Correct Answer)' : ''}
                      </label>
                      <input
                        type="text"
                        placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                        value={q.options?.[optIdx] || ''}
                        onChange={(e) => handleQuizOption(idx, optIdx, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div className="form-group">
                  <label>Diagnostic Explanation</label>
                  <input
                    type="text"
                    placeholder="Explain why the correct answer is correct and others are distractors..."
                    value={q.explanation || ''}
                    onChange={(e) => handleQuizQuestionField(idx, 'explanation', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: 7-DAY REVISION PLAN */}
      {activeTab === 'revision' && (
        <div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Structured spaced-repetition plan from Day 1 to Day 7 for mastering the chapter.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {revisionPlan.map((dayItem, idx) => (
              <div
                key={dayItem.day || idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '90px 200px 1fr',
                  gap: '12px',
                  alignItems: 'center',
                  background: 'rgba(0,0,0,0.2)',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <span style={{ fontWeight: '800', color: 'var(--accent-blue)', fontSize: '13px' }}>
                  Day {dayItem.day}
                </span>

                <input
                  type="text"
                  placeholder="Focus / Topic"
                  value={dayItem.focus || ''}
                  onChange={(e) => handleRevisionPlanField(idx, 'focus', e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Scheduled learning activity & active recall tasks..."
                  value={dayItem.activity || ''}
                  onChange={(e) => handleRevisionPlanField(idx, 'activity', e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-primary" onClick={onNext}>
          Continue to Step 5: Review &amp; Verification →
        </button>
      </div>
    </div>
  );
}
