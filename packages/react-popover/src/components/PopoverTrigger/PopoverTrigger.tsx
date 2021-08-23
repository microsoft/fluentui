import * as React from 'react';
import { usePopoverTrigger } from './usePopoverTrigger';
import { renderPopoverTrigger } from './renderPopoverTrigger';
import type { PopoverTriggerProps } from './PopoverTrigger.types';

/**
 * PopoverTrigger component
 */
export const PopoverTrigger: React.FC<PopoverTriggerProps> = props => {
  const state = usePopoverTrigger(props);

  return renderPopoverTrigger(state);
};

PopoverTrigger.displayName = 'PopoverTrigger';
