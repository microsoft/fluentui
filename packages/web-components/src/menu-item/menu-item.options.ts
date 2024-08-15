import type { ValuesOf } from '../utils/index.js';

/**
 * Menu items roles.
 * @public
 */
export const MenuItemRole = {
  /**
   * The menu item has a "menuitem" role
   */
  menuitem: 'menuitem',

  /**
   * The menu item has a "menuitemcheckbox" role
   */
  menuitemcheckbox: 'menuitemcheckbox',

  /**
   * The menu item has a "menuitemradio" role
   */
  menuitemradio: 'menuitemradio',
} as const;

/**
 * The types for menu item roles
 * @public
 */
export type MenuItemRole = ValuesOf<typeof MenuItemRole>;

/**
 * @internal
 */
export const roleForMenuItem: {
  [value in keyof typeof MenuItemRole]: (typeof MenuItemRole)[value];
} = {
  [MenuItemRole.menuitem]: 'menuitem',
  [MenuItemRole.menuitemcheckbox]: 'menuitemcheckbox',
  [MenuItemRole.menuitemradio]: 'menuitemradio',
};
