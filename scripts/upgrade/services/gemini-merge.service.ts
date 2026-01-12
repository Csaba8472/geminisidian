import { spawn } from "bun";

export class GeminiMergeService {
  constructor() {}

  async merge(filename: string, localContent: string, upstreamContent: string): Promise<string> {
    const prompt = `
Merge the following two versions of the file '${filename}'. 
The 'LOCAL' version contains the user's customizations.
The 'UPSTREAM' version contains the new updates from the original repository.

Please perform a semantic merge that incorporates the new features from UPSTREAM while keeping the user's LOCAL changes.

--- LOCAL VERSION ---
${localContent}

--- UPSTREAM VERSION ---
${upstreamContent}

--- MERGED VERSION ---
`;

    const fullPrompt = `You are an expert software engineer specialized in merging file conflicts. Your goal is to intelligently merge local user customizations with new upstream changes while preserving functionality and existing user intent. Return ONLY the merged file content, without any markdown formatting or explanations.

${prompt}`;

    return await this.runGemini(fullPrompt);
  }

  protected async runGemini(prompt: string): Promise<string> {
    // Note: This relies on 'gemini' being in the PATH and authenticated.
    const proc = spawn(["gemini", "--output-format", "text"], {
        stdin: Buffer.from(prompt), // Pass prompt directly to stdin
        stdout: "pipe",
        stderr: "pipe",
    });

    const stdout = await new Response(proc.stdout).text();
    const stderr = await new Response(proc.stderr).text();
    const exitCode = await proc.exited;

    if (exitCode !== 0) {
        throw new Error(`Gemini CLI failed with exit code ${exitCode}: ${stderr}`);
    }

    let text = stdout;
    // Cleanup if LLM includes markdown blocks
    text = text.replace(/^```[a-z]*\n/i, "").replace(/\n```$/i, "");
    
    return text.trim();
  }
}
