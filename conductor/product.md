# Initial Concept
The user wants to rewrite the existing Claudesidian project to work with the Gemini CLI and extend it with cross-platform support, specifically adding PowerShell scripts for Windows compatibility alongside the existing shell scripts.

# Product Guide - Geminisidian

## Vision
To transform the existing Claudesidian project into **Geminisidian**: a cross-platform, AI-powered second brain that leverages the Gemini CLI to turn an Obsidian vault into an interactive thinking partner.

## Target Users
- Power users of Obsidian who prefer the Gemini ecosystem.
- Developers and knowledge workers on Windows, macOS, and Linux who want a seamless, AI-integrated knowledge management system.
- PARA method practitioners who want to automate their organization using Gemini.

## Core Goals
- **Gemini Integration:** Replace and enhance the existing Claude-specific commands with optimized Gemini CLI workflows.
- **Cross-Platform Parity:** Ensure all scripts and automation tools work natively on Windows (PowerShell) and Unix-like systems (Bash).
- **Thinking Partner Capabilities:** Enable advanced brainstorming, synthesis, and research tasks within the vault using Gemini's capabilities.
- **Automated Organization:** Utilize Gemini to assist in processing the inbox, organizing attachments, and maintaining vault health.

## Key Features
- **Gemini Commands:** A suite of custom commands (e.g., `/daily-review`, `/research-assistant`) optimized for the Gemini CLI.
- **Dual-Script Architecture:** Parallel `.ps1` and `.sh` scripts for all background tasks (transcript extraction, vault stats, attachment handling).
- **Intelligent Inbox Processing:** AI-assisted classification and moving of notes into the PARA structure.
- **Cross-Platform Setup:** A robust bootstrap process that detects the operating system and sets up the environment (Node.js, Pnpm, Gemini API keys).

## Non-Functional Requirements
- **Obsidican Compatibility:** Maintain strict adherence to standard Markdown and Obsidian-flavored Markdown conventions.
- **Minimal Footprint:** Prefer lightweight scripts and direct API calls over heavy third-party dependencies.
- **Speed & Efficiency:** Optimize prompts for Gemini's "flash" models to ensure rapid responses and cost-effectiveness.
