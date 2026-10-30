import type { Position, PositioningShorthandValue } from '@fluentui/react-positioning';
import type { LogicalAlignment } from '../types';
import { ABOVE, AFTER, BEFORE, BELOW, CENTER, END, START } from '../constants';
import { getPlacementString } from './placement';

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
  const tolerance = config?.tolerance ?? 2;
  const referenceRect = reference.getBoundingClientRect();
  const floatingRect = floating.getBoundingClientRect();
  const position: Position | null =
    floatingRect.bottom <= referenceRect.top + tolerance
      ? ABOVE
      : floatingRect.top >= referenceRect.bottom - tolerance
      ? BELOW
      : floatingRect.right <= referenceRect.left + tolerance
      ? BEFORE
      : floatingRect.left >= referenceRect.right - tolerance
      ? AFTER
      : null;
  if (!position) {
    return null;
  }

  const block = position === ABOVE || position === BELOW;
  const start = Math.abs(
    (block ? floatingRect.left : floatingRect.top) - (block ? referenceRect.left : referenceRect.top),
  );
  const end = Math.abs(
    (block ? floatingRect.right : floatingRect.bottom) - (block ? referenceRect.right : referenceRect.bottom),
  );
  const align: LogicalAlignment = start <= tolerance ? START : end <= tolerance ? END : CENTER;
  const placement = getPlacementString(position, align);

  return { position, align, placement };
}

/** Mirrors the placement of the floating element into its `data-placement` attribute */
export function updatePlacementAttribute(reference: Measurable, floating: HTMLElement): ComputePositionReturn | null {
  const result = computePosition(reference, floating);

  if (result && floating.getAttribute('data-placement') !== result.placement) {
    floating.setAttribute('data-placement', result.placement);
  }

  return result;
}
