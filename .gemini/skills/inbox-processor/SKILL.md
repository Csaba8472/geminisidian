---
name: inbox-processor
description: Helps organize and process items in the inbox according to the PARA method (Projects, Areas, Resources, Archive).
---

# Inbox Processor Skill

Use this skill to clean up and categorize the `00_Inbox/` folder.

## Task

Review all notes in `00_Inbox/` (excluding README.md and Welcome.md) and suggest categorizations:

1. **Categorization Rules**
   - **→ 01_Projects**: Has deadline, specific outcome
   - **→ 02_Areas**: Ongoing responsibility, no end date
   - **→ 03_Resources**: Reference material, knowledge
   - **→ 04_Archive**: Old/completed, no longer active
   - **→ Delete**: No value, redundant, or temporary

2. **Suggest Actions**
   Provide a plan for each item:
   ```
   File: [filename]
   Destination: [suggested folder]
   Reason: [why this categorization]
   ```

## Remember
Look for opportunities to connect ideas, not just file them.
