---
name: init-bootstrap
description: Interactive setup wizard that orchestrates the entire Geminisidian environment setup, vault import, and personalized configuration.
---

# Initialize Bootstrap Skill

Use this skill to guide a new user through the complete setup of their Geminisidian vault. This process combines automated scripts for heavy lifting with AI intelligence for personalization.

## <INSTRUCTIONS>

### Phase 1: Foundation & Import (The Script)
1.  **Explain the Plan**: Briefly tell the user you will run the setup script to install dependencies and import their existing vault.
2.  **Execute Script**: Run `bun run setup`.
    *   *Note*: This script allows the user to interactively import an existing vault to `OLD_VAULT/`.
    *   *Troubleshooting*: If `bun` is missing, help them install it or offer to run `npm install` and manual steps.

### Phase 2: Repository Reset
1.  **Disconnect from Origin**: Ask the user if they want to detach from the original `geminisidian` repository to start their own fresh git history (Recommended for personal vaults).
    *   *Action*: If yes, run `rm -rf .git && git init && git add . && git commit -m "Initial commit: Geminisidian Bootstrap"`.
    *   *Action*: If no (they want to contribute back), skip this.

### Phase 3: Intelligent Analysis (The Brain)
1.  **Analyze Existing Vault**: Check if `OLD_VAULT/` exists (populated by the script).
    *   *Action*: Use `ls -R OLD_VAULT | head -n 50` to see the structure.
    *   *Action*: Read 3-5 random notes from `OLD_VAULT` to understand the user's writing style, frontmatter usage, and tagging patterns.
    *   *Goal*: specific insights (e.g., "User uses #tags at the bottom", "User prefers ISO dates").
2.  **Research Context**: Ask the user: *"Would you like me to research your public work (blog, website, GitHub) to better understand your context?"*
    *   *Action*: If they provide a URL, use `web_fetch` or `google_web_search` to gather key themes/topics they care about.

### Phase 4: Personalization Interview
1.  **Workflow Questions**: Ask targeted questions based on what you missed in the analysis.
    *   *Example*: "I see you use a lot of folders. Do you prefer strict hierarchy (PARA) or more loose linking?"
    *   *Example*: "Do you want to use Gemini Vision for analyzing images dropped in the vault?"
    *   *Example*: "Do you want to set up Firecrawl for turning websites into markdown?"

### Phase 5: Configuration & Finalize
1.  **Create/Update Configuration**: Based on Phase 3 & 4, create or update `CLAUDE.md` (and/or `.gemini/config.md`) with:
    *   Preferred tone/style.
    *   Project specific conventions.
    *   Commands they might use often.
2.  **Cleanup**: Ask if they want to move files from `OLD_VAULT` into the new `00_Inbox` or `04_Archive` immediately, or leave them for manual sorting.
3.  **Finish**: Run `git status` to show them the final state. Remind them to run `/daily-review` at the end of the day.

## <AVAILABLE_RESOURCES>
- `scripts/bootstrap.ts`: Handles dependency install and bulk file copying.
- `.gemini/skills/`: Reference other skills that might need configuration.
