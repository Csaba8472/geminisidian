import { describe, it, expect, mock, beforeEach } from "bun:test";
import { UpgradeOrchestrator } from "../../scripts/upgrade/services/upgrade-orchestrator.service";
import fs from "fs";
import path from "path";

describe("UpgradeOrchestrator", () => {
  let mockScanner: any;
  let mockDetector: any;
  let mockMerger: any;
  let mockLogger: any;

  beforeEach(() => {
    mockScanner = {
      scan: mock(async () => ["file1.ts", "file2.ts"])
    };
    mockDetector = {
      detectChange: mock(async (p: string) => {
          if (p === "file1.ts") return { type: "SafeUpdate", localPath: "l1", upstreamPath: "u1" };
          return { type: "MergeNeeded", localPath: "l2", upstreamPath: "u2" };
      })
    };
    mockMerger = {
      merge: mock(async () => "merged content")
    };
    mockLogger = {
      logEntry: mock(async () => {})
    };
  });

  it("should orchestrate the upgrade process for multiple files", async () => {
    // We need to mock fs operations that the orchestrator will do
    const originalReadFileSync = fs.readFileSync;
    const originalWriteFileSync = fs.writeFileSync;
    const originalMkdirSync = fs.mkdirSync;
    const originalExistsSync = fs.existsSync;

    fs.readFileSync = mock(() => "content") as any;
    fs.writeFileSync = mock(() => {}) as any;
    fs.mkdirSync = mock(() => {}) as any;
    fs.existsSync = mock(() => true) as any;

    try {
      const orchestrator = new UpgradeOrchestrator(
        mockScanner as any,
        mockDetector as any,
        mockMerger as any,
        mockLogger as any
      );

      const results = await orchestrator.execute();

      expect(results.processed).toBe(2);
      expect(results.errors).toBe(0);

      expect(mockScanner.scan).toHaveBeenCalledTimes(1);
      expect(mockDetector.detectChange).toHaveBeenCalledTimes(2);
      expect(mockMerger.merge).toHaveBeenCalledTimes(1); // Only for file2.ts
      expect(mockLogger.logEntry).toHaveBeenCalledTimes(2);
      
      // Verify file writes
      expect(fs.writeFileSync).toHaveBeenCalledTimes(2);
    } finally {
      fs.readFileSync = originalReadFileSync;
      fs.writeFileSync = originalWriteFileSync;
      fs.mkdirSync = originalMkdirSync;
      fs.existsSync = originalExistsSync;
    }
  });
});
