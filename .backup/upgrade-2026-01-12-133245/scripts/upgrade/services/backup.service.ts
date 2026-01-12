import fs from "fs";
import path from "path";

export class BackupService {
  constructor(private sourceDir: string, private backupBaseDir: string) {}

  async createBackup(items: string[]): Promise<string> {
    const timestamp = new Date().toISOString()
        .replace(/T/, "-")
        .replace(/:/g, "")
        .replace(/\..+/, "")
        .replace(/-/g, "-") // ISO is YYYY-MM-DD
        .split('-').join('-').replace('T', '-'); // Simplified below
    
    // Better timestamp format: YYYY-MM-DD-HHMMSS
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const ts = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    
    const backupDir = path.join(this.backupBaseDir, `upgrade-${ts}`);

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    for (const item of items) {
      const sourcePath = path.join(this.sourceDir, item);
      const destPath = path.join(backupDir, item);

      if (fs.existsSync(sourcePath)) {
        // Use recursive copy for directories
        fs.cpSync(sourcePath, destPath, { recursive: true });
      }
    }

    return backupDir;
  }
}
