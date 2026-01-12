# Geminisidian: Gemini CLI + Obsidian Starter Kit

Turn your Obsidian vault into an AI-powered second brain using Gemini CLI.

## What is this?

This is a pre-configured Obsidian vault structure designed to work seamlessly
with Gemini CLI, enabling you to:

- Use AI as a thinking partner, not just a writing assistant
- Organize knowledge using the PARA method
- Maintain version control with Git
- Access your vault from anywhere (including mobile)

## Quick Start

### 1. Get the Starter Kit

**Option A: Clone with Git**

```bash
# Clone with your preferred folder name (replace 'my-vault' with any name you like)
git clone https://github.com/heyitsnoah/claudesidian.git my-vault
cd my-vault
```

**Option B: Download ZIP (no Git required)**

1. Click "Code" → "Download ZIP" on GitHub
2. Extract to your desired location
3. Open the folder in Gemini CLI

### 2. Run the Setup Wizard

```bash
# Install Bun if you haven't already (https://bun.sh)
# Then run the cross-platform setup script
bun run setup
```

This will:
- Install dependencies automatically
- Intelligently analyze your existing vault structure
- Configure the environment for Gemini CLI
- Set up your PARA folder structure
- Configure Gemini Vision for image/video analysis
- Initialize Git for version control

### 3. Open in Obsidian (Optional but Recommended)

- Download [Obsidian](https://obsidian.md)
- Open vault from the Geminisidian folder
- This gives you a visual interface alongside Gemini CLI

### 4. Your First Session

Tell Gemini CLI:

```
I'm starting a new project about [topic].
I'm in thinking mode, not writing mode.
Please search my vault for any relevant existing notes,
then help me explore this topic by asking questions.
```

Or trigger one of the specialized **Agent Skills**:

- "Help me review my day" (activates `daily-review`)
- "Process my inbox" (activates `inbox-processor`)
- "Deep dive into [topic]" (activates `research-assistant`)

## Keeping Up to Date

Geminisidian includes a smart upgrade system that keeps your vault's automation tools current while protecting your local notes and customizations.

```bash
# Preview what would be updated
bun run upgrade check

# Perform the upgrade with AI-powered semantic merging
bun run upgrade
```

The upgrade system:
- **Backs up** your configuration and scripts before any changes.
- **Intelligently merges** upstream updates with your local customizations using Gemini.
- **Maintains an audit log** in `.upgrade-checklist.md` so you can review every change.

## Folder Structure

```
geminisidian/
├── 00_Inbox/           # Temporary capture point for new ideas
├── 01_Projects/        # Active, time-bound initiatives
├── 02_Areas/           # Ongoing responsibilities
├── 03_Resources/       # Reference materials and knowledge base
├── 04_Archive/         # Completed projects and inactive items
├── 05_Attachments/     # Images, PDFs, and other files
├── 06_Metadata/        # Vault configuration and templates
│   ├── Reference/      # Documentation and guides
│   ├── Threads/        # AI interaction history
│   └── Templates/      # Reusable note templates
└── .gemini/            # Gemini CLI skills and configuration
```

## Agent Skills

Geminisidian comes with pre-configured AI expertise:

- **thinking-partner**: Explore ideas through collaborative questioning.
- **inbox-processor**: Organize captures into the PARA structure.
- **research-assistant**: Deep dive into vault topics and synthesize findings.
- **daily-review**: End-of-day reflection and setup for tomorrow.
- **weekly-synthesis**: Find patterns and recurring themes in your week.
- **add-frontmatter**: Intelligently manage note metadata and YAML properties.
- **init-bootstrap**: Re-run the interactive setup wizard.
- **upgrade**: Launch the AI-powered upgrade orchestrator to sync with upstream.

## Vision & Document Analysis

With **Google Gemini Vision** configured, Geminisidian can process your attachments directly:

- **Direct image analysis**: The AI sees the actual image, not just a description.
- **PDF text extraction**: Full document text analysis.
- **Smart organization**: Auto-generate filenames based on image content.

**Getting a Gemini API key:**
1. Visit [Google AI Studio](https://aistudio.google.com)
2. Create a new API key.
3. Set it in your environment: `export GEMINI_API_KEY="your-key-here"`

## Helper Scripts

Run these with `bun run`:

- `attachments:list` - Show unprocessed attachments.
- `attachments:organized` - Count organized files.
- `attachments:unprocessed` - Count remaining files to process.
- `vault:stats` - Show vault statistics.
- `upgrade` - Run the Smart Upgrade System.

## Philosophy

1. **AI amplifies thinking, not just writing**
2. **Local files = full control**
3. **Structure enables creativity**
4. **The goal is insight, not just information**

## License

MIT - Use this however you want. Make it your own.