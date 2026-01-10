import { expect, test, describe, mock } from "bun:test";
import { getOS } from "../scripts/bootstrap";

describe("Bootstrap - Setup & Validation", () => {
  test("getOS should return 'win32', 'darwin', or 'linux'", () => {
    const os = getOS();
    expect(['win32', 'darwin', 'linux']).toContain(os);
  });
});
