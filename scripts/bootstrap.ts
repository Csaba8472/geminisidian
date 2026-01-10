import { platform } from "os";

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

async function main() {
    console.log(`Detected OS: ${getOS()}`);
    try {
        validateEnv();
        console.log("Environment validation passed.");
    } catch (e: any) {
        console.error(`Error: ${e.message}`);
        process.exit(1);
    }
}

// Only run if this file is executed directly
if (import.meta.main) {
  main();
}
