# Track Specification: Smart Upgrade System

## Overview
Implement a smart upgrade command for Geminisidian. This feature allows users to keep their installation up-to-date while automatically preserving customizations using AI-powered semantic merging. The system prioritizes automation and cross-platform consistency by relying entirely on TypeScript and Bun.

## Functional Requirements
- **Command Structure:**
    - `bun run upgrade check`: Preview changes without applying them.
    - `bun run upgrade`: Automated upgrade process.
    - `bun run upgrade force`: Skip version checks and force a reinstall of system files.
- **Update Mechanism:**
    - **Version Check:** Compare current `package.json` version against the latest GitHub Release.
    - **Download:** Download and extract the latest release archive to a temporary directory (e.g., `.tmp/geminisidian-upgrade/`).
    - **Scope:** Identify changes in "System Files" (scripts, configurations, agent skills). **Never** modify content folders (PARA folders, attachments, metadata/threads).
- **TypeScript-Native Execution:**
    - The upgrade logic and all system operations MUST be implemented in TypeScript/Bun.
    - **No Shell Scripts:** Avoid calling `.ps1` or `.sh` scripts for the upgrade process itself; use Bun's native APIs for file I/O, networking, and archive extraction.
- **Safety & Logging:**
    - **Backup:** Create a timestamped backup of *System Files Only* in `.backup/upgrade-YYYY-MM-DD-HHMMSS/` before modifications.
    - **Audit Log:** Generate a `.upgrade-checklist.md` file that lists every file checked, skipped, or updated. This serves as a record for the user, not a resumption state.
- **Automated AI Merging:**
    - **No User Interaction:** Instead of prompting for every file, the system will automatically determine the best action:
        1. **Safe Update:** If a file is new or unmodified by the user, overwrite it.
        2. **Automatic AI Merge:** If a system file (e.g., a Skill or Config) contains local changes, use the Gemini API to merge local customizations with the new upstream version automatically.
    - **Conflict Handling:** In the rare case of a failed AI merge, the system will keep the local version and log a warning in the checklist.
- **Verification & Cleanup:**
    - Update `package.json` version upon completion.
    - Remove temporary download files.
    - Display a summary of changes and the path to the backup.

## Non-Functional Requirements
- **Platform Parity:** Ensure the upgrade script works consistently across Windows, macOS, and Linux via Bun.
- **Reliability:** Atomic file operations where possible to prevent corrupted states.
- **Security:** Do not expose API keys during the AI-merge process.

## Acceptance Criteria
- [ ] Running `bun run upgrade check` correctly identifies a new version and lists intended actions.
- [ ] Running `bun run upgrade` creates a backup and performs a full update without requiring user input.
- [ ] The latest release is successfully downloaded and extracted using cross-platform Bun APIs.
- [ ] "Automatic AI merge" successfully integrates local customizations into new system files.
- [ ] A `.upgrade-checklist.md` is generated providing a clear audit trail of the upgrade.
- [ ] User content folders (PARA) remain completely untouched.
- [ ] The system remains functional on both Windows and Unix-like systems after the upgrade.
