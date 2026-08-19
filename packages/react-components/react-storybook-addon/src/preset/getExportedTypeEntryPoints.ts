import * as fs from 'fs';
import * as path from 'path';

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readPackageJson(packageJsonPath: string): unknown {
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`getExportedTypeEntryPoints: package.json not found at "${packageJsonPath}"`);
  }

  const raw = fs.readFileSync(packageJsonPath, 'utf-8');

  try {
    return JSON.parse(raw);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`getExportedTypeEntryPoints: failed to parse "${packageJsonPath}" as JSON: ${message}`);
  }
}

/**
 * Safely resolves package-contained `.d.ts` entry points declared as direct string `types` targets in an
 * `exports` map, such as API Extractor rollups.
 *
 * Nested conditions, package self-references, and non-object export values are ignored.
 */
export function getExportedTypeEntryPoints(packageRoot: string): string[] {
  if (!path.isAbsolute(packageRoot)) {
    throw new Error(`getExportedTypeEntryPoints: packageRoot must be an absolute path, received "${packageRoot}"`);
  }

  const packageJsonPath = path.join(packageRoot, 'package.json');
  const packageJson = readPackageJson(packageJsonPath);

  if (!isRecord(packageJson)) {
    throw new Error(`getExportedTypeEntryPoints: "${packageJsonPath}" does not contain a JSON object`);
  }

  const exportsMap = packageJson.exports;

  if (!isRecord(exportsMap)) {
    throw new Error(`getExportedTypeEntryPoints: "${packageJsonPath}" is missing an "exports" object`);
  }

  const seen = new Set<string>();
  const entryPoints: string[] = [];

  for (const [exportKey, exportValue] of Object.entries(exportsMap)) {
    if (exportKey === './package.json' || !isRecord(exportValue)) {
      continue;
    }

    if (!('types' in exportValue)) {
      continue;
    }

    const typesValue = exportValue.types;

    if (typeof typesValue !== 'string') {
      throw new Error(
        `getExportedTypeEntryPoints: exports["${exportKey}"].types in "${packageJsonPath}" must be a string, received ${typeof typesValue}`,
      );
    }

    const resolved = path.resolve(packageRoot, typesValue);
    const relativeToRoot = path.relative(packageRoot, resolved);

    if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
      throw new Error(
        `getExportedTypeEntryPoints: exports["${exportKey}"].types ("${typesValue}") escapes packageRoot "${packageRoot}"`,
      );
    }

    if (!resolved.endsWith('.d.ts')) {
      throw new Error(
        `getExportedTypeEntryPoints: exports["${exportKey}"].types ("${typesValue}") must point to a ".d.ts" file`,
      );
    }

    if (!fs.existsSync(resolved)) {
      throw new Error(
        `getExportedTypeEntryPoints: exports["${exportKey}"].types resolves to "${resolved}", which does not exist`,
      );
    }

    if (!seen.has(resolved)) {
      seen.add(resolved);
      entryPoints.push(resolved);
    }
  }

  if (entryPoints.length === 0) {
    throw new Error(
      `getExportedTypeEntryPoints: no direct export map "types" entry points found in "${packageJsonPath}"`,
    );
  }

  return entryPoints;
}
