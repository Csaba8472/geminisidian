import { describe, it, expect } from "bun:test";
import { GeminiMergeService } from "../../scripts/upgrade/services/gemini-merge.service";

class MockGeminiMergeService extends GeminiMergeService {
  protected async runGemini(prompt: string): Promise<string> {
    // Mock response based on prompt content
    if (prompt.includes("scripts/test.ts")) {
        return "merged content";
    }
    return "unknown";
  }
}

describe("GeminiMergeService", () => {
  it("should construct a prompt and return merged content (via CLI mock)", async () => {
    const service = new MockGeminiMergeService();

    const result = await service.merge(
      "scripts/test.ts",
      "local content",
      "upstream content"
    );

    expect(result).toBe("merged content");
  });
});