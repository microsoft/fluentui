import { FluentDesignSystem } from '../fluent-design-system.js';
import { TabPanel } from './tab-panel.js';
import { template } from './tab-panel.template.js';
import { styles } from './tab-panel.styles.js';

export const definition = TabPanel.compose({
  name: `${FluentDesignSystem.prefix}-tab-panel`,
  template,
  styles,
});
