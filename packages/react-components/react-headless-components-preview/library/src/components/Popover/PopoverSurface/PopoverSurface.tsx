'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { PopoverSurfaceProps } from './PopoverSurface.types';
import { usePopoverSurface } from './usePopoverSurface';
import { renderPopoverSurface } from './renderPopoverSurface';

/**
 * Headless PopoverSurface component.
 *
 * Renders the popover content area as a native `<dialog popover="auto">` so
 * a single element supports both non-modal (`showPopover()`) and modal
 * (`showModal()`) show modes; the choice is driven by the parent
 * `Popover`'s `trapFocus` prop.
 */
export const PopoverSurface: ForwardRefComponent<PopoverSurfaceProps> = React.forwardRef<
  HTMLDialogElement,
  PopoverSurfaceProps
>((props, ref) => {
  const state = usePopoverSurface(props, ref);
  return renderPopoverSurface(state);
});

PopoverSurface.displayName = 'PopoverSurface';
