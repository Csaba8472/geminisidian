import { expect, test, describe, mock } from "bun:test";
import { existsSync } from "fs";

// Mock Bun's spawnSync before importing the module under test
mock.module("bun", () => {
  return {
    spawnSync: () => ({ success: true, exitCode: 0 }),
  };
});

import { ensureDirectories, installDependencies } from "../scripts/bootstrap";

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
