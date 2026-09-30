"""
Validation engine for the AI Learning Capstone.
Checks completion criteria strictly according to the capstone specification.
Never falsely marks the capstone as complete.
"""

from typing import Dict, Any, List, Tuple

VALID_DECISIONS = {"Accept", "Reject", "Modify", "Needs checking"}
RUBRIC_KEYS = ["clarity", "accuracy", "ageFit", "usefulnessForRevision"]

def validate_topic_brief(student_info: Dict[str, Any]) -> Tuple[bool, str]:
    if not isinstance(student_info, dict):
        return False, "Student info is missing"
    
    fields = [
        ("studentName", "Student name"),
        ("classAudience", "Class / audience"),
        ("topic", "Topic"),
        ("learningGoal", "Learning goal"),
        ("aiToolUsed", "AI tool used")
    ]
    
    for key, label in fields:
        val = str(student_info.get(key, "")).strip()
        if not val:
            return False, f"Missing {label}"
    
    return True, "Topic brief complete"

def validate_prompt_log(prompt_log: List[Dict[str, Any]]) -> Tuple[bool, str, int]:
    if not isinstance(prompt_log, list):
        return False, "Prompt log must be a list", 0
    
    valid_count = 0
    for entry in prompt_log:
        prompt_txt = str(entry.get("prompt", "")).strip()
        stage = str(entry.get("stage", "")).strip()
        if prompt_txt and stage:
            valid_count += 1
            
    if valid_count >= 8:
        return True, f"{valid_count} prompts logged (minimum 8 required)", valid_count
    return False, f"Only {valid_count}/8 required prompts logged", valid_count

def validate_sources(sources: List[Dict[str, Any]]) -> Tuple[bool, str, int]:
    if not isinstance(sources, list):
        return False, "Sources must be a list", 0
    
    named_count = 0
    for s in sources:
        title = str(s.get("title", "")).strip()
        author_or_notes = str(s.get("authorOrg", "")).strip() or str(s.get("notes", "")).strip() or str(s.get("url", "")).strip()
        if title and author_or_notes:
            named_count += 1
            
    if named_count >= 2:
        return True, f"{named_count} named sources recorded (minimum 2 required)", named_count
    return False, f"Only {named_count}/2 named sources recorded", named_count

def validate_chapter_sections(sections: List[Dict[str, Any]]) -> Tuple[bool, str, int]:
    if not isinstance(sections, list) or len(sections) < 10:
        return False, "Must contain all 10 chapter sections", 0
    
    completed_count = 0
    for s in sections[:10]:
        title = str(s.get("title", "")).strip()
        explanation = str(s.get("explanation", "")).strip()
        if title and explanation:
            completed_count += 1
            
    if completed_count == 10:
        return True, "All 10 chapter sections completed", completed_count
    return False, f"Only {completed_count}/10 chapter sections completed", completed_count

def validate_chapter_supporting(chapter: Dict[str, Any]) -> Tuple[bool, str]:
    if not isinstance(chapter, dict):
        return False, "Chapter data missing"
    
    flashcards = chapter.get("flashcards", [])
    valid_fc = [fc for fc in flashcards if str(fc.get("question", "")).strip() and str(fc.get("answer", "")).strip()]
    if len(valid_fc) < 2:
        return False, "At least 2 flashcards required with question & answer"
    
    quiz = chapter.get("quiz", [])
    valid_quiz = [q for q in quiz if str(q.get("question", "")).strip()]
    if len(valid_quiz) < 2:
        return False, "At least 2 quiz questions required"
    
    revision_plan = chapter.get("revisionPlan", [])
    valid_days = [d for d in revision_plan if str(d.get("activity", "")).strip() or str(d.get("focus", "")).strip()]
    if len(valid_days) < 7:
        return False, f"7-day revision plan incomplete ({len(valid_days)}/7 days filled)"
    
    return True, "Supporting material (flashcards, quiz, 7-day plan) complete"

def validate_rubric(rubric: Dict[str, Any]) -> Tuple[bool, str]:
    if not isinstance(rubric, dict):
        return False, "Rubric data missing"
    
    for key in RUBRIC_KEYS:
        item = rubric.get(key, {})
        try:
            score = float(item.get("score", 0))
        except (ValueError, TypeError):
            score = 0
        explanation = str(item.get("explanation", "")).strip()
        edit = str(item.get("smallestUsefulEdit", "")).strip()
        
        if score < 1 or score > 10:
            return False, f"Rubric '{key}' score must be between 1 and 10"
        if not explanation:
            return False, f"Rubric '{key}' missing explanation"
        if not edit:
            return False, f"Rubric '{key}' missing smallest useful edit"
            
    return True, "Rubric scoring fully completed (4/4 criteria evaluated 1-10)"

