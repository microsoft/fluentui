'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import type { DashboardGridProviderProps } from './DashboardGridProvider.types';
import { renderDashboardGridProvider_unstable } from './renderDashboardGridProvider';
import { useDashboardGridProvider_unstable } from './useDashboardGridProvider';

/**
 * Coordinates DashboardGrid instances, external sources, drop zones, and cross-grid item ownership.
 */
export const DashboardGridProvider = (props: DashboardGridProviderProps): JSXElement => {
  const state = useDashboardGridProvider_unstable(props);
  return renderDashboardGridProvider_unstable(state);
};

DashboardGridProvider.displayName = 'DashboardGridProvider';
