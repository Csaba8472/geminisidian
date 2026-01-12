import { GitHubReleaseService } from "./upgrade/services/github-release.service";
import { VersionService } from "./upgrade/services/version.service";
import { ArchiveService } from "./upgrade/services/archive.service";
import { BackupService } from "./upgrade/services/backup.service";
import { FileScanner } from "./upgrade/services/file-scanner.service";
import { ChangeDetector } from "./upgrade/services/change-detector.service";
import { GeminiMergeService } from "./upgrade/services/gemini-merge.service";
import { UpgradeOrchestrator } from "./upgrade/services/upgrade-orchestrator.service";
import { AuditLogger } from "./upgrade/services/audit-logger.service";
import path from "path";
import fs from "fs";

const OWNER = "Csaba8472";
const REPO = "geminisidian";

async function main() {
    const args = process.argv.slice(2);
    const isCheck = args.includes("check");
    const isForce = args.includes("force");

    console.log(`🚀 Geminisidian Upgrade System ${isCheck ? "(Preview Mode)" : ""}`);
    
    const rootDir = process.cwd();
    const pkgPath = path.join(rootDir, "package.json");
    if (!fs.existsSync(pkgPath)) {
        throw new Error("Could not find package.json in the current directory.");
    }
    
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    const currentVersion = pkg.version;
    
    console.log(`Current version: ${currentVersion}`);

    const releaseService = new GitHubReleaseService(OWNER, REPO);
    const versionService = new VersionService();
    
    console.log("Checking for updates...");
    const latestRelease = await releaseService.getLatestRelease();
    const updateAvailable = versionService.isUpdateAvailable(currentVersion, latestRelease.version);

    if (!updateAvailable && !isForce) {
        console.log(`✅ You are already on the latest version (${latestRelease.version}).`);
        return;
    }

    if (updateAvailable) {
        console.log(`✨ A new version is available: ${latestRelease.version}`);
    } else if (isForce) {
        console.log(`⚠️ Force mode enabled. Reinstalling version ${latestRelease.version}.`);
    }

    const tempDir = path.join(rootDir, ".tmp", "geminisidian-upgrade");
    const backupBaseDir = path.join(rootDir, ".backup");
    const auditPath = path.join(rootDir, ".upgrade-checklist.md");

    // Prepare temp dir
    if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
    fs.mkdirSync(tempDir, { recursive: true });

    // Download and extract
    console.log(`Downloading ${latestRelease.downloadUrl}...`);
    const buffer = await releaseService.downloadAsset(latestRelease.downloadUrl);
    
    const archiveService = new ArchiveService();
    await archiveService.extract(Buffer.from(buffer), tempDir);
    
    // GitHub zipballs extract to a nested folder (repo-name-commitsha)
    const subfolders = fs.readdirSync(tempDir, { withFileTypes: true })
        .filter(d => d.isDirectory());
    const upstreamDir = subfolders.length === 1 ? path.join(tempDir, subfolders[0].name) : tempDir;

    const scanner = new FileScanner(upstreamDir);
    const detector = new ChangeDetector(rootDir, upstreamDir);
    const merger = new GeminiMergeService();
    const logger = new AuditLogger(auditPath);

    if (isCheck) {
        console.log("\n--- PREVIEW OF CHANGES ---");
        const orchestrator = new UpgradeOrchestrator(scanner, detector, merger, logger);
        await orchestrator.execute(true);
        console.log("\nRun 'bun run upgrade' to apply these changes.");
        
        // Cleanup temp
        if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
        return;
    }

    // Actual Upgrade
    console.log("\nStarting Upgrade...");
    
    // 1. Backup
    console.log("Creating backup of system files...");
    const backupService = new BackupService(rootDir, backupBaseDir);
    const backupDir = await backupService.createBackup([".gemini", ".config", ".scripts", "scripts", "package.json", "tsconfig.json", "bun.lock"]);
    console.log(`Backup created at: ${backupDir}`);

    // 2. Audit Log Init
    await logger.init(currentVersion, latestRelease.version, backupDir);

    // 3. Orchestrate
    const orchestrator = new UpgradeOrchestrator(scanner, detector, merger, logger);
    const result = await orchestrator.execute(false);
    
    // 4. Finalize
    await logger.finalize(result.processed, result.errors);
    
    // Update package.json version (read again to preserve other changes)
    const finalPkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    finalPkg.version = versionService.cleanVersion(latestRelease.version);
    fs.writeFileSync(pkgPath, JSON.stringify(finalPkg, null, 2));

    console.log(`\n✅ Upgrade Complete!`);
    console.log(`- Processed: ${result.processed}`);
    console.log(`- Errors: ${result.errors}`);
    console.log(`- Audit Log: .upgrade-checklist.md`);
    
    // Cleanup
    if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
}

main().catch(err => {
    console.error("\n❌ Upgrade Failed:", err.message);
    process.exit(1);
});
