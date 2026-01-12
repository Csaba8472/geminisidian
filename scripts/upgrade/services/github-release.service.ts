export interface ReleaseInfo {
  version: string;
  downloadUrl: string;
}

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  assets: GitHubAsset[];
}

export class GitHubReleaseService {
  constructor(private owner: string, private repo: string) {}

  async getLatestRelease(): Promise<ReleaseInfo> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/releases/latest`;
    
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Geminisidian-Upgrade-System",
        "Accept": "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch latest release: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as GitHubRelease;

    if (!data.assets || data.assets.length === 0) {
      throw new Error("No assets found in the latest release");
    }

    // Prefer zipball or tarball if explicit assets aren't what we want, but usually release assets are built.
    // For this implementation, we take the first asset or look for a zip.
    // Let's assume we want the first asset for now, or refine if multiple exist.
    // Spec says "download assets", usually a source code zip is automatically provided by GitHub as 'zipball_url',
    // but the test expects an asset. Let's return the first asset's url.
    
    const asset = data.assets[0];

    return {
      version: data.tag_name,
      downloadUrl: asset.browser_download_url,
    };
  }

  async downloadAsset(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url, {
        headers: {
            "User-Agent": "Geminisidian-Upgrade-System",
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to download asset: ${response.status} ${response.statusText}`);
    }

    return await response.arrayBuffer();
  }
}
