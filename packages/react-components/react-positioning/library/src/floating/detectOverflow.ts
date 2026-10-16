import {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getClippingRect,
  getOffsetParent,
  getScale,
} from './platform';
import { getDocumentElement, isElement } from './domUtils';
import type { Boundary, ElementContext, MiddlewareState, Padding, SideObject } from './types';
import { getPaddingObject, rectToClientRect } from './utils';

export interface DetectOverflowOptions {
  /**
   * The clipping element(s) or area in which overflow will be checked.
   * @default 'clippingAncestors'
   */
  boundary?: Boundary;
  /**
   * The element in which overflow is being checked relative to a boundary.
   * @default 'floating'
   */
  elementContext?: ElementContext;
  /**
   * Whether to check for overflow using the alternate element's boundary
   * (`reference` for `floating`, and vice versa).
   * @default false
   */
  altBoundary?: boolean;
  /**
   * Virtual padding for the resolved overflow detection offsets.
   * @default 0
   */
  padding?: Padding;
}

/**
 * Resolves with an object of overflow side offsets that determine how much the element is overflowing a given
 * clipping boundary on each side. Positive values mean the element overflows, negative values mean it's within.
 */
export function detectOverflow(state: MiddlewareState, options: DetectOverflowOptions = {}): SideObject {
  const { x, y, rects, elements, strategy, clippingCache } = state;
  const { boundary = 'clippingAncestors', elementContext = 'floating', altBoundary = false, padding = 0 } = options;

  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];

  const clippingClientRect = rectToClientRect(
    getClippingRect(
      isElement(element) ? element : element.contextElement || getDocumentElement(elements.floating),
      boundary,
      strategy,
      clippingCache,
    ),
  );

  const rect =
    elementContext === 'floating'
      ? { x, y, width: rects.floating.width, height: rects.floating.height }
      : rects.reference;

  const offsetParent = getOffsetParent(elements.floating);
  const offsetScale = isElement(offsetParent) ? getScale(offsetParent) : { x: 1, y: 1 };

  const elementClientRect = rectToClientRect(
    convertOffsetParentRelativeRectToViewportRelativeRect(elements, rect, offsetParent, strategy),
  );

  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x,
  };
}
