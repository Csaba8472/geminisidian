import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { FileScanner } from "../../scripts/upgrade/services/file-scanner.service";
import fs from "fs";
import path from "path";

describe("FileScanner", () => {
  const testDir = path.join(process.cwd(), "tests", "upgrade", "temp-scanner-test");

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    // Create a mock project structure
    const folders = [
        "scripts",
        ".gemini/skills/skill-a",
        ".config",
        "00_Inbox",
        "01_Projects",
        ".git",
        "node_modules"
    ];

    for (const f of folders) {
        fs.mkdirSync(path.join(testDir, f), { recursive: true });
        fs.writeFileSync(path.join(testDir, f, "file.txt"), "content");
    }
    fs.writeFileSync(path.join(testDir, "package.json"), "{}");
    fs.writeFileSync(path.join(testDir, "README.md"), "content");
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it("should only return system files and exclude content/meta folders", async () => {
    const scanner = new FileScanner(testDir);
    const files = await scanner.scan();

    // Should include
    expect(files).toContain(path.join("scripts", "file.txt"));
    expect(files).toContain(path.join(".gemini", "skills", "skill-a", "file.txt"));
    expect(files).toContain(path.join(".config", "file.txt"));
    expect(files).toContain("package.json");
    expect(files).toContain("README.md");

    // Should exclude content
    expect(files).not.toContain(path.join("00_Inbox", "file.txt"));
    expect(files).not.toContain(path.join("01_Projects", "file.txt"));

    // Should exclude infra
    expect(files).not.toContain(path.join(".git", "file.txt"));
    expect(files).not.toContain(path.join("node_modules", "file.txt"));
  });
});
