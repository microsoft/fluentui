import * as React from 'react';
import { usePopoverTrigger_unstable } from './usePopoverTrigger';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';
import type { PopoverTriggerProps } from './PopoverTrigger.types';

/**
 * Wraps a trigger element as an only child and adds the necessary event handling to open a popover.
 */
export const PopoverTrigger: React.FC<PopoverTriggerProps> & FluentTriggerComponent = props => {
  const [state, render] = usePopoverTrigger_unstable(props);

  return render(state);
};

PopoverTrigger.displayName = 'PopoverTrigger';
PopoverTrigger.isFluentTriggerComponent = true;
