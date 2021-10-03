import * as React from 'react';
import { usePopoverTrigger } from './usePopoverTrigger';
import { renderPopoverTrigger } from './renderPopoverTrigger';
import type { PopoverTriggerProps } from './PopoverTrigger.types';

/**
 * Wraps a trigger element as an only child and adds the necessary event handling to open a popover.
 */
export const PopoverTrigger: React.FC<PopoverTriggerProps> = props => {
  const state = usePopoverTrigger(props);

  return renderPopoverTrigger(state);
};

PopoverTrigger.displayName = 'PopoverTrigger';
