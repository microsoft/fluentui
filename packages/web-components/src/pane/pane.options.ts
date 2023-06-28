import { ValuesOf } from '@microsoft/fast-foundation';

/**
 * A pane can be positioned on the left or right side of the viewport.
 */
export const PanePosition = {
  left: 'left',
  right: 'right',
} as const;

/**
 * The position of the pane.
 * @public
 */
export type PanePosition = ValuesOf<typeof PanePosition>;

/**
 * A pane can be different sizes
 */
export const PaneSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * The size of the pane.
 * @public
 */
export type PaneSize = ValuesOf<typeof PaneSize>;
