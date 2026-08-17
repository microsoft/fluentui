import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { extractStoryOrder } from './story-order-core.mjs';

describe('extractStoryOrder', () => {
  it('preserves the authored barrel re-export order', () => {
    const code = [
      `import type { Meta } from '@storybook/react-webpack5';`,
      `export { Default } from './ButtonDefault.stories';`,
      `export { Shape } from './ButtonShape.stories';`,
      `export { Appearance } from './ButtonAppearance.stories';`,
      `export default {} as Meta;`,
    ].join('\n');

    assert.deepEqual(extractStoryOrder(code), ['Default', 'Shape', 'Appearance']);
  });

  it('uses the exported name for aliased re-exports', () => {
    const code = `export { DefaultFade as Fade } from './Fade.stories';`;

    assert.deepEqual(extractStoryOrder(code), ['Fade']);
  });

  it('handles several names in one re-export clause, in order', () => {
    const code = `export { Zebra, Alpha, Middle } from './x.stories';`;

    assert.deepEqual(extractStoryOrder(code), ['Zebra', 'Alpha', 'Middle']);
  });

  it('includes locally declared stories, interleaved by position', () => {
    const code = [
      `export { First } from './a.stories';`,
      `export const Second = () => null;`,
      `export { Third } from './b.stories';`,
    ].join('\n');

    assert.deepEqual(extractStoryOrder(code), ['First', 'Second', 'Third']);
  });

  it('ignores lowercase exports, which are never stories', () => {
    const code = [`export const useHelper = () => null;`, `export { Real } from './r.stories';`].join('\n');

    assert.deepEqual(extractStoryOrder(code), ['Real']);
  });

  it('de-duplicates repeated names', () => {
    const code = [`export { Default } from './a.stories';`, `export { Default } from './b.stories';`].join('\n');

    assert.deepEqual(extractStoryOrder(code), ['Default']);
  });

  it('returns an empty list when there is nothing to order', () => {
    assert.deepEqual(extractStoryOrder(`export default {};`), []);
  });
});
