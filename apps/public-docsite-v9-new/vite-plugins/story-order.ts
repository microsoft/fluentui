import type { Plugin } from 'vite';

import { extractStoryOrder } from '../scripts/story-order-core.mjs';

/** Only entry points define the page's example order; per-example files are re-exported by them. */
const STORY_ENTRY = /index\.stories\.(?:jsx?|tsx?)$/;

export { extractStoryOrder };

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
        // Appended at the end, so every original position is unchanged; an empty mappings
        // string tells Rollup the source is untouched rather than breaking the map chain.
        map: { mappings: '' },
      };
    },
  };
}
