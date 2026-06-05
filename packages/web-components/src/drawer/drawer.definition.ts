import { tagName } from './drawer.options.js';
import { Drawer } from './drawer.js';
import { styles } from './drawer.styles.js';
import { template } from './drawer.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: <fluent-drawer>
 */

export const definition = Drawer.compose({
  name: tagName,
  template,
  styles,
});
