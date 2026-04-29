import { existsSync, globSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';

import type { FileEntry } from './types';

const USE_NO_MEMO_RE = /['(]use no memo[')]/;

/**
 * Walk up from `startDir` to find the nearest package.json and return its `name` field.
 * Falls back to the basename of `startDir`.
 */
export async function findPackageName(startDir: string): Promise<string> {
  let dir = resolve(startDir);
  const root = resolve('/');

  while (dir !== root) {
    const pkgJsonPath = join(dir, 'package.json');
    if (existsSync(pkgJsonPath)) {
      try {
        const content = await readFile(pkgJsonPath, 'utf-8');
        const pkg = JSON.parse(content);
        if (typeof pkg.name === 'string') {
          return pkg.name;
        }
      } catch {
        // ignore parse errors, keep walking
      }
    }
    dir = dirname(dir);
  }

  return basename(startDir);
}

/**
 * Discover files containing 'use no memo' in the given directory.
 */
export async function discoverDirectiveFiles(
  scanDir: string,
  packageName: string,
  exclude: string[],
  verbose: boolean,
): Promise<FileEntry[]> {
  const files: FileEntry[] = [];

  const tsFiles = globSync('**/*.{ts,tsx}', {
    cwd: scanDir,
    exclude,
  }).map(relative => join(scanDir, relative));

  for (const filePath of tsFiles) {
    const content = await readFile(filePath, 'utf-8');
    if (USE_NO_MEMO_RE.test(content)) {
      files.push({ filePath, packageName });
    }
  }

  if (verbose && files.length === 0) {
    console.log(`  No 'use no memo' files found in ${scanDir}`);
  }

  return files;
}

/**
 * Discover all TypeScript files in the given directory (for coverage analysis).
 */
export async function discoverAllFiles(
  scanDir: string,
  packageName: string,
  exclude: string[],
  verbose: boolean,
): Promise<FileEntry[]> {
  const tsFiles = globSync('**/*.{ts,tsx}', {
    cwd: scanDir,
    exclude,
  }).map(relative => join(scanDir, relative));

  if (verbose) {
    console.log(`  Found ${tsFiles.length} TypeScript files in ${scanDir}`);
  }

  return tsFiles.map(filePath => ({ filePath, packageName }));
}
