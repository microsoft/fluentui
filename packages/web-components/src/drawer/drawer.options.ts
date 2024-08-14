import type { ValuesOf } from '../utils/index.js';

/**
 * A drawer can be positioned on the left or right side of the viewport.
 */
export const DrawerPosition = {
  start: 'start',
  end: 'end',
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
  full: 'full',
} as const;

/**
 * The size of the drawer.
 * @public
 */
export type DrawerSize = ValuesOf<typeof DrawerSize>;

/**
 * A drawer can be different sizes
 */
export const DrawerType = {
  nonModal: 'non-modal',
  modal: 'modal',
  inline: 'inline',
} as const;

/**
 * The size of the drawer.
 * @public
 */
export type DrawerType = ValuesOf<typeof DrawerType>;
