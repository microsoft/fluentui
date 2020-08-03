import { customElement } from '@microsoft/fast-element';
import { Menu, MenuTemplate as template } from '@microsoft/fast-foundation';
import { MenuStyles as styles } from './menu.styles';

/**
 * The FAST Menu Element. Implements {@link @microsoft/fast-foundation#Menu},
 * {@link @microsoft/fast-foundation#MenuTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-menu\>
 */
@customElement({
  name: 'fast-menu',
  template,
  styles,
})
export class FASTMenu extends Menu {}

/**
 * Styles for Menu
 * @public
 */
export const MenuStyles = styles;
