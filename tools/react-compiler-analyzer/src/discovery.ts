import { existsSync, globSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';

import type { FileEntry } from './types';
import { USE_NO_MEMO_CONTENT_RE, USE_MEMO_CONTENT_RE } from './patterns';

/**
 * Glob all TypeScript files in a directory, respecting exclude patterns.
 */
function globTypeScriptFiles(scanDir: string, exclude: string[]): string[] {
  return globSync('**/*.{ts,tsx}', { cwd: scanDir, exclude }).map(relative => join(scanDir, relative));
}

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
 * Filter a file list to only those containing directives.
 */
export async function filterFilesWithDirectives(files: FileEntry[]): Promise<FileEntry[]> {
  const result: FileEntry[] = [];

  for (const entry of files) {
    const content = await readFile(entry.filePath, 'utf-8');
    if (USE_NO_MEMO_CONTENT_RE.test(content) || USE_MEMO_CONTENT_RE.test(content)) {
      result.push(entry);
    }
  }

  return result;
}

/**
 * Discover files containing 'use no memo' or 'use memo' directives in the given directory.
 */
export async function discoverFilesWithDirectives(
  scanDir: string,
  packageName: string,
  exclude: string[],
  verbose: boolean,
): Promise<FileEntry[]> {
  const allFiles = await discoverAllFiles(scanDir, packageName, exclude, false);
  const files = await filterFilesWithDirectives(allFiles);

  if (verbose && files.length === 0) {
    console.log(`  No directive files found in ${scanDir}`);
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
  const tsFiles = globTypeScriptFiles(scanDir, exclude);

  if (verbose) {
    console.log(`  Found ${tsFiles.length} TypeScript files in ${scanDir}`);
  }

  return tsFiles.map(filePath => ({ filePath, packageName }));
}
