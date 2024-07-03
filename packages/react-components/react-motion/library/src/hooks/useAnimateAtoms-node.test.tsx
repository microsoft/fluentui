/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

describe('useAnimateAtoms (node)', () => {
  it('handles node/server environments', () => {
    const win = typeof document === 'object' ? document.defaultView?.window : undefined;
    const SUPPORTS_WEB_ANIMATIONS = win && typeof win.Element.prototype.animate === 'function';

    expect(win).toBe(undefined);
    expect(SUPPORTS_WEB_ANIMATIONS).toBeFalsy();
  });
});

export {};
