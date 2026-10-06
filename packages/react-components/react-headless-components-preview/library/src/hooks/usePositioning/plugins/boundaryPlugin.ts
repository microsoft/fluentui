import type { PositioningBoundary } from '@fluentui/react-positioning';
import type { FallbackInput, FallbackRect } from '../fallback/computeFallbackPosition';
import type { PositioningProps } from '../types';
import { getClippingRect, getPaddingBox, getScrollAncestors, getViewportRect, intersect } from './geometry';

type Padding = NonNullable<PositioningProps['overflowBoundaryPadding']>;

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
export function applyBoundary(
  input: FallbackInput,
  container: HTMLElement,
  rtl: boolean,
  options: PositioningProps,
): void {
  const { flipBoundary, overflowBoundary, overflowBoundaryPadding } = options;
  const viewport = getViewportRect(container);
  let bounds = overflowBoundary ? intersect(resolveBoundary(overflowBoundary, container), viewport) : input[1];

  if (overflowBoundaryPadding) {
    bounds = shrink(bounds, overflowBoundaryPadding, rtl);
  }

  const flipBounds = flipBoundary
    ? intersect(resolveBoundary(flipBoundary, container), viewport)
    : input[8] ?? input[1];
  input[1] = bounds;
  input[8] = flipBounds;
}
