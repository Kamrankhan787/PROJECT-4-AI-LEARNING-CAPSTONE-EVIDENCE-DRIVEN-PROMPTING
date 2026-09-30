"""
Data models and defaults for the AI Learning Capstone.
Contains default structures representing the student workspace.
"""

from typing import Dict, Any, List

def default_chapter_sections() -> List[Dict[str, Any]]:
    """Returns the 10 configurable chapter sections without inventing official names."""
    return [
        {
            "id": f"section-{i}",
            "sectionNumber": i,
            "title": f"Section {i}",
            "explanation": "",
            "examples": "",
            "commonMistakes": "",
            "revisionNotes": ""
        }
        for i in range(1, 11)
    ]

def default_flashcards() -> List[Dict[str, str]]:
    return [
        {"id": "fc-1", "question": "", "answer": ""},
        {"id": "fc-2", "question": "", "answer": ""},
        {"id": "fc-3", "question": "", "answer": ""},
        {"id": "fc-4", "question": "", "answer": ""},
        {"id": "fc-5", "question": "", "answer": ""}
    ]

def default_quiz_questions() -> List[Dict[str, Any]]:
    return [
        {
            "id": "quiz-1",
            "question": "",
            "options": ["", "", "", ""],
            "correctAnswer": 0,
            "explanation": ""
        },
        {
            "id": "quiz-2",
            "question": "",
            "options": ["", "", "", ""],
            "correctAnswer": 0,
            "explanation": ""
        },
        {
            "id": "quiz-3",
            "question": "",
            "options": ["", "", "", ""],
            "correctAnswer": 0,
            "explanation": ""
        }
    ]

def default_revision_plan() -> List[Dict[str, Any]]:
    return [
        {"day": i, "title": f"Day {i}", "activity": "", "focus": ""}
        for i in range(1, 8)
    ]

def default_rubric() -> Dict[str, Dict[str, Any]]:
    return {
        "clarity": {
            "name": "Clarity",
            "score": 0,
            "explanation": "",
            "smallestUsefulEdit": ""
        },
        "accuracy": {
            "name": "Accuracy",
            "score": 0,
            "explanation": "",
            "smallestUsefulEdit": ""
        },
        "ageFit": {
            "name": "Age-fit",
            "score": 0,
            "explanation": "",
            "smallestUsefulEdit": ""
        },
        "usefulnessForRevision": {
            "name": "Usefulness for revision",
            "score": 0,
            "explanation": "",
            "smallestUsefulEdit": ""
        }
    }

def default_state() -> Dict[str, Any]:
    return {
        "studentInfo": {
            "studentName": "",
            "classAudience": "",
            "topic": "",
            "learningGoal": "",
            "aiToolUsed": ""
        },
        "briefing": {
            "weakPrompt": "Explain [TOPIC].",
            "weakPromptOutput": "",
            "contextPrompt": {
                "audience": "",
                "learnerLevel": "",
                "learningGoal": "",
                "requirements": "",
                "assembledPrompt": "",
                "output": ""
            },
            "sourcePrompt": {
                "sourceNotes": "",
                "assembledPrompt": "",
                "supportedBySource": "",
                "additionalAiInfo": ""
            }
        },
        "options": [
            {
                "id": "option-1",
                "label": "Option 1",
                "approachName": "",
                "explanation": "",
                "strengths": "",
                "weaknesses": "",
                "status": "pending",  # 'selected', 'rejected', 'pending'
                "studentReason": ""
            },
            {
                "id": "option-2",
                "label": "Option 2",
                "approachName": "",
                "explanation": "",
                "strengths": "",
                "weaknesses": "",
                "status": "pending",
                "studentReason": ""
            },
            {
                "id": "option-3",
                "label": "Option 3",
                "approachName": "",
                "explanation": "",
                "strengths": "",
                "weaknesses": "",
                "status": "pending",
                "studentReason": ""
            }
        ],
        "optionsDecisionNotes": "",
        "chapter": {
            "sections": default_chapter_sections(),
            "flashcards": default_flashcards(),
            "quiz": default_quiz_questions(),
            "revisionPlan": default_revision_plan()
        },
        "rubric": default_rubric(),
        "factChecks": [
            {
                "id": f"fact-{i}",
                "aiStatement": "",
                "decision": "Needs checking",  # 'Accept', 'Reject', 'Modify', 'Needs checking'
                "evidenceOrReason": "",
                "correction": ""
            }
            for i in range(1, 9)
        ],
        "sources": [
            {
                "id": "source-1",
                "title": "",
                "sourceType": "Textbook / Class Source",
                "authorOrg": "",
                "url": "",
                "notes": ""
            },
            {
                "id": "source-2",
                "title": "",
                "sourceType": "Trusted Learning Source",
                "authorOrg": "",
                "url": "",
                "notes": ""
            }
        ],
        "promptLog": [
            {
                "id": "log-1",
                "stage": "1. Weak prompt",
                "prompt": "",
                "aiResponseNotes": "",
                "studentComments": "",
                "timestamp": ""
            },
            {
                "id": "log-2",
                "stage": "2. Context prompt",
                "prompt": "",
                "aiResponseNotes": "",
                "studentComments": "",
                "timestamp": ""
            },
            {
                "id": "log-3",
                "stage": "3. Source prompt",
                "prompt": "",
                "aiResponseNotes": "",
                "studentComments": "",
                "timestamp": ""
            },
            {
                "id": "log-4",
                "stage": "4. Options",
                "prompt": "",
                "aiResponseNotes": "",
                "studentComments": "",
                "timestamp": ""
            },
            {
                "id": "log-5",
                "stage": "5. Feedback",
                "prompt": "",
                "aiResponseNotes": "",
                "studentComments": "",
                "timestamp": ""
            },
            {
                "id": "log-6",
                "stage": "6. Think-hard draft",
                "prompt": "",
                "aiResponseNotes": "",
                "studentComments": "",
                "timestamp": ""
            },
            {
                "id": "log-7",
                "stage": "7. Rubric scoring",
                "prompt": "",
                "aiResponseNotes": "",
                "studentComments": "",
                "timestamp": ""
            },
            {
                "id": "log-8",
                "stage": "8. Verification",
                "prompt": "",
                "aiResponseNotes": "",
                "studentComments": "",
                "timestamp": ""
            }
        ],
        "reflection": {
            "text": "",
            "learnings": "",
            "modifications": "",
            "promptingInsights": "",
            "checkedClaimsSummary": "",
            "futureImprovements": ""
        }
    }
