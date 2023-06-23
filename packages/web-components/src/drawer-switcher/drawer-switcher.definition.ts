import { FluentDesignSystem } from '../fluent-design-system.js';
import { DrawerSwitcher, SvgIcon } from './drawer-switcher.js';
import { styles } from './drawer-switcher.styles.js';
import { template } from './drawer-switcher.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: <fluent-drawer-switcher>
 */

export const drawerSwitcherDefinition = DrawerSwitcher.compose({
  name: `${FluentDesignSystem.prefix}-drawer-switcher`,
  template,
  styles,
});

export const svgIconDefinition = SvgIcon.compose({
  name: `${FluentDesignSystem.prefix}-svg-icon`,
  template,
});
