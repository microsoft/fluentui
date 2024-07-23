import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { TeachingPopoverSurfaceProps } from './TeachingPopoverSurface.types';
import { useTeachingPopoverSurface_unstable } from './useTeachingPopoverSurface';
import { useTeachingPopoverSurfaceStyles_unstable } from './useTeachingPopoverSurfaceStyles.styles';
import { renderTeachingPopoverSurface_unstable } from './renderTeachingPopoverSurface';

/**
 * TeachingPopoverSurface component renders react children in a positioned box
 *
 * TeachingPopoverSurface is a direct extension of PopoverSurface, with it's own styling context hooks available.
 */
export const TeachingPopoverSurface: ForwardRefComponent<TeachingPopoverSurfaceProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverSurface_unstable(props, ref);

    useTeachingPopoverSurfaceStyles_unstable(state);

    useCustomStyleHook_unstable('useTeachingPopoverSurfaceStyles_unstable')(state);

    return renderTeachingPopoverSurface_unstable(state);
  },
);

TeachingPopoverSurface.displayName = 'TeachingPopoverSurface';
