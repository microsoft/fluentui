import { FluentDesignSystem } from '../../fluent-design-system.js';
import { Menu } from './menu.js';
import { styles } from './menu.styles.js';
import { template } from './menu.template.js';

/**
 * The Fluent Menu Element. Implements {@link @microsoft/fast-foundation#Menu },
 * {@link @microsoft/fast-foundation#menuTemplate}
 *
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
