import { copyFile } from 'node:fs/promises';

export interface FileProcessor {
  shouldProcess(filePath: string): boolean;
  process(filePath: string): Promise<void>;
}

export class GriffelRawStylesProcessor implements FileProcessor {
  shouldProcess(filePath: string): boolean {
    return filePath.includes('.styles.js');
  }

  async process(filePath: string): Promise<void> {
    const rawFilePath = filePath.replace('.styles.', '.styles.raw.');
    await copyFile(filePath, rawFilePath);
  }
}

export async function applyFileProcessors(filePath: string, processors: FileProcessor[]): Promise<void> {
  for (const processor of processors) {
    if (processor.shouldProcess(filePath)) {
      await processor.process(filePath);
    }
  }
}
