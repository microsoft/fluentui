'use client';

import { useDashboardGridItemContext_unstable, useRequiredDashboardGridContext_unstable } from '../contexts';
import { useDashboardGridItemStoreSnapshot } from '../state/useDashboardGridStore';
import type { DashboardGridItemStoreSnapshot } from '../state/DashboardGridStore.types';

export const useDashboardGridItem = (itemId?: string): DashboardGridItemStoreSnapshot => {
  const contextItemId = useDashboardGridItemContext_unstable(context => context.id);
  const store = useRequiredDashboardGridContext_unstable(context => context.store);
  const id = itemId ?? contextItemId;

  if (!id) {
    throw new Error(
      '@fluentui/react-dashboard-grid-preview: useDashboardGridItem requires an item ID outside DashboardGridItem.',
    );
  }

  return useDashboardGridItemStoreSnapshot(store, id);
};
