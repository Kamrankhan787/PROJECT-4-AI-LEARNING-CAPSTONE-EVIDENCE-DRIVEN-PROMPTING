# Application Flowchart & Architecture

This document describes the complete pedagogical and technical workflow implemented in **Project 4 — AI Learning Capstone: Evidence-Driven Prompting & Self-Review**.

---

## 1. Visual Flow Overview

The diagram below reflects the visual SVG flowchart located at [`public/workflow.svg`](../public/workflow.svg).

```text
               ┌───────────────────────┐
               │        ▶ START        │
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │ STEP 1 — TOPIC BRIEF  │
               │ (Audience, Goal, AI)  │
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │   STEP 2 — BRIEFING   │
               │ 1. Weak Prompt        │
               │ 2. Context Prompt     │
               │ 3. Source Prompt      │
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │    STEP 3 — OPTIONS   │
               │ - 3 Distinct Models   │
               │ - Select 1, Reject 2  │
               │ - Provide Rationale   │
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │ STEP 4 — CHAPTER BLDR │
               │ - 10 Config Sections  │
               │ - Flashcards & Quiz   │
               │ - 7-Day Revision Plan │
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │    STEP 5 — REVIEW    │
               │ 5A. Rubric (4 criteria)
               │ 5B. Fact Check (6–10) │
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │ STEP 6 — PROCESS LOG  │
               │ - Prompt Log (8+ runs)│
               │ - Sources Table (2+)  │
               │ - Learning Reflection │
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │   COMPLETION CHECK    │
               │ (8 Mandatory Criteria)│
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │     EXPORT ACTION     │
               │ - Markdown (.md)      │
               │ - Copy Clipboard      │
               │ - Print / Save as PDF │
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │ ★ CAPSTONE COMPLETE   │
               └───────────────────────┘
```

---

## 2. Stage-by-Stage Explanations

### Step 1 — Topic Brief
- **Objective:** Select a bite-sized, curriculum-specific topic rather than an overly broad domain.
- **Data Captured:** Student name, target class/audience, topic, specific learning goal, AI tool used.
- **Autosave:** Persisted immediately to browser `localStorage`.

### Step 2 — Briefing (Three Prompt Stages)
- **Stage 1 (Weak Prompt):** Execute `Explain [TOPIC].` to see the uncalibrated default behavior of the AI model.
- **Stage 2 (Context Prompt):** Inject target grade level, student prerequisites, learning goals, and pedagogical constraints.
- **Stage 3 (Source Prompt):** Supply actual textbook excerpt or teacher class notes. Critically distinguishes:
  - `SUPPORTED BY PROVIDED SOURCE`
  - `ADDITIONAL AI INFORMATION`

### Step 3 — Options and Feedback
- **Objective:** Prompt AI for three distinct instructional approaches (e.g., Narrative Storyline vs. First-Principles Math vs. Inquiry Misconception-Busting).
- **Evaluation:** Analyze strengths and weaknesses of each option.
- **Critical Action:** Select one approach, reject the remaining two with explicit student rationale, and synthesize a feedback outline.

### Step 4 — Chapter Builder
- **Ten Configurable Sections:** `Section 1` through `Section 10` (no invented official Part A section titles).
- **Component Subsections:** Each section includes title, explanation, real-world examples, common student mistakes, and revision notes.
- **Supporting Materials:** Active-recall Flashcards (Question & Answer), Diagnostic Quiz (Multiple choice with explanations), and a 7-Day Revision Plan.

### Step 5 — Review (Rubric & Fact Checker)
- **Step 5A (Rubric Scoring):** Scores 1–10 across 4 dimensions: *Clarity*, *Accuracy*, *Age-fit*, and *Usefulness for revision*. Identifies the smallest useful edit for each.
- **Pedagogical Rule:** Numerical rubric scoring does **not** constitute factual verification.
- **Step 5B (Fact Checker):** Identifies 6–10 falsifiable empirical statements from the chapter. Assigns decisions: `Accept`, `Reject`, `Modify`, or `Needs checking`. Never displays "Verified" without cited evidence from a named source.

### Step 6 — Process Notebook & Dossier
- **Prompt History Log:** Contains minimum 8 logged interaction stages with prompt text, AI response, student comments, and timestamps.
- **Sources Table:** Catalogs at least 2 named authoritative sources with titles, types, authors, and notes.
- **Reflection:** Synthesizes learning, output modifications, prompting insights, verified claims, and future improvements with live word counting (minimum 50 words).

### Completion Gate & Export
- Validates all 8 dimensions strictly.
- Displays `CAPSTONE IN PROGRESS` until 100% satisfied, then reveals `CAPSTONE COMPLETE`.
- Student can download Markdown (`.md`), copy raw Markdown to clipboard, or invoke native browser print (`window.print()`) to generate a clean PDF.
