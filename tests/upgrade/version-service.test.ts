import { describe, it, expect, mock, beforeEach } from "bun:test";
import { VersionService } from "../../scripts/upgrade/services/version.service";

describe("VersionService", () => {
  it("should detect when an update is available", () => {
    const service = new VersionService();
    expect(service.isUpdateAvailable("0.1.0", "v0.2.0")).toBe(true);
    expect(service.isUpdateAvailable("0.1.0", "0.2.0")).toBe(true);
  });

  it("should detect when no update is available", () => {
    const service = new VersionService();
    expect(service.isUpdateAvailable("0.2.0", "v0.1.0")).toBe(false);
    expect(service.isUpdateAvailable("0.1.0", "0.1.0")).toBe(false);
    expect(service.isUpdateAvailable("0.1.0", "v0.1.0")).toBe(false);
  });

  it("should clean version strings", () => {
    const service = new VersionService();
    expect(service.cleanVersion("v1.2.3")).toBe("1.2.3");
    expect(service.cleanVersion("1.2.3")).toBe("1.2.3");
  });
});
