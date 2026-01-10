---
name: init-bootstrap
description: Interactive setup wizard that helps new users create a personalized configuration file based on their Obsidian workflow preferences.
---

# Initialize Bootstrap Skill

Use this skill to help a new user set up their Geminisidian vault.

## Process

1. **Initial Environment Setup**
   - Check current folder name and OS.
   - Run `bun install` to set up dependencies.
   - Check git status and initialize repository if needed.

2. **Personalization**
   - Ask about existing vault structure.
   - Ask about PARA method familiarity.
   - Determine preferred organization methods.

3. **Configuration Generation**
   - Generate a customized `README.md` or configuration file based on the user's responses.
   - Create the PARA directory structure if it doesn't exist.

## Verification
- Run `bun run setup` (which calls `scripts/bootstrap.ts`) to ensure the basic environment is ready.
