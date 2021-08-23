/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment
import { createDOMRenderer } from './createDOMRenderer';
import type { CSSRulesByBucket } from '../types';

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
