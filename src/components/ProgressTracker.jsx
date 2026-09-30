import React from 'react';

export default function ProgressTracker({ currentStep, setStep, completionChecklist }) {
  const steps = [
    {
      id: 1,
      title: 'Step 1 — Topic Brief',
      isDone: Boolean(completionChecklist?.topicBrief?.ok)
    },
    {
      id: 2,
      title: 'Step 2 — Briefing',
      isDone: Boolean(completionChecklist?.promptsLogged?.ok && completionChecklist?.sources?.ok)
    },
    {
      id: 3,
      title: 'Step 3 — Options',
      isDone: Boolean(completionChecklist?.promptsLogged?.count >= 4)
    },
    {
      id: 4,
      title: 'Step 4 — Chapter',
      isDone: Boolean(completionChecklist?.sections?.ok && completionChecklist?.supporting?.ok)
    },
    {
      id: 5,
      title: 'Step 5 — Review',
      isDone: Boolean(completionChecklist?.rubric?.ok && completionChecklist?.factChecks?.ok)
    },
    {
      id: 6,
      title: 'Step 6 — Process Notebook',
      isDone: Boolean(completionChecklist?.reflection?.ok)
    }
  ];

  return (
    <nav className="progress-tracker" aria-label="Capstone navigation steps">
      <div className="tracker-steps">
        {steps.map((step) => {
          const isCurrent = currentStep === step.id;
          const isCompleted = step.isDone;

          return (
            <button
              key={step.id}
              type="button"
              className={`tracker-step-btn ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => setStep(step.id)}
            >
              <span className="step-num-badge">
                {isCompleted ? '✓' : step.id}
              </span>
              <span>{step.title}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
