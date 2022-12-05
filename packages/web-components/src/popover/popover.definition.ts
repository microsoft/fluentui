import { Popover } from './popover';
import { popoverTemplate } from './popover.template';
import { styles } from './popover.styles';

export const definition = Popover.compose({
  name: 'fluent-popover',
  template: popoverTemplate(),
  styles,
});
