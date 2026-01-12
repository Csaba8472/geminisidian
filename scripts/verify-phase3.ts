import { FileScanner } from "./upgrade/services/file-scanner.service";
import { ChangeDetector } from "./upgrade/services/change-detector.service";
import { GeminiMergeService } from "./upgrade/services/gemini-merge.service";
import { UpgradeOrchestrator } from "./upgrade/services/upgrade-orchestrator.service";
import { AuditLogger } from "./upgrade/services/audit-logger.service";
import path from "path";
import fs from "fs";

async function run() {
  console.log("Verifying Phase 3 Services...");

  const rootDir = path.join(process.cwd(), ".tmp", "verify-phase3");
  const localDir = path.join(rootDir, "local");
  const upstreamDir = path.join(rootDir, "upstream");
  const auditPath = path.join(rootDir, "audit.md");

  if (fs.existsSync(rootDir)) fs.rmSync(rootDir, { recursive: true, force: true });
  fs.mkdirSync(localDir, { recursive: true });
  fs.mkdirSync(upstreamDir, { recursive: true });

  // 1. Setup Test Files
  // file1: New upstream
  fs.writeFileSync(path.join(upstreamDir, "new-file.ts"), "console.log('New feature from upstream');");
  
  // file2: Conflict - user modified local, upstream has updates
  fs.writeFileSync(path.join(localDir, "modified-file.ts"), "console.log('User customized message');");
  fs.writeFileSync(path.join(upstreamDir, "modified-file.ts"), "console.log('Upstream core logic update');");

  console.log("Initialized mock local and upstream directories.");

  // 2. Initialize Orchestrator
  const scanner = new FileScanner(upstreamDir); // We scan upstream to see what's available
  
  const detector = new ChangeDetector(localDir, upstreamDir);
  const merger = new GeminiMergeService(); // Uses Gemini CLI
  const logger = new AuditLogger(auditPath);
  await logger.init("0.1.0", "1.0.0", "/mock/backup");

  const orchestrator = new UpgradeOrchestrator(scanner, detector, merger, logger);

  console.log("Executing Upgrade Orchestrator...");
  const result = await orchestrator.execute();
  await logger.finalize(result.processed, result.errors);

  console.log(`Processed: ${result.processed}, Errors: ${result.errors}`);

  // 3. Verify
  const newFileExists = fs.existsSync(path.join(localDir, "new-file.ts"));
  const mergedFileContent = fs.readFileSync(path.join(localDir, "modified-file.ts"), "utf8");

  console.log(`'new-file.ts' exists locally: ${newFileExists}`);
  console.log(`'modified-file.ts' content after merge:\n---\n${mergedFileContent}\n---`);

  console.log("\nPHASE 3 VERIFICATION COMPLETE.");
}

run().catch(err => {
    console.error(err);
    console.log("\nTIP: Ensure 'gemini' CLI is installed and authenticated in your PATH.");
});
