---
name: add-frontmatter
description: Analyzes Obsidian notes to intelligently add or update YAML frontmatter properties, enhancing organization and discoverability.
---

# Add Frontmatter Skill

Use this skill to add or update YAML frontmatter in Obsidian notes.

## Your Task

Analyze notes and add appropriate properties based on the note type:

### Standard Properties by Note Type

**Meeting Notes:**
```yaml
---
title: [Descriptive title]
date: YYYY-MM-DD
type: meeting
tags: [meeting]
status: complete
---
```

**Daily Notes:**
```yaml
---
type: daily-note
tags: [daily]
---
```

**Reference/Article Notes:**
```yaml
---
type: reference
source: "[[Source Note]]" or URL
date_saved: YYYY-MM-DD
---
```

**Project Notes:**
```yaml
---
type: project
status: in-progress
tags: [project]
---
```

## Property Guidelines
- Use lowercase with underscores: `date_created`, `action_items`.
- Fix deprecated formats: `tag` → `tags`, `alias` → `aliases`.
- Ensure valid YAML syntax.
- Quoted internal links: `project: '[[Project Name]]'`.
