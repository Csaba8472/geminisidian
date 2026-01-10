import { expect, test, describe } from "bun:test";
import { ensureDirectories, installDependencies } from "../scripts/bootstrap";
import { existsSync, rmSync } from "fs";

describe("Bootstrap - Installation & Directory Structure", () => {
  test("ensureDirectories should create 06_Metadata/Threads", () => {
    // We don't want to actually delete it if it's there and has content, 
    // but for the test we can just ensure it exists after the call.
    ensureDirectories();
    expect(existsSync("06_Metadata/Threads")).toBe(true);
  });

  test("installDependencies should call bun install", () => {
    const success = installDependencies();
    expect(success).toBe(true);
  });
});
