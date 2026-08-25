import { getBoundary } from './getBoundary';

describe('getBoundary', () => {
  it('returns undefined when boundary is undefined', () => {
    const element = document.createElement('div');

    expect(getBoundary(element, undefined)).toBeUndefined();
  });

  it("returns the document element for 'window' boundary", () => {
    const element = document.createElement('div');
    document.body.appendChild(element);

    expect(getBoundary(element, 'window')).toBe(document.documentElement);
  });

  it("returns 'clippingAncestors' for 'clippingParents' boundary", () => {
    const element = document.createElement('div');

    expect(getBoundary(element, 'clippingParents')).toBe('clippingAncestors');
  });

  it('returns the boundary itself when it is already a floating-ui boundary', () => {
    const element = document.createElement('div');
    const customBoundary = document.createElement('div');

    expect(getBoundary(element, customBoundary)).toBe(customBoundary);
  });

  // Regression coverage for https://github.com/microsoft/fluentui/issues/36604
  //
  // Before the fix, the hide middleware always used 'clippingAncestors' as its boundary, which meant any static
  // (non-scrolling) `overflow: hidden` ancestor was treated the same as a real scroll container, causing
  // `referenceHidden` to report true even though nothing was actually scrolled out of view. `getBoundary` with
  // `'scrollParent'` is what the fix now uses instead, and it must only stop at ancestors that can actually scroll.
  describe("'scrollParent' boundary", () => {
    it('skips a static overflow:hidden ancestor that cannot scroll, falling back to the document element', () => {
      const staticHiddenContainer = document.createElement('div');
      const trigger = document.createElement('button');

      jest.spyOn(window, 'getComputedStyle').mockReturnValue({
        overflow: 'hidden',
        overflowX: '',
        overflowY: '',
      } as CSSStyleDeclaration);

      staticHiddenContainer.appendChild(trigger);
      document.body.appendChild(staticHiddenContainer);

      expect(getBoundary(trigger, 'scrollParent')).toBe(document.documentElement);
    });

    it('resolves to the nearest real scroll parent, ignoring an intermediate static overflow:hidden container', () => {
      const scrollableAncestor = document.createElement('div');
      const staticHiddenContainer = document.createElement('div');
      const trigger = document.createElement('button');

      staticHiddenContainer.appendChild(trigger);
      scrollableAncestor.appendChild(staticHiddenContainer);
      document.body.appendChild(scrollableAncestor);

      jest.spyOn(window, 'getComputedStyle').mockImplementation(
        (node: Element) =>
          ({
            overflow: node === scrollableAncestor ? 'scroll' : 'hidden',
            overflowX: '',
            overflowY: '',
          } as CSSStyleDeclaration),
      );

      expect(getBoundary(trigger, 'scrollParent')).toBe(scrollableAncestor);
    });

    it('returns the document element when the resolved scroll parent is BODY', () => {
      const trigger = document.createElement('button');
      document.body.appendChild(trigger);

      jest.spyOn(window, 'getComputedStyle').mockReturnValue({
        overflow: 'visible',
        overflowX: '',
        overflowY: '',
      } as CSSStyleDeclaration);

      expect(getBoundary(trigger, 'scrollParent')).toBe(document.documentElement);
    });
  });
});
