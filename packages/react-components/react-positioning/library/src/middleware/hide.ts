import type { Middleware } from '@floating-ui/dom';
import { hide as baseHide } from '@floating-ui/dom';

export interface HideMiddlewareOptions {
  strategy: 'referenceHidden' | 'escaped';
  /**
   * Whether the positioned element has a scrollable ancestor (an ancestor whose `overflow` is
   * `auto`, `scroll`, or `overlay`), as opposed to merely a clipping one (`overflow: hidden`
   * with no scrollable content).
   *
   * When there's no scrollable ancestor, non-scrolling `overflow: hidden` ancestors are excluded
   * from the clipping boundary used to compute `referenceHidden`/`escaped`. Otherwise, a trigger
   * placed in a tightly-fitted `overflow: hidden` container (a common layout pattern, e.g. a flex
   * toolbar) would have its tooltip permanently hidden, even though nothing is actually being
   * scrolled out of view.
   */
  hasScrollableElement?: boolean;
}

/**
 * Wraps the floating UI hide middleware for easier usage of our options
 */
export function hide(options: HideMiddlewareOptions): Middleware {
  const { strategy, hasScrollableElement } = options;

  return baseHide({
    strategy,
    // Only consider intermediate clipping ancestors (including non-scrolling `overflow: hidden`
    // containers) when there's an ancestor that can actually be scrolled. Otherwise, fall back to
    // the viewport as the sole boundary.
    boundary: hasScrollableElement ? 'clippingAncestors' : [],
  });
}
