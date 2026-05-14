import type { Position, PositioningShorthandValue } from '@fluentui/react-positioning';
import type { LogicalAlignment } from '../types';
import { ALIGNMENTS, POSITIONS } from '../constants';
import { getPlacementString } from './placement';

const DEFAULT_TOLERANCE = 2;

const closeTo = (a: number, b: number, tolerance: number): boolean => Math.abs(a - b) <= tolerance;

function detectPosition(floatingRect: DOMRect, referenceRect: DOMRect, tolerance: number): Position | null {
  if (floatingRect.bottom <= referenceRect.top + tolerance) {
    return POSITIONS.above;
  }

  if (floatingRect.top >= referenceRect.bottom - tolerance) {
    return POSITIONS.below;
  }

  if (floatingRect.right <= referenceRect.left + tolerance) {
    return POSITIONS.before;
  }

  if (floatingRect.left >= referenceRect.right - tolerance) {
    return POSITIONS.after;
  }

  return null;
}

function detectAlign(
  position: Position,
  floatingRect: DOMRect,
  referenceRect: DOMRect,
  tolerance: number,
): LogicalAlignment {
  const isBlockMain = position === POSITIONS.above || position === POSITIONS.below;

  const startAligned = isBlockMain
    ? closeTo(floatingRect.left, referenceRect.left, tolerance)
    : closeTo(floatingRect.top, referenceRect.top, tolerance);

  if (startAligned) {
    return ALIGNMENTS.start;
  }

  const endAligned = isBlockMain
    ? closeTo(floatingRect.right, referenceRect.right, tolerance)
    : closeTo(floatingRect.bottom, referenceRect.bottom, tolerance);

  if (endAligned) {
    return ALIGNMENTS.end;
  }

  return ALIGNMENTS.center;
}

export interface ComputePositionConfig {
  tolerance?: number;
}

export interface ComputePositionReturn {
  position: Position;
  align: LogicalAlignment;
  placement: PositioningShorthandValue;
}

export function computePosition(
  reference: HTMLElement,
  floating: HTMLElement,
  config?: ComputePositionConfig,
): ComputePositionReturn | null {
  const tolerance = config?.tolerance ?? DEFAULT_TOLERANCE;
  const referenceRect = reference.getBoundingClientRect();
  const floatingRect = floating.getBoundingClientRect();

  const position = detectPosition(floatingRect, referenceRect, tolerance);
  if (!position) {
    return null;
  }

  const align = detectAlign(position, floatingRect, referenceRect, tolerance);
  const placement = getPlacementString(position, align);

  return { position, align, placement };
}
