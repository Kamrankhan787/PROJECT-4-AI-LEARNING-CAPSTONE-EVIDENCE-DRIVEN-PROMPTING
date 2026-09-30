/**
 * LocalStorage manager for AI Learning Capstone.
 * Storage key: ai-learning-capstone-state
 * Persists all student workspace data across browser refreshes.
 */

export const STORAGE_KEY = 'ai-learning-capstone-state';

export const createDefaultSections = () => [
  { id: 'section-1', sectionNumber: 1, title: 'Section 1', explanation: '', examples: '', commonMistakes: '', revisionNotes: '' },
  { id: 'section-2', sectionNumber: 2, title: 'Section 2', explanation: '', examples: '', commonMistakes: '', revisionNotes: '' },
  { id: 'section-3', sectionNumber: 3, title: 'Section 3', explanation: '', examples: '', commonMistakes: '', revisionNotes: '' },
  { id: 'section-4', sectionNumber: 4, title: 'Section 4', explanation: '', examples: '', commonMistakes: '', revisionNotes: '' },
  { id: 'section-5', sectionNumber: 5, title: 'Section 5', explanation: '', examples: '', commonMistakes: '', revisionNotes: '' },
  { id: 'section-6', sectionNumber: 6, title: 'Section 6', explanation: '', examples: '', commonMistakes: '', revisionNotes: '' },
  { id: 'section-7', sectionNumber: 7, title: 'Section 7', explanation: '', examples: '', commonMistakes: '', revisionNotes: '' },
  { id: 'section-8', sectionNumber: 8, title: 'Section 8', explanation: '', examples: '', commonMistakes: '', revisionNotes: '' },
  { id: 'section-9', sectionNumber: 9, title: 'Section 9', explanation: '', examples: '', commonMistakes: '', revisionNotes: '' },
  { id: 'section-10', sectionNumber: 10, title: 'Section 10', explanation: '', examples: '', commonMistakes: '', revisionNotes: '' }
];

export const createDefaultFlashcards = () => [
  { id: 'fc-1', question: '', answer: '' },
  { id: 'fc-2', question: '', answer: '' },
  { id: 'fc-3', question: '', answer: '' },
  { id: 'fc-4', question: '', answer: '' },
  { id: 'fc-5', question: '', answer: '' }
];

