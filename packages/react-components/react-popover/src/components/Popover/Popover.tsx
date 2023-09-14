import * as React from 'react';
import { usePopover_unstable } from './usePopover';
import { renderPopover_unstable } from './renderPopover';
import type { PopoverProps } from './Popover.types';

/**
 * Wrapper component that manages state for a PopoverTrigger and a PopoverSurface components.
 */
export const Popover: React.FC<PopoverProps> = props => {
  const state = usePopover_unstable(props);

  return renderPopover_unstable(state);
};

Popover.displayName = 'Popover';
