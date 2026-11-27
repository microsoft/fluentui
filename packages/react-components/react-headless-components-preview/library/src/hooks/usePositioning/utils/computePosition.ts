import type { Position, PositioningShorthandValue } from '@fluentui/react-positioning';
import type { LogicalAlignment } from '../types';
import { ABOVE, AFTER, BEFORE, BELOW, CENTER, END, START } from '../constants';
import { getPlacementString } from './placement';

const DEFAULT_TOLERANCE = 2;

/**
 * An element is rendered when it has at least one box (it is not `display: none`).
 * Unlike its rect size, this ignores transforms such as `scale(0)` and keeps
 * 0×0 point anchors and 0px-tall or 0px-wide elements.
 */
export const isRendered = (element: Element): boolean => element.getClientRects().length > 0;

export interface ComputePositionConfig {
  tolerance?: number;
}

export interface ComputePositionReturn {
  position: Position;
  align: LogicalAlignment;
  placement: PositioningShorthandValue;
}

/** An element, or a virtual element */
export interface Measurable {
  getBoundingClientRect(): { top: number; right: number; bottom: number; left: number };
  getClientRects?(): DOMRectList;
}

/**
 * Detects the placement of the floating element from the rects. The result is physical: `before` is on the left of the
 * reference, and `start` is the left (or top) edge.
 */
export function computePosition(
  reference: Measurable,
  floating: Measurable,
  config?: ComputePositionConfig,
): ComputePositionReturn | null {
  if (
    (floating.getClientRects && !floating.getClientRects().length) ||
    (reference.getClientRects && !reference.getClientRects().length)
  ) {
    return null;
  }
  const tolerance = config?.tolerance ?? DEFAULT_TOLERANCE;
  const r = reference.getBoundingClientRect();
  const f = floating.getBoundingClientRect();
  const position: Position | null =
    f.bottom <= r.top + tolerance
      ? ABOVE
      : f.top >= r.bottom - tolerance
      ? BELOW
      : f.right <= r.left + tolerance
      ? BEFORE
      : f.left >= r.right - tolerance
      ? AFTER
      : null;

  if (!position) {
    return null;
  }

  const block = position === ABOVE || position === BELOW;
  const align: LogicalAlignment =
    Math.abs(block ? f.left - r.left : f.top - r.top) <= tolerance
      ? START
      : Math.abs(block ? f.right - r.right : f.bottom - r.bottom) <= tolerance
      ? END
      : CENTER;

  return { position, align, placement: getPlacementString(position, align) };
}

/** Mirrors the placement of the floating element into its `data-placement` attribute */
export function updatePlacementAttribute(reference: Measurable, floating: HTMLElement): ComputePositionReturn | null {
  const result = computePosition(reference, floating);

  if (result && floating.getAttribute('data-placement') !== result.placement) {
    floating.setAttribute('data-placement', result.placement);
  }

  return result;
}