export const createDefaultQuiz = () => [
  { id: 'quiz-1', question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' },
  { id: 'quiz-2', question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' },
  { id: 'quiz-3', question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }
];

export const createDefaultRevisionPlan = () => [
  { day: 1, title: 'Day 1', focus: '', activity: '' },
  { day: 2, title: 'Day 2', focus: '', activity: '' },
  { day: 3, title: 'Day 3', focus: '', activity: '' },
  { day: 4, title: 'Day 4', focus: '', activity: '' },
  { day: 5, title: 'Day 5', focus: '', activity: '' },
  { day: 6, title: 'Day 6', focus: '', activity: '' },
  { day: 7, title: 'Day 7', focus: '', activity: '' }
];

export const getInitialState = () => ({
  studentInfo: {
    studentName: '',
    classAudience: '',
    topic: '',
    learningGoal: '',
    aiToolUsed: ''
  },
  briefing: {
    weakPrompt: 'Explain [TOPIC].',
    weakPromptOutput: '',
    contextPrompt: {
      audience: '',
      learnerLevel: '',
      learningGoal: '',
      requirements: '',
      assembledPrompt: '',
      output: ''
    },
    sourcePrompt: {
      sourceNotes: '',
      assembledPrompt: '',
      supportedBySource: '',
      additionalAiInfo: ''
    }
  },
  options: [
    {
      id: 'option-1',
      label: 'Option 1',
      approachName: '',
      explanation: '',
      strengths: '',
      weaknesses: '',
      status: 'pending', // 'selected' | 'rejected' | 'pending'
      studentReason: ''
    },
    {
      id: 'option-2',
      label: 'Option 2',
      approachName: '',
      explanation: '',
      strengths: '',
      weaknesses: '',
      status: 'pending',
      studentReason: ''
    },
    {
      id: 'option-3',
      label: 'Option 3',
      approachName: '',
      explanation: '',
      strengths: '',
      weaknesses: '',
      status: 'pending',
      studentReason: ''
    }
  ],
  optionsDecisionNotes: '',
  chapter: {
    sections: createDefaultSections(),
    flashcards: createDefaultFlashcards(),
    quiz: createDefaultQuiz(),
    revisionPlan: createDefaultRevisionPlan()
  },
  rubric: {
    clarity: { name: 'Clarity', score: 0, explanation: '', smallestUsefulEdit: '' },
    accuracy: { name: 'Accuracy', score: 0, explanation: '', smallestUsefulEdit: '' },
    ageFit: { name: 'Age-fit', score: 0, explanation: '', smallestUsefulEdit: '' },
    usefulnessForRevision: { name: 'Usefulness for revision', score: 0, explanation: '', smallestUsefulEdit: '' }
  },
  factChecks: [
    { id: 'fact-1', aiStatement: '', decision: 'Needs checking', evidenceOrReason: '', correction: '' },
    { id: 'fact-2', aiStatement: '', decision: 'Needs checking', evidenceOrReason: '', correction: '' },
    { id: 'fact-3', aiStatement: '', decision: 'Needs checking', evidenceOrReason: '', correction: '' },
    { id: 'fact-4', aiStatement: '', decision: 'Needs checking', evidenceOrReason: '', correction: '' },
    { id: 'fact-5', aiStatement: '', decision: 'Needs checking', evidenceOrReason: '', correction: '' },
    { id: 'fact-6', aiStatement: '', decision: 'Needs checking', evidenceOrReason: '', correction: '' },
    { id: 'fact-7', aiStatement: '', decision: 'Needs checking', evidenceOrReason: '', correction: '' },
    { id: 'fact-8', aiStatement: '', decision: 'Needs checking', evidenceOrReason: '', correction: '' }
  ],
  sources: [
    { id: 'source-1', title: '', sourceType: 'Textbook / Class Source', authorOrg: '', url: '', notes: '' },
    { id: 'source-2', title: '', sourceType: 'Trusted Learning Source', authorOrg: '', url: '', notes: '' }
  ],
  promptLog: [
    { id: 'log-1', stage: '1. Weak prompt', prompt: '', aiResponseNotes: '', studentComments: '', timestamp: '' },
    { id: 'log-2', stage: '2. Context prompt', prompt: '', aiResponseNotes: '', studentComments: '', timestamp: '' },
    { id: 'log-3', stage: '3. Source prompt', prompt: '', aiResponseNotes: '', studentComments: '', timestamp: '' },
    { id: 'log-4', stage: '4. Options', prompt: '', aiResponseNotes: '', studentComments: '', timestamp: '' },
    { id: 'log-5', stage: '5. Feedback', prompt: '', aiResponseNotes: '', studentComments: '', timestamp: '' },
    { id: 'log-6', stage: '6. Think-hard draft', prompt: '', aiResponseNotes: '', studentComments: '', timestamp: '' },
    { id: 'log-7', stage: '7. Rubric scoring', prompt: '', aiResponseNotes: '', studentComments: '', timestamp: '' },
    { id: 'log-8', stage: '8. Verification', prompt: '', aiResponseNotes: '', studentComments: '', timestamp: '' }
  ],
  reflection: {
    text: '',
    learnings: '',
    modifications: '',
    promptingInsights: '',
    checkedClaimsSummary: '',
    futureImprovements: ''
  }
});

export const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialState();
    const parsed = JSON.parse(raw);
    return { ...getInitialState(), ...parsed };
  } catch (err) {
    console.error('Failed to parse saved state from localStorage:', err);
    return getInitialState();
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
};

export const clearState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear localStorage:', err);
  }
};
