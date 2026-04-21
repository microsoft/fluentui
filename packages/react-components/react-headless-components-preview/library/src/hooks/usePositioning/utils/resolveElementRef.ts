import type * as React from 'react';

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
