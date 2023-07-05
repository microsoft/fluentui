import { FluentDesignSystem } from '../fluent-design-system.js';
import { DrawerToggle } from './drawer-toggle.js';
import { styles } from './drawer-toggle.styles.js';
import { template } from './drawer-toggle.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: <fluent-drawer-toggle>
 */

export const definition = DrawerToggle.compose({
  name: `${FluentDesignSystem.prefix}-drawer-toggle`,
  template,
  styles,
});
