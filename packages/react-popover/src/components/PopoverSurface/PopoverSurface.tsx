import * as React from 'react';
import { usePopoverSurface } from './usePopoverSurface';
import { PopoverSurfaceProps } from './PopoverSurface.types';
import { renderPopoverSurface } from './renderPopoverSurface';
import { usePopoverSurfaceStyles } from './usePopoverSurfaceStyles';

/**
 * PopoverSurface component renders react children in a positioned box
 */
export const PopoverSurface = React.forwardRef<HTMLElement, PopoverSurfaceProps>((props, ref) => {
  const state = usePopoverSurface(props, ref);

  usePopoverSurfaceStyles(state);
  return renderPopoverSurface(state);
});

PopoverSurface.displayName = 'PopoverSurface';
