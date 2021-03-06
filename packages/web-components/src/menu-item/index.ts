import { customElement } from '@microsoft/fast-element';
import { MenuItem, MenuItemTemplate as template } from '@microsoft/fast-foundation';
import { MenuItemStyles as styles } from './menu-item.styles';

/**
 * The Fluent Menu Item Element. Implements {@link @microsoft/fast-foundation#MenuItem},
 * {@link @microsoft/fast-foundation#MenuItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-menu-item\>
 */
@customElement({
  name: 'fluent-menu-item',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentMenuItem extends MenuItem {}

/**
 * Styles for MenuItem
 * @public
 */
export const MenuItemStyles = styles;
