'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { PopoverSurfaceProps } from './PopoverSurface.types';
import { usePopoverSurface } from './usePopoverSurface';
import { renderPopoverSurface } from './renderPopoverSurface';

/**
 * Headless PopoverSurface component.
 *
 * Renders the popover content area as a native `<div popover="auto">` for
 * non-modal surfaces and as a `<dialog>` for modal surfaces. The choice is
 * driven by the parent `Popover`'s `trapFocus` prop.
 */
export const PopoverSurface: ForwardRefComponent<PopoverSurfaceProps> = React.forwardRef((props, ref) => {
  const state = usePopoverSurface(props, ref);
  return renderPopoverSurface(state);
});

PopoverSurface.displayName = 'PopoverSurface';
