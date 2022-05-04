import * as React from 'react';
import { usePopoverSurface_unstable } from './usePopoverSurface';
import { renderPopoverSurface_unstable } from './renderPopoverSurface';
import { usePopoverSurfaceStyles_unstable } from './usePopoverSurfaceStyles';
import type { PopoverSurfaceProps } from './PopoverSurface.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * PopoverSurface component renders react children in a positioned box
 */
export const PopoverSurface: ForwardRefComponent<PopoverSurfaceProps> = React.forwardRef((props, ref) => {
  const state = usePopoverSurface_unstable(props, ref);

  usePopoverSurfaceStyles_unstable(state);
  return renderPopoverSurface_unstable(state);
});

PopoverSurface.displayName = 'PopoverSurface';
