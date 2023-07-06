import { FluentDesignSystem } from '../fluent-design-system.js';
import { DrawerToolbar } from './drawer-toolbar.js';
import { styles } from './drawer-toolbar.styles.js';
import { template } from './drawer-toolbar.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: <fluent-drawer-toolbar>
 */

export const definition = DrawerToolbar.compose({
  name: `${FluentDesignSystem.prefix}-drawer-toolbar`,
  template,
  styles,
});