def validate_fact_checks(fact_checks: List[Dict[str, Any]]) -> Tuple[bool, str, int]:
    if not isinstance(fact_checks, list):
        return False, "Fact checks must be a list", 0
    
    checked_count = 0
    for fc in fact_checks:
        statement = str(fc.get("aiStatement", "")).strip()
        decision = str(fc.get("decision", "")).strip()
        evidence = str(fc.get("evidenceOrReason", "")).strip()
        
        if statement and decision in VALID_DECISIONS and evidence:
            checked_count += 1
            
    if checked_count >= 6:
        return True, f"{checked_count} factual claims checked (target: 6–10)", checked_count
    return False, f"Only {checked_count}/6 minimum factual claims checked", checked_count

def validate_reflection(reflection_data: Any) -> Tuple[bool, str, int]:
    if isinstance(reflection_data, str):
        text = reflection_data.strip()
    elif isinstance(reflection_data, dict):
        parts = [
            str(reflection_data.get("text", "")).strip(),
            str(reflection_data.get("learnings", "")).strip(),
            str(reflection_data.get("modifications", "")).strip(),
            str(reflection_data.get("promptingInsights", "")).strip(),
            str(reflection_data.get("checkedClaimsSummary", "")).strip(),
            str(reflection_data.get("futureImprovements", "")).strip()
        ]
        text = " ".join([p for p in parts if p]).strip()
    else:
        return False, "Reflection data missing", 0
    
    words = len(text.split())
    if words >= 50:
        return True, f"Reflection completed ({words} words)", words
    return False, f"Reflection too short ({words} words, minimum 50 required)", words

def check_capstone_completion(state: Dict[str, Any]) -> Dict[str, Any]:
    """
    Performs full completion check across all required capstone dimensions.
    Returns status: 'CAPSTONE COMPLETE' or 'CAPSTONE IN PROGRESS'
    """
    if not isinstance(state, dict):
        return {
            "status": "CAPSTONE IN PROGRESS",
            "isComplete": False,
            "percentage": 0,
            "checklist": {},
            "details": ["State must be a dictionary"]
        }
    
    tb_ok, tb_msg = validate_topic_brief(state.get("studentInfo", {}))
    pl_ok, pl_msg, pl_count = validate_prompt_log(state.get("promptLog", []))
    src_ok, src_msg, src_count = validate_sources(state.get("sources", []))
    
    chap_data = state.get("chapter", {})
    sec_ok, sec_msg, sec_count = validate_chapter_sections(chap_data.get("sections", []))
    sup_ok, sup_msg = validate_chapter_supporting(chap_data)
    
    rub_ok, rub_msg = validate_rubric(state.get("rubric", {}))
    fc_ok, fc_msg, fc_count = validate_fact_checks(state.get("factChecks", []))
    ref_ok, ref_msg, ref_words = validate_reflection(state.get("reflection", {}))
    
    criteria = {
        "topicBrief": {"ok": tb_ok, "label": "Topic brief completed", "message": tb_msg},
        "promptsLogged": {"ok": pl_ok, "label": "At least 8 prompts logged", "message": pl_msg, "count": pl_count},
        "sources": {"ok": src_ok, "label": "At least 2 named sources", "message": src_msg, "count": src_count},
        "sections": {"ok": sec_ok, "label": "Ten chapter sections completed", "message": sec_msg, "count": sec_count},
        "supporting": {"ok": sup_ok, "label": "Chapter supporting material completed", "message": sup_msg},
        "rubric": {"ok": rub_ok, "label": "Rubric completed (4 criteria 1–10)", "message": rub_msg},
        "factChecks": {"ok": fc_ok, "label": "6–10 claims checked", "message": fc_msg, "count": fc_count},
        "reflection": {"ok": ref_ok, "label": "Reflection completed", "message": ref_msg, "words": ref_words}
    }
    
    passed_count = sum(1 for c in criteria.values() if c["ok"])
    total_criteria = len(criteria)
    percentage = int(round((passed_count / total_criteria) * 100))
    
    is_complete = passed_count == total_criteria
    status_str = "CAPSTONE COMPLETE" if is_complete else "CAPSTONE IN PROGRESS"
    
    details = [c["message"] for c in criteria.values() if not c["ok"]]
    if is_complete:
        details = ["All capstone requirements satisfied!"]
        
    return {
        "status": status_str,
        "isComplete": is_complete,
        "percentage": percentage,
        "passedCount": passed_count,
        "totalCount": total_criteria,
        "checklist": criteria,
        "details": details
    }
