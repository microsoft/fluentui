import { DesignSystem } from '../design-system';
import { Popover } from './popover';
import { popoverStyles } from './popover.styles';
import { template } from './popover.template';

export const PopoverDefinition = Popover.compose({
  name: `${DesignSystem.prefix}-popover`,
  template,
  styles: popoverStyles,
  shadowOptions: {
    mode: DesignSystem.shadowRootMode,
  },
});
