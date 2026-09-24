'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { PopoverSurfaceProps } from './PopoverSurface.types';
import { usePopoverSurface } from './usePopoverSurface';
import { renderPopoverSurface } from './renderPopoverSurface';

/**
 * Headless PopoverSurface component.
 *
 * Renders the popover content area as a native `<dialog>` by default. Consumers
 * can render a `<div>` for non-modal surfaces with `as="div"`. A `<dialog>` is
 * required when the parent `Popover` has `trapFocus` enabled.
 */
export const PopoverSurface: ForwardRefComponent<PopoverSurfaceProps> = React.forwardRef((props, ref) => {
  const state = usePopoverSurface(props, ref);
  return renderPopoverSurface(state);
});

PopoverSurface.displayName = 'PopoverSurface';
