import type { Alignment, Offset, Position } from '../types';
import type { Placement, PlacementInput } from './computePlacement';

export type ResolvedOffset = [mainAxis: number, crossAxis: number];

/**
 * Number and object offsets. Function offsets are resolved for every placement by `applyFunctionOffset()`.
 */
export function resolveOffset(offset: Offset | undefined): ResolvedOffset {
  if (typeof offset === 'number') {
    return [offset, 0];
  }

  if (offset && typeof offset === 'object') {
    return [offset.mainAxis ?? 0, offset.crossAxis ?? 0];
  }

  return [0, 0];
}

/**
 * Handles `offset` when it's a function: it's called with every placement that is tried.
 */
export function applyFunctionOffset(input: PlacementInput, offset: Offset | undefined): void {
  if (typeof offset !== 'function') {
    return;
  }

  const [anchor, , width, height] = input;

  input[12] = ({ position, align }: Placement) => {
    const blockMain = position === 'above' || position === 'below';
    const alignment: Alignment = blockMain ? align : align === 'start' ? 'top' : align === 'end' ? 'bottom' : align;
    const [mainAxis, crossAxis] = resolveOffset(
      offset({
        positionedRect: { x: 0, y: 0, width, height },
        targetRect: { x: anchor.left, y: anchor.top, width: anchor.width, height: anchor.height },
        position: position as Position,
        alignment,
      }),
    );

    return blockMain ? [mainAxis, crossAxis] : [crossAxis, mainAxis];
  };
}
