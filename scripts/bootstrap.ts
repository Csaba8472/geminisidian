import { platform } from "os";
import { existsSync, mkdirSync } from "fs";
import { spawnSync } from "bun";

export function getOS() {
  const p = platform();
  if (p === "win32") return "win32";
  if (p === "darwin") return "darwin";
  return "linux";
}

export function validateEnv() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
  }
  return true;
}

export function ensureDirectories() {
    const dirs = ["06_Metadata/Threads"];
    for (const dir of dirs) {
        if (!existsSync(dir)) {
            console.log(`Creating directory: ${dir}`);
            mkdirSync(dir, { recursive: true });
        }
    }
}

export function installDependencies() {
    console.log("Installing dependencies...");
    const result = spawnSync(["bun", "install"], { 
        stdio: ["inherit", "inherit", "inherit"] 
    });
    return result.success;
}

async function main() {
    console.log(`Detected OS: ${getOS()}`);
    try {
        validateEnv();
        console.log("Environment validation passed.");
        ensureDirectories();
        if (installDependencies()) {
            console.log("Bootstrap completed successfully!");
        } else {
            console.error("Installation failed.");
            process.exit(1);
        }
    } catch (e: any) {
        console.error(`Error: ${e.message}`);
        process.exit(1);
    }
}

if (import.meta.main) {
  main();
}
