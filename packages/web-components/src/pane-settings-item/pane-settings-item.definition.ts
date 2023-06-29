import { FluentDesignSystem } from '../fluent-design-system.js';
import { PaneSettingsItem } from './pane-settings-items.js';
import { styles } from './pane-settings-item.styles.js';
import { template } from './pane-settings-item.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: <fluent-pane-settings-item>
 */

export const definition = PaneSettingsItem.compose({
  name: `${FluentDesignSystem.prefix}-pane-settings-item`,
  template,
  styles,
});
