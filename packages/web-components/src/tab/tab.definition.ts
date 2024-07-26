import { FluentDesignSystem } from '../fluent-design-system.js';
import { Tab } from './tab.js';
import { template } from './tab.template.js';
import { styles } from './tab.styles.js';

/**
 * The definition for the Fluent Tab component.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-tab>`
 */
export const definition = Tab.compose({
  name: `${FluentDesignSystem.prefix}-tab`,
  template,
  styles,
});
