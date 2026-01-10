# Product Guidelines - Geminisidian

## Tone and Voice
- **Concise & Utility-First:** All interactions with Gemini should be minimalist, direct, and focused on efficiency.
- **Directness:** Responses should avoid unnecessary conversational filler, providing the requested information or insight immediately.
- **Clarity:** Use precise language that aligns with the user's technical or knowledge-management context.

## Technical Architecture & Platform Support
- **Bun Runtime:** All automation tasks, scripts, and background processes must be implemented using the **Bun** runtime. This replaces the need for platform-specific shell scripts (Bash/PowerShell) while maintaining high performance and cross-platform consistency.
- **Cross-Platform Parity:** By using Bun, the project ensures that automation tools work identically on Windows, macOS, and Linux without OS-specific logic.

## AI Content & Metadata Standards
- **Obsidian-Specific Integration:** Leverage Obsidian's rich feature set in all generated content:
    - **Callouts:** Use `> [!INFO]`, `> [!THOUGHT]`, etc., to distinguish AI insights from user content.
    - **Internal Links:** Use `[[Link]]` syntax to connect generated summaries or reviews to existing vault notes.
    - **Frontmatter:** Include relevant YAML properties (e.g., `ai-processed: true`, `model: gemini-2.0-flash`) to ensure notes are machine-readable and easy to filter.
- **Markdown-Native:** Ensure all content remains valid, high-quality Markdown.

## Interaction & Organization Logic
- **Dedicated Thread Files:** Brainstorming sessions and "Thinking Partner" interactions for specific projects or topics should be consolidated into dedicated long-running files.
    - This approach provides a clear historical record of the dialogue without cluttering original source notes.
    - Thread files should be organized within the `06_Metadata/Threads/` or similar directory.
- **PARA Alignment:** All generated or processed notes should respect the PARA (Projects, Areas, Resources, Archive) organizational structure.
