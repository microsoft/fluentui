import { Menu, menuTemplate as template } from '@microsoft/fast-foundation';
import { menuStyles as styles } from './menu.styles';

/**
 * The Fluent Menu Element. Implements {@link @microsoft/fast-foundation#Menu},
 * {@link @microsoft/fast-foundation#menuTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-menu\>
 */
export const fluentMenu = Menu.compose({
  baseName: 'menu',
  template,
  styles,
});

/**
 * Styles for Menu
 * @public
 */
export const menuStyles = styles;
