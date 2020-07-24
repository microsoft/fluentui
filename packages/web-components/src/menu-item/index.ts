import { customElement } from '@microsoft/fast-element';
import { MenuItem, MenuItemTemplate as template } from '@microsoft/fast-foundation';
import { MenuItemStyles as styles } from './menu-item.styles';

/**
 * The FAST Menu Item Element. Implements {@link @microsoft/fast-foundation#MenuItem},
 * {@link @microsoft/fast-foundation#MenuItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-menu-item\>
 */
@customElement({
  name: 'fast-menu-item',
  template,
  styles,
})
export class FASTMenuItem extends MenuItem {}
