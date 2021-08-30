/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import { CSSRulesByBucket } from '../types';
import { createDOMRenderer } from './createDOMRenderer';

describe('createDOMRenderer', () => {
  it('"document" should not be defined', () => {
    expect(typeof document).toBe('undefined');
  });

  it('should not throw when document does not exist', () => {
    const renderer = createDOMRenderer(undefined);
    const cssRules: CSSRulesByBucket = {
      d: ['.foo { color: red }'],
    };

    expect(() => renderer.insertCSSRules(cssRules)).not.toThrow();
  });
});
