import { rmSync, existsSync } from "fs";
import { spawnSync } from "bun";

function run(command: string[], description: string) {
    console.log(`   ${description}...`);
    const result = spawnSync(command, { stdio: ["ignore", "inherit", "inherit"] });
    if (!result.success) {
        throw new Error(`Failed to ${description}`);
    }
}

console.log("\n🔄 Git Repository Reset");

try {
    if (existsSync(".git")) {
        console.log("   Removing existing .git folder...");
        // recursive true, force true to be safe
        rmSync(".git", { recursive: true, force: true });
    }

    run(["git", "init"], "Initializing new git repository");
    run(["git", "add", "."], "Staging files");
    run(["git", "commit", "-m", "Initial commit: Geminisidian Bootstrap"], "Creating initial commit");

    console.log("\n✅ Git reset complete! You have a fresh history.");
} catch (error: any) {
    console.error(`\n❌ Error during git reset: ${error.message}`);
    process.exit(1);
}
