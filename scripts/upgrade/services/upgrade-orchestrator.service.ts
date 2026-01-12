import fs from "fs";
import path from "path";
import { FileScanner } from "./file-scanner.service";
import { ChangeDetector } from "./change-detector.service";
import { GeminiMergeService } from "./gemini-merge.service";
import { AuditLogger } from "./audit-logger.service";

export interface OrchestratorResult {
  processed: number;
  errors: number;
}

export class UpgradeOrchestrator {
  constructor(
    private scanner: FileScanner,
    private detector: ChangeDetector,
    private merger: GeminiMergeService,
    private logger: AuditLogger
  ) {}

  async execute(dryRun = false): Promise<OrchestratorResult> {
    let processed = 0;
    let errors = 0;

    const files = await this.scanner.scan();

    for (const relativePath of files) {
      try {
        const change = await this.detector.detectChange(relativePath);

        switch (change.type) {
          case "NoChange":
            if (!dryRun) await this.logger.logEntry(relativePath, "Skipped", "Identical to upstream");
            break;

          case "SafeUpdate":
            if (!dryRun) {
              const upstreamContent = fs.readFileSync(change.upstreamPath);
              this.writeFile(change.localPath, upstreamContent);
              await this.logger.logEntry(relativePath, "Updated", "New or unmodified file");
            } else {
              console.log(`[Check] Would update: ${relativePath}`);
            }
            break;

          case "MergeNeeded":
            if (!dryRun) {
              const localText = fs.readFileSync(change.localPath, "utf8");
              const upstreamText = fs.readFileSync(change.upstreamPath, "utf8");
              
              try {
                const mergedText = await this.merger.merge(relativePath, localText, upstreamText);
                this.writeFile(change.localPath, mergedText);
                await this.logger.logEntry(relativePath, "Merged", "AI-assisted merge successful");
              } catch (mergeError) {
                console.error(`Merge failed for ${relativePath}:`, mergeError);
                await this.logger.logEntry(relativePath, "Error", `Merge failed: ${mergeError instanceof Error ? mergeError.message : String(mergeError)}`);
                errors++;
              }
            } else {
              console.log(`[Check] Would merge: ${relativePath}`);
            }
            break;

          case "DeletedUpstream":
            if (!dryRun) await this.logger.logEntry(relativePath, "Skipped", "Deleted upstream (retained locally)");
            break;
        }
        processed++;
      } catch (err) {
        console.error(`Error processing ${relativePath}:`, err);
        if (!dryRun) await this.logger.logEntry(relativePath, "Error", err instanceof Error ? err.message : String(err));
        errors++;
      }
    }

    return { processed, errors };
  }

  private writeFile(filePath: string, content: string | Buffer) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
  }
}
