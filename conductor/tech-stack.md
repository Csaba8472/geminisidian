# Tech Stack - Geminisidian

## Core Runtime & Package Management
- **Runtime:** **Bun** (All-in-one JavaScript/TypeScript runtime for high performance and native cross-platform support).
- **Package Manager:** **Bun** (Used for dependency installation and running scripts, replacing pnpm/npm).

## Languages & Development
- **Language:** **TypeScript** (Strictly TypeScript for all development to ensure type safety and better developer experience).
- **Module System:** ES Modules (ESM).

## AI & Integration
- **Primary AI Interface:** **Gemini CLI** (The main interface for executing custom commands and vault interactions).
- **Custom Commands:** Leveraged via Gemini CLI configuration for optimized prompt shortcuts.
- **Agent Skills:** Defined using the Gemini CLI Skills system (https://geminicli.com/docs/cli/skills/) to create specialized agents. Currently implemented: `thinking-partner`, `daily-review`, `weekly-synthesis`, `inbox-processor`, `research-assistant`, `add-frontmatter`, `init-bootstrap`, `upgrade`.
- **MCP Servers:** Local MCP servers (e.g., `gemini-vision`) integrated for multimodal capabilities.
- **SDKs:** Google Generative AI SDK (for direct API access when necessary) and Model Context Protocol (MCP) for tool-based AI capabilities.

## Environment & Platform
- **Target OS:** Windows (PowerShell/CMD), macOS (Zsh/Bash), and Linux (Bash).
- **Cross-Platform Strategy:** Rely on Bun's built-in APIs and TypeScript to abstract OS differences, ensuring a single codebase works across all platforms.

## Data & Organization
- **Storage:** Local Markdown files within an **Obsidian** vault.
- **Organization System:** PARA Method (Projects, Areas, Resources, Archive).