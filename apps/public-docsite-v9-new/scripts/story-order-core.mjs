const RE_EXPORT = /export\s*\{([^}]*)\}\s*from\s*['"][^'"]+['"]/g;
const LOCAL_EXPORT = /export\s+(?:const|function)\s+([A-Z]\w*)/g;

/**
 * Extracts exported story names in source order.
 *
 * Handles both barrel re-exports (`export { Default } from './ButtonDefault.stories'`) and
 * locally declared stories (`export const Default = ...`). For aliased re-exports the
 * *exported* name is what the page sees, so `X as Y` yields `Y`.
 */
export function extractStoryOrder(code) {
  /** @type {Array<{ index: number, name: string }>} */
  const found = [];

  for (const match of code.matchAll(RE_EXPORT)) {
    const names = match[1].split(',');
    let offset = 0;

    for (const entry of names) {
      const trimmed = entry.trim();

      if (trimmed.length > 0) {
        const aliased = trimmed.split(/\s+as\s+/);
        const name = (aliased[1] ?? aliased[0]).trim();

        if (/^[A-Z]\w*$/.test(name)) {
          found.push({ index: match.index + offset, name });
        }
      }

      offset += entry.length + 1;
    }
  }

  for (const match of code.matchAll(LOCAL_EXPORT)) {
    found.push({ index: match.index, name: match[1] });
  }

  const ordered = found.sort((a, b) => a.index - b.index).map(entry => entry.name);

  return [...new Set(ordered)];
}
