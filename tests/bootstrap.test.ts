import { expect, test, describe, mock } from "bun:test";
import { validateEnv, getOS } from "../scripts/bootstrap";

describe("Bootstrap - Setup & Validation", () => {
  test("getOS should return 'win32', 'darwin', or 'linux'", () => {
    const os = getOS();
    expect(['win32', 'darwin', 'linux']).toContain(os);
  });

  test("validateEnv should return true if GEMINI_API_KEY is present", () => {
    process.env.GEMINI_API_KEY = "test-key";
    expect(validateEnv()).toBe(true);
  });

  test("validateEnv should throw if GEMINI_API_KEY is missing", () => {
    const originalKey = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;
    expect(() => validateEnv()).toThrow("Missing GEMINI_API_KEY environment variable");
    process.env.GEMINI_API_KEY = originalKey;
  });
});
