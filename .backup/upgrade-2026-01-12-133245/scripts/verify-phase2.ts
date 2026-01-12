import { FileScanner } from "./upgrade/services/file-scanner.service";
import { BackupService } from "./upgrade/services/backup.service";
import { AuditLogger } from "./upgrade/services/audit-logger.service";
import path from "path";
import fs from "fs";

async function run() {
  console.log("Verifying Phase 2 Services...");

  const rootDir = process.cwd();
  const backupBaseDir = path.join(rootDir, ".backup");

  // 1. FileScanner
  console.log("Scanning project for system files...");
  const scanner = new FileScanner(rootDir);
  const systemFiles = await scanner.scan();
  console.log(`Found ${systemFiles.length} system files.`);
  
  // Print a few to verify
  console.log("Sample files identified:", systemFiles.slice(0, 5));

  // 2. BackupService
  console.log("Creating verification backup of 'scripts' and 'package.json'...");
  const backupService = new BackupService(rootDir, backupBaseDir);
  const backupDir = await backupService.createBackup(["scripts", "package.json"]);
  console.log(`Backup created at: ${backupDir}`);

  // 3. AuditLogger
  console.log("Initializing verification audit log...");
  const checklistPath = path.join(rootDir, ".upgrade-checklist.verify.md");
  const logger = new AuditLogger(checklistPath);
  await logger.init("0.1.0", "1.0.0", backupDir);
  await logger.logEntry("scripts/verify-phase2.ts", "Updated", "Verification log");
  await logger.finalize(1, 0);
  console.log(`Audit log created at: ${checklistPath}`);

  console.log("\nPHASE 2 VERIFICATION COMPLETE.");
}

run().catch(console.error);
