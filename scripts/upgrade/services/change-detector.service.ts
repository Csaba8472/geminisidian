import fs from "fs";
import path from "path";

export type ChangeType = "SafeUpdate" | "MergeNeeded" | "NoChange" | "DeletedUpstream";

export interface ChangeResult {
  type: ChangeType;
  localPath: string;
  upstreamPath: string;
}

export class ChangeDetector {
  constructor(private localRootDir: string, private upstreamRootDir: string) {}

  async detectChange(relativePath: string): Promise<ChangeResult> {
    const localPath = path.join(this.localRootDir, relativePath);
    const upstreamPath = path.join(this.upstreamRootDir, relativePath);

    const localExists = fs.existsSync(localPath);
    const upstreamExists = fs.existsSync(upstreamPath);

    if (!upstreamExists) {
        return { type: "DeletedUpstream", localPath, upstreamPath };
    }

    if (!localExists) {
        return { type: "SafeUpdate", localPath, upstreamPath };
    }

    const localContent = fs.readFileSync(localPath, "utf8");
    const upstreamContent = fs.readFileSync(upstreamPath, "utf8");

    if (localContent === upstreamContent) {
        return { type: "NoChange", localPath, upstreamPath };
    }

    // For now, if they differ and both exist, we flag for merge.
    // In a more advanced version, we would check if the local file 
    // matches the *previous* upstream version.
    return { type: "MergeNeeded", localPath, upstreamPath };
  }
}
