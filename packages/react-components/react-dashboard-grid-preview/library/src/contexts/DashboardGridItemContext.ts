'use client';

import type { Context, ContextSelector } from '@fluentui/react-context-selector';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { DashboardGridItemStoreSnapshot, DashboardGridStore } from '../state/DashboardGridStore.types';

export type DashboardGridItemContextValue = {
  id: string;
  gridId: string;
  store: DashboardGridStore;
  snapshot: DashboardGridItemStoreSnapshot;
};

const DashboardGridItemContext: Context<DashboardGridItemContextValue | undefined> =
  createContext<DashboardGridItemContextValue | undefined>(undefined);

export const { Provider: DashboardGridItemContextProvider } = DashboardGridItemContext;

export const useDashboardGridItemContext_unstable = <T>(
  selector: ContextSelector<DashboardGridItemContextValue, T>,
): T | undefined => useContextSelector(DashboardGridItemContext, value => (value ? selector(value) : undefined));

export const useRequiredDashboardGridItemContext_unstable = <T>(
  selector: ContextSelector<DashboardGridItemContextValue, T>,
): T => {
  const context = useContextSelector(DashboardGridItemContext, value => value);
  if (!context) {
    throw new Error(
      '@fluentui/react-dashboard-grid-preview: This hook must be used inside a DashboardGridItem.',
    );
  }
  return selector(context);
};
