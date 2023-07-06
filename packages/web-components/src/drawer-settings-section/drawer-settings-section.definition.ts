import { FluentDesignSystem } from '../fluent-design-system.js';
import { DrawerSettingsSection } from './drawer-settings-section.js';
import { styles } from './drawer-settings-section.styles.js';
import { template } from './drawer-settings-section.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: <fluent-drawer-settings-section>
 */

export const definition = DrawerSettingsSection.compose({
  name: `${FluentDesignSystem.prefix}-drawer-settings-section`,
  template,
  styles,
});
