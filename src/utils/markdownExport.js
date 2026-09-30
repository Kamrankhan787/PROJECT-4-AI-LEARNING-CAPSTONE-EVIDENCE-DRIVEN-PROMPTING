/**
 * Client-Side Markdown Generator for AI Learning Capstone Notebook Export.
 * Formats all student sections into clean GitHub Flavored Markdown.
 */

import { checkCompletion } from './completion';

export const generateMarkdown = (state) => {
  const info = state.studentInfo || {};
  const briefing = state.briefing || {};
  const sources = state.sources || [];
  const promptLog = state.promptLog || [];
  const options = state.options || [];
  const optionsNotes = state.optionsDecisionNotes || '';
  const chapter = state.chapter || {};
  const rubric = state.rubric || {};
  const factChecks = state.factChecks || [];
  const reflection = state.reflection || {};

  const completion = checkCompletion(state);

  const lines = [];

  lines.push('# AI Learning Capstone');
  lines.push('## Evidence-Driven Prompting & Self-Review');
  lines.push('');

  // 1. Student Information
  lines.push('## Student Information');
  lines.push(`- **Student Name:** ${info.studentName || 'Not provided'}`);
  lines.push(`- **Class / Audience:** ${info.classAudience || 'Not provided'}`);
  lines.push(`- **AI Tool Used:** ${info.aiToolUsed || 'Not provided'}`);
  lines.push('');

  // 2. Topic Brief
  lines.push('## Topic Brief');
  lines.push(`- **Topic:** ${info.topic || 'Not provided'}`);
  lines.push(`- **Learning Goal:** ${info.learningGoal || 'Not provided'}`);
  lines.push('');
  lines.push('### Prompt Briefing Stages');
  lines.push('#### Stage 1 — Weak Prompt');
  lines.push('```text');
  lines.push(briefing.weakPrompt || 'Explain [TOPIC].');
  lines.push('```');
  if (briefing.weakPromptOutput) {
    lines.push(`**AI Response / Output:**\n${briefing.weakPromptOutput}\n`);
  }

  const ctx = briefing.contextPrompt || {};
  lines.push('#### Stage 2 — Context Prompt');
  lines.push(`- **Target Audience:** ${ctx.audience || 'N/A'}`);
  lines.push(`- **Learner Level:** ${ctx.learnerLevel || 'N/A'}`);
  lines.push(`- **Specific Requirements:** ${ctx.requirements || 'N/A'}`);
  if (ctx.assembledPrompt) {
    lines.push(`**Assembled Context Prompt:**\n\`\`\`text\n${ctx.assembledPrompt}\n\`\`\``);
  }
  if (ctx.output) {
    lines.push(`**AI Response / Output:**\n${ctx.output}\n`);
  }

  const srcPrompt = briefing.sourcePrompt || {};
  lines.push('#### Stage 3 — Optional Source Prompt');
  lines.push(`**Source Notes / Guidance Provided:**\n${srcPrompt.sourceNotes || 'None provided'}\n`);
  if (srcPrompt.assembledPrompt) {
    lines.push(`**Assembled Source Prompt:**\n\`\`\`text\n${srcPrompt.assembledPrompt}\n\`\`\``);
  }
  lines.push(`**Supported by Provided Source:**\n${srcPrompt.supportedBySource || 'None labeled'}\n`);
  lines.push(`**Additional AI Information:**\n${srcPrompt.additionalAiInfo || 'None labeled'}\n`);
  lines.push('');

  // 3. Sources
  lines.push('## Sources');
  lines.push('| # | Title | Source Type | Author / Org | URL / Reference | Notes |');
  lines.push('|---|---|---|---|---|---|');
  sources.forEach((s, idx) => {
    const title = s.title?.trim() || 'Untitled';
    const type = s.sourceType || 'N/A';
    const author = s.authorOrg || 'N/A';
    const url = s.url || 'N/A';
    const notes = (s.notes || 'N/A').replace(/\n/g, ' ');
    lines.push(`| ${idx + 1} | ${title} | ${type} | ${author} | ${url} | ${notes} |`);
  });
  lines.push('');

  // 4. Prompt Log
  lines.push('## Prompt Log');
  lines.push('| # | Stage | Prompt | AI Response / Notes | Student\'s Comments | Timestamp |');
  lines.push('|---|---|---|---|---|---|');
  promptLog.forEach((p, idx) => {
    const stage = p.stage || `Stage ${idx + 1}`;
    const prompt = (p.prompt || '').replace(/\n/g, '<br>').replace(/\|/g, '\\|');
    const resp = (p.aiResponseNotes || '').replace(/\n/g, '<br>').replace(/\|/g, '\\|');
    const comments = (p.studentComments || '').replace(/\n/g, '<br>').replace(/\|/g, '\\|');
    const ts = p.timestamp || 'N/A';
    lines.push(`| ${idx + 1} | ${stage} | ${prompt} | ${resp} | ${comments} | ${ts} |`);
  });
  lines.push('');

  // 5. Options and Feedback
  lines.push('## Options and Feedback');
  options.forEach((opt) => {
    const label = opt.label || 'Option';
    const name = opt.approachName || 'Unnamed Approach';
    const status = (opt.status || 'pending').toUpperCase();
    lines.push(`### ${label}: ${name} [${status}]`);
    lines.push(`- **Explanation:** ${opt.explanation || 'N/A'}`);
    lines.push(`- **Strengths:** ${opt.strengths || 'N/A'}`);
    lines.push(`- **Weaknesses:** ${opt.weaknesses || 'N/A'}`);
    lines.push(`- **Student Decision / Reason:** ${opt.studentReason || 'N/A'}`);
    lines.push('');
  });
  if (optionsNotes) {
    lines.push(`**Decision Summary & Revised Outline:**\n${optionsNotes}\n`);
  }
  lines.push('');

  // 6. Chapter
  lines.push('## Chapter');
  lines.push('### Mini Textbook Chapter (Ten Configurable Sections)');
  const sections = chapter.sections || [];
  sections.forEach((sec) => {
    const title = sec.title || `Section ${sec.sectionNumber}`;
    lines.push(`#### ${title}`);
    if (sec.explanation) lines.push(`**Explanation:**\n${sec.explanation}\n`);
    if (sec.examples) lines.push(`**Examples:**\n${sec.examples}\n`);
    if (sec.commonMistakes) lines.push(`**Common Mistakes:**\n${sec.commonMistakes}\n`);
    if (sec.revisionNotes) lines.push(`**Revision Notes:**\n${sec.revisionNotes}\n`);
    lines.push('---');
  });

  // Supporting Materials
  lines.push('### Flashcards');
  (chapter.flashcards || []).forEach((fc, idx) => {
    if (fc.question || fc.answer) {
      lines.push(`${idx + 1}. **Q:** ${fc.question || ''}`);
      lines.push(`   **A:** ${fc.answer || ''}`);
    }
  });
  lines.push('');

  lines.push('### Quiz');
  (chapter.quiz || []).forEach((q, idx) => {
    if (q.question) {
      lines.push(`#### Question ${idx + 1}: ${q.question}`);
      (q.options || []).forEach((opt, optIdx) => {
        const isCorrect = optIdx === q.correctAnswer ? ' (Correct)' : '';
        lines.push(`- [${String.fromCharCode(65 + optIdx)}] ${opt}${isCorrect}`);
      });
      if (q.explanation) lines.push(`**Explanation:** ${q.explanation}`);
      lines.push('');
    }
  });

  lines.push('### 7-Day Revision Plan');
  (chapter.revisionPlan || []).forEach((d) => {
    lines.push(`- **Day ${d.day} (${d.focus || 'Focus'}):** ${d.activity || 'Activity'}`);
  });
  lines.push('');

  // 7. Rubric Scores
  lines.push('## Rubric Scores');
  lines.push('| Criterion | Score (1-10) | Explanation | Smallest Useful Edit |');
  lines.push('|---|---|---|---|');
  let totalScore = 0;
  ['clarity', 'accuracy', 'ageFit', 'usefulnessForRevision'].forEach((key) => {
    const item = rubric[key] || {};
    const name = item.name || key;
    const score = item.score || 0;
    totalScore += Number(score) || 0;
    const expl = (item.explanation || '').replace(/\n/g, ' ');
    const edit = (item.smallestUsefulEdit || '').replace(/\n/g, ' ');
    lines.push(`| ${name} | ${score}/10 | ${expl} | ${edit} |`);
  });
  lines.push('');
  lines.push(`**Overall Rubric Score:** ${totalScore} / 40`);
  lines.push('> *Note: Numerical rubric scores evaluate pedagogical fit and do not constitute independent factual verification.*');
  lines.push('');

  // 8. Fact Checks
  lines.push('## Fact Checks');
  lines.push('| # | AI Statement | Decision | Evidence / Reason | Correction |');
  lines.push('|---|---|---|---|---|');
  factChecks.forEach((fc, idx) => {
    const stmt = (fc.aiStatement || '').replace(/\n/g, '<br>').replace(/\|/g, '\\|');
    const dec = fc.decision || 'Needs checking';
    const ev = (fc.evidenceOrReason || '').replace(/\n/g, '<br>').replace(/\|/g, '\\|');
    const corr = (fc.correction || '').replace(/\n/g, '<br>').replace(/\|/g, '\\|');
    lines.push(`| ${idx + 1} | ${stmt} | ${dec} | ${ev} | ${corr} |`);
  });
  lines.push('');

  // 9. Reflection
  lines.push('## Reflection');
  if (typeof reflection === 'object') {
    if (reflection.text) lines.push(`${reflection.text}\n`);
    if (reflection.learnings) lines.push(`**What did I learn?**\n${reflection.learnings}\n`);
    if (reflection.modifications) lines.push(`**What did I change in the AI output?**\n${reflection.modifications}\n`);
    if (reflection.promptingInsights) lines.push(`**Which prompting approach worked better?**\n${reflection.promptingInsights}\n`);
    if (reflection.checkedClaimsSummary) lines.push(`**Which claims did I check?**\n${reflection.checkedClaimsSummary}\n`);
    if (reflection.futureImprovements) lines.push(`**What would I improve next time?**\n${reflection.futureImprovements}\n`);
  } else {
    lines.push(`${reflection}\n`);
  }
  lines.push('');

  // 10. Completion Status
  lines.push('## Completion Status');
  lines.push(`**Current Status:** **${completion.status}** (${completion.percentage}% completed)`);
  lines.push('');
  lines.push('### Verification Checklist');
  Object.values(completion.checklist || {}).forEach((c) => {
    const box = c.ok ? '[x]' : '[ ]';
    lines.push(`- ${box} **${c.label}**: ${c.current} (Target: ${c.target})`);
  });
  lines.push('');

  return lines.join('\n');
};

export const downloadMarkdownFile = (content, filename = 'ai-learning-capstone-notebook.md') => {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
