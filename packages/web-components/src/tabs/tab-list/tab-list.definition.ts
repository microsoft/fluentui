import { FluentDesignSystem } from '../../fluent-design-system.js';
import { TabList } from './tab-list.js';
import { template } from './tab-list.template.js';
import { styles } from './tab-list.styles.js';

export const definition = TabList.compose({
  name: `${FluentDesignSystem.prefix}-tab-list`,
  template,
  styles,
});
