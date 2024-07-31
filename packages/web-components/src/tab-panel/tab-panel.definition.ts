import { FluentDesignSystem } from '../fluent-design-system.js';
import { TabPanel } from './tab-panel.js';
import { template } from './tab-panel.template.js';
import { styles } from './tab-panel.styles.js';

/**
 * The definition for the Fluent Tab Panel component.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-tab-panel>`
 */
export const definition = TabPanel.compose({
  name: `${FluentDesignSystem.prefix}-tab-panel`,
  template,
  styles,
});
