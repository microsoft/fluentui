import { promises as fs } from 'fs';
import { join, resolve, dirname } from 'path';
import { IGNORED_DIRS, VALID_EXTENSIONS } from './types.js';

/**
 * Recursively finds all style-related files in a directory
 * @param dir The root directory to start searching from
 * @returns Array of absolute file paths
 */
export async function findStyleFiles(dir: string): Promise<string[]> {
  const styleFiles: string[] = [];

  async function scan(directory: string): Promise<void> {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    const scanPromises = entries.map(async entry => {
      const fullPath = join(directory, entry.name);

      if (entry.isDirectory() && !IGNORED_DIRS.includes(entry.name)) {
        await scan(fullPath);
      } else if (
        (entry.name.includes('style') || entry.name.includes('styles')) &&
        VALID_EXTENSIONS.some(ext => entry.name.endsWith(ext))
      ) {
        styleFiles.push(fullPath);
      }
    });

    await Promise.all(scanPromises);
  }

  await scan(dir);
  return styleFiles;
}

/**
 * Resolves a relative import path to an absolute file path
 * @param importPath The import path from the source file
 * @param currentFilePath The path of the file containing the import
 * @returns Resolved absolute path or null if not found
 */
export async function resolveImportPath(importPath: string, currentFilePath: string): Promise<string | null> {
  if (!importPath.startsWith('.')) {
    return null;
  }

  const dir = dirname(currentFilePath);
  const absolutePath = resolve(dir, importPath);

  // Try original path
  try {
    const stats = await fs.stat(absolutePath);
    if (stats.isFile()) {
      return absolutePath;
    }
  } catch {} // Ignore errors and try extensions

  // Try with extensions
  for (const ext of VALID_EXTENSIONS) {
    const pathWithExt = absolutePath + ext;
    try {
      const stats = await fs.stat(pathWithExt);
      if (stats.isFile()) {
        return pathWithExt;
      }
    } catch {} // Ignore errors and continue trying
  }

  return null;
}
