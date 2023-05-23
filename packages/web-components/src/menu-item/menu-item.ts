import { FASTMenuItem, MenuItemRole } from '@microsoft/fast-foundation';

export type MenuItemColumnCount = 0 | 1 | 2;

export { MenuItemRole };

/**
 * The base class used for constructing a fluent-menu-item custom element
 * @public
 */
export class MenuItem extends FASTMenuItem {}
