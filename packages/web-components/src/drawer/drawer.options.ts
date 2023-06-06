import { ValuesOf } from '@microsoft/fast-foundation';

/**
 * A drawer can be positioned on the left or right side of the viewport.
 */
export const DrawerPosition = {
  left: 'left',
  right: 'right',
} as const;

/**
 * The position of the drawer.
 * @public
 */
export type DrawerPosition = ValuesOf<typeof DrawerPosition>;

/**
 * A drawer can be different sizes
 */
export const DrawerSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * The size of the drawer.
 * @public
 */
export type DrawerSize = ValuesOf<typeof DrawerSize>;
