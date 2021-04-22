/**
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import { MakeStylesReducedDefinitions } from '../types';
import { createDOMRenderer } from './createDOMRenderer';

describe('createDOMRenderer', () => {
  it('"document" should not be defined', () => {
    expect(typeof document).toBe('undefined');
  });

  it('should return classes even without a document', () => {
    const renderer = createDOMRenderer(undefined);
    const definitions: MakeStylesReducedDefinitions = {
      color: ['', 'foo', '.foo { color: red }'],
    };

    expect(renderer.insertDefinitions('ltr', definitions)).toBe('foo');
  });
});
