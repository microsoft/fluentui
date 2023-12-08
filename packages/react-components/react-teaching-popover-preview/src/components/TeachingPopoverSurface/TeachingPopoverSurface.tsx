import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useTeachingPopoverSurface_unstable } from './useTeachingPopoverSurface';
import { renderTeachingPopoverSurface_unstable } from './renderTeachingPopoverSurface';
import { useTeachingPopoverSurfaceStyles_unstable } from './useTeachingPopoverSurfaceStyles.styles';
import type { TeachingPopoverSurfaceProps } from './TeachingPopoverSurface.types';

/**
 * TeachingPopoverSurface component - TODO: add more docs
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
