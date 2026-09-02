'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderPopoverSurface, usePopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import { usePopoverLook } from '../Popover/PopoverContext';
import type { PopoverSurfaceProps } from './PopoverSurface.types';
import { usePopoverSurfaceStyles } from './usePopoverSurfaceStyles';

/**
 * A PopoverSurface is the popover's content area — a native <dialog> the browser promotes into
 * the top layer. Windmod PopoverSurface: the headless surface decorated with the Fluent visual
 * contract (Tailwind v4 + CSS Modules).
 */
export const PopoverSurface: ForwardRefComponent<PopoverSurfaceProps> = React.forwardRef((props, ref) =>
  renderPopoverSurface(usePopoverSurfaceStyles({ ...usePopoverSurface(props, ref), ...usePopoverLook() })),
);

PopoverSurface.displayName = 'PopoverSurface';
