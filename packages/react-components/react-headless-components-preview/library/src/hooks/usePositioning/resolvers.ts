import type * as React from 'react';
import type { PositioningProps } from './types';

/**
 * Normalizes an `HTMLElement | RefObject | null | undefined` to a plain
 * element (or null). Safe across realms — checks for the `current` property
 * rather than doing `instanceof HTMLElement`.
 */
export function resolveElementRef(
  source: HTMLElement | React.RefObject<HTMLElement | null> | null | undefined,
): HTMLElement | null {
  if (!source) {
    return null;
  }

  return 'current' in source ? source.current : source;
}

/** Normalizes the `offset` prop into explicit `{ mainAxis, crossAxis }`. */
export function resolveOffset(offset: PositioningProps['offset']): { mainAxis: number; crossAxis: number } {
  if (typeof offset === 'number') {
    return { mainAxis: offset, crossAxis: 0 };
  }

  if (offset) {
    return { mainAxis: offset.mainAxis ?? 0, crossAxis: offset.crossAxis ?? 0 };
  }

  return { mainAxis: 0, crossAxis: 0 };
}
