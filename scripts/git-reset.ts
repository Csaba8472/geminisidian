import { spawnSync } from "bun";
import { rmSync, existsSync } from "fs";
import { join } from "path";

function run(command: string[], description: string, ignoreError = false) {
    console.log(`   ${description}...`);
    const result = spawnSync(command, { stdio: ["ignore", "inherit", "inherit"] });
    if (!result.success && !ignoreError) {
        throw new Error(`Failed to ${description}`);
    }
}

console.log("\n🔄 Git Repository Reset");

try {
    // 0. Disable line-ending warnings temporarily
    run(["git", "config", "core.autocrlf", "false"], "Disabling autocrlf warnings");

    // 1. Remove remote 'origin' to detach from upstream
    run(["git", "remote", "remove", "origin"], "Removing remote 'origin'", true);

    // 2. Create a fresh orphan branch (no history)
    run(["git", "checkout", "--orphan", "fresh-start"], "Creating temporary fresh branch");

    // 3. Stage all files
    run(["git", "add", "."], "Staging all files");

    // 4. Commit
    run(["git", "commit", "-m", "Initial commit: Geminisidian Bootstrap"], "Creating initial commit");

    // 5. Delete the old 'main' branch (try both main and master just in case)
    run(["git", "branch", "-D", "main"], "Cleaning up old main branch", true);
    run(["git", "branch", "-D", "master"], "Cleaning up old master branch", true);

    // 6. Rename current branch to 'main'
    run(["git", "branch", "-m", "main"], "Renaming branch to main");

    // 7. Cleanup .git/hooks to remove any pre-existing hooks that might interfere
    if (existsSync(join(".git", "hooks"))) {
        console.log("   Cleaning up git hooks...");
        rmSync(join(".git", "hooks"), { recursive: true, force: true });
    }

    // 8. Force garbage collection to remove old objects immediately (optional but good for cleanup)
    run(["git", "gc", "--prune=now", "--aggressive"], "Cleaning up old git objects", true);

    console.log("\n✅ Git reset complete! You have a fresh history.");
} catch (error: any) {
    console.error(`\n❌ Error during git reset: ${error.message}`);
    process.exit(1);
}