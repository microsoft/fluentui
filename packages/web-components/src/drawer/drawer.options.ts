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
