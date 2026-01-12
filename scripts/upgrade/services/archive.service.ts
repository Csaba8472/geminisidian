import AdmZip from "adm-zip";
import fs from "fs";

export class ArchiveService {
  async extract(buffer: Buffer | ArrayBuffer, outputDir: string): Promise<void> {
    // Ensure buffer is a Buffer
    const data = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const zip = new AdmZip(data);
    zip.extractAllTo(outputDir, true);
  }
}
