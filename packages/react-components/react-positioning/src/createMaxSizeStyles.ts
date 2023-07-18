import type { GriffelStyle } from '@griffel/react';

export function createMaxSizeStyles(): GriffelStyle {
  return {
    boxSizing: 'border-box',
    height: 'var(--available-height)',
    width: 'var(--available-width)',
    maxHeight: 'var(--available-max-height)',
    maxWidth: 'var(--available-max-width)',
    overflowX: 'var(--overflow-x)' as GriffelStyle['overflowX'],
    overflowY: 'var(--overflow-y)' as GriffelStyle['overflowY'],
  };
}
