import { FluentDesignSystem } from '../fluent-design-system.js';
import { Tabs } from './tabs.js';
import { template } from './tabs.template.js';
import { styles } from './tabs.styles.js';

/**
 * @deprecated - Use tablist instead
 */
export const definition = Tabs.compose({
  name: `${FluentDesignSystem.prefix}-tabs`,
  template,
  styles,
});
