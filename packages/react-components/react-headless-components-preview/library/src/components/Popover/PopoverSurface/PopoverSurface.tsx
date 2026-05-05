'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { PopoverSurfaceProps } from './PopoverSurface.types';
import { usePopoverSurface } from './usePopoverSurface';
import { renderPopoverSurface } from './renderPopoverSurface';

/**
 * Headless PopoverSurface component.
 *
 * Renders the popover content area using native HTML popover attribute
 * for top-layer rendering.
 */
export const PopoverSurface: ForwardRefComponent<PopoverSurfaceProps> = React.forwardRef((props, ref) => {
  const state = usePopoverSurface(props, ref);
  return renderPopoverSurface(state);
});

PopoverSurface.displayName = 'PopoverSurface';
