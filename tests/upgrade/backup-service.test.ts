import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { BackupService } from "../../scripts/upgrade/services/backup.service";
import fs from "fs";
import path from "path";

describe("BackupService", () => {
  const testDir = path.join(process.cwd(), "tests", "upgrade", "temp-backup-test");
  const sourceDir = path.join(testDir, "source");
  const backupBaseDir = path.join(testDir, "backups");

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(sourceDir, { recursive: true });
    fs.mkdirSync(backupBaseDir, { recursive: true });

    // Create some mock system files
    fs.mkdirSync(path.join(sourceDir, "scripts"), { recursive: true });
    fs.writeFileSync(path.join(sourceDir, "scripts", "test.ts"), "content");
    fs.mkdirSync(path.join(sourceDir, ".gemini"), { recursive: true });
    fs.writeFileSync(path.join(sourceDir, ".gemini", "config.json"), "{}");
    fs.writeFileSync(path.join(sourceDir, "package.json"), "{}");
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it("should backup specific directories and files", async () => {
    const service = new BackupService(sourceDir, backupBaseDir);
    const backupDir = await service.createBackup([
        "scripts",
        ".gemini",
        "package.json"
    ]);

    expect(fs.existsSync(backupDir)).toBe(true);
    expect(fs.existsSync(path.join(backupDir, "scripts", "test.ts"))).toBe(true);
    expect(fs.existsSync(path.join(backupDir, ".gemini", "config.json"))).toBe(true);
    expect(fs.existsSync(path.join(backupDir, "package.json"))).toBe(true);
    
    // Check if it's timestamped
    expect(path.basename(backupDir)).toMatch(/^upgrade-\d{4}-\d{2}-\d{2}-\d{6}$/);
  });
});
