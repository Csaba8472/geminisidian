---
name: day-planner
description: Helps you plan your day by analyzing active projects, previous daily notes, and your current energy levels.
---

# Day Planner Skill

Use this skill to start your day with intention. It helps you prioritize tasks based on your active projects and previous commitments.

## <INSTRUCTIONS>

### Phase 1: Context Gathering
1.  **Identify Today**: Determine today's date (YYYY-MM-DD).
2.  **Check Previous Context**:
    *   Find the most recent Daily Note (e.g., yesterday's).
    *   Read the "For Tomorrow", "Tomorrow's Focus", or "Open Loops" sections.
    *   *Goal*: specific items you committed to yesterday.
3.  **Scan Projects**:
    *   List the subdirectories in `01_Projects`.
    *   *Action*: Select 3-5 random active projects and briefly check their `README.md` or `Goals` to see what's "next".

### Phase 2: Planning Interview
1.  **Present Context**:
    *   "Good morning! Here's what you left for yourself yesterday: [List items]"
    *   "You have these active projects: [List 3-5 projects]"
2.  **Ask for Focus**:
    *   "What is your single most important goal for today?"
    *   "Which of these projects needs attention today?"
    *   "Do you have any hard landscape items (meetings, appointments)?"

### Phase 3: Plan Generation
1.  **Draft the Plan**:
    *   Combine the user's focus, project tasks, and carry-over items.
    *   Structure it as a prioritized list or a time-blocked schedule (depending on user preference).
2.  **Update Daily Note**:
    *   Find or create today's Daily Note (e.g., `YYYY-MM-DD.md`).
    *   If creating, use the template from `06_Metadata/Templates/Daily Note Template.md`.
    *   Add or update a `## Plan` or `## Today's Focus` section with the generated plan.

### Phase 4: Motivation
1.  **Closing**:
    *   Offer a quick encouraging remark or a relevant quote from their `03_Resources` if available.
    *   "You're all set. Let's crush [Main Goal]!"

## <AVAILABLE_RESOURCES>
- `01_Projects/`: Source of active work.
- `06_Metadata/Templates/Daily Note Template.md`: Structure for the daily note.
