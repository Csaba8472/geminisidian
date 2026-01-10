# Plan: Migrate .claude to .gemini (Agent Skills)

## Phase 1: Infrastructure & Core Skill [checkpoint: fbe0e44]

- [x] Task: Initialize `.gemini/skills` and implement `thinking-partner` skill f308228
    - *Context:* Create the directory structure and the core persona that defines Geminisidian's identity.
    - *TDD:* Write a test to verify `.gemini/skills/thinking-partner/SKILL.md` exists and contains valid YAML frontmatter with name and description.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Infrastructure & Core Skill' (Protocol in workflow.md)

## Phase 2: Knowledge Management Skills [checkpoint: 93a245e]

- [x] Task: Migrate `daily-review`, `weekly-synthesis`, and `inbox-processor` b8e64da
    - *Context:* Port the procedural logic for reviewing notes and processing the PARA inbox into separate skills.
    - *TDD:* Verify each skill directory has a `SKILL.md`. Test any helper scripts using Bun.
- [x] Task: Migrate `research-assistant` and `add-frontmatter` ae5d5af
    - *Context:* Port specialized skills for knowledge expansion and metadata management.
    - *TDD:* Verify `SKILL.md` presence and frontmatter validity.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Knowledge Management Skills' (Protocol in workflow.md)

## Phase 3: System & Utility Skills [checkpoint: 35b8585]

- [x] Task: Migrate `init-bootstrap` and `upgrade` cbceb20
    - *Context:* Ensure the project maintenance commands are available as Gemini skills.
    - *TDD:* Verify `SKILL.md` and script execution via Bun.
- [x] Task: Migrate and register `gemini-vision.mjs` MCP server cbceb20
    - *Context:* Move the vision server to a permanent location and register it in the Gemini CLI configuration.
    - *TDD:* Verify the MCP server starts correctly using `bun`.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: System & Utility Skills' (Protocol in workflow.md)

## Phase 4: Cleanup

- [x] Task: Final verification and removal of `.claude` directory 977db2b
    - *Context:* Confirm all functionality is replicated in `.gemini` and purge the old configuration.
    - *Verification:* Run `bun test` for all migration tests. Ensure `/skills list` shows all migrated skills.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Cleanup' (Protocol in workflow.md)
