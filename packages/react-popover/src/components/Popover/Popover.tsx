import * as React from 'react';
import { usePopover } from './usePopover';
import { renderPopover } from './renderPopover';
import type { PopoverProps } from './Popover.types';

/**
 * Wrapper component that manages state for a PopoverTrigger and a PopoverSurface components.
 */
export const Popover: React.FC<PopoverProps> = props => {
  const state = usePopover(props);

  return renderPopover(state);
};

Popover.displayName = 'Popover';
