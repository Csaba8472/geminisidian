import semver from "semver";

export class VersionService {
  cleanVersion(version: string): string {
    return version.replace(/^v/, "");
  }

  isUpdateAvailable(currentVersion: string, latestVersion: string): boolean {
    const cleanCurrent = this.cleanVersion(currentVersion);
    const cleanLatest = this.cleanVersion(latestVersion);
    
    return semver.gt(cleanLatest, cleanCurrent);
  }
}
