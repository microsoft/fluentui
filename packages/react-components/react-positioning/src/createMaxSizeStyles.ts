import type { GriffelStyle } from '@griffel/react';

type MaxSizeStyles = Pick<
  GriffelStyle,
  'boxSizing' | 'height' | 'width' | 'maxHeight' | 'maxWidth' | 'overflowX' | 'overflowY'
>;

/**
 * Creates styles to make an element fit in the available space
 * @param fallbackStyles - fallback styles to use when autoSize is not enabled
 * @returns Griffel styles to spread to a slot
 */
export function createMaxSizeStyles(fallbackStyles: MaxSizeStyles = {}): MaxSizeStyles {
  const { boxSizing, height, width, maxHeight, maxWidth, overflowX, overflowY } = fallbackStyles;
  return {
    boxSizing: `var(--maxsize-box-sizing, ${boxSizing})` as GriffelStyle['boxSizing'],
    height: `var(--available-height, ${height})`,
    width: `var(--available-width, ${width})`,
    maxHeight: `var(--available-max-height, ${maxHeight})`,
    maxWidth: `var(--available-max-width, ${maxWidth})`,
    overflowX: `var(--maxsize-overflow-x, ${overflowX})` as GriffelStyle['overflowX'],
    overflowY: `var(--maxsize-overflow-y, ${overflowY})` as GriffelStyle['overflowY'],
  };
}
