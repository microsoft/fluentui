import * as React from 'react';
import { usePopoverTrigger } from './usePopoverTrigger';
import { PopoverTriggerProps } from './PopoverTrigger.types';
import { renderPopoverTrigger } from './renderPopoverTrigger';

/**
 * PopoverTrigger component
 */
export const PopoverTrigger: React.FC<PopoverTriggerProps> = props => {
  const state = usePopoverTrigger(props);

  return renderPopoverTrigger(state);
};

PopoverTrigger.displayName = 'PopoverTrigger';
