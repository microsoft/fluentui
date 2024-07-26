import { FluentDesignSystem } from '../fluent-design-system.js';
import { Tabs } from './tabs.js';
import { template } from './tabs.template.js';
import { styles } from './tabs.styles.js';

/**
 * The definition for the Fluent Tabs component.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-tabs>`
 */
export const definition = Tabs.compose({
  name: `${FluentDesignSystem.prefix}-tabs`,
  template,
  styles,
});
