import { describe, it, expect, beforeEach } from "bun:test";
import { ChangeDetector } from "../../scripts/upgrade/services/change-detector.service";
import fs from "fs";
import path from "path";

describe("ChangeDetector", () => {
  const testDir = path.join(process.cwd(), "tests", "upgrade", "temp-change-test");
  const localDir = path.join(testDir, "local");
  const upstreamDir = path.join(testDir, "upstream");

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(localDir, { recursive: true });
    fs.mkdirSync(upstreamDir, { recursive: true });
  });

  it("should detect 'SafeUpdate' for new files", async () => {
    fs.writeFileSync(path.join(upstreamDir, "new.ts"), "content");
    
    const detector = new ChangeDetector(localDir, upstreamDir);
    const result = await detector.detectChange("new.ts");
    
    expect(result.type).toBe("SafeUpdate");
  });

  it("should detect 'NoChange' for identical files", async () => {
    fs.writeFileSync(path.join(localDir, "same.ts"), "content");
    fs.writeFileSync(path.join(upstreamDir, "same.ts"), "content");
    
    const detector = new ChangeDetector(localDir, upstreamDir);
    const result = await detector.detectChange("same.ts");
    
    expect(result.type).toBe("NoChange");
  });

  it("should detect 'MergeNeeded' for differing files", async () => {
    fs.writeFileSync(path.join(localDir, "diff.ts"), "local content");
    fs.writeFileSync(path.join(upstreamDir, "diff.ts"), "upstream content");
    
    const detector = new ChangeDetector(localDir, upstreamDir);
    const result = await detector.detectChange("diff.ts");
    
    expect(result.type).toBe("MergeNeeded");
  });
});
