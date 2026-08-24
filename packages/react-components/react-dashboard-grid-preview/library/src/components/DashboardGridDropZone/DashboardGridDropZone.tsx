'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DashboardGridDropZoneProps } from './DashboardGridDropZone.types';
import { renderDashboardGridDropZone_unstable } from './renderDashboardGridDropZone';
import { useDashboardGridDropZone_unstable } from './useDashboardGridDropZone';
import { useDashboardGridDropZoneStyles_unstable } from './useDashboardGridDropZoneStyles.styles';

/**
 * Registers a grid-backed, removal, or provider-approved custom DashboardGrid drop target.
 */
export const DashboardGridDropZone: ForwardRefComponent<DashboardGridDropZoneProps> = React.forwardRef<
  HTMLDivElement,
  DashboardGridDropZoneProps
>(
  (props, ref) => {
    const state = useDashboardGridDropZoneStyles_unstable(useDashboardGridDropZone_unstable(props, ref));
    return renderDashboardGridDropZone_unstable(state);
  },
);

DashboardGridDropZone.displayName = 'DashboardGridDropZone';
