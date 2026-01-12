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

  it("should fetch the latest release version from GitHub", async () => {
    const mockResponse = {
      tag_name: "v1.2.3",
      assets: [
        {
          name: "geminisidian-v1.2.3.zip",
          browser_download_url: "https://example.com/download.zip",
        },
      ],
    };

    globalThis.fetch = mock(async () => new Response(JSON.stringify(mockResponse)));

    const service = new GitHubReleaseService("test-owner", "test-repo");
    const release = await service.getLatestRelease();

    expect(release.version).toBe("v1.2.3");
    expect(release.downloadUrl).toBe("https://example.com/download.zip");
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/test-owner/test-repo/releases/latest",
      expect.objectContaining({
        headers: expect.objectContaining({
          "User-Agent": "Geminisidian-Upgrade-System",
        }),
      })
    );
  });

  it("should throw an error if the release has no assets", async () => {
    const mockResponse = {
      tag_name: "v1.2.3",
      assets: [],
    };

    globalThis.fetch = mock(async () => new Response(JSON.stringify(mockResponse)));

    const service = new GitHubReleaseService("test-owner", "test-repo");
    
    expect(service.getLatestRelease()).rejects.toThrow("No assets found in the latest release");
  });

  it("should throw an error if the fetch fails", async () => {
    globalThis.fetch = mock(async () => new Response("Not Found", { status: 404 }));

    const service = new GitHubReleaseService("test-owner", "test-repo");

    expect(service.getLatestRelease()).rejects.toThrow("Failed to fetch latest release");
  });
});
