/* eslint-disable @typescript-eslint/explicit-member-accessibility */

/**
 COPIED from https://github.com/nrwl/nx/blob/master/packages/nx/src/internal-testing-utils/temp-fs.ts
 */
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  realpathSync,
  renameSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'path';
import { tmpdir } from 'os';
import { joinPathFragments, workspaceRoot } from '@nx/devkit';
import { setWorkspaceRoot } from 'nx/src/utils/workspace-root';

type NestedFiles = {
  [fileName: string]: string;
};

export class TempFs {
  readonly tempDir: string;
  private readonly directoryName: string;

  private readonly previousWorkspaceRoot: string;

  constructor(directoryName: string, overrideWorkspaceRoot = true) {
    this.directoryName = directoryName;
    this.tempDir = realpathSync(mkdtempSync(join(tmpdir(), this.directoryName)));
    this.previousWorkspaceRoot = workspaceRoot;

    if (overrideWorkspaceRoot) {
      setWorkspaceRoot(this.tempDir);
    }
  }

  async createFiles(fileObject: NestedFiles) {
    await Promise.all(
      Object.keys(fileObject).map(async path => {
        await this.createFile(path, fileObject[path]);
      }),
    );
  }

  createFilesSync(fileObject: NestedFiles) {
    for (const path of Object.keys(fileObject)) {
      this.createFileSync(path, fileObject[path]);
    }
  }

  async createFile(filePath: string, content: string) {
    const dir = joinPathFragments(this.tempDir, dirname(filePath));
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }
    await writeFile(joinPathFragments(this.tempDir, filePath), content);
  }

  createFileSync(filePath: string, content: string) {
    const dir = joinPathFragments(this.tempDir, dirname(filePath));
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(joinPathFragments(this.tempDir, filePath), content);
  }

  async readFile(filePath: string): Promise<string> {
    return readFile(joinPathFragments(this.tempDir, filePath), 'utf-8');
  }

  removeFileSync(filePath: string): void {
    unlinkSync(joinPathFragments(this.tempDir, filePath));
  }

  appendFile(filePath: string, content: string) {
    appendFileSync(joinPathFragments(this.tempDir, filePath), content);
  }

  writeFile(filePath: string, content: string) {
    writeFileSync(joinPathFragments(this.tempDir, filePath), content);
  }
  renameFile(oldPath: string, newPath: string) {
    renameSync(joinPathFragments(this.tempDir, oldPath), joinPathFragments(this.tempDir, newPath));
  }

  cleanup() {
    // Retry cleanup on Windows to handle EBUSY errors
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        rmSync(this.tempDir, { recursive: true, force: true });
        setWorkspaceRoot(this.previousWorkspaceRoot);
        return;
      } catch (error: any) {
        attempts++;
        if (attempts >= maxAttempts || !error?.code || error.code !== 'EBUSY') {
          // If we've exhausted retries or it's a different error, just continue
          // Don't throw to avoid breaking tests
          console.warn(`Failed to cleanup temp directory after ${attempts} attempts:`, error.message);
          setWorkspaceRoot(this.previousWorkspaceRoot);
          return;
        }
        // Wait before retry with exponential backoff
        const delay = 100 * Math.pow(2, attempts - 1);
        const start = Date.now();
        while (Date.now() - start < delay) {
          // Busy wait
        }
      }
    }
  }

  reset() {
    // Retry reset on Windows to handle EBUSY errors
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        rmSync(this.tempDir, { recursive: true, force: true });
        mkdirSync(this.tempDir, { recursive: true });
        return;
      } catch (error: any) {
        attempts++;
        if (attempts >= maxAttempts || !error?.code || error.code !== 'EBUSY') {
          console.warn(`Failed to reset temp directory after ${attempts} attempts:`, error.message);
          // Try to at least create the directory if it doesn't exist
          if (!existsSync(this.tempDir)) {
            mkdirSync(this.tempDir, { recursive: true });
          }
          return;
        }
        // Wait before retry with exponential backoff
        const delay = 100 * Math.pow(2, attempts - 1);
        const start = Date.now();
        while (Date.now() - start < delay) {
          // Busy wait
        }
      }
    }
  }
}
