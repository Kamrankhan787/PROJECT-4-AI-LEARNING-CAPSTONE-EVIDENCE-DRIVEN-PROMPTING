import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProgressTracker from './components/ProgressTracker';
import TopicBrief from './components/TopicBrief';
import BriefingStep from './components/BriefingStep';
import OptionsStep from './components/OptionsStep';
import ChapterBuilder from './components/ChapterBuilder';
import RubricScoring from './components/RubricScoring';
import FactChecker from './components/FactChecker';
import ProcessNotebook from './components/ProcessNotebook';
import PromptLog from './components/PromptLog';
import SourcesTable from './components/SourcesTable';
import Reflection from './components/Reflection';
import ExportActions from './components/ExportActions';

import { loadState, saveState, clearState, getInitialState } from './utils/storage';
import { checkCompletion } from './utils/completion';
import { generateMarkdown, downloadMarkdownFile } from './utils/markdownExport';

export default function App() {
  const [state, setState] = useState(() => loadState());
  const [currentStep, setCurrentStep] = useState(1);
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Autosave to localStorage on every change
  useEffect(() => {
    saveState(state);
  }, [state]);

  const completion = checkCompletion(state);

  const showToast = (message) => {
    setFeedbackToast(message);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  // Log prompt helper to append or update prompt log
  const handleLogPrompt = ({ stage, prompt, aiResponseNotes = '', studentComments = '' }) => {
    const existingIndex = state.promptLog.findIndex((p) => p.stage === stage);
    let updatedLog;

    const newEntry = {
      id: existingIndex >= 0 ? state.promptLog[existingIndex].id : `log-${Date.now()}`,
      stage,
      prompt,
      aiResponseNotes,
      studentComments,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    if (existingIndex >= 0) {
      updatedLog = [...state.promptLog];
      updatedLog[existingIndex] = newEntry;
    } else {
      updatedLog = [...state.promptLog, newEntry];
    }

    setState((prev) => ({ ...prev, promptLog: updatedLog }));
    showToast(`✓ Logged "${stage}" to Prompt History!`);
  };

  // Load sample demo capstone data from backend API
  const handleLoadSample = async () => {
    try {
      const res = await fetch('/api/sample');
      if (res.ok) {
        const sampleData = await res.json();
        setState(sampleData);
        showToast('✓ Sample Capstone loaded successfully!');
        return;
      }
    } catch (e) {
      console.warn('Backend /api/sample not reachable, using embedded sample loader', e);
    }
  };

  // Clear project state
  const handleClearProject = () => {
    clearState();
    setState(getInitialState());
    setCurrentStep(1);
    showToast('Project cleared. Ready for new topic.');
  };

  // Export handlers
  const handleDownloadMarkdown = () => {
    const md = generateMarkdown(state);
    const filename = `${(state.studentInfo?.topic || 'capstone').toLowerCase().replace(/[^a-z0-9]/g, '-')}-notebook.md`;
    downloadMarkdownFile(md, filename);
    showToast('✓ Markdown file downloaded!');
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdown(state);
    navigator.clipboard.writeText(md);
    showToast('✓ Markdown copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-container">
      {/* Toast notification */}
      {feedbackToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'linear-gradient(135deg, var(--accent-blue), #2563eb)',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 9999,
            fontSize: '13px',
            fontWeight: '600',
            animation: 'pulse 0.3s ease-out'
          }}
        >
          {feedbackToast}
        </div>
      )}

      {/* 1. Header Component */}
      <Header
        completionStatus={completion.status}
        completionPercentage={completion.percentage}
        onLoadSample={handleLoadSample}
        onReset={handleClearProject}
      />

      <main className="main-wrapper">
        {/* 2. ProgressTracker Component */}
        <ProgressTracker
          currentStep={currentStep}
          setStep={setCurrentStep}
          completionChecklist={completion.checklist}
        />

        {/* STEP 1: Topic Brief */}
        {currentStep === 1 && (
          <TopicBrief
            studentInfo={state.studentInfo}
            onChange={(info) => setState((prev) => ({ ...prev, studentInfo: info }))}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {/* STEP 2: Briefing (Three Stages) */}
        {currentStep === 2 && (
          <BriefingStep
            topic={state.studentInfo?.topic}
            studentInfo={state.studentInfo}
            briefing={state.briefing}
            onChange={(briefing) => setState((prev) => ({ ...prev, briefing }))}
            onLogPrompt={handleLogPrompt}
            onNext={() => setCurrentStep(3)}
          />
        )}

        {/* STEP 3: Options Step */}
        {currentStep === 3 && (
          <OptionsStep
            topic={state.studentInfo?.topic}
            studentInfo={state.studentInfo}
            options={state.options}
            optionsDecisionNotes={state.optionsDecisionNotes}
            onOptionsChange={(options) => setState((prev) => ({ ...prev, options }))}
            onNotesChange={(notes) => setState((prev) => ({ ...prev, optionsDecisionNotes: notes }))}
            onLogPrompt={handleLogPrompt}
            onNext={() => setCurrentStep(4)}
          />
        )}

        {/* STEP 4: Chapter Builder (10 Sections, Flashcards, Quiz, Revision) */}
        {currentStep === 4 && (
          <ChapterBuilder
            topic={state.studentInfo?.topic}
            chapter={state.chapter}
            onChange={(chapter) => setState((prev) => ({ ...prev, chapter }))}
            onLogPrompt={handleLogPrompt}
            onNext={() => setCurrentStep(5)}
          />
        )}

        {/* STEP 5: Review (Rubric Scoring & Fact Checker) */}
        {currentStep === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 7. RubricScoring Component */}
            <RubricScoring
              topic={state.studentInfo?.topic}
              rubric={state.rubric}
              onChange={(rubric) => setState((prev) => ({ ...prev, rubric }))}
              onLogPrompt={handleLogPrompt}
            />

            {/* 8. FactChecker Component */}
            <FactChecker
              topic={state.studentInfo?.topic}
              factChecks={state.factChecks}
              onChange={(factChecks) => setState((prev) => ({ ...prev, factChecks }))}
              onLogPrompt={handleLogPrompt}
              onNext={() => setCurrentStep(6)}
            />
          </div>
        )}

        {/* STEP 6: Process Notebook & Dossier */}
        {currentStep === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 9. ProcessNotebook Component */}
            <ProcessNotebook
              state={state}
              completion={completion}
              onSourcesChange={(sources) => setState((prev) => ({ ...prev, sources }))}
              onPromptLogChange={(promptLog) => setState((prev) => ({ ...prev, promptLog }))}
              onReflectionChange={(reflection) => setState((prev) => ({ ...prev, reflection }))}
            />

            {/* Direct Interactive Sections for Dedicated Deep Editing */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px' }}>
              {/* 10. SourcesTable Component */}
              <SourcesTable
                sources={state.sources}
                onChange={(sources) => setState((prev) => ({ ...prev, sources }))}
              />

              {/* 11. PromptLog Component */}
              <PromptLog
                promptLog={state.promptLog}
                onChange={(promptLog) => setState((prev) => ({ ...prev, promptLog }))}
              />
            </div>

            {/* 12. Reflection Component */}
            <Reflection
              reflection={state.reflection}
              onChange={(reflection) => setState((prev) => ({ ...prev, reflection }))}
            />
          </div>
        )}

        {/* 13. ExportActions Component (Always visible at base for quick deliverables) */}
        <div style={{ marginTop: '32px' }}>
          <ExportActions
            onDownloadMarkdown={handleDownloadMarkdown}
            onCopyMarkdown={handleCopyMarkdown}
            onPrint={handlePrint}
            onClearProject={handleClearProject}
          />
        </div>
      </main>
    </div>
  );
}
