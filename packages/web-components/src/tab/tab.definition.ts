import { FluentDesignSystem } from '../fluent-design-system.js';
import { Tab } from './tab.js';
import { template } from './tab.template.js';
import { styles } from './tab.styles.js';

export const definition = Tab.compose({
  name: `${FluentDesignSystem.prefix}-tab`,
  template,
  styles,
});
