import type { ValuesOf } from '../utils/index.js';
import type { MenuItem } from './menu-item.js';

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

/**
 * Predicate function that determines if the element should be considered a menu-item.
 *
 * @param element - The element to check.
 * @param tagName - The tag name to check.
 * @returns true if the element is a dropdown.
 * @public
 */
export function isMenuItem(element?: Node | null, tagName: string = '-menu-item'): element is MenuItem {
  if (element?.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return (element as Element).tagName.toLowerCase().endsWith(tagName);
}
