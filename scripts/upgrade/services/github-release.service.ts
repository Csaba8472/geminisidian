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
  zipball_url: string;
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

    let downloadUrl: string;

    if (data.assets && data.assets.length > 0) {
        // If there are assets, prefer a zip file if available, otherwise take the first one
        const zipAsset = data.assets.find(a => a.name.endsWith('.zip'));
        downloadUrl = zipAsset ? zipAsset.browser_download_url : data.assets[0].browser_download_url;
    } else if (data.zipball_url) {
        downloadUrl = data.zipball_url;
    } else {
        throw new Error("No assets or source zipball found in the latest release");
    }

    return {
      version: data.tag_name,
      downloadUrl: downloadUrl,
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