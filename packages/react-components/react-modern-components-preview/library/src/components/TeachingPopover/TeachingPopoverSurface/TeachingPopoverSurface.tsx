'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverSurfaceProps } from './TeachingPopoverSurface.types';
import { renderTeachingPopoverSurface } from './renderTeachingPopoverSurface';
import { useTeachingPopoverSurface } from './useTeachingPopoverSurface';
import { useTeachingPopoverSurfaceStyles } from './useTeachingPopoverSurfaceStyles.styles';

export const TeachingPopoverSurface: ForwardRefComponent<TeachingPopoverSurfaceProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverSurface(props, ref);
    useTeachingPopoverSurfaceStyles(state);
    return renderTeachingPopoverSurface(state);
  },
);

TeachingPopoverSurface.displayName = 'TeachingPopoverSurface';
