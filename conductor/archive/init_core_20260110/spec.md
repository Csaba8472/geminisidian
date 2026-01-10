# Specification: Initialize Geminisidian Core

## Goal
To migrate the existing Claudesidian project to the **Geminisidian** architecture, establishing a cross-platform, Bun-powered, TypeScript-first environment. This track focuses on the foundational tooling and the "bootstrap" process that prepares the user's environment, ensuring parity between Windows and Unix systems.

## Context
The current project relies on Node.js, pnpm, and Bash scripts. This limits Windows compatibility and relies on heavier runtimes. We are shifting to **Bun** for its speed, built-in TypeScript support, and cross-platform APIs, fulfilling the requirement for a unified "Thinking Partner" system.

## Requirements

### 1. Environment Configuration
- **Runtime:** Switch strict dependency to Bun.
- **TypeScript:** Initialize a `tsconfig.json` optimized for Bun execution (ESM, strict mode).
- **Manifest:** Update `package.json` to remove Node-specific scripts and dependencies, replacing them with Bun equivalents.

### 2. Cross-Platform Bootstrap
- **Single Entry Point:** Create a `scripts/bootstrap.ts` file that handles initialization.
- **Logic:**
    - Detect Operating System.
    - Check for required environment variables (e.g., `GEMINI_API_KEY`).
    - Install dependencies via `bun install`.
    - Create necessary directories (e.g., `06_Metadata/Threads`).
- **Execution:** The script must run successfully on both Windows (PowerShell) and Linux/macOS (Bash) via `bun run setup`.

### 3. Verification
- The setup command must complete without errors on the host OS.
- TypeScript compilation (or check) must pass with no errors.

## Technical Constraints
- **No Bash/PowerShell Logic:** All logic must be in TypeScript/Bun APIs. The only shell commands should be simple entry points (e.g., `bun run ...`).
- **Strict Typing:** No `any` types in the bootstrap script.
