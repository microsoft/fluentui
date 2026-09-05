'use client';

import * as React from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import type {
  DashboardGridItemStoreSnapshot,
  DashboardGridStore,
  DashboardGridStoreSnapshot,
} from './DashboardGridStore.types';

export const useDashboardGridStoreSnapshot = (store: DashboardGridStore): DashboardGridStoreSnapshot =>
  useSyncExternalStore(store.subscribe, store.getStoreSnapshot, store.getServerSnapshot);

export const useDashboardGridItemStoreSnapshot = (
  store: DashboardGridStore,
  id: string,
): DashboardGridItemStoreSnapshot => {
  const subscribe = React.useCallback((listener: () => void) => store.subscribeItem(id, listener), [id, store]);
  const getSnapshot = React.useCallback(() => store.getItemSnapshot(id), [id, store]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};
