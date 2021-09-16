import * as React from 'react';
import { usePopoverSurface } from './usePopoverSurface';
import { renderPopoverSurface } from './renderPopoverSurface';
import { usePopoverSurfaceStyles } from './usePopoverSurfaceStyles';
import type { PopoverSurfaceProps } from './PopoverSurface.types';

/**
 * PopoverSurface component renders react children in a positioned box
 */
export const PopoverSurface = React.forwardRef<HTMLDivElement, PopoverSurfaceProps>((props, ref) => {
  const state = usePopoverSurface(props, ref);

  usePopoverSurfaceStyles(state);
  return renderPopoverSurface(state);
});

PopoverSurface.displayName = 'PopoverSurface';
