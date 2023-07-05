import { FluentDesignSystem } from '../fluent-design-system.js';
import { DrawerSwitcher } from './drawer-switcher.js';
import { styles } from './drawer-switcher.styles.js';
import { template } from './drawer-switcher.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: <fluent-drawer-switcher>
 */

export const definition = DrawerSwitcher.compose({
  name: `${FluentDesignSystem.prefix}-drawer-switcher`,
  template,
  styles,
});
