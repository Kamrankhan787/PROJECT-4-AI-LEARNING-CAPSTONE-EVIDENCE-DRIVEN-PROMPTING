"""
Flask API routes for AI Learning Capstone.
Handles validation, Markdown export, sample state, and health checking.
"""

import os
from flask import Blueprint, jsonify, request, send_from_directory, current_app
from app.models import default_state
from app.validators import check_capstone_completion
from app.export import generate_markdown_export

api_bp = Blueprint('api', __name__)

@api_bp.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "AI Learning Capstone: Evidence-Driven Prompting & Self-Review",
        "version": "1.0.0"
    })

@api_bp.route('/api/sample', methods=['GET'])
def get_sample_state():
    """Returns sample capstone state demonstrating completed capstone for testing & guidance."""
    state = default_state()
    state["studentInfo"] = {
        "studentName": "Alex Chen",
        "classAudience": "Grade 9 Biology / Introductory Science Students",
        "topic": "Food Chains and Trophic Energy Flow",
        "learningGoal": "Understand trophic levels, 10% energy transfer rule, and biomass pyramids",
        "aiToolUsed": "Claude 3.5 Sonnet / ChatGPT"
    }
    state["briefing"]["weakPrompt"] = "Explain Food Chains and Trophic Energy Flow."
    state["briefing"]["weakPromptOutput"] = "A food chain is a sequence of organisms where nutrients and energy pass from one organism to another..."
    state["briefing"]["contextPrompt"] = {
        "audience": "Grade 9 Biology",
        "learnerLevel": "Beginner to Intermediate",
        "learningGoal": "Master the 10% ecological efficiency rule with concrete examples",
        "requirements": "Include real-world examples, clear diagrams, and address common misconceptions",
        "assembledPrompt": "Explain food chains and trophic energy flow for Grade 9 Biology students...",
        "output": "Trophic energy flow describes how calories move from primary producers through consumers..."
    }
    state["briefing"]["sourcePrompt"] = {
        "sourceNotes": "Campbell Biology Chapter 55; NCERT Class 9 Science Chapter 15 Ecosystems",
        "assembledPrompt": "Using only the provided textbook notes, explain why trophic levels rarely exceed 4 or 5...",
        "supportedBySource": "10% energy rule: Lindeman's efficiency states only ~10% of chemical energy transfers to next level.",
        "additionalAiInfo": "Biomagnification of heavy metals (like mercury) increases up trophic levels."
    }
    
    # 2 Sources
    state["sources"] = [
        {
            "id": "source-1",
            "title": "Campbell Biology (12th Edition) - Chapter 55: Ecosystems & Restoration",
            "sourceType": "Textbook / Class Source",
            "authorOrg": "Urry, Cain, Wasserman, Minorsky, Orr",
            "url": "https://www.pearson.com",
            "notes": "Covers primary production, trophic efficiency (~10% rule), and energy pyramids."
        },
        {
            "id": "source-2",
            "title": "NCERT Class 10/9 Science: Our Environment",
            "sourceType": "Trusted Learning Source",
            "authorOrg": "National Council of Educational Research and Training",
            "url": "https://ncert.nic.in/textbook.php",
            "notes": "Clear breakdown of autotrophs, heterotrophs, decomposers, and energy flow unidirectionality."
        }
    ]
    
    # 8 Prompt stages
    stages = [
        ("1. Weak prompt", "Explain food chains and energy flow.", "Very generic response with bullet points but no age calibration.", "Identified that AI lacks target audience context."),
        ("2. Context prompt", "Explain trophic levels for Grade 9 students focusing on Lindeman's 10% rule.", "Much better structure with an engaging savanna ecosystem example.", "Clear improvement when adding audience and learning objectives."),
        ("3. Source prompt", "Using Campbell Biology Ch 55 notes, explain energy loss mechanisms at each trophic step.", "Distinguished cellular respiration and heat loss accurately.", "Labeled textbook-supported facts versus extra AI examples."),
        ("4. Options", "Provide 3 distinct pedagogical approaches to explain ecological pyramids: Story-driven, Math-first, and Diagnostic-misconception.", "Generated 3 clear approaches with distinct focal points.", "Helps evaluate which pedagogy fits a 9th grade classroom."),
        ("5. Feedback", "Combine Option 1 (visual story) with Option 3 (misconceptions) while removing excessive jargon.", "Synthesized a balanced structure with clear analogies.", "Feedback loop refined the tone and instructional clarity."),
        ("6. Think-hard draft", "Draft complete textbook sections 1-10 with concrete examples, common pitfalls, and revision summaries.", "Produced full chapter text with clear breakdown.", "Draft was comprehensive but required rigorous fact checking."),
        ("7. Rubric scoring", "Evaluate the draft chapter against criteria: Clarity, Accuracy, Age-fit, Usefulness for revision.", "Highlighted clarity strengths and identified dense math in Section 4.", "Directly informed smallest useful edits."),
        ("8. Verification", "Cross-verify each ecological statement against Lindeman's original efficiency findings.", "Verified thermodynamic dissipation and clarified decomposer placement.", "Ensured that unsupported assertions were properly isolated.")
    ]
    state["promptLog"] = [
        {
            "id": f"log-{i+1}",
            "stage": stage[0],
            "prompt": stage[1],
            "aiResponseNotes": stage[2],
            "studentComments": stage[3],
            "timestamp": "2026-09-30 14:00"
        }
        for i, stage in enumerate(stages)
    ]
    
    # Options
    state["options"] = [
        {
            "id": "option-1",
            "label": "Option 1",
            "approachName": "Narrative Journey: The Life of a Calorie",
            "explanation": "Follows 1,000,000 joules of sunlight as 10,000 J are captured by grass, 1,000 J by a zebra, 100 J by a lion.",
            "strengths": "Visually intuitive, emotionally memorable, clear step-down math.",
            "weaknesses": "May obscure broader ecosystem food webs by oversimplifying into a linear story.",
            "status": "selected",
            "studentReason": "Selected because 9th graders understand concrete numbers and relatable animal examples best."
        },
        {
            "id": "option-2",
            "label": "Option 2",
            "approachName": "Formal Thermodynamic & Mathematical Analysis",
            "explanation": "Strict focus on first and second laws of thermodynamics, entropy, and trophic efficiency equations.",
            "strengths": "Mathematically rigorous and precise.",
            "weaknesses": "Too abstract and intimidating for introductory 9th grade students.",
            "status": "rejected",
            "studentReason": "Rejected because introductory biology students struggle when math precedes conceptual intuition."
        },
        {
            "id": "option-3",
            "label": "Option 3",
            "approachName": "Misconception-Busting Inquiry",
            "explanation": "Starts with common student errors (e.g. 'carnivores have more energy because they are top predators').",
            "strengths": "Directly confronts stubborn cognitive bugs and deepens critical thinking.",
            "weaknesses": "Lacks the primary foundational narrative if used purely on its own.",
            "status": "rejected",
            "studentReason": "Rejected as a standalone approach, but we integrated its best misconception alerts into Section 5."
        }
    ]
    state["optionsDecisionNotes"] = "Adopted Option 1 for the narrative spine, and integrated Option 3's misconception alerts into Section 5."
    
    # 10 Chapter sections
    section_titles = [
        "What is an Ecosystem and Trophic Level?",
        "Producers: The Solar Energy Powerhouses",
        "Primary Consumers: Herbivores in Action",
        "Secondary and Tertiary Consumers: The Predation Chain",
        "Decomposers: The Essential Recyclers",
        "The 10% Rule: Why Energy Drops at Every Step",
        "Pyramids of Energy, Biomass, and Numbers",
        "Food Chains vs. Complex Food Webs",
        "Human Impact on Trophic Balance",
        "Summary & Big Picture Ecological Insights"
    ]
    
    state["chapter"]["sections"] = [
        {
            "id": f"section-{i+1}",
            "sectionNumber": i+1,
            "title": f"Section {i+1}: {section_titles[i]}",
            "explanation": f"Detailed educational explanation of {section_titles[i].lower()} with conceptual clarity.",
            "examples": "Grasslands: Sunlight -> Prairie Grass -> Grasshopper -> Meadowlark -> Red-tailed Hawk.",
            "commonMistakes": "Thinking energy cycles endlessly like matter; in reality, energy flows one-way and dissipates as heat.",
            "revisionNotes": "Remember: Matter cycles, energy flows unidirectionally."
        }
        for i in range(10)
    ]
    
    # Supporting materials
    state["chapter"]["flashcards"] = [
        {"id": "fc-1", "question": "What is the 10% Rule in ecology?", "answer": "On average, only about 10% of chemical energy stored as biomass at one trophic level is converted to biomass at the next level."},
        {"id": "fc-2", "question": "Why does energy flow unidirectionally?", "answer": "Because energy entering ecosystems as sunlight is degraded into non-usable heat (entropy) via metabolic respiration at every step."},
        {"id": "fc-3", "question": "Why do food chains rarely have more than 5 trophic levels?", "answer": "Energy runs out; by the 5th level, there isn't enough remaining energy to sustain a viable breeding population."}
    ]
    
    state["chapter"]["quiz"] = [
        {
            "id": "quiz-1",
            "question": "If primary producers produce 50,000 kJ of biomass energy, approximately how much energy is expected at the secondary consumer level?",
            "options": ["50,000 kJ", "5,000 kJ", "500 kJ", "50 kJ"],
            "correctAnswer": 2,
            "explanation": "50,000 kJ (producers) -> 5,000 kJ (primary consumers) -> 500 kJ (secondary consumers) using the 10% rule."
        },
        {
            "id": "quiz-2",
            "question": "Which of the following cycles through an ecosystem rather than flowing one-way?",
            "options": ["Sunlight", "Carbon and nitrogen atoms", "Heat energy", "Metabolic calories"],
            "correctAnswer": 1,
            "explanation": "Nutrients/matter cycle through biogeochemical cycles; energy flows through and radiates away as heat."
        }
    ]
    
    state["chapter"]["revisionPlan"] = [
        {"day": 1, "title": "Day 1", "focus": "Core Definitions", "activity": "Read Sections 1-3, write flashcards for producers vs consumers."},
        {"day": 2, "title": "Day 2", "focus": "Trophic Levels", "activity": "Diagram an African Savanna food chain and label trophic levels 1 through 4."},
        {"day": 3, "title": "Day 3", "focus": "The 10% Rule", "activity": "Practice 10% energy calculation drills with numbers 100,000 J down to apex predators."},
        {"day": 4, "title": "Day 4", "focus": "Decomposers & Matter vs Energy", "activity": "Contrast why nutrients cycle while energy flows and dissipates as heat."},
        {"day": 5, "title": "Day 5", "focus": "Ecological Pyramids", "activity": "Compare pyramids of energy (always upright) vs pyramids of numbers/biomass."},
        {"day": 6, "title": "Day 6", "focus": "Quiz & Flashcard Drill", "activity": "Test active recall using Chapter Flashcards and self-score the practice quiz."},
        {"day": 7, "title": "Day 7", "focus": "Self-Explanation & Review", "activity": "Explain the 10% rule out loud to a peer without looking at notes."}
    ]
    
    # Rubric
    state["rubric"] = {
        "clarity": {
            "name": "Clarity",
            "score": 9,
            "explanation": "Analogies of the solar calorie journey are concrete and easy to visualize.",
            "smallestUsefulEdit": "Add a simple flowchart diagram showing energy loss arrows as heat."
        },
        "accuracy": {
            "name": "Accuracy",
            "score": 9,
            "explanation": "Distinction between matter cycling and energy dissipation is scientifically sound.",
            "smallestUsefulEdit": "Clarify that 10% is an empirical average, ranging from 5% to 20% in different ecosystems."
        },
        "ageFit": {
            "name": "Age-fit",
            "score": 9,
            "explanation": "Language fits 9th grade reading level without patronizing tone.",
            "smallestUsefulEdit": "Define 'trophic' etymology (from Greek trophe, meaning nourishment) in margin."
        },
        "usefulnessForRevision": {
            "name": "Usefulness for revision",
            "score": 10,
            "explanation": "Includes flashcards, worked calculations, common error callouts, and 7-day schedule.",
            "smallestUsefulEdit": "Add check-boxes next to 7-day revision activities."
        }
    }
    
    # 6-10 Fact checks
    state["factChecks"] = [
        {
            "id": "fact-1",
            "aiStatement": "Energy transfer efficiency between trophic levels averages roughly 10%.",
            "decision": "Accept",
            "evidenceOrReason": "Supported by Campbell Biology Ch 55 and Lindeman (1942) classic ecological studies.",
            "correction": "Verified as accurate empirical average."
        },
        {
            "id": "fact-2",
            "aiStatement": "Energy is recycled by decomposers and returned to plants.",
            "decision": "Reject",
            "evidenceOrReason": "Second law of thermodynamics: energy dissipates into heat. Only matter/nutrients are recycled.",
            "correction": "Corrected text: Decomposers recycle chemical nutrients (nitrogen, phosphorus), not energy."
        },
        {
            "id": "fact-3",
            "aiStatement": "Top predators always have the highest amount of biomass in an ecosystem.",
            "decision": "Reject",
            "evidenceOrReason": "Pyramids of energy require producers to have the greatest available energy and biomass.",
            "correction": "Corrected text: Producers have the greatest biomass; top predators have the smallest."
        },
        {
            "id": "fact-4",
            "aiStatement": "Lindeman formulated the trophic-dynamic concept in 1942.",
            "decision": "Accept",
            "evidenceOrReason": "Verified via historical scientific literature: Raymond Lindeman, Ecology 1942.",
            "correction": "Verified as factually correct."
        },
        {
            "id": "fact-5",
            "aiStatement": "All ecosystems have strictly 10% trophic efficiency across all species.",
            "decision": "Modify",
            "evidenceOrReason": "Actual ecological efficiency varies between 5% and 20% depending on organism physiology.",
            "correction": "Updated text to state that 10% is a generalized rule of thumb, with natural variation from 5% to 20%."
        },
        {
            "id": "fact-6",
            "aiStatement": "Inverted biomass pyramids can occur in certain marine ecosystems with rapid phytoplankton turnover.",
            "decision": "Accept",
            "evidenceOrReason": "Supported by marine biology textbooks; high turnover rate allows small standing crop to support larger zooplankton biomass.",
            "correction": "Verified with marine ecosystem citations."
        },
        {
            "id": "fact-7",
            "aiStatement": "Fungi and bacteria act as the primary decomposers in terrestrial biomes.",
            "decision": "Accept",
            "evidenceOrReason": "Standard ecology consensus corroborated by NCERT & Campbell Biology.",
            "correction": "Verified."
        }
    ]
    
    # Reflection
    state["reflection"] = {
        "text": "Working through this capstone fundamentally altered how I interact with generative AI. Starting with a weak prompt demonstrated how generic AI responses can be without explicit educational constraints. By steering the AI with specific learner levels and pedagogical options, I produced a chapter tailored for 9th graders. Most critically, the fact checking phase revealed a dangerous AI misconception—claiming that decomposers recycle energy rather than matter. Catching and correcting this mistake highlighted the vital importance of human-in-the-loop evidence-driven verification.",
        "learnings": "I learned that AI is a powerful drafting companion but prone to subtle scientific conflations, such as confusing energy dissipation with nutrient recycling.",
        "modifications": "I completely rewrote the decomposers section to explicitly separate thermodynamic energy loss from biogeochemical matter cycling.",
        "promptingInsights": "Iterative prompting with clear pedagogical archetypes (narrative vs math) yielded vastly better results than monolithic prompts.",
        "checkedClaimsSummary": "I checked 7 critical claims against Campbell Biology, rejecting the false claim about energy recycling and qualifying the 10% rule as an empirical average.",
        "futureImprovements": "In future projects, I will provide authoritative primary text excerpts before asking the AI to draft detailed technical sections."
    }
    
    return jsonify(state)

@api_bp.route('/api/validate', methods=['POST'])
def validate_state():
    """Validates full student capstone state and returns completion status."""
    data = request.get_json(silent=True) or {}
    result = check_capstone_completion(data)
    return jsonify(result)

@api_bp.route('/api/export/markdown', methods=['POST'])
def export_markdown():
    """Generates and returns the official Markdown notebook for download or copy."""
    data = request.get_json(silent=True) or {}
    markdown_content = generate_markdown_export(data)
    return jsonify({
        "markdown": markdown_content,
        "filename": "ai-learning-capstone-notebook.md"
    })

# Serve frontend build if dist folder exists
@api_bp.route('/', defaults={'path': ''})
@api_bp.route('/<path:path>')
def serve_frontend(path):
    static_folder = current_app.static_folder
    if static_folder and os.path.exists(os.path.join(static_folder, path)) and path != '':
        return send_from_directory(static_folder, path)
    if static_folder and os.path.exists(os.path.join(static_folder, 'index.html')):
        return send_from_directory(static_folder, 'index.html')
    return jsonify({
        "message": "AI Learning Capstone Backend API is running.",
        "endpoints": ["/api/health", "/api/sample", "/api/validate", "/api/export/markdown"]
    })
