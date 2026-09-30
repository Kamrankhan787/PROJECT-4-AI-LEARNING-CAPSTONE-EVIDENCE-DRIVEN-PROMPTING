"""
Unit tests for Markdown export generation.
"""

from app.export import generate_markdown_export
from app.models import default_state

def test_markdown_export_structure():
    state = default_state()
    state["studentInfo"]["studentName"] = "Jane Doe"
    state["studentInfo"]["topic"] = "Electric Circuits"
    
    md = generate_markdown_export(state)
    
    # Required headings per requirement 19
    assert "# AI Learning Capstone" in md
    assert "## Student Information" in md
    assert "## Topic Brief" in md
    assert "## Sources" in md
    assert "## Prompt Log" in md
    assert "## Options and Feedback" in md
    assert "## Chapter" in md
    assert "## Rubric Scores" in md
    assert "## Fact Checks" in md
    assert "## Reflection" in md
    assert "## Completion Status" in md
    
    # Check that actual student info is present, not placeholder
    assert "Jane Doe" in md
    assert "Electric Circuits" in md

def test_markdown_export_no_invented_section_names():
    state = default_state()
    md = generate_markdown_export(state)
    # Must contain Section 1 through Section 10
    for i in range(1, 11):
        assert f"Section {i}" in md
