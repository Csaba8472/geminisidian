import { describe, it, expect, mock, beforeEach, afterEach } from "bun:test";
import { GitHubReleaseService } from "../../scripts/upgrade/services/github-release.service";

describe("GitHubReleaseService", () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should fetch the latest release version and prefer assets", async () => {
    const mockResponse = {
      tag_name: "v1.2.3",
      assets: [
        {
          name: "geminisidian-v1.2.3.zip",
          browser_download_url: "https://example.com/download.zip",
        },
      ],
      zipball_url: "https://example.com/source.zip"
    };

    globalThis.fetch = mock(async () => new Response(JSON.stringify(mockResponse)));

    const service = new GitHubReleaseService("test-owner", "test-repo");
    const release = await service.getLatestRelease();

    expect(release.version).toBe("v1.2.3");
    expect(release.downloadUrl).toBe("https://example.com/download.zip");
  });

  it("should fall back to zipball_url if no assets are present", async () => {
    const mockResponse = {
      tag_name: "v1.2.3",
      assets: [],
      zipball_url: "https://example.com/source.zip"
    };

    globalThis.fetch = mock(async () => new Response(JSON.stringify(mockResponse)));

    const service = new GitHubReleaseService("test-owner", "test-repo");
    const release = await service.getLatestRelease();

    expect(release.version).toBe("v1.2.3");
    expect(release.downloadUrl).toBe("https://example.com/source.zip");
  });

  it("should throw an error if neither assets nor zipball_url are present", async () => {
    const mockResponse = {
      tag_name: "v1.2.3",
      assets: [],
      // no zipball_url
    };

    globalThis.fetch = mock(async () => new Response(JSON.stringify(mockResponse)));

    const service = new GitHubReleaseService("test-owner", "test-repo");
    
    expect(service.getLatestRelease()).rejects.toThrow("No assets or source zipball found");
  });

  it("should throw an error if the fetch fails", async () => {
    globalThis.fetch = mock(async () => new Response("Not Found", { status: 404 }));

    const service = new GitHubReleaseService("test-owner", "test-repo");

    expect(service.getLatestRelease()).rejects.toThrow("Failed to fetch latest release");
  });
});