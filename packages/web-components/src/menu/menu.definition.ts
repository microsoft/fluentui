import { tagName } from './menu.options.js';
import { Menu } from './menu.js';
import { styles } from './menu.styles.js';
import { template } from './menu.template.js';

/**
 * The Fluent Menu Element.
 *
 * @public
 * @remarks
 * HTML Element: <fluent-menu>
 */
export const definition = Menu.compose({
  name: tagName,
  template,
  styles,
});
