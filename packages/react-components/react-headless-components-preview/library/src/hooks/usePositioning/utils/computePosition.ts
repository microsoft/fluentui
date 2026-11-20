import type { Position, PositioningShorthandValue } from '@fluentui/react-positioning';
import type { LogicalAlignment } from '../types';
import { ABOVE, AFTER, BEFORE, BELOW, CENTER, END, START } from '../constants';
import { getPlacementString } from './placement';

/** Absorbs subpixel mismatches between the rects */
const TOLERANCE = 2;

export interface ComputePositionReturn {
  position: Position;
  align: LogicalAlignment;
  placement: PositioningShorthandValue;
}

/** An element, or a virtual element */
export interface Measurable {
  getBoundingClientRect(): { top: number; right: number; bottom: number; left: number };
}

/**
 * Detects the placement of the floating element from the rects. The result is physical: `before` is on the left of the
 * reference, and `start` is the left (or top) edge.
 */
export function computePosition(reference: Measurable, floating: Measurable): ComputePositionReturn | null {
  const r = reference.getBoundingClientRect();
  const f = floating.getBoundingClientRect();
  const position: Position | null =
    f.bottom <= r.top + TOLERANCE
      ? ABOVE
      : f.top >= r.bottom - TOLERANCE
      ? BELOW
      : f.right <= r.left + TOLERANCE
      ? BEFORE
      : f.left >= r.right - TOLERANCE
      ? AFTER
      : null;

  if (!position) {
    return null;
  }

  const block = position === ABOVE || position === BELOW;
  const align: LogicalAlignment =
    Math.abs(block ? f.left - r.left : f.top - r.top) <= TOLERANCE
      ? START
      : Math.abs(block ? f.right - r.right : f.bottom - r.bottom) <= TOLERANCE
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
