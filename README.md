# Project 4 — AI Learning Capstone: Evidence-Driven Prompting & Self-Review

> **An interactive student workspace designed to teach the critical loop of:**  
> **direct → question → compare → correct → verify → reflect**

[![Vite Build](https://img.shields.io/badge/Vite-5.4.11-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Python](https://img.shields.io/badge/Python-3.14%2B-3776AB?logo=python&logoColor=white)](https://python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.1%2B-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Pytest](https://img.shields.io/badge/Pytest-Passed%2014%2F14-0A9EDC?logo=pytest&logoColor=white)](https://pytest.org/)

---

## 1. Project Objective

The goal of this capstone is not simply to have AI generate textbook content. Rather, it serves as a rigorous scientific workbench where students learn how to direct generative AI models, evaluate different instructional approaches, identify errors and unverified assertions, cross-check claims against authoritative named sources, and document their learning process.

The actual generative AI chat remains external (e.g. ChatGPT, Claude, Gemini). The application serves as the student's process documentation notebook.

---

## 2. Key Features

- **Interactive 6-Step Workflow:** Guides learners from topic definition to final submission.
- **Three-Stage Prompt Briefing:**
  - *Weak Prompt:* Experience uncalibrated baseline outputs.
  - *Context Prompt:* Apply audience parameters, learner level, and pedagogical constraints.
  - *Source Prompt:* Bind AI to class notes and explicitly distinguish `SUPPORTED BY PROVIDED SOURCE` from `ADDITIONAL AI INFORMATION`.
- **Pedagogical Comparison (Three Options):**
  - Evaluate three distinct teaching styles (e.g., Narrative vs. Formal Math vs. Misconception-Busting).
  - Select one, reject the others with written reasons, and synthesize a feedback plan.
- **Mini Textbook Chapter Builder:**
  - Ten configurable sections (`Section 1` through `Section 10`, without inventing official titles).
  - Flashcards, Diagnostic Quiz, and a 7-Day Spaced Revision Schedule.
- **Rubric Self-Review:**
  - Evaluates *Clarity*, *Accuracy*, *Age-fit*, and *Usefulness for revision* on a 1–10 scale.
  - Requires the single *Smallest Useful Edit* for each dimension.
  - Clarifies that rubric scores do not equal factual verification.
- **Evidence-Driven Fact Checker:**
  - Cross-examines 6–10 empirical statements against authoritative named sources.
  - Decisions: `Accept`, `Reject`, `Modify`, `Needs checking`.
  - **No Fake Verification:** Never marks unsupported claims as verified.
- **Unified Process Notebook:**
  - Auto-compiles all sections, prompt history (8+ stages), sources table (2+ sources), and learning reflection.
- **Strict Completion System:**
  - Displays `CAPSTONE IN PROGRESS` until all 8 mandatory conditions are satisfied, then updates to `CAPSTONE COMPLETE`.
- **Export & Archival:**
  - Download as GitHub-flavored Markdown (`.md`).
  - Copy formatted Markdown to clipboard.
  - Print / Save as PDF (`window.print()`) with print-optimized CSS.

---

## 3. Technology Stack

- **Frontend:** React 18, Vite 5, Modern Vanilla CSS (Glassmorphism, CSS Custom Properties, Print Media Queries)
- **Backend:** Python 3, Flask
- **Data Persistence:** Browser `localStorage` (survives refreshes; zero external API keys or DB required)
- **Testing:** Pytest (14 automated tests covering backend API, completion logic, and markdown export)

---

## 4. Complete File Structure

```text
PROJECT-4-AI-LEARNING-CAPSTONE/
│
├── main.py                     # Entry point to launch Flask server
├── README.md                   # This documentation file
├── requirements.txt            # Python dependencies (Flask, pytest)
├── package.json                # Frontend npm configuration
├── vite.config.js              # Vite configuration with React and API proxy
├── index.html                  # HTML entry point with typography
├── conftest.py                 # Pytest workspace configuration
├── .gitignore                  # Git ignore rules
│
├── app/                        # Python backend package
│   ├── __init__.py             # Flask application factory
│   ├── routes.py               # API endpoints
│   ├── models.py               # Data models and defaults
│   ├── export.py               # Markdown generation engine
│   └── validators.py           # Strict completion rules
│
├── src/                        # Frontend source code
│   ├── components/             # All 13 mandatory UI components
│   │   ├── Header.jsx          # Top brand bar and status
│   │   ├── ProgressTracker.jsx # Visual step progress bar
│   │   ├── TopicBrief.jsx      # Step 1: Topic brief
│   │   ├── BriefingStep.jsx    # Step 2: Prompt briefing stages
│   │   ├── OptionsStep.jsx     # Step 3: Options and pedagogical choices
│   │   ├── ChapterBuilder.jsx  # Step 4: 10 Chapter sections & flashcards/quiz
│   │   ├── RubricScoring.jsx   # Step 5A: Rubric evaluation
│   │   ├── FactChecker.jsx     # Step 5B: Evidence-driven fact checker
│   │   ├── ProcessNotebook.jsx # Step 6: Unified dossier & dashboard
│   │   ├── PromptLog.jsx       # 8-Stage prompt history log
│   │   ├── SourcesTable.jsx    # Authoritative sources table
│   │   ├── Reflection.jsx      # Student learning reflection
│   │   └── ExportActions.jsx   # Download, copy, print/PDF, and clear actions
│   │
│   ├── data/
│   │   └── prompts.js          # Reusable prompt templates
│   │
│   ├── utils/
│   │   ├── storage.js          # LocalStorage persistence manager
│   │   ├── markdownExport.js   # Client-side Markdown export
│   │   └── completion.js       # Completion status engine
│   │
│   ├── App.jsx                 # Main state coordinator
│   ├── main.jsx                # React root mount
│   └── index.css               # Design system and responsive styles
│
├── public/
│   └── workflow.svg            # Standalone visual flowchart
│
├── docs/
│   ├── FLOWCHART.md            # Detailed application flowchart
│   ├── PROJECT_STRUCTURE.md    # Guide to every file and folder
│   └── USER_GUIDE.md           # Step-by-step student tutorial
│
├── tests/
│   ├── test_app.py             # Flask startup and API tests
│   ├── test_export.py          # Markdown export tests
│   └── test_validators.py      # Completion validation tests
│
└── data/
    └── .gitkeep                # Directory keeper
```

---

## 5. Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### Setup Commands

```powershell
# 1. Install frontend dependencies
npm install

# 2. Install backend Python dependencies
pip install -r requirements.txt

# 3. Build the frontend production bundle
npm run build

# 4. Run automated test suite
pytest

# 5. Start the backend application
py main.py
```

To run the Vite hot-reloading development server during development:
```powershell
npm run dev
```

---

## 6. Completion Requirements Checklist

The workspace strictly enforces eight criteria before marking the project complete:

1. [x] **Topic Brief Completed:** All fields (student, audience, topic, goal, AI tool) filled.
2. [x] **At Least 8 Prompts Logged:** Covering all 8 pedagogical stages.
3. [x] **At Least 2 Named Sources:** With title, category, and reference notes.
4. [x] **Ten Chapter Sections Completed:** Section 1 through Section 10 with titles and explanations.
5. [x] **Supporting Material Completed:** Flashcards, practice quiz, and 7-day revision plan.
6. [x] **Rubric Completed:** All 4 criteria scored 1–10 with explanations and smallest useful edits.
7. [x] **6–10 Claims Checked:** With decisions, evidence citations, and corrections.
8. [x] **Reflection Completed:** Thoughtful reflection answering guided questions (>= 50 words).

---

## 7. Export Instructions

From the bottom **Export Actions** bar:
- **Download Notebook (.md):** Creates an actual markdown file formatted with all headers and tables.
- **Copy as Markdown:** Places clean GitHub Flavored Markdown into your clipboard.
- **Print / Save as PDF:** Triggers `window.print()` using print media styling that omits buttons, navigation bars, and inputs, rendering a clean academic report suitable for PDF saving.

---

## 8. Screenshots Placeholder

*(Place application screenshots here)*

| Topic Brief & Briefing | Chapter Builder (10 Sections) | Fact Checker & Review |
|:---:|:---:|:---:|
| `docs/screenshots/briefing.png` | `docs/screenshots/chapter.png` | `docs/screenshots/factcheck.png` |

---

## 9. License

MIT License. Developed for the AI Prompting in 2026 Series.
