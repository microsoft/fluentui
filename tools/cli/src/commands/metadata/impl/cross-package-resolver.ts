import * as fs from 'node:fs';
import * as path from 'node:path';

import type { MetadataOutput, RefOrInline } from './types';

/**
 * Attempt to load a pre-existing metadata.json for a given package.
 * Looks in the package's root directory (resolved from node_modules).
 *
 * @returns The parsed MetadataOutput, or null if not found.
 */
export function loadDependencyMetadata(packageSpecifier: string, cwd: string = process.cwd()): MetadataOutput | null {
  const packageDir = resolvePackageDir(packageSpecifier, cwd);
  if (!packageDir) {
    return null;
  }

  const metadataPath = path.join(packageDir, 'metadata.json');
  if (!fs.existsSync(metadataPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(metadataPath, 'utf-8')) as MetadataOutput;
  } catch {
    return null;
  }
}

/**
 * Build a cross-package `$ref` for a symbol in a dependency that has metadata.json.
 *
 * @returns A $ref like `"@fluentui/react-utilities#/categories/types/ComponentProps"`, or null.
 */
export function buildCrossPackageRef(
  packageSpecifier: string,
  symbolName: string,
  dependencyMetadata: MetadataOutput,
): RefOrInline | null {
  // Search all categories for the symbol
  const categories = ['components', 'hooks', 'types', 'others'] as const;
  for (const category of categories) {
    const symbolsMap = dependencyMetadata.categories[category];
    if (symbolName in symbolsMap) {
      return { $ref: `${packageSpecifier}#/categories/${category}/${symbolName}` };
    }
  }

  return null;
}

/**
 * Resolve the directory of an npm package from node_modules.
 */
function resolvePackageDir(packageSpecifier: string, cwd: string): string | null {
  // Walk up to find node_modules containing this package
  let dir = path.resolve(cwd);
  const root = path.parse(dir).root;

  while (dir !== root) {
    const candidate = path.join(dir, 'node_modules', packageSpecifier);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    dir = path.dirname(dir);
  }

  return null;
}
