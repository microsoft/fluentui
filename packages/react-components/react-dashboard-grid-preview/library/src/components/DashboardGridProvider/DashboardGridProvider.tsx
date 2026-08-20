'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import type { DashboardGridProviderProps } from './DashboardGridProvider.types';
import { renderDashboardGridProvider_unstable } from './renderDashboardGridProvider';
import { useDashboardGridProvider_unstable } from './useDashboardGridProvider';

export const DashboardGridProvider = (props: DashboardGridProviderProps): JSXElement => {
  const state = useDashboardGridProvider_unstable(props);
  return renderDashboardGridProvider_unstable(state);
};
