/**
 * Reusable Prompt Templates for AI Learning Capstone
 * Evidence-Driven Prompting & Self-Review
 * 
 * These templates help students direct, question, compare, and verify AI responses.
 * External AI models (ChatGPT, Claude, Gemini) remain external to the workspace.
 */

export const PROMPT_TEMPLATES = {
  weakPrompt: {
    id: 'weak',
    title: 'Stage 1 — Weak Prompt',
    stageName: '1. Weak prompt',
    description: 'An open-ended prompt without audience constraints or learning parameters. Demonstrates default AI behavior.',
    template: (topic) => `Explain ${topic || '[TOPIC]'}.`,
    notes: 'Notice how generic, uncalibrated, and non-specific the default output tends to be.'
  },

  contextPrompt: {
    id: 'context',
    title: 'Stage 2 — Context Prompt',
    stageName: '2. Context prompt',
    description: 'Provides audience grade level, prior knowledge, concrete learning objectives, and clear constraints.',
    template: ({ topic, audience, learnerLevel, learningGoal, requirements }) => 
      `Act as an expert STEM/humanities educator. Explain "${topic || '[TOPIC]'}" specifically tailored for ${audience || '[CLASS / AUDIENCE]'} (${learnerLevel || '[LEARNER LEVEL]'}).
Learning Goal: ${learningGoal || '[SPECIFIC LEARNING GOAL]'}
Requirements:
- ${requirements || 'Use age-appropriate terminology, clear real-world examples, and highlight common misconceptions.'}
- Keep tone engaging and encouraging without condescension.`,
    notes: 'Observe how specifying audience and constraints transforms AI output from encyclopedic to instructional.'
  },

  sourcePrompt: {
    id: 'source',
    title: 'Stage 3 — Optional Source Prompt',
    stageName: '3. Source prompt',
    description: 'Binds the AI strictly to supplied textbook/class notes and demands clear labeling of source vs extra information.',
    template: ({ topic, sourceNotes }) => 
      `I am studying "${topic || '[TOPIC]'}". Below are my authoritative source materials / class notes:

"""
${sourceNotes || '[PASTE TEXTBOOK EXCERPT OR TEACHER CLASS NOTES HERE]'}
"""

Using ONLY the provided source material above:
1. Explain the key concepts of ${topic || '[TOPIC]'}.
2. CRITICAL CONSTRAINT: If you mention ANY fact or detail not explicitly found in the provided notes, you MUST label it clearly as "[ADDITIONAL AI INFORMATION - NOT IN SOURCE]".
3. Do not invent facts, citations, or numbers not present in the excerpt.`,
    notes: 'Forces the AI to distinguish verified syllabus material from unverified model associations.'
  },

  optionsPrompt: {
    id: 'options',
    title: 'Stage 4 — Options Prompt (Three Explanatory Pedagogies)',
    stageName: '4. Options',
    description: 'Requests three distinct pedagogical strategies to teach the concept so the student can evaluate and choose.',
    template: ({ topic, audience, learningGoal }) => 
      `I need to teach "${topic || '[TOPIC]'}" to ${audience || 'students'}. 
Learning Goal: ${learningGoal || 'Deep conceptual mastery'}.

Propose 3 DISTINCT pedagogical approaches to explain this topic:
- OPTION 1: A narrative / real-world storyline approach.
- OPTION 2: A first-principles / analytical or mathematical approach.
- OPTION 3: An inquiry-based / misconception-busting diagnostic approach.

For each option, outline:
1. Core explanation strategy
2. Major educational strengths
3. Potential cognitive weaknesses or pitfalls for learners.`,
    notes: 'Empowers the student to compare explanatory structures before committing to a draft.'
  },

  feedbackPrompt: {
    id: 'feedback',
    title: 'Stage 5 — Feedback & Synthesis Prompt',
    stageName: '5. Feedback',
    description: 'Directs the AI to combine the best elements of selected options while addressing identified weaknesses.',
    template: ({ topic, selectedOption, rejectedOptions, studentFeedback }) => 
      `Regarding the explanation of "${topic || '[TOPIC]'}":
I have chosen: ${selectedOption || 'Option 1'}.
I rejected: ${rejectedOptions || 'Options 2 and 3'}.

Here is my instructional critique and guidance:
"""
${studentFeedback || 'Combine the narrative clarity of Option 1 with the misconception callouts of Option 3, while simplifying technical terminology.'}
"""

Please synthesize a revised comprehensive outline based strictly on this feedback.`,
    notes: 'The student directs the AI rather than passively accepting initial generation.'
  },

  chapterDraftPrompt: {
    id: 'chapterDraft',
    title: 'Stage 6 — Think-Hard Chapter Drafting Prompt',
    stageName: '6. Think-hard draft',
    description: 'Prompts AI to draft ten configurable sections with concrete examples, common pitfalls, and revision notes.',
    template: ({ topic, outlineNotes }) => 
      `Draft a comprehensive mini textbook chapter on "${topic || '[TOPIC]'}" organized into 10 structured sections (Section 1 through Section 10).
Guidelines:
${outlineNotes || '- Use simple, precise language.\n- Provide concrete real-world examples for each section.\n- Explicitly address common learner mistakes in every section.\n- Include revision summary bullet points.'}

Also generate:
- 5 active-recall Flashcard questions & answers
- A 3-question diagnostic Quiz with explanations
- A structured 7-day Revision Plan.`,
    notes: 'Generates the chapter text while keeping sections cleanly separated for manual review.'
  },

  rubricPrompt: {
    id: 'rubric',
    title: 'Stage 7 — Rubric Self-Review Prompt',
    stageName: '7. Rubric scoring',
    description: 'Prompts AI to critique the draft against the 4 educational criteria: Clarity, Accuracy, Age-fit, Usefulness for revision.',
    template: ({ topic, draftExcerpt }) => 
      `Critique the following draft chapter on "${topic || '[TOPIC]'}" across 4 criteria (Score 1-10 each):
1. Clarity (coherence, flow, vocabulary simplicity)
2. Accuracy (scientific/conceptual fidelity, avoiding loose analogies)
3. Age-fit (appropriateness for the target grade level)
4. Usefulness for revision (memorability, flashcard quality, actionable study schedule)

For EACH criterion:
- Provide an objective score (1–10)
- Explain the pedagogical reasoning
- Suggest the SINGLE SMALLEST USEFUL EDIT that would improve the score.

Chapter excerpt:
"""
${draftExcerpt || '[PASTE DRAFT EXCERPT HERE]'}
"""`,
    notes: 'Separates rubric scoring from factual verification. Highlights actionable micro-edits.'
  },

  verificationPrompt: {
    id: 'verification',
    title: 'Stage 8 — Verification & Claim Extraction Prompt',
    stageName: '8. Verification',
    description: 'Prompts AI to isolate 6–10 falsifiable empirical statements for human fact-checking.',
    template: ({ topic, chapterText }) => 
      `Review the following textbook chapter on "${topic || '[TOPIC]'}" and extract 6 to 10 specific, testable factual claims.
For each claim:
- State the exact claim verbatim
- Identify the underlying principle or empirical assertion
- Specify what standard reference (textbook chapter, peer-reviewed study, official syllabus) must be consulted to independently verify or refute it.

Textbook Chapter:
"""
${chapterText || '[PASTE FULL CHAPTER OR KEY SECTIONS HERE]'}
"""`,
    notes: 'Enables rigorous human-in-the-loop claim checking without blindly trusting AI claims.'
  }
};
