import * as React from 'react';
import { usePopoverSurface } from './usePopoverSurface';
import { renderPopoverSurface } from './renderPopoverSurface';
import { usePopoverSurfaceStyles } from './usePopoverSurfaceStyles';
import type { PopoverSurfaceProps } from './PopoverSurface.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * PopoverSurface component renders react children in a positioned box
 */
export const PopoverSurface: ForwardRefComponent<PopoverSurfaceProps> = React.forwardRef((props, ref) => {
  const state = usePopoverSurface(props, ref);

  usePopoverSurfaceStyles(state);
  return renderPopoverSurface(state);
});

PopoverSurface.displayName = 'PopoverSurface';
