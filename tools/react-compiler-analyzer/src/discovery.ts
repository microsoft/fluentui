import { existsSync, globSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { basename, dirname, join, parse, relative, resolve } from 'node:path';

import { mapConcurrently } from './concurrency';
import { compareText } from './ordering';
import { USE_NO_MEMO_CONTENT_RE, USE_MEMO_CONTENT_RE } from './patterns';
import type { FileEntry } from './types';

interface LocatedPackage {
  packageName: string | null;
  packageRoot: string | null;
}

const manifestCache = new Map<string, Promise<LocatedPackage | null>>();
const directoryCache = new Map<string, LocatedPackage>();

function globTypeScriptFiles(scanPath: string, exclude: string[]): string[] {
  if (statSync(scanPath).isFile()) {
    return [scanPath];
  }
  return globSync('**/*.{ts,tsx}', { cwd: scanPath, exclude })
    .map(path => join(scanPath, path))
    .sort(compareText);
}

function isWithin(boundary: string, path: string): boolean {
  const rel = relative(boundary, path);
  return rel === '' || (!rel.startsWith('..') && !rel.startsWith('/'));
}

async function readNamedManifest(directory: string): Promise<LocatedPackage | null> {
  const manifestPath = join(directory, 'package.json');
  const cached = manifestCache.get(manifestPath);
  if (cached) {
    return cached;
  }
  const pending = (async () => {
    if (!existsSync(manifestPath)) {
      return null;
    }
    try {
      const manifest = JSON.parse(await readFile(manifestPath, 'utf-8')) as { name?: unknown };
      return typeof manifest.name === 'string' && manifest.name.length > 0
        ? { packageName: manifest.name, packageRoot: directory }
        : null;
    } catch {
      return null;
    }
  })();
  manifestCache.set(manifestPath, pending);
  return pending;
}

/** Resolve ownership from the file upward to the nearest named package manifest. */
export async function locatePackage(filePath: string, workspaceBoundary = process.cwd()): Promise<LocatedPackage> {
  const absoluteFile = resolve(filePath);
  const boundary = resolve(workspaceBoundary);
  const stop = isWithin(boundary, absoluteFile) ? boundary : parse(absoluteFile).root;
  let directory = statSync(absoluteFile).isDirectory() ? absoluteFile : dirname(absoluteFile);
  const visited: string[] = [];

  while (true) {
    const cacheKey = `${stop}\0${directory}`;
    const cached = directoryCache.get(cacheKey);
    if (cached) {
      for (const seen of visited) {
        directoryCache.set(`${stop}\0${seen}`, cached);
      }
      return cached;
    }
    visited.push(directory);
    const located = await readNamedManifest(directory);
    if (located) {
      for (const seen of visited) {
        directoryCache.set(`${stop}\0${seen}`, located);
      }
      return located;
    }
    if (directory === stop || directory === dirname(directory)) {
      const unpackaged = { packageName: null, packageRoot: null };
      for (const seen of visited) {
        directoryCache.set(`${stop}\0${seen}`, unpackaged);
      }
      return unpackaged;
    }
    directory = dirname(directory);
  }
}

/**
 * Deduplicate after package ownership has been resolved, then impose a code-point total order.
 */
export function dedupeFileEntries(entries: FileEntry[]): FileEntry[] {
  const byPath = new Map<string, FileEntry>();
  for (const entry of entries) {
    byPath.set(entry.filePath, entry);
  }
  return [...byPath.values()].sort((a, b) => compareText(a.filePath, b.filePath));
}

/** Compatibility helper used by scan headings and tests. */
export async function findPackageName(startPath: string): Promise<string> {
  const located = await locatePackage(startPath, parse(resolve(startPath)).root);
  return located.packageName ?? basename(startPath);
}

export async function filterFilesWithDirectives(files: FileEntry[], concurrency = 10): Promise<FileEntry[]> {
  const matches = await mapConcurrently(
    files,
    async entry => {
      const content = await readFile(entry.filePath, 'utf-8');
      return USE_NO_MEMO_CONTENT_RE.test(content) || USE_MEMO_CONTENT_RE.test(content) ? entry : null;
    },
    { concurrency, verbose: false },
  );
  return matches.filter((entry): entry is FileEntry => entry !== null);
}

export async function discoverFilesWithDirectives(
  scanDir: string,
  packageName: string | null,
  exclude: string[],
  verbose: boolean,
  concurrency = 10,
): Promise<FileEntry[]> {
  const allFiles = await discoverAllFiles(scanDir, packageName, exclude, false, concurrency);
  const files = await filterFilesWithDirectives(allFiles, concurrency);
  if (verbose && files.length === 0) {
    console.log(`  No directive files found in ${scanDir}`);
  }
  return files;
}

export async function discoverAllFiles(
  scanDir: string,
  _packageName: string | null,
  exclude: string[],
  verbose: boolean,
  concurrency = 10,
): Promise<FileEntry[]> {
  const tsFiles = globTypeScriptFiles(scanDir, exclude);
  const scanRoot = resolve(scanDir);
  const scanOwner = await locatePackage(scanRoot, parse(scanRoot).root);
  const packageBoundary = scanOwner.packageRoot ?? parse(scanRoot).root;
  if (verbose) {
    console.log(`  Found ${tsFiles.length} TypeScript files in ${scanDir}`);
  }
  return mapConcurrently(
    tsFiles,
    async filePath => {
      const located = await locatePackage(filePath, packageBoundary);
      return { filePath, ...located };
    },
    { concurrency, verbose },
  );
}
