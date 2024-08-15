import { FluentDesignSystem } from '../fluent-design-system.js';
import { Menu } from './menu.js';
import { styles } from './menu.styles.js';
import { template } from './menu.template.js';

/**
 * The Fluent Menu Element.
 *
 * @public
 * @remarks
 * HTML Element: <fluent-menu>
 */
export const definition = Menu.compose({
  name: `${FluentDesignSystem.prefix}-menu`,
  template,
  styles,
});
