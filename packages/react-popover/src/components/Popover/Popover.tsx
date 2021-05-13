import * as React from 'react';
import { usePopover } from './usePopover';
import { PopoverProps } from './Popover.types';
import { renderPopover } from './renderPopover';

/**
 * Popover component
 */
export const Popover: React.FC<PopoverProps> = props => {
  const state = usePopover(props);

  return renderPopover(state);
};

Popover.displayName = 'Popover';
