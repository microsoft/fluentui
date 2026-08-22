'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { DashboardGridProps } from './DashboardGrid.types';
import { renderDashboardGrid_unstable } from './renderDashboardGrid';
import { useDashboardGrid_unstable } from './useDashboardGrid';
import { useDashboardGridStyles_unstable } from './useDashboardGridStyles.styles';
import { useDashboardGridPrintStyles_unstable } from '../../print/useDashboardGridPrintStyles.styles';

/**
 * Renders a responsive dashboard layout with pointer, keyboard, nesting, persistence, and print support.
 */
export const DashboardGrid: ForwardRefComponent<DashboardGridProps> = React.forwardRef((props, ref) => {
  const state = useDashboardGrid_unstable(props, ref);
  useDashboardGridStyles_unstable(state);
  useDashboardGridPrintStyles_unstable(state);
  useCustomStyleHook_unstable('useDashboardGridStyles_unstable' as never)(state as never);
  return renderDashboardGrid_unstable(state);
});

DashboardGrid.displayName = 'DashboardGrid';
