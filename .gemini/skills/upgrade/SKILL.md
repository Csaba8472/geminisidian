---
name: upgrade
description: Intelligently upgrades Geminisidian with new features while preserving user customizations using AI-powered semantic analysis.
---

# Upgrade Skill

Use this skill to update Geminisidian to the latest version.

## Task

1. **Version Check**
   - Check current version from `package.json`.
   - Compare with the latest version from GitHub (or the official source).

2. **Backup**
   - Create a timestamped backup of configuration files and custom scripts.

3. **Analysis & Merge**
   - Analyze what has changed in the latest release.
   - Use AI to merge new features with existing user customizations (e.g., in `conductor/`).

4. **Execution**
   - Apply updates safely.
   - Run `bun install` to update dependencies.

## Verification
- Confirm the new version is reflected in `package.json`.
- Verify core functionality using `bun test`.
