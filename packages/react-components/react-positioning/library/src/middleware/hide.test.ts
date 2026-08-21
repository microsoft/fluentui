import { hide as baseHide } from '@floating-ui/dom';
import { hide } from './hide';

jest.mock('@floating-ui/dom', () => {
  const actual = jest.requireActual('@floating-ui/dom');
  return {
    ...actual,
    hide: jest.fn(actual.hide),
  };
});

/**
 * `./hide.ts` relies on an implicit, lightly-documented behavior of `@floating-ui/dom`'s `hide`
 * middleware: passing `boundary: []` (as opposed to the default `'clippingAncestors'`) causes its
 * internal `getClippingRect` to skip all intermediate DOM clipping ancestors and only consider the
 * `rootBoundary` (the viewport, by default) — see #36604 and the comment in `./hide.ts`.
 *
 * That deeper, real-browser geometry contract (that `boundary: []` genuinely behaves as
 * "viewport-only") is covered by the Cypress regression tests in react-tooltip's `Tooltip.cy.tsx`
 * (both the pre-existing scroll-based test for #32882, and the new static `overflow: hidden` test
 * for #36604) — a real browser is required to reliably exercise floating-ui's
 * offset-parent/scale/layout math; jsdom's emulation of that math doesn't match real browser
 * behavior closely enough to pin it in a unit test here.
 *
 * These tests instead pin the narrower, fully deterministic thing this module is responsible for:
 * that it maps `hasScrollableElement` to the correct `boundary` option passed to the underlying
 * `@floating-ui/dom` `hide` middleware.
 */
describe('hide', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    ['referenceHidden', true, 'clippingAncestors'],
    ['referenceHidden', false, []],
    ['escaped', true, 'clippingAncestors'],
    ['escaped', false, []],
  ] as const)(
    'strategy=%s, hasScrollableElement=%s -> boundary=%s',
    (strategy, hasScrollableElement, expectedBoundary) => {
      hide({ strategy, hasScrollableElement });

      expect(baseHide).toHaveBeenCalledWith({ strategy, boundary: expectedBoundary });
    },
  );

  it('defaults to a viewport-only boundary when hasScrollableElement is not provided', () => {
    hide({ strategy: 'escaped' });

    expect(baseHide).toHaveBeenCalledWith({ strategy: 'escaped', boundary: [] });
  });
});
