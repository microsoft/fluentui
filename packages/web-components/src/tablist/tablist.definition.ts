import { FluentDesignSystem } from '../fluent-design-system.js';
import { Tablist } from './tablist.js';
import { template } from './tablist.template.js';
import { styles } from './tablist.styles.js';

export const definition = Tablist.compose({
  name: `${FluentDesignSystem.prefix}-tablist`,
  template,
  styles,
});
