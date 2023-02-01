import { FluentDesignSystem } from '../fluent-design-system.js';
import { Popover } from './popover.js';
import { styles } from './popover.styles.js';
import { template } from './popover.template.js';

export const definition = Popover.compose({
  name: `${FluentDesignSystem.prefix}-popover`,
  template: template,
  styles,
});
