import { customElement } from '@microsoft/fast-element';
import { Menu, MenuTemplate as template } from '@microsoft/fast-foundation';
import { MenuStyles as styles } from './menu.styles';

/**
 * The Fluent Menu Element. Implements {@link @microsoft/fast-foundation#Menu},
 * {@link @microsoft/fast-foundation#MenuTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-menu\>
 */
@customElement({
  name: 'fluent-menu',
  template,
  styles,
})
export class FluentMenu extends Menu {}

/**
 * Styles for Menu
 * @public
 */
export const MenuStyles = styles;
