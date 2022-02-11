import * as React from 'react';
import { usePopover_unstable } from './usePopover';
import type { PopoverProps } from './Popover.types';

/**
 * Wrapper component that manages state for a PopoverTrigger and a PopoverSurface components.
 */
export const Popover: React.FC<PopoverProps> = props => {
  const [state, render] = usePopover_unstable(props);

  return render(state);
};

Popover.displayName = 'Popover';
