import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { ArchiveService } from "../../scripts/upgrade/services/archive.service";
import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";

describe("ArchiveService", () => {
  const testDir = path.join(process.cwd(), "tests", "upgrade", "temp-archive-test");
  const outputDir = path.join(testDir, "output");

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it("should extract a zip buffer to a directory", async () => {
    // Create a mock zip
    const zip = new AdmZip();
    zip.addFile("test.txt", Buffer.from("Hello World", "utf8"));
    zip.addFile("nested/inner.txt", Buffer.from("Nested Content", "utf8"));
    const zipBuffer = zip.toBuffer();

    const service = new ArchiveService();
    await service.extract(zipBuffer, outputDir);

    // Verify files exist
    expect(fs.existsSync(path.join(outputDir, "test.txt"))).toBe(true);
    expect(fs.readFileSync(path.join(outputDir, "test.txt"), "utf8")).toBe("Hello World");

    expect(fs.existsSync(path.join(outputDir, "nested", "inner.txt"))).toBe(true);
    expect(fs.readFileSync(path.join(outputDir, "nested", "inner.txt"), "utf8")).toBe("Nested Content");
  });
});
