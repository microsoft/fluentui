import type { PositioningBoundary } from '@fluentui/react-positioning';
import type { FallbackRect } from '../fallback/computeFallbackPosition';
import { getClippingRect, getPaddingBox, getScrollAncestors, getViewportRect, intersect } from './geometry';
import type { PositioningPlugin } from './types';

type Padding = NonNullable<
  Parameters<PositioningPlugin['prepare'] & Function>[1]['options']['overflowBoundaryPadding']
>;

function resolveBoundary(boundary: PositioningBoundary, container: HTMLElement): FallbackRect {
  if (boundary === 'window') {
    return getViewportRect(container);
  }

  if (boundary === 'clippingParents') {
    return getClippingRect(container);
  }

  if (boundary === 'scrollParent') {
    const [scrollParent] = getScrollAncestors(container);
    return scrollParent ? getPaddingBox(scrollParent) : getViewportRect(container);
  }

  if (Array.isArray(boundary)) {
    return boundary.map(element => getPaddingBox(element)).reduce(intersect, getViewportRect(container));
  }

  if ('nodeType' in boundary) {
    return getPaddingBox(boundary);
  }

  // A rect
  return { left: boundary.x, top: boundary.y, width: boundary.width, height: boundary.height };
}

const shrink = (rect: FallbackRect, padding: Padding, rtl: boolean): FallbackRect => {
  const {
    top = 0,
    bottom = 0,
    start = 0,
    end = 0,
  } = typeof padding === 'number' ? { top: padding, bottom: padding, start: padding, end: padding } : padding;
  const left = rtl ? end : start;
  const right = rtl ? start : end;

  return {
    left: rect.left + left,
    top: rect.top + top,
    width: Math.max(0, rect.width - left - right),
    height: Math.max(0, rect.height - top - bottom),
  };
};

/**
 * Handles `flipBoundary`, `overflowBoundary` and `overflowBoundaryPadding`: placements are chosen to fit inside the
 * flip boundary, and the element is kept inside the overflow boundary.
 */
export const boundaryPlugin: PositioningPlugin = {
  requiresJs: ({ flipBoundary, overflowBoundary, overflowBoundaryPadding }) =>
    !!(flipBoundary || overflowBoundary || overflowBoundaryPadding),
  prepare: (input, { container, rtl, options: { flipBoundary, overflowBoundary, overflowBoundaryPadding } }) => {
    const viewport = getViewportRect(container);
    let bounds = overflowBoundary ? intersect(resolveBoundary(overflowBoundary, container), viewport) : input.bounds;

    if (overflowBoundaryPadding) {
      bounds = shrink(bounds, overflowBoundaryPadding, rtl);
    }

    return {
      ...input,
      bounds,
      flipBounds: flipBoundary
        ? intersect(resolveBoundary(flipBoundary, container), viewport)
        : input.flipBounds ?? input.bounds,
    };
  },
};
