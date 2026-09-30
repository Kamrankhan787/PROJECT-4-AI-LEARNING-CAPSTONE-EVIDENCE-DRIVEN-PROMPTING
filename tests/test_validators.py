"""
Unit tests for completion and validation rules.
"""

from app.validators import (
    validate_topic_brief,
    validate_prompt_log,
    validate_sources,
    validate_chapter_sections,
    validate_chapter_supporting,
    validate_rubric,
    validate_fact_checks,
    validate_reflection,
    check_capstone_completion
)
from app.models import default_state

def test_validate_topic_brief():
    # Empty
    ok, _ = validate_topic_brief({})
    assert ok is False
    
    # Incomplete
    ok, _ = validate_topic_brief({"studentName": "Alex"})
    assert ok is False
    
    # Complete
    ok, msg = validate_topic_brief({
        "studentName": "Alex",
        "classAudience": "Grade 9",
        "topic": "Circuits",
        "learningGoal": "Ohm's Law",
        "aiToolUsed": "ChatGPT"
    })
    assert ok is True
    assert "complete" in msg.lower()

def test_validate_prompt_log():
    # Less than 8
    prompts = [{"stage": "1", "prompt": "test"} for _ in range(5)]
    ok, msg, count = validate_prompt_log(prompts)
    assert ok is False
    assert count == 5
    
    # 8 prompts
    prompts_8 = [{"stage": f"Stage {i}", "prompt": f"Prompt {i}"} for i in range(8)]
    ok, msg, count = validate_prompt_log(prompts_8)
    assert ok is True
    assert count == 8

def test_validate_sources():
    # Only 1 source
    sources = [{"title": "Book 1", "notes": "notes"}]
    ok, msg, count = validate_sources(sources)
    assert ok is False
    assert count == 1
    
    # 2 sources
    sources.append({"title": "Book 2", "authorOrg": "Org"})
    ok, msg, count = validate_sources(sources)
    assert ok is True
    assert count == 2

def test_validate_chapter_sections():
    # Under 10 sections
    sections = [{"title": f"Sec {i}", "explanation": "exp"} for i in range(5)]
    ok, msg, count = validate_chapter_sections(sections)
    assert ok is False
    
    # 10 sections with content
    sections_10 = [{"title": f"Sec {i}", "explanation": f"Explanation {i}"} for i in range(10)]
    ok, msg, count = validate_chapter_sections(sections_10)
    assert ok is True
    assert count == 10

def test_validate_rubric():
    # Unscored rubric
    empty_rubric = default_state()["rubric"]
    ok, _ = validate_rubric(empty_rubric)
    assert ok is False
    
    # Valid rubric
    valid_rubric = {
        k: {"score": 8, "explanation": "Detailed explanation", "smallestUsefulEdit": "Edit suggestion"}
        for k in ["clarity", "accuracy", "ageFit", "usefulnessForRevision"]
    }
    ok, msg = validate_rubric(valid_rubric)
    assert ok is True

def test_validate_fact_checks():
    # Less than 6 checked claims
    claims = [
        {"aiStatement": f"Statement {i}", "decision": "Accept", "evidenceOrReason": "Source ref"}
        for i in range(4)
    ]
    ok, msg, count = validate_fact_checks(claims)
    assert ok is False
    assert count == 4
    
    # 6 checked claims
    claims_6 = [
        {"aiStatement": f"Statement {i}", "decision": "Accept", "evidenceOrReason": "Source ref"}
        for i in range(6)
    ]
    ok, msg, count = validate_fact_checks(claims_6)
    assert ok is True
    assert count == 6

def test_never_falsely_marks_complete():
    state = default_state()
    res = check_capstone_completion(state)
    assert res["status"] == "CAPSTONE IN PROGRESS"
    assert res["isComplete"] is False
    assert res["percentage"] == 0
