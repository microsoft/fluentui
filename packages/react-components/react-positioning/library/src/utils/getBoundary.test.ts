import { getBoundary } from './getBoundary';
import type { PositioningBoundary } from '../types';

describe('getBoundary', () => {
  it('returns undefined when boundary is undefined', () => {
    const element = document.createElement('div');

    expect(getBoundary(element, undefined)).toBeUndefined();
  });

  it('returns undefined when boundary is null', () => {
    const element = document.createElement('div');

    expect(getBoundary(element, null)).toBeUndefined();
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

  it.each<[string, PositioningBoundary]>([
    ['an empty element array', []],
    ['an element', document.createElement('div')],
    ['an element array', [document.createElement('div')]],
    ['a rect', { x: 0, y: 0, width: 100, height: 100 }],
  ])('returns the boundary itself when it is %s', (_description, customBoundary) => {
    const element = document.createElement('div');

    expect(getBoundary(element, customBoundary)).toBe(customBoundary);
  });

  describe("'scrollParent' boundary", () => {
    it('returns the nearest scroll parent', () => {
      const outerScrollParent = document.createElement('div');
      const innerScrollParent = document.createElement('div');
      const trigger = document.createElement('button');

      jest.spyOn(window, 'getComputedStyle').mockImplementation(
        node =>
          ({
            overflow: node === outerScrollParent || node === innerScrollParent ? 'scroll' : 'visible',
            overflowX: '',
            overflowY: '',
          } as CSSStyleDeclaration),
      );

      innerScrollParent.appendChild(trigger);
      outerScrollParent.appendChild(innerScrollParent);
      document.body.appendChild(outerScrollParent);

      expect(getBoundary(trigger, 'scrollParent')).toBe(innerScrollParent);
    });

    it('returns the nearest scroll parent for a non-HTMLElement target', () => {
      const scrollParent = document.createElement('div');
      const trigger = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

      jest.spyOn(window, 'getComputedStyle').mockImplementation(
        node =>
          ({
            overflow: node === scrollParent ? 'scroll' : 'visible',
            overflowX: '',
            overflowY: '',
          } as CSSStyleDeclaration),
      );

      scrollParent.appendChild(trigger);
      document.body.appendChild(scrollParent);

      expect(getBoundary(trigger, 'scrollParent')).toBe(scrollParent);
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
