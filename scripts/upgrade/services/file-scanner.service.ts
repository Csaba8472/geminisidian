import fs from "fs";
import path from "path";

export class FileScanner {
  private excludedPrefixes = [
    "00_", "01_", "02_", "03_", "04_", "05_", "06_",
    ".git", "node_modules", ".backup", ".tmp"
  ];

  constructor(private rootDir: string) {}

  async scan(): Promise<string[]> {
    return this.walk(this.rootDir);
  }

  private walk(dir: string, relativePath = ""): string[] {
    const files: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const entryRelativePath = path.join(relativePath, entry.name);
      
      // Check if entry should be excluded
      // We check if the entry itself (at the current level) matches an excluded prefix
      // For example, if we are in root and see "00_Inbox", we skip it.
      if (this.excludedPrefixes.some(prefix => entry.name.startsWith(prefix))) {
        continue;
      }

      if (entry.isDirectory()) {
        files.push(...this.walk(path.join(dir, entry.name), entryRelativePath));
      } else {
        files.push(entryRelativePath);
      }
    }

    return files;
  }
}
