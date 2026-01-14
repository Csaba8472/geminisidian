# Plan: Smart Upgrade System implementation

## Phase 1: Foundation & Versioning [checkpoint: 6e690ec]
- [x] Task: Implement `GitHubReleaseService` to fetch latest version and download assets using `Bun.fetch`. [6f1af9a]
- [x] Task: Implement `VersionService` to compare local `package.json` against remote release tags. [f983c37]
- [x] Task: Implement cross-platform `ArchiveService` (using a TS-native library) to extract releases to `.tmp/`. [566eed6]
- [x] Task: Conductor - User Manual Verification 'Phase 1: Foundation & Versioning' (Protocol in workflow.md) [6e690ec]

## Phase 2: Safety, Scanning & Audit [checkpoint: 3309138]
- [x] Task: Implement `BackupService` to create timestamped backups of system files (scripts, .gemini, config). [b68835d]
- [x] Task: Implement `FileScanner` to identify system files and strictly exclude content folders (00_Inbox, 01_Projects, etc.). [762a654]
- [x] Task: Implement `AuditLogger` to generate and update `.upgrade-checklist.md`. [f0385df]
- [x] Task: Conductor - User Manual Verification 'Phase 2: Safety, Scanning & Audit' (Protocol in workflow.md) [3309138]

## Phase 3: AI-Powered Automated Merging [checkpoint: bb11b80]
- [x] Task: Implement `ChangeDetector` to identify files requiring merging vs. safe overwriting. [a02564b]
- [x] Task: Implement `GeminiMergeService` to perform automated semantic merges using the Gemini API. [9743595]
- [x] Task: Implement the `UpgradeOrchestrator` to execute the main loop (Safe Update -> AI Merge -> Log). [e074f3e]
- [x] Task: Conductor - User Manual Verification 'Phase 3: AI-Powered Automated Merging' (Protocol in workflow.md) [bb11b80]

## Phase 4: CLI Integration & Finalization [checkpoint: e561dda]
- [x] Task: Create `scripts/upgrade.ts` entry point handling `check`, `force`, and standard upgrade flags. [6668e67]
- [x] Task: Implement post-upgrade verification (version update, cleanup of `.tmp/`). [6668e67]
- [x] Task: Update `package.json` to include the `upgrade` script. [a0a545a]
- [x] Task: Conductor - User Manual Verification 'Phase 4: CLI Integration & Finalization' (Protocol in workflow.md) [e561dda]
