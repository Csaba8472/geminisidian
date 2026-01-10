# Specification: Migrate .claude to .gemini (Agent Skills)

## Goal
To fully migrate the existing Claude-specific configurations and commands from the `.claude` directory to the Gemini CLI ecosystem, utilizing the **Agent Skills** system for specialized workflows and cross-platform compatibility.

## Context
The project currently has a `.claude` folder containing custom commands and MCP server configurations. To align with the **Geminisidian** vision, we need to transition these to Gemini CLI concepts, specifically using the `experimental.skills` feature to define agent personas and procedures.

## Requirements

### 1. Agent Skills Migration
- **Location:** Create the `.gemini/skills/` directory for project-specific skills.
- **Skill Implementation:** For each significant Claude command (e.g., `/daily-review`, `/research-assistant`), create a dedicated skill folder:
    - `.gemini/skills/<skill_name>/SKILL.md`: Define the persona, description, and procedural instructions.
    - `.gemini/skills/<skill_name>/scripts/`: Port any complex logic to TypeScript files (run via Bun).
- **Thinking Partner Persona:** Create a core `thinking-partner` skill that replicates the original "Thinking Partner" behavior.

### 2. MCP Server Migration
- **Gemini Vision:** Ensure the `gemini-vision.mjs` (currently in `.claude/mcp-servers/`) is migrated to a location recognized by Gemini CLI or integrated into a skill.
- **Registration:** Update Gemini CLI configuration to recognize and utilize the vision MCP server.

### 3. Cleanup
- **Removal:** Once migration is verified, delete the `.claude` directory.
- **Cross-Platform:** Ensure all new skill-based scripts use Bun and are verified to work on both Windows and Unix.

## Acceptance Criteria
- Gemini CLI recognizes all newly created skills (verified via `/skills list`).
- Commands previously in Claude (e.g., `/daily-review`) are functional via Gemini (either as skills or custom commands).
- The `.claude` directory is removed.
- All new scripts pass `bun x tsc --noEmit`.

## Out of Scope
- Creating *new* features not present in the original Claudesidian.
- Migration of GitHub Actions that don't interact with the CLI configuration.
