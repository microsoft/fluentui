import { FluentDesignSystem } from '../fluent-design-system.js';
import { Popover } from './popover.js';
import { popoverStyles } from './popover.styles.js';
import { template } from './popover.template.js';

export const PopoverDefinition = Popover.compose({
  name: `${FluentDesignSystem.prefix}-popover`,
  template,
  styles: popoverStyles,
  shadowOptions: {
    mode: FluentDesignSystem.shadowRootMode,
  },
});
