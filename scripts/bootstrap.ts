import { platform } from "os";
import { existsSync, mkdirSync, copyFileSync, readdirSync, lstatSync, rmSync } from "fs";
import { join, resolve } from "path";
import { spawnSync } from "bun";
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string) => new Promise<string>((resolve) => rl.question(query, resolve));

export function getOS() {
  const p = platform();
  if (p === "win32") return "win32";
  if (p === "darwin") return "darwin";
  return "linux";
}

export function ensureDirectories() {
    const dirs = [
        "00_Inbox",
        "01_Projects",
        "02_Areas",
        "03_Resources",
        "04_Archive",
        "05_Attachments",
        "05_Attachments/Organized",
        "06_Metadata/Reference",
        "06_Metadata/Templates",
        "06_Metadata/Threads",
        "OLD_VAULT"
    ];
    
    console.log("\n📁 Verifying folder structure...");
    for (const dir of dirs) {
        if (!existsSync(dir)) {
            console.log(`   Creating: ${dir}`);
            mkdirSync(dir, { recursive: true });
        }
    }
    console.log("   ✅ Folder structure ready.");
}

export function installDependencies() {
    console.log("\n📦 Installing dependencies...");
    const result = spawnSync(["bun", "install"], { 
        stdio: ["inherit", "inherit", "inherit"] 
    });
    return result.success;
}

function copyFolderSync(from: string, to: string) {
    if (!existsSync(to)) mkdirSync(to, { recursive: true });

    if (getOS() === "win32") {
        const absTo = resolve(to);
        // Robocopy is more robust on Windows for deep paths
        const args = [
            from, 
            absTo, 
            "/E", 
            "/XD", ".git", "node_modules", ".obsidian", 
            "/R:0", "/W:0",
            "/NFL", "/NDL", "/NJH", "/NJS"
        ];
        
        const result = spawnSync(["robocopy", ...args], { 
            stdio: ["ignore", "inherit", "inherit"] 
        });

        // Robocopy exit codes 0-7 are success
        if (result.exitCode >= 8) {
            throw new Error(`Robocopy failed with code ${result.exitCode}`);
        }
        return;
    }
    
    const elements = readdirSync(from);
    for (const element of elements) {
        if (element === ".git" || element === "node_modules" || element === ".obsidian") continue;
        
        const stat = lstatSync(join(from, element));
        const dest = join(to, element);
        
        if (stat.isFile()) {
            copyFileSync(join(from, element), dest);
        } else if (stat.isDirectory()) {
            copyFolderSync(join(from, element), dest);
        }
    }
}

async function handleVaultImport() {
    console.log("\n🔄 Vault Import");
    console.log("   Do you have an existing Obsidian vault you'd like to import?");
    console.log("   We will copy it safely to 'OLD_VAULT/' so you can organize it later.");
    
    const answer = await question("   Import existing vault? (y/N): ");
    if (answer.toLowerCase() !== 'y') return;

    while (true) {
        const path = await question("   Enter the absolute path to your existing vault: ");
        if (!path) return;
        
        // Remove quotes if user pasted path with quotes
        const cleanPath = path.replace(/['"]/g, '');
        
        if (existsSync(cleanPath)) {
            console.log(`   Copying from ${cleanPath} to OLD_VAULT/...`);
            try {
                copyFolderSync(cleanPath, "OLD_VAULT");
                console.log("   ✅ Import complete!");
            } catch (error: any) {
                console.error(`   ❌ Error importing vault: ${error.message}`);
            }
            break;
        } else {
            console.log("   ❌ Path does not exist. Please try again or press Enter to skip.");
        }
    }
}

async function checkApiKey() {
    if (!process.env.GEMINI_API_KEY) {
        console.log("\n🔑 Gemini API Key Setup");
        console.log("   GEMINI_API_KEY not found in environment.");
        console.log("   To enable AI features, you'll need an API key from https://aistudio.google.com/apikey");
        const key = await question("   Enter API Key (or press Enter to skip for now): ");
        if (key.trim()) {
            // We can't easily set env vars for the parent shell, but we can instruct the user
            console.log("\n   ✅ Key received. To make this permanent:");
            if (getOS() === "win32") {
                console.log(`   Run: $env:GEMINI_API_KEY="${key.trim()}"`);
            } else {
                console.log(`   Run: export GEMINI_API_KEY='${key.trim()}'`);
                console.log("   And add it to your ~/.zshrc or ~/.bashrc");
            }
        }
    }
}

async function main() {
    console.log(`\n🚀 Geminisidian Bootstrap (OS: ${getOS()})`);
    console.log("==========================================");

    try {
        await checkApiKey();
        
        ensureDirectories();
        
        await handleVaultImport();
        
        if (installDependencies()) {
            console.log("\n🎉 Bootstrap completed successfully!");
            
            if (existsSync("FIRST_RUN")) {
                rmSync("FIRST_RUN");
                console.log("   Removed FIRST_RUN marker.");
            }
        } else {
            console.error("\n❌ Installation failed.");
            process.exit(1);
        }
    } catch (e: any) {
        console.error(`\n❌ Error: ${e.message}`);
        process.exit(1);
    } finally {
        rl.close();
    }
}

if (import.meta.main) {
  main();
}
