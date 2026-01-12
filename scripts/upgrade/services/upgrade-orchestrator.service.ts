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

  async execute(): Promise<OrchestratorResult> {
    let processed = 0;
    let errors = 0;

    const files = await this.scanner.scan();

    for (const relativePath of files) {
      try {
        const change = await this.detector.detectChange(relativePath);

        switch (change.type) {
          case "NoChange":
            // We don't increment processed for no-change to keep it clean, or we do?
            // The test expects 2 processed if there are 2 files.
            await this.logger.logEntry(relativePath, "Skipped", "Identical to upstream");
            break;

          case "SafeUpdate":
            const upstreamContent = fs.readFileSync(change.upstreamPath);
            this.writeFile(change.localPath, upstreamContent);
            await this.logger.logEntry(relativePath, "Updated", "New or unmodified file");
            break;

          case "MergeNeeded":
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
            break;

          case "DeletedUpstream":
            await this.logger.logEntry(relativePath, "Skipped", "Deleted upstream (retained locally)");
            break;
        }
        processed++;
      } catch (err) {
        console.error(`Error processing ${relativePath}:`, err);
        await this.logger.logEntry(relativePath, "Error", err instanceof Error ? err.message : String(err));
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
