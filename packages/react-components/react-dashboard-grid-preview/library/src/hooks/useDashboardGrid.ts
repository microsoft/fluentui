'use client';

import * as React from 'react';
import type {
  DashboardGridLayoutItemPatch,
  DashboardGridLoadOptions,
  DashboardGridMutationResult,
} from '../engine';
import {
  useDashboardGridContext_unstable,
  useDashboardGridProviderContext_unstable,
} from '../contexts';
import {
  deserializeDashboardGridItems,
  serializeDashboardGrid,
} from '../serialization/dashboardGridSerialization';
import type { DashboardGridRegistry } from '../provider/DashboardGridRegistry.types';
import type { useDashboardGridFocusManager } from '../accessibility/focusManager';
import type {
  DashboardGridItemDefinition,
  DashboardGridSerializedState,
  DashboardGridStore,
} from '../state/DashboardGridStore.types';

export type DashboardGridHandle = {
  getStore(): DashboardGridStore;
  getItems(): readonly DashboardGridItemDefinition[];
  addItem(item: DashboardGridItemDefinition): DashboardGridMutationResult;
  removeItem(id: string): DashboardGridMutationResult;
  updateItem(id: string, patch: DashboardGridLayoutItemPatch): DashboardGridMutationResult;
  compact(mode?: 'compact' | 'list'): DashboardGridMutationResult;
  save(): DashboardGridSerializedState;
  load(
    state: DashboardGridSerializedState | readonly DashboardGridItemDefinition[] | unknown,
    options?: DashboardGridLoadOptions,
  ): DashboardGridMutationResult;
  cancel(): unknown;
};

const isSerializedState = (value: unknown): value is DashboardGridSerializedState => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<DashboardGridSerializedState>;
  return candidate.version === 1 && !!candidate.engine && Array.isArray(candidate.items);
};

export const createDashboardGridHandle = (
  store: DashboardGridStore,
  registry: DashboardGridRegistry,
  focusManager?: ReturnType<typeof useDashboardGridFocusManager>,
): DashboardGridHandle => ({
  getStore: () => store,
  getItems: store.getDefinitions,
  addItem: item => store.add(item),
  removeItem: id => {
    const focusRecord = focusManager?.captureFocus(store.id, id);
    const host = registry.itemHosts.get(id)?.host;
    const itemElement = host?.closest<HTMLElement>('[data-dashboard-grid-item]');
    const containedFocus =
      !!focusRecord?.element &&
      (!!itemElement?.contains(focusRecord.element) || !!host?.contains(focusRecord.element));
    const removedRect = containedFocus ? itemElement?.getBoundingClientRect() : undefined;
    if (containedFocus && focusRecord) {
      focusManager?.requestPendingFocus(focusRecord);
    }

    const result = store.remove(id);
    if (result.status !== 'rejected' && containedFocus) {
      Promise.resolve().then(() =>
        Promise.resolve().then(() => {
          if (!registry.getItemOwner(id)) {
            focusManager?.focusAfterRemoval(store.id, removedRect);
            focusManager?.requestPendingFocus({ element: null });
          }
        }),
      );
    }
    return result;
  },
  updateItem: (id, patch) => store.update(id, patch),
  compact: mode => store.compact(mode),
  save: () => serializeDashboardGrid(store, registry),
  load: (state, options) => {
    if (isSerializedState(state)) {
      return store.load(deserializeDashboardGridItems(state, registry, store.id), {
        sourceColumns: state.engine.itemColumns,
        addMissing: true,
        removeMissing: true,
        ...options,
      });
    }
    if (Array.isArray(state)) {
      return store.load(state as readonly DashboardGridItemDefinition[], options);
    }
    return {
      status: 'rejected',
      reason: 'invalid-input',
      snapshot: store.getSnapshot(),
      changeSet: {
        revision: store.getSnapshot().revision,
        removed: [],
        added: [],
        changed: [],
        changes: [],
        diagnostics: [],
      },
    };
  },
  cancel: () => store.cancelInteraction(),
});

export const useDashboardGrid = (gridId?: string): DashboardGridHandle => {
  const contextStore = useDashboardGridContext_unstable(context => context.store);
  const contextRegistry = useDashboardGridContext_unstable(context => context.registry);
  const contextFocusManager = useDashboardGridContext_unstable(context => context.focusManager);
  const providerRegistry = useDashboardGridProviderContext_unstable(context => context.registry);
  const providerFocusManager = useDashboardGridProviderContext_unstable(context => context.focusManager);
  const registry = contextRegistry ?? providerRegistry;
  const focusManager = contextFocusManager ?? providerFocusManager;
  const store = gridId ? registry?.getGrid(gridId)?.store : contextStore;

  if (!store || !registry) {
    throw new Error(
      '@fluentui/react-dashboard-grid-preview: useDashboardGrid must be used inside a DashboardGridProvider or DashboardGrid.',
    );
  }

  return React.useMemo(
    () => createDashboardGridHandle(store, registry, focusManager),
    [focusManager, registry, store],
  );
};
