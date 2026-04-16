import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Returns `api-extractor.*.json` file paths found in `configDir`, excluding `primaryConfigPath`.
 * The primary `api-extractor.json` is always excluded by the regex (it has no dot-separated name
 * segment between `api-extractor` and `.json`), but `primaryConfigPath` is excluded as an extra
 * safety net for custom config locations.
 */
export function listAdditionalApiExtractorConfigs(configDir: string, primaryConfigPath: string): string[] {
  if (!existsSync(configDir)) {
    return [];
  }
  let entries: string[];
  try {
    entries = readdirSync(configDir);
  } catch {
    return [];
  }
  return entries
    .filter(f => /^api-extractor\..+\.json$/.test(f))
    .map(f => join(configDir, f))
    .filter(p => p !== primaryConfigPath);
}

/**
 * Checks whether a single export map entry is a wildcard entry with a `types` field.
 */
export function isWildcardTypedEntry(
  exportKey: string,
  exportValue: unknown,
): exportValue is { types: string } & Record<string, unknown> {
  return exportKey.includes('*') && typeof exportValue === 'object' && exportValue !== null && 'types' in exportValue;
}

/**
 * Returns `true` when the package.json `exports` map contains at least one wildcard key (e.g.
 * `"./*"`) whose value is an object with a `types` field.
 */
export function hasWildcardTypedExport(exports: Record<string, unknown> | undefined): boolean {
  if (!exports) {
    return false;
  }
  return Object.entries(exports).some(([key, val]) => isWildcardTypedEntry(key, val));
}
