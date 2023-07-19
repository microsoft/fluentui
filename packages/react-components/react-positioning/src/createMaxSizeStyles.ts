import type { GriffelStyle } from '@griffel/react';

/**
 * Creates styles to make an element fit in the available space
 * @returns Griffel styles to spread to a slot
 */
export function createMaxSizeStyles(): GriffelStyle {
  return {
    boxSizing: 'var(--maxsize-box-sizing)' as GriffelStyle['boxSizing'],
    height: 'var(--available-height)',
    width: 'var(--available-width)',
    maxHeight: 'var(--available-max-height)',
    maxWidth: 'var(--available-max-width)',
    overflowX: 'var(--maxsize-overflow-x)' as GriffelStyle['overflowX'],
    overflowY: 'var(--maxsize-overflow-y)' as GriffelStyle['overflowY'],
  };
}
