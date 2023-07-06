import { FluentDesignSystem } from '../fluent-design-system.js';
import { DrawerSwitcherToggleButton } from './drawer-switcher-toggle-button.js';
import { styles } from './drawer-switcher-toggle-button.styles.js';
import { template } from './drawer-switcher-toggle-button.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: <fluent-drawer-switcher-toggle-button>
 */

export const definition = DrawerSwitcherToggleButton.compose({
  name: `${FluentDesignSystem.prefix}-drawer-switcher-toggle-button`,
  template,
  styles,
});
