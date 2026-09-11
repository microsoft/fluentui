'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTeachingPopoverSurface,
  useTeachingPopoverSurface,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import { usePopoverLook } from '../Popover/PopoverContext';
import type { TeachingPopoverSurfaceProps } from './TeachingPopoverSurface.types';
import { useTeachingPopoverSurfaceStyles } from './useTeachingPopoverSurfaceStyles';

/**
 * A TeachingPopoverSurface is the teaching popover's content area — a native <dialog> the browser
 * promotes into the top layer. Windmod TeachingPopoverSurface: the windmod PopoverSurface with the
 * teaching chrome layered over it.
 */
export const TeachingPopoverSurface: ForwardRefComponent<TeachingPopoverSurfaceProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverSurface(props, ref);
    const context = usePopoverLook();
    const styled = useTeachingPopoverSurfaceStyles({ ...state, ...context });

    return renderTeachingPopoverSurface(styled);
  },
);

TeachingPopoverSurface.displayName = 'TeachingPopoverSurface';
