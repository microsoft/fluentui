'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { DashboardGridItemProps } from './DashboardGridItem.types';
import { renderDashboardGridItem_unstable } from './renderDashboardGridItem';
import { useDashboardGridItem_unstable } from './useDashboardGridItem';
import { useDashboardGridItemStyles_unstable } from './useDashboardGridItemStyles.styles';
import { useDashboardGridPrintItemStyles_unstable } from '../../print/useDashboardGridPrintStyles.styles';

/**
 * Renders one declarative item within a DashboardGrid.
 */
export const DashboardGridItem: ForwardRefComponent<DashboardGridItemProps> = React.forwardRef((props, ref) => {
  let state = useDashboardGridItem_unstable(props, ref);
  state = useDashboardGridItemStyles_unstable(state);
  state = useDashboardGridPrintItemStyles_unstable(state);
  useCustomStyleHook_unstable('useDashboardGridItemStyles_unstable' as never)(state as never);
  return renderDashboardGridItem_unstable(state);
});

DashboardGridItem.displayName = 'DashboardGridItem';
