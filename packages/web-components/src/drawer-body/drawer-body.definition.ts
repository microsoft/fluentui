import { tagName } from './drawer-body.options.js';
import { DrawerBody } from './drawer-body.js';
import { styles } from './drawer-body.styles.js';
import { template } from './drawer-body.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: <fluent-drawer>
 */

export const definition = DrawerBody.compose({
  name: tagName,
  template,
  styles,
});
