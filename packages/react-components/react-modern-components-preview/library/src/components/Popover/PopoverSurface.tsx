'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { PopoverSurfaceProps } from './PopoverSurface.types';
import { renderPopoverSurface } from './renderPopoverSurface';
import { usePopoverSurface } from './usePopoverSurface';
import { usePopoverSurfaceStyles } from './usePopoverSurfaceStyles.styles';

/** Renders popover content in a positioned, styled surface. */
export const PopoverSurface: ForwardRefComponent<PopoverSurfaceProps> = React.forwardRef((props, ref) => {
  const state = usePopoverSurface(props, ref);

  usePopoverSurfaceStyles(state);

  return renderPopoverSurface(state);
});

PopoverSurface.displayName = 'PopoverSurface';
