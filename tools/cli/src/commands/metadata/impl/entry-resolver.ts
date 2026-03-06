import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Resolve the .d.ts entry file for metadata extraction.
 *
 * Resolution order:
 * 1. If `entryOverride` is provided, use it directly.
 * 2. Otherwise, find the closest package.json and read the "types" or "typings" field.
 *
 * @returns Absolute path to the .d.ts entry file.
 * @throws If no entry can be resolved or the file does not exist.
 */
export function resolveEntry(entryOverride?: string, cwd: string = process.cwd()): string {
  if (entryOverride) {
    const resolved = path.resolve(cwd, entryOverride);
    if (!fs.existsSync(resolved)) {
      throw new Error(`Entry file not found: ${resolved}`);
    }
    return resolved;
  }

  const packageJsonPath = findClosestPackageJson(cwd);
  if (!packageJsonPath) {
    throw new Error(`Could not find package.json from ${cwd}`);
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const typesField: string | undefined = packageJson.types ?? packageJson.typings;

  if (!typesField) {
    throw new Error(
      `No "types" or "typings" field found in ${packageJsonPath}. ` + 'Use --entry to specify the .d.ts file manually.',
    );
  }

  const resolved = path.resolve(path.dirname(packageJsonPath), typesField);
  if (!fs.existsSync(resolved)) {
    throw new Error(
      `Types entry "${typesField}" resolved to ${resolved} but the file does not exist. ` +
        'Has the package been built?',
    );
  }

  return resolved;
}

/**
 * Read package name and version from the closest package.json.
 */
export function readPackageInfo(cwd: string = process.cwd()): { name: string; version: string } {
  const packageJsonPath = findClosestPackageJson(cwd);
  if (!packageJsonPath) {
    return { name: 'unknown', version: '0.0.0' };
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  return {
    name: packageJson.name ?? 'unknown',
    version: packageJson.version ?? '0.0.0',
  };
}

/**
 * Walk up from `startDir` looking for a package.json.
 */
function findClosestPackageJson(startDir: string): string | null {
  let dir = path.resolve(startDir);
  const root = path.parse(dir).root;

  while (dir !== root) {
    const candidate = path.join(dir, 'package.json');
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    dir = path.dirname(dir);
  }

  return null;
}
