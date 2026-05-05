import { tagName } from './menu-list.options.js';
import { MenuList } from './menu-list.js';
import { styles } from './menu-list.styles.js';
import { template } from './menu-list.template.js';

/**
 * @public
 * @remarks
 * HTML Element: <fluent-menu-list>
 */
export const definition = MenuList.compose({
  name: tagName,
  template,
  styles,
});
