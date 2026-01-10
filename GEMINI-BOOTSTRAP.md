# Obsidian Vault Guidelines - Bootstrap Template

**Getting Started with Gemini CLI + Obsidian**

## Quick Setup

1. **Start every session**: Run `git pull` to sync latest changes.
2. **After changes**: Commit and push to preserve your work.
3. **Use Agent Skills**: Leverage the specialized skills in `.gemini/skills/` for vault management.

## Version Control Best Practices

**CRITICAL - START EVERY SESSION**: Always run `git pull` at the beginning of each new session to ensure you have the latest changes from the remote repository.

**Commit workflow**:
- After creating new notes: `git add .` → `git commit -m "message"` → `git push`
- After significant edits: Commit and push immediately.
- Use `git status` to check for modifications.
- When agents modify files: Always commit those changes.

## Folder Structure (PARA Method)

```
vault/
├── 00_Inbox/           # Temporary capture point
├── 01_Projects/        # Time-bound initiatives
├── 02_Areas/           # Ongoing responsibilities
├── 03_Resources/       # Reference materials
├── 04_Archive/         # Completed/inactive items
├── 05_Attachments/     # Images, PDFs, etc.
│   └── Organized/      # Processed attachments
└── 06_Metadata/        # Documentation & templates
    ├── Reference/      # Guides and standards
    ├── Plans/          # Strategic documents
    ├── Threads/        # AI interaction history
    └── Templates/      # Reusable structures
```

## PARA Method Details

### Projects (01)
- Time-bound initiatives with clear completion criteria.
- Recommended subfolders: Research/, Drafts/, Output/.

### Areas (02)
- Ongoing responsibilities without end dates (e.g., Health, Professional Development).

### Resources (03)
- Topics of interest for reference; knowledge bases organized by subject.

### Archive (04)
- Completed or inactive items; maintain same folder structure as active sections.

## Inbox Management

### Core Principles
- Inbox is temporary; process weekly using Capture → Process → Organize.
- Maintain <20 items at any time.

### Processing Workflow
1. Delete obsolete information.
2. Move relevant material to PARA locations.
3. Tag items needing more processing with `#needs-processing`.

## File Organization Guidelines

### Naming Conventions
- Daily notes: `YYYY-MM-DD - Topic`
- Meeting notes: `Meeting - [Topic] - YYYY-MM-DD`
- Ideas: `Idea - [Brief Description]`

### Movement Rules
- Use `mv` command to avoid duplicates.
- Update internal links after moves.
- Add YAML frontmatter when organizing (use `/add-frontmatter` skill).

## Attachments Management

### Helper Scripts
```bash
bun run attachments:list        # List unprocessed files
bun run attachments:organized   # Count organized files
bun run attachments:unprocessed # Count unprocessed files
```

## Writing Style Guidelines
- Use `[[WikiLinks]]` for internal references.
- Include YAML frontmatter (dates, tags, status).
- **Style**: Concise, utility-first, and direct.

## AI Assistant Guidelines

### Before Any Organization
1. Map folder structure: `find . -type d | sort`
2. Verify all destination folders exist.

### Agent Skills
Leverage specialized skills for complex tasks:
- `/daily-review`: Perform end-of-day summary.
- `/inbox-processor`: Categorize items in `00_Inbox`.
- `/research-assistant`: Deep dive into vault topics.
- `/thinking-partner`: Explore complex problems collaboratively.

## Daily Workflows

### Start of Day
1. Run `git pull`.
2. Check inbox for items to process.

### End of Day
1. Process new inbox items.
2. Run `/daily-review`.
3. Commit and push changes.

---
_This is a bootstrap template. Customize based on your workflow and needs._
