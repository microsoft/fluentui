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
 * Checks whether a single export map entry is a named (non-wildcard, non-root) entry with a `types` field.
 * Skips `"."` and `"./package.json"`.
 */
export function isNamedTypedEntry(
  exportKey: string,
  exportValue: unknown,
): exportValue is { types: string } & Record<string, unknown> {
  if (exportKey === '.' || exportKey === './package.json' || exportKey.includes('*')) {
    return false;
  }
  return typeof exportValue === 'object' && exportValue !== null && 'types' in exportValue;
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
