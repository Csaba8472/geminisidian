import { expect, test, describe } from "bun:test";
import { existsSync, readFileSync } from "fs";

describe("Environment Configuration", () => {
  test("bunfig.toml should exist", () => {
    expect(existsSync("bunfig.toml")).toBe(true);
  });

  test("tsconfig.json should exist", () => {
    expect(existsSync("tsconfig.json")).toBe(true);
  });

  test("tsconfig.json should be valid JSON and have strict mode enabled", () => {
    const content = readFileSync("tsconfig.json", "utf-8");
    const config = JSON.parse(content);
    expect(config.compilerOptions.strict).toBe(true);
    expect(config.compilerOptions.module).toBe("ESNext");
    expect(config.compilerOptions.target).toBe("ESNext");
    expect(config.compilerOptions.moduleResolution).toBe("bundler");
  });
});
