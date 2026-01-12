import { describe, it, expect, mock, beforeEach } from "bun:test";
import { GeminiMergeService } from "../../scripts/upgrade/services/gemini-merge.service";

describe("GeminiMergeService", () => {
  it("should construct a prompt and return merged content", async () => {
    const mockMergedContent = "merged content";
    
    // Mock the GoogleGenerativeAI instance and its methods
    const mockModel = {
      generateContent: mock(async () => ({
        response: {
          text: () => mockMergedContent
        }
      }))
    };

    const service = new GeminiMergeService("test-api-key");
    // Inject mock model for testing
    (service as any).model = mockModel;

    const result = await service.merge(
      "scripts/test.ts",
      "local content",
      "upstream content"
    );

    expect(result).toBe(mockMergedContent);
    expect(mockModel.generateContent).toHaveBeenCalledTimes(1);
    
    const callArgs = mockModel.generateContent.mock.calls[0][0];
    expect(callArgs).toContain("scripts/test.ts");
    expect(callArgs).toContain("local content");
    expect(callArgs).toContain("upstream content");
  });
});
