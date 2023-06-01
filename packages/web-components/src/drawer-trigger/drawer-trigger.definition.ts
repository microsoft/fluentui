import { FluentDesignSystem } from '../fluent-design-system.js';
import { DrawerTrigger } from './drawer-trigger.js';
import { styles } from './drawer-trigger.styles.js';
import { template } from './drawer-trigger.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: <fluent-drawer-trigger>
 */

export const definition = DrawerTrigger.compose({
  name: `${FluentDesignSystem.prefix}-drawer-trigger`,
  template,
  styles,
});
