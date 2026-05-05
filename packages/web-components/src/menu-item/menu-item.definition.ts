import { tagName } from './menu-item.options.js';
import { MenuItem } from './menu-item.js';
import { styles } from './menu-item.styles.js';
import { template } from './menu-item.template.js';

/**
 * @public
 * @remarks
 * HTML Element: <fluent-menu-item>
 */
export const definition = MenuItem.compose({
  name: tagName,
  template,
  styles,
});
