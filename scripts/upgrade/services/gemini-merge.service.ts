import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiMergeService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey?: string) {
    const key = apiKey || process.env.GEMINI_API_KEY;
    if (!key) {
      // We don't throw here if we want to allow mocking in tests, 
      // but the test I wrote injects the model. 
      // Let's throw if no key is provided and no model is injected.
    }
    if (key) {
        this.genAI = new GoogleGenerativeAI(key);
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "You are an expert software engineer specialized in merging file conflicts. Your goal is to intelligently merge local user customizations with new upstream changes while preserving functionality and existing user intent. Return ONLY the merged file content, without any markdown formatting or explanations."
        });
    }
  }

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

    if (!this.model) {
        throw new Error("Gemini Model not initialized. Ensure GEMINI_API_KEY is set.");
    }

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Cleanup if LLM includes markdown blocks
    text = text.replace(/^```[a-z]*\n/i, "").replace(/\n```$/i, "");
    
    return text.trim();
  }
}
