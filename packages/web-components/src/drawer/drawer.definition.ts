import { FluentDesignSystem } from '../fluent-design-system.js';
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
  name: `${FluentDesignSystem.prefix}-drawer`,
  template,
  styles,
});
