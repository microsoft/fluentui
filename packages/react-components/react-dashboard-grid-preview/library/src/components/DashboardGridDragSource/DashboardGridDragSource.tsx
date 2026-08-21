'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderDashboardGridDragSource_unstable } from './renderDashboardGridDragSource';
import type { DashboardGridDragSourceProps } from './DashboardGridDragSource.types';
import { useDashboardGridDragSource_unstable } from './useDashboardGridDragSource';
import { useDashboardGridDragSourceStyles_unstable } from './useDashboardGridDragSourceStyles.styles';

/**
 * Registers an external, pointer- and keyboard-operable source for DashboardGrid items.
 */
export const DashboardGridDragSource: ForwardRefComponent<DashboardGridDragSourceProps> = React.forwardRef<
  HTMLDivElement,
  DashboardGridDragSourceProps
>(
  (props, ref) => {
    const state = useDashboardGridDragSource_unstable(props, ref);
    useDashboardGridDragSourceStyles_unstable(state);
    return renderDashboardGridDragSource_unstable(state);
  },
);

DashboardGridDragSource.displayName = 'DashboardGridDragSource';
