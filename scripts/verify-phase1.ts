import { GitHubReleaseService } from "./upgrade/services/github-release.service";
import { VersionService } from "./upgrade/services/version.service";
import { ArchiveService } from "./upgrade/services/archive.service";
import path from "path";
import fs from "fs";

async function run() {
  console.log("Verifying Phase 1 Services...");

  // 1. GitHubReleaseService
  console.log("Fetching latest release for 'Csaba8472/geminisidian'...");
  const releaseService = new GitHubReleaseService("Csaba8472", "geminisidian");
  const release = await releaseService.getLatestRelease();
  console.log(`Latest Version: ${release.version}`);
  console.log(`Download URL: ${release.downloadUrl}`);

  // 2. VersionService
  const versionService = new VersionService();
  const currentVersion = "0.0.1";
  const isUpdate = versionService.isUpdateAvailable(currentVersion, release.version);
  console.log(`Update available (vs 0.0.1): ${isUpdate}`);

  // 3. ArchiveService (Download and Extract)
  console.log("Downloading asset...");
  const buffer = await releaseService.downloadAsset(release.downloadUrl);
  console.log(`Downloaded ${buffer.byteLength} bytes.`);

  console.log("Extracting to .tmp/verify-phase1...");
  const archiveService = new ArchiveService();
  const outputDir = path.join(process.cwd(), ".tmp", "verify-phase1");
  
  if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true, force: true });
  }
  
  await archiveService.extract(buffer, outputDir);
  console.log("Extraction complete.");
  
  if (fs.existsSync(outputDir)) {
      console.log("SUCCESS: Output directory exists.");
      const files = fs.readdirSync(outputDir);
      console.log(`Files found: ${files.length}`);
  } else {
      console.error("FAILURE: Output directory not found.");
  }
}

run().catch(console.error);