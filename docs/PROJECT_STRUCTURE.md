# Project Structure & Architecture Reference

This document explains the organization and purpose of every directory and file in **Project 4 — AI Learning Capstone: Evidence-Driven Prompting & Self-Review**.

---

## Complete Directory Tree

```text
PROJECT-4-AI-LEARNING-CAPSTONE/
│
├── main.py                     # Entry point for the Flask backend server
├── README.md                   # Complete repository documentation and user guide
├── requirements.txt            # Minimal Python dependencies (Flask, pytest)
├── package.json                # Frontend npm configuration and scripts
├── vite.config.js              # Vite build setup with React plugin and API proxy
├── index.html                  # HTML entry point with modern typography & meta tags
├── conftest.py                 # Pytest workspace path configuration
├── .gitignore                  # Git ignore rules for Python, Node, and Vite artifacts
│
├── app/                        # Python backend package
│   ├── __init__.py             # Flask application factory (create_app)
│   ├── routes.py               # API endpoints (/api/health, /api/sample, /api/validate, /api/export)
│   ├── models.py               # Data schema defaults and factory structures
│   ├── export.py               # Backend Markdown generation engine
│   └── validators.py           # Strict completion rules and verification checker
│
├── src/                        # Frontend source code (React + Vite)
│   │
│   ├── components/             # All 13 mandatory UI components
│   │   ├── Header.jsx          # Top branding bar with live status badge and demo loader
│   │   ├── ProgressTracker.jsx # Visual step progress bar (Steps 1–6)
│   │   ├── TopicBrief.jsx      # Step 1: Student info, topic, learning goal, AI tool
│   │   ├── BriefingStep.jsx    # Step 2: Weak, Context, and Source prompt stages
│   │   ├── OptionsStep.jsx     # Step 3: 3 Explanatory approaches, select & reject
│   │   ├── ChapterBuilder.jsx  # Step 4: 10 Sections, flashcards, quiz, 7-day plan
│   │   ├── RubricScoring.jsx   # Step 5A: 4 Evaluation criteria (1–10) & micro-edits
│   │   ├── FactChecker.jsx     # Step 5B: 6–10 Claims verified against named sources
│   │   ├── ProcessNotebook.jsx # Step 6: Unified dossier combining all student artifacts
│   │   ├── PromptLog.jsx       # 8-Stage prompt history logging table
│   │   ├── SourcesTable.jsx    # Authoritative reference catalog (minimum 2 sources)
│   │   ├── Reflection.jsx      # Final learning reflection with live word counting
│   │   └── ExportActions.jsx   # Deliverables bar (Download .md, Copy, Print/PDF, Reset)
│   │
│   ├── data/
│   │   └── prompts.js          # Reusable prompt templates for all 8 capstone stages
│   │
│   ├── utils/
│   │   ├── storage.js          # Browser localStorage persistence manager
│   │   ├── markdownExport.js   # Client-side Markdown generator and file downloader
│   │   └── completion.js       # Strict completion verification algorithm
│   │
│   ├── App.jsx                 # Top-level state coordinator and workflow view router
│   ├── main.jsx                # React root mount script
│   └── index.css               # Comprehensive stylesheet with glassmorphism & print rules
│
├── public/
│   └── workflow.svg            # Standalone vector flowchart of the 14-step capstone pipeline
│
├── docs/                       # Project documentation
│   ├── FLOWCHART.md            # Detailed narrative flowchart of every stage
│   ├── PROJECT_STRUCTURE.md    # This file (file and directory directory reference)
│   └── USER_GUIDE.md           # Step-by-step walkthrough for students and instructors
│
├── tests/                      # Automated test suite
│   ├── test_app.py             # Flask startup, routes, and API behavior tests
│   ├── test_export.py          # Markdown export formatting and section compliance tests
│   └── test_validators.py      # Strict completion criteria unit tests
│
└── data/                       # Local directory for exports and backups
    └── .gitkeep                # Git tracking placeholder
```

---

## Detailed Component & Module Descriptions

### Backend (`app/` & `main.py`)
- **`main.py`**: Invokes `create_app()` and launches the Flask development server on port 5000 with debug mode enabled.
- **`app/__init__.py`**: Configures the Flask application instance, registers the blueprint, and sets static asset routing.
- **`app/routes.py`**:
  - `GET /api/health`: Confirms server health and metadata.
  - `GET /api/sample`: Returns an exemplary, completed biology capstone state for instruction and testing.
  - `POST /api/validate`: Runs server-side verification of completion rules.
  - `POST /api/export/markdown`: Assembles and returns the full Markdown notebook string.
- **`app/models.py`**: Standardizes the data dictionary representing a student capstone workspace.
- **`app/validators.py`**: Enforces strict verification. Ensures projects are never falsely marked complete.
- **`app/export.py`**: Assembles clean GitHub Flavored Markdown adhering strictly to required section headings.

### Frontend (`src/`)
- **`src/components/Header.jsx`**: Displays title, subtitle, live status indicator (`CAPSTONE COMPLETE` vs `CAPSTONE IN PROGRESS`), and a demo state loader.
- **`src/components/ProgressTracker.jsx`**: Allows direct jumping between Steps 1 through 6 while displaying completion checkmarks.
- **`src/components/TopicBrief.jsx`**: Inputs student name, class audience, specific topic, learning goal, and AI tool used.
- **`src/components/BriefingStep.jsx`**: Implements Weak, Context, and Source prompting stages, enforcing explicit differentiation between source-supported information and additional AI-generated content.
- **`src/components/OptionsStep.jsx`**: Facilitates the pedagogical comparison of three explanatory models (Option 1, Option 2, Option 3) with selection, rejection, and synthesis.
- **`src/components/ChapterBuilder.jsx`**: Provides ten configurable chapter sections (`Section 1` through `Section 10`), flashcards, diagnostic quiz, and a 7-day revision plan.
- **`src/components/RubricScoring.jsx`**: Evaluates clarity, accuracy, age-fit, and usefulness for revision on a 1–10 scale with smallest useful edits. Clarifies that rubric scores do not replace empirical fact checking.
- **`src/components/FactChecker.jsx`**: Cross-examines 6–10 empirical claims against named sources. Enforces the "No Fake Verification" rule.
- **`src/components/ProcessNotebook.jsx`**: Live unified dossier updating in real time.
- **`src/components/PromptLog.jsx`**: Logs all 8 interaction stages with timestamps, student reflections, and prompt text.
- **`src/components/SourcesTable.jsx`**: Catalogs at least 2 named sources across Textbook, Teacher Guidance, Trusted Learning, and Web categories.
- **`src/components/Reflection.jsx`**: Guided reflection prompts with live word count verification (minimum 50 words).
- **`src/components/ExportActions.jsx`**: Generates deliverables via `.md` download, clipboard copy, print-to-PDF (`window.print()`), and modal-guarded project reset.
- **`src/utils/storage.js`**: Manages `localStorage` key `ai-learning-capstone-state`.
- **`src/utils/completion.js`**: Client-side implementation of the 8 completion checks.
- **`src/utils/markdownExport.js`**: Converts active React state into standard Markdown.
- **`src/data/prompts.js`**: Contains copyable prompt templates for all 8 capstone stages.

### Tests (`tests/`)
- **`tests/test_app.py`**: Tests Flask endpoints, health check, sample loader, validation API, and export API.
- **`tests/test_validators.py`**: Tests individual validators for topic brief, prompt log, sources, chapter sections, rubric, and fact checks.
- **`tests/test_export.py`**: Verifies exported Markdown headers and ensures no invented section titles.
