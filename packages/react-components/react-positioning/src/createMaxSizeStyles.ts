import type { GriffelStyle } from '@griffel/react';

/**
 * Creates styles to make an element fit in the available space
 * @param disableDualScroll - when specified, if overflowY needs to be set to auto, overflowX will be set to hidden, and vice versa.
 * @returns Griffel styles to spread to a slot
 */
export function createMaxSizeStyles(disableDualScroll?: boolean): GriffelStyle {
  return {
    '&[data-popper-maxsize]': {
      boxSizing: 'var(--maxsize-box-sizing)' as GriffelStyle['boxSizing'],
      maxHeight: 'var(--available-max-height)',
      maxWidth: 'var(--available-max-width)',
      '&[data-popper-scroll-x]': {
        width: `var(--available-max-width)`,
        overflowX: 'auto',
        ...(disableDualScroll && { overflowY: 'hidden' }),
      },
      '&[data-popper-scroll-y]': {
        height: `var(--available-max-height)`,
        overflowY: 'auto',
        ...(disableDualScroll && { overflowX: 'hidden' }),
      },
    },
  };
}
