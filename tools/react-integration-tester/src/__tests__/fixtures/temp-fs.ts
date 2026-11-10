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
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

type NestedFiles = {
  [fileName: string]: string;
};

export class TempFs {
  readonly tempDir: string;
  private readonly directoryName: string;

  constructor(directoryName: string) {
    this.directoryName = directoryName;
    this.tempDir = realpathSync(mkdtempSync(join(tmpdir(), this.directoryName)));
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
    const dir = join(this.tempDir, dirname(filePath));
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }
    await writeFile(join(this.tempDir, filePath), content);
  }

  createFileSync(filePath: string, content: string) {
    const dir = join(this.tempDir, dirname(filePath));
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(join(this.tempDir, filePath), content);
  }

  async readFile(filePath: string): Promise<string> {
    return readFile(join(this.tempDir, filePath), 'utf-8');
  }

  removeFileSync(filePath: string): void {
    unlinkSync(join(this.tempDir, filePath));
  }

  appendFile(filePath: string, content: string) {
    appendFileSync(join(this.tempDir, filePath), content);
  }

  writeFile(filePath: string, content: string) {
    writeFileSync(join(this.tempDir, filePath), content);
  }
  renameFile(oldPath: string, newPath: string) {
    renameSync(join(this.tempDir, oldPath), join(this.tempDir, newPath));
  }

  cleanup() {
    rmSync(this.tempDir, { recursive: true, force: true });
  }

  reset() {
    rmSync(this.tempDir, { recursive: true, force: true });
    mkdirSync(this.tempDir, { recursive: true });
  }
}
