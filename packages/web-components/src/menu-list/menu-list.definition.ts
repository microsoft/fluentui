import { FluentDesignSystem } from '../fluent-design-system.js';
import { MenuList } from './menu-list.js';
import { styles } from './menu-list.styles.js';
import { template } from './menu-list.template.js';

/**
 * The Fluent Menu Element. Implements {@link @microsoft/fast-foundation#Menu },
 * {@link @microsoft/fast-foundation#menuTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: <fluent-menu>
 */
export const definition = MenuList.compose({
  name: `${FluentDesignSystem.prefix}-menu-list`,
  template,
  styles,
});
