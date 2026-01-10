# Plan: Initialize Geminisidian Core

## Phase 1: Environment & Configuration [checkpoint: 0d64f98]

- [x] Task: Create `bunfig.toml` and configure `tsconfig.json` for Bun (Strict Mode) a1af3a5
    - *Context:* Define the compiler options and runtime behavior.
    - *Verification:* `bun run tsc --noEmit` should pass on a dummy file.
- [x] Task: Clean and Migrate `package.json` d60f27a
    - *Context:* Remove Node/pnpm specifics. Add `bun` types. Update scripts to use `bun`.
    - *Verification:* `bun install` runs successfully.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Environment & Configuration' (Protocol in workflow.md)

## Phase 2: Cross-Platform Bootstrap Script [checkpoint: fffd972]

- [x] Task: Implement `scripts/bootstrap.ts` - Setup & Validation 6d103bc
    - *Context:* Create the script entry point. Implement OS detection and Environment Variable validation (`GEMINI_API_KEY`).
    - *TDD:* Write tests to mock different OS environments and missing keys.
- [x] Task: Implement `scripts/bootstrap.ts` - Installation & Directory Structure 99dc242
    - *Context:* Implement `bun install` execution and directory creation (PARA folders, `06_Metadata/Threads`) using Bun's `fs` API.
    - *TDD:* Write tests to verify directories are created and install command is called.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Cross-Platform Bootstrap Script' (Protocol in workflow.md)
