import * as React from 'react';
import { usePopoverSurface_unstable } from './usePopoverSurface';
import type { PopoverSurfaceProps } from './PopoverSurface.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * PopoverSurface component renders react children in a positioned box
 */
export const PopoverSurface: ForwardRefComponent<PopoverSurfaceProps> = React.forwardRef((props, ref) => {
  const [state, render] = usePopoverSurface_unstable(props, ref);
  return render(state);
});

PopoverSurface.displayName = 'PopoverSurface';
