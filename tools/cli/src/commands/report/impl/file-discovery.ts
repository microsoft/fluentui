import { execSync } from 'node:child_process';
import * as path from 'node:path';

import * as fg from 'fast-glob';

/**
 * Discover `.ts` and `.tsx` source files under the given root path,
 * respecting `.gitignore` rules by using `git ls-files`.
 *
 * @param rootPath - The root directory to search for source files.
 * @returns Array of absolute file paths.
 */
export function discoverSourceFiles(rootPath: string): string[] {
  const absoluteRoot = path.resolve(rootPath);

  try {
    // Use git ls-files to get tracked and untracked (but not ignored) files
    // --cached: tracked files
    // --others: untracked files
    // --exclude-standard: respect .gitignore
    const output = execSync('git ls-files --cached --others --exclude-standard', {
      cwd: absoluteRoot,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      maxBuffer: 50 * 1024 * 1024,
    });

    return output
      .split('\n')
      .filter(line => line.length > 0)
      .filter(file => /\.tsx?$/.test(file))
      .filter(file => !file.endsWith('.d.ts'))
      .map(file => path.resolve(absoluteRoot, file));
  } catch {
    // Fallback: if git is not available, return empty
    return [];
  }
}

/**
 * Filter a list of absolute file paths using include/exclude glob patterns.
 * Uses fast-glob to resolve patterns against the filesystem, then intersects
 * with the provided file list.
 *
 * @param filePaths - Absolute file paths to filter.
 * @param rootPath - Root directory for resolving relative paths in patterns.
 * @param include - Glob patterns to include. When provided, only matching files are kept.
 * @param exclude - Glob patterns to exclude. Matching files are removed.
 * @returns Filtered absolute file paths.
 */
export function filterSourceFiles(
  filePaths: string[],
  rootPath: string,
  include?: string[],
  exclude?: string[],
): string[] {
  if (!include?.length && !exclude?.length) {
    return filePaths;
  }

  const absoluteRoot = path.resolve(rootPath);
  const relativeSet = new Set(filePaths.map(fp => path.relative(absoluteRoot, fp)));

  let selected: Set<string>;

  if (include?.length) {
    const matched = new Set(fg.globSync(include, { cwd: absoluteRoot, dot: true, onlyFiles: true }));
    // Intersect fast-glob results with our discovered file list
    selected = new Set([...relativeSet].filter(rel => matched.has(rel)));
  } else {
    selected = new Set(relativeSet);
  }

  if (exclude?.length) {
    const excluded = new Set<string>(fg.globSync(exclude, { cwd: absoluteRoot, dot: true, onlyFiles: true }));
    for (const ex of excluded) {
      selected.delete(ex);
    }
  }

  return filePaths.filter(fp => selected.has(path.relative(absoluteRoot, fp)));
}
