import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { AuditLogger } from "../../scripts/upgrade/services/audit-logger.service";
import fs from "fs";
import path from "path";

describe("AuditLogger", () => {
  const testFile = path.join(process.cwd(), "tests", "upgrade", ".upgrade-checklist.test.md");

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it("should create and update the audit log", async () => {
    const logger = new AuditLogger(testFile);
    await logger.init("v1.0.0", "v1.1.0", "/backups/test");
    
    await logger.logEntry("scripts/test.ts", "Updated", "Safe overwrite");
    await logger.logEntry("config/settings.json", "Merged", "AI-assisted merge");
    
    await logger.finalize(2, 0);

    const content = fs.readFileSync(testFile, "utf8");
    expect(content).toContain("# Upgrade Audit Log: v1.0.0 -> v1.1.0");
    expect(content).toContain("Backup created at:");
    expect(content).toContain("/backups/test");
    expect(content).toContain("| scripts/test.ts | [x] Updated | Safe overwrite |");
    expect(content).toContain("| config/settings.json | [x] Merged | AI-assisted merge |");
    expect(content).toContain("## Summary");
    expect(content).toContain("- Total Files Processed: 2");
  });
});
