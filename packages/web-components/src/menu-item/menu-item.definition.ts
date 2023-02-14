import { FluentDesignSystem } from '../fluent-design-system.js';
import { MenuItem } from './menu-item.js';
import { styles } from './menu-item.styles.js';
import { template } from './menu-item.template.js';

/**
 * The Fluent Menu Item Element. Implements {@link @microsoft/fast-foundation#MenuItem },
 * {@link @microsoft/fast-foundation#menuItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: <fluent-menu-item>
 */
export const definition = MenuItem.compose({
  name: `${FluentDesignSystem.prefix}-menu-item`,
  template,
  styles,
});
