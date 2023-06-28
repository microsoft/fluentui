import { FluentDesignSystem } from '../fluent-design-system.js';
import { PaneSwitcher } from './pane-switcher.js';
import { styles } from './pane-switcher.styles.js';
import { template } from './pane-switcher.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: <fluent-pane-switcher>
 */

export const definition = PaneSwitcher.compose({
  name: `${FluentDesignSystem.prefix}-pane-switcher`,
  template,
  styles,
});
