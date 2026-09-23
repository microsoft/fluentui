import type { Plugin } from 'vite';

const RE_EXPORT = /export\s*\{([^}]*)\}\s*from\s*['"][^'"]+['"]/g;
const LOCAL_EXPORT = /export\s+(?:const|function)\s+([A-Z]\w*)/g;
const STORY_ENTRY = /index\.stories\.(?:jsx?|tsx?)$/;

export function extractStoryOrder(code: string): string[] {
  const found: Array<{ index: number; name: string }> = [];
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
  return [...new Set(found.sort((a, b) => a.index - b.index).map(entry => entry.name))];
}

/**
 * Restores the example order authored in `index.stories.tsx`.
 *
 * ES module namespace objects sort their keys alphabetically, so importing a story module
 * loses the order the author wrote — which also changes which example is treated as the
 * primary one. Storybook preserves it by reading CSF export order; this does the same by
 * recording the order at build time and exposing it as `__storyOrder`.
 */
export function storyOrder(): Plugin {
  return {
    name: 'fluentui:story-order',
    enforce: 'pre',

    transform(code, id) {
      const [filename] = id.split('?');

      if (!STORY_ENTRY.test(filename)) {
        return null;
      }

      const order = extractStoryOrder(code);

      if (order.length === 0) {
        return null;
      }

      return {
        code: `${code}\nexport const __storyOrder = ${JSON.stringify(order)};\n`,
        map: { mappings: '' },
      };
    },
  };
}
