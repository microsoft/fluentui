import { FluentDesignSystem } from '../fluent-design-system.js';
import { DrawerBody } from './drawer-body.js';
import { styles } from './drawer-body.styles.js';
import { template } from './drawer-body.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: <fluent-drawer-body>
 */

export const definition = DrawerBody.compose({
  name: `${FluentDesignSystem.prefix}-drawer-body`,
  template,
  styles,
});
