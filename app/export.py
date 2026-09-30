"""
Export engine for AI Learning Capstone.
Generates comprehensive GitHub-flavored Markdown containing all student workspace data.
"""

from typing import Dict, Any
from app.validators import check_capstone_completion

def generate_markdown_export(state: Dict[str, Any]) -> str:
    """Generates the official Markdown representation of the complete student workspace."""
    info = state.get("studentInfo", {})
    briefing = state.get("briefing", {})
    sources = state.get("sources", [])
    prompt_log = state.get("promptLog", [])
    options = state.get("options", [])
    options_notes = state.get("optionsDecisionNotes", "")
    chapter = state.get("chapter", {})
    rubric = state.get("rubric", {})
    fact_checks = state.get("factChecks", [])
    reflection = state.get("reflection", {})
    
    completion = check_capstone_completion(state)
    
    lines = []
    lines.append("# AI Learning Capstone")
    lines.append("## Evidence-Driven Prompting & Self-Review")
    lines.append("")
    
    # Student Information
    lines.append("## Student Information")
    lines.append(f"- **Student Name:** {info.get('studentName', 'Not provided')}")
    lines.append(f"- **Class / Audience:** {info.get('classAudience', 'Not provided')}")
    lines.append(f"- **AI Tool Used:** {info.get('aiToolUsed', 'Not provided')}")
    lines.append("")
    
    # Topic Brief
    lines.append("## Topic Brief")
    lines.append(f"- **Topic:** {info.get('topic', 'Not provided')}")
    lines.append(f"- **Learning Goal:** {info.get('learningGoal', 'Not provided')}")
    lines.append("")
    lines.append("### Prompt Briefing Stages")
    lines.append("#### Stage 1 — Weak Prompt")
    lines.append(f"```text\n{briefing.get('weakPrompt', 'Explain [TOPIC].')}\n```")
    if briefing.get("weakPromptOutput"):
        lines.append(f"**AI Response / Output:**\n{briefing.get('weakPromptOutput')}\n")
        
    ctx = briefing.get("contextPrompt", {})
    lines.append("#### Stage 2 — Context Prompt")
    lines.append(f"- **Target Audience:** {ctx.get('audience', 'N/A')}")
    lines.append(f"- **Learner Level:** {ctx.get('learnerLevel', 'N/A')}")
    lines.append(f"- **Specific Requirements:** {ctx.get('requirements', 'N/A')}")
    if ctx.get("assembledPrompt"):
        lines.append(f"**Assembled Context Prompt:**\n```text\n{ctx.get('assembledPrompt')}\n```")
    if ctx.get("output"):
        lines.append(f"**AI Response / Output:**\n{ctx.get('output')}\n")
        
    src_prompt = briefing.get("sourcePrompt", {})
    lines.append("#### Stage 3 — Optional Source Prompt")
    lines.append(f"**Source Notes / Guidance Provided:**\n{src_prompt.get('sourceNotes', 'None provided')}\n")
    if src_prompt.get("assembledPrompt"):
        lines.append(f"**Assembled Source Prompt:**\n```text\n{src_prompt.get('assembledPrompt')}\n```")
    lines.append(f"**Supported by Provided Source:**\n{src_prompt.get('supportedBySource', 'None labeled')}\n")
    lines.append(f"**Additional AI Information:**\n{src_prompt.get('additionalAiInfo', 'None labeled')}\n")
    lines.append("")
    
    # Sources
    lines.append("## Sources")
    lines.append("| # | Title | Source Type | Author / Org | URL / Reference | Notes |")
    lines.append("|---|---|---|---|---|---|")
    for i, s in enumerate(sources, start=1):
        t = s.get("title", "").strip() or "Untitled"
        st = s.get("sourceType", "N/A")
        ao = s.get("authorOrg", "N/A")
        url = s.get("url", "N/A")
        notes = s.get("notes", "N/A").replace("\n", " ")
        lines.append(f"| {i} | {t} | {st} | {ao} | {url} | {notes} |")
    lines.append("")
    
    # Prompt Log
    lines.append("## Prompt Log")
    lines.append("| # | Stage | Prompt | AI Response / Notes | Student's Comments | Timestamp |")
    lines.append("|---|---|---|---|---|---|")
    for i, p in enumerate(prompt_log, start=1):
        stage = p.get("stage", f"Stage {i}")
        prompt = p.get("prompt", "").replace("\n", "<br>").replace("|", "\\|")
        resp = p.get("aiResponseNotes", "").replace("\n", "<br>").replace("|", "\\|")
        comments = p.get("studentComments", "").replace("\n", "<br>").replace("|", "\\|")
        ts = p.get("timestamp", "N/A")
        lines.append(f"| {i} | {stage} | {prompt} | {resp} | {comments} | {ts} |")
    lines.append("")
    
    # Options and Feedback
    lines.append("## Options and Feedback")
    for opt in options:
        label = opt.get("label", "Option")
        name = opt.get("approachName", "Unnamed Approach")
        status = opt.get("status", "pending").upper()
        lines.append(f"### {label}: {name} [{status}]")
        lines.append(f"- **Explanation:** {opt.get('explanation', 'N/A')}")
        lines.append(f"- **Strengths:** {opt.get('strengths', 'N/A')}")
        lines.append(f"- **Weaknesses:** {opt.get('weaknesses', 'N/A')}")
        lines.append(f"- **Student Decision / Reason:** {opt.get('studentReason', 'N/A')}")
        lines.append("")
    if options_notes:
        lines.append(f"**Decision Summary & Revised Outline:**\n{options_notes}\n")
    lines.append("")
    
    # Chapter
    lines.append("## Chapter")
    lines.append("### Mini Textbook Chapter (Ten Configurable Sections)")
    sections = chapter.get("sections", [])
    for sec in sections:
        sec_num = sec.get("sectionNumber", 1)
        title = sec.get("title", f"Section {sec_num}")
        lines.append(f"#### {title}")
        if sec.get("explanation"):
            lines.append(f"**Explanation:**\n{sec.get('explanation')}\n")
        if sec.get("examples"):
            lines.append(f"**Examples:**\n{sec.get('examples')}\n")
        if sec.get("commonMistakes"):
            lines.append(f"**Common Mistakes:**\n{sec.get('commonMistakes')}\n")
        if sec.get("revisionNotes"):
            lines.append(f"**Revision Notes:**\n{sec.get('revisionNotes')}\n")
        lines.append("---")
        
    # Chapter Supporting Materials
    lines.append("### Flashcards")
    for i, fc in enumerate(chapter.get("flashcards", []), start=1):
        if fc.get("question") or fc.get("answer"):
            lines.append(f"{i}. **Q:** {fc.get('question', '')}")
            lines.append(f"   **A:** {fc.get('answer', '')}")
    lines.append("")
    
    lines.append("### Quiz")
    for i, q in enumerate(chapter.get("quiz", []), start=1):
        if q.get("question"):
            lines.append(f"#### Question {i}: {q.get('question')}")
            opts = q.get("options", [])
            for opt_idx, opt_text in enumerate(opts):
                is_correct = " (Correct)" if opt_idx == q.get("correctAnswer", 0) else ""
                lines.append(f"- [{chr(65+opt_idx)}] {opt_text}{is_correct}")
            if q.get("explanation"):
                lines.append(f"**Explanation:** {q.get('explanation')}")
            lines.append("")
            
    lines.append("### 7-Day Revision Plan")
    for d in chapter.get("revisionPlan", []):
        day = d.get("day", 1)
        focus = d.get("focus", "")
        act = d.get("activity", "")
        lines.append(f"- **Day {day} ({focus}):** {act}")
    lines.append("")
    
    # Rubric Scores
    lines.append("## Rubric Scores")
    lines.append("| Criterion | Score (1-10) | Explanation | Smallest Useful Edit |")
    lines.append("|---|---|---|---|")
    total_rubric_score = 0
    rubric_count = 0
    for key in ["clarity", "accuracy", "ageFit", "usefulnessForRevision"]:
        item = rubric.get(key, {})
        name = item.get("name", key.capitalize())
        score = item.get("score", 0)
        try:
            total_rubric_score += float(score)
            rubric_count += 1
        except (ValueError, TypeError):
            pass
        expl = item.get("explanation", "").replace("\n", " ")
        edit = item.get("smallestUsefulEdit", "").replace("\n", " ")
        lines.append(f"| {name} | {score}/10 | {expl} | {edit} |")
    
    avg_score = (total_rubric_score / rubric_count) if rubric_count else 0
    lines.append("")
    lines.append(f"**Overall Rubric Score:** {total_rubric_score} / 40 (Average: {avg_score:.1f}/10)")
    lines.append("> *Note: Numerical rubric scores evaluate pedagogical fit and do not constitute independent factual verification.*")
    lines.append("")
    
    # Fact Checks
    lines.append("## Fact Checks")
    lines.append("| # | AI Statement | Decision | Evidence / Reason | Correction |")
    lines.append("|---|---|---|---|---|")
    for i, fc in enumerate(fact_checks, start=1):
        stmt = fc.get("aiStatement", "").replace("\n", "<br>").replace("|", "\\|")
        dec = fc.get("decision", "Needs checking")
        ev = fc.get("evidenceOrReason", "").replace("\n", "<br>").replace("|", "\\|")
        corr = fc.get("correction", "").replace("\n", "<br>").replace("|", "\\|")
        lines.append(f"| {i} | {stmt} | {dec} | {ev} | {corr} |")
    lines.append("")
    
    # Reflection
    lines.append("## Reflection")
    if isinstance(reflection, dict):
        if reflection.get("text"):
            lines.append(f"{reflection.get('text')}\n")
        if reflection.get("learnings"):
            lines.append(f"**What did I learn?**\n{reflection.get('learnings')}\n")
        if reflection.get("modifications"):
            lines.append(f"**What did I change in the AI output?**\n{reflection.get('modifications')}\n")
        if reflection.get("promptingInsights"):
            lines.append(f"**Which prompting approach worked better?**\n{reflection.get('promptingInsights')}\n")
        if reflection.get("checkedClaimsSummary"):
            lines.append(f"**Which claims did I check?**\n{reflection.get('checkedClaimsSummary')}\n")
        if reflection.get("futureImprovements"):
            lines.append(f"**What would I improve next time?**\n{reflection.get('futureImprovements')}\n")
    else:
        lines.append(f"{reflection}\n")
    lines.append("")
    
    # Completion Status
    lines.append("## Completion Status")
    lines.append(f"**Current Status:** **{completion['status']}** ({completion['percentage']}% completed)")
    lines.append("")
    lines.append("### Verification Checklist")
    for key, c in completion["checklist"].items():
        box = "[x]" if c["ok"] else "[ ]"
        lines.append(f"- {box} **{c['label']}**: {c['message']}")
    lines.append("")
    
    return "\n".join(lines)
