import { FluentDesignSystem } from '../fluent-design-system.js';
import { DrawerToggleButton } from './drawer-toggle-button.js';
import { styles } from './drawer-toggle-button.styles.js';
import { template } from './drawer-toggle-button.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: <fluent-drawer-toggle-button>
 */

export const definition = DrawerToggleButton.compose({
  name: `${FluentDesignSystem.prefix}-drawer-toggle-button`,
  template,
  styles,
});
