/**
 * Capstone Completion System
 * Checks all conditions required for the official AI Learning Capstone.
 * Never falsely marks the capstone as complete.
 */

export const checkCompletion = (state) => {
  if (!state) {
    return {
      status: 'CAPSTONE IN PROGRESS',
      isComplete: false,
      percentage: 0,
      passedCount: 0,
      totalCount: 8,
      checklist: {},
      details: ['No state loaded']
    };
  }

  // 1. Topic brief completed
  const info = state.studentInfo || {};
  const topicBriefOk = Boolean(
    info.studentName?.trim() &&
    info.classAudience?.trim() &&
    info.topic?.trim() &&
    info.learningGoal?.trim() &&
    info.aiToolUsed?.trim()
  );

  // 2. At least 8 prompts logged
  const promptLog = state.promptLog || [];
  const loggedCount = promptLog.filter(
    (p) => p.prompt?.trim() && p.stage?.trim()
  ).length;
  const promptsOk = loggedCount >= 8;

  // 3. At least 2 named sources
  const sources = state.sources || [];
  const namedSourcesCount = sources.filter(
    (s) => s.title?.trim() && (s.authorOrg?.trim() || s.notes?.trim() || s.url?.trim())
  ).length;
  const sourcesOk = namedSourcesCount >= 2;

  // 4. Ten chapter sections completed
  const sections = state.chapter?.sections || [];
  const completedSectionsCount = sections.slice(0, 10).filter(
    (sec) => sec.title?.trim() && sec.explanation?.trim()
  ).length;
  const sectionsOk = completedSectionsCount === 10;

  // 5. Chapter supporting material completed
  const flashcards = state.chapter?.flashcards || [];
  const validFlashcards = flashcards.filter(
    (f) => f.question?.trim() && f.answer?.trim()
  ).length;

  const quiz = state.chapter?.quiz || [];
  const validQuiz = quiz.filter((q) => q.question?.trim()).length;

  const revisionPlan = state.chapter?.revisionPlan || [];
  const validDays = revisionPlan.filter(
    (d) => d.activity?.trim() || d.focus?.trim()
  ).length;

  const supportingOk = validFlashcards >= 2 && validQuiz >= 2 && validDays >= 7;

  // 6. Rubric completed (4 criteria scored 1-10 with explanation and smallest useful edit)
  const rubric = state.rubric || {};
  const criteriaKeys = ['clarity', 'accuracy', 'ageFit', 'usefulnessForRevision'];
  let rubricFilledCount = 0;
  criteriaKeys.forEach((key) => {
    const item = rubric[key] || {};
    const score = Number(item.score);
    if (score >= 1 && score <= 10 && item.explanation?.trim() && item.smallestUsefulEdit?.trim()) {
      rubricFilledCount++;
    }
  });
  const rubricOk = rubricFilledCount === 4;

  // 7. 6–10 claims checked
  const factChecks = state.factChecks || [];
  const validDecisions = ['Accept', 'Reject', 'Modify', 'Needs checking'];
  const checkedClaimsCount = factChecks.filter(
    (fc) => fc.aiStatement?.trim() && validDecisions.includes(fc.decision) && fc.evidenceOrReason?.trim()
  ).length;
  const factChecksOk = checkedClaimsCount >= 6;

  // 8. Reflection completed
  const ref = state.reflection || {};
  let refText = '';
  if (typeof ref === 'string') {
    refText = ref.trim();
  } else if (typeof ref === 'object') {
    const parts = [
      ref.text,
      ref.learnings,
      ref.modifications,
      ref.promptingInsights,
      ref.checkedClaimsSummary,
      ref.futureImprovements
    ].filter(Boolean);
    refText = parts.join(' ').trim();
  }
  const refWords = refText ? refText.split(/\s+/).filter(Boolean).length : 0;
  const reflectionOk = refWords >= 50;

  const checklist = {
    topicBrief: {
      ok: topicBriefOk,
      label: 'Topic brief completed',
      current: topicBriefOk ? 'All fields filled' : 'Incomplete fields',
      target: '5 required fields'
    },
    promptsLogged: {
      ok: promptsOk,
      label: 'At least 8 prompts logged',
      current: `${loggedCount} logged`,
      target: '8 prompts'
    },
    sources: {
      ok: sourcesOk,
      label: 'At least 2 named sources',
      current: `${namedSourcesCount} recorded`,
      target: '2 named sources'
    },
    sections: {
      ok: sectionsOk,
      label: 'Ten chapter sections completed',
      current: `${completedSectionsCount}/10 completed`,
      target: '10 sections'
    },
    supporting: {
      ok: supportingOk,
      label: 'Chapter supporting material completed',
      current: `${validFlashcards} cards, ${validQuiz} quiz, ${validDays}/7 days`,
      target: 'Cards, Quiz & 7-day plan'
    },
    rubric: {
      ok: rubricOk,
      label: 'Rubric completed (4 criteria 1–10)',
      current: `${rubricFilledCount}/4 evaluated`,
      target: '4 criteria (1-10)'
    },
    factChecks: {
      ok: factChecksOk,
      label: '6–10 claims checked',
      current: `${checkedClaimsCount} verified/checked`,
      target: '6–10 claims'
    },
    reflection: {
      ok: reflectionOk,
      label: 'Reflection completed',
      current: `${refWords} words`,
      target: '>= 50 words'
    }
  };

  const passedCount = Object.values(checklist).filter((c) => c.ok).length;
  const totalCount = Object.keys(checklist).length;
  const percentage = Math.round((passedCount / totalCount) * 100);
  const isComplete = passedCount === totalCount;
  const status = isComplete ? 'CAPSTONE COMPLETE' : 'CAPSTONE IN PROGRESS';

  return {
    status,
    isComplete,
    percentage,
    passedCount,
    totalCount,
    checklist,
    refWords,
    checkedClaimsCount,
    completedSectionsCount,
    loggedCount,
    namedSourcesCount
  };
};
