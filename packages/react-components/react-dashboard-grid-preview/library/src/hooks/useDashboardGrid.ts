'use client';

import * as React from 'react';
import type {
  DashboardGridColumnLayout,
  DashboardGridFitResult,
  DashboardGridLoadOptions,
  DashboardGridRect,
  DashboardGridResolvedItem,
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
  DashboardGridMutationOptions,
  DashboardGridRemoveOptions,
  DashboardGridSaveOptions,
  DashboardGridSerializedGrid,
  DashboardGridSerializedItem,
  DashboardGridStore,
} from '../state/DashboardGridStore.types';
import { toDashboardGridEngineItem } from '../state/DashboardGridStore.types';
import type { DashboardGridDomGeometrySession } from '../interaction/domGeometry';
import type { DashboardGridCellMetrics } from '../engine';

type DashboardGridHandleEnvironment = {
  focusManager?: ReturnType<typeof useDashboardGridFocusManager>;
  getMetrics?(): DashboardGridCellMetrics;
  getDomGeometry?(): DashboardGridDomGeometrySession | undefined;
  setEnabled?(enabled: boolean, options?: { recursive?: boolean }): void;
  refreshDragHandles?(id?: string): void;
  resizeItemToContent?(id: string): void;
  compactMode?: 'compact' | 'list';
};

/** Imperative DashboardGrid commands exposed separately from the root element ref. */
export interface DashboardGridHandle {
  /** Returns the current immutable resolved items. */
  getItems(): readonly DashboardGridResolvedItem[];
  /** Returns one resolved item, optionally searching descendant grids. */
  getItem(
    id: string,
    options?: { recursive?: boolean },
  ): DashboardGridResolvedItem | undefined;
  /** Adds an item to an uncontrolled grid. */
  addItem(
    item: DashboardGridItemDefinition,
    options?: DashboardGridMutationOptions,
  ): void;
  /** Removes one item. */
  removeItem(id: string, options?: DashboardGridRemoveOptions): void;
  /** Removes all items. */
  removeAll(options?: DashboardGridRemoveOptions): void;
  /** Updates item geometry, behavior, or render metadata. */
  updateItem(
    id: string,
    patch: Partial<Omit<DashboardGridItemDefinition, 'id'>>,
    options?: DashboardGridMutationOptions,
  ): void;
  /** Loads item definitions or a versioned serialized grid. */
  load(
    items: readonly DashboardGridItemDefinition[] | DashboardGridSerializedGrid,
    options?: DashboardGridLoadOptions,
  ): void;
  /** Saves a versioned grid or items-only payload. */
  save(
    options?: DashboardGridSaveOptions,
  ): DashboardGridSerializedGrid | readonly DashboardGridSerializedItem[];
  /** Coalesces multiple mutations into one engine transaction. */
  batch<T>(operation: () => T, options?: { pack?: boolean }): T;
  /** Explicitly compacts the layout. */
  compact(mode?: 'compact' | 'list'): void;
  /** Changes the active column count and responsive layout. */
  setColumns(columns: number, layout?: DashboardGridColumnLayout): void;
  /** Purely checks whether an item can fit. */
  canPlace(item: DashboardGridItemDefinition): DashboardGridFitResult;
  /** Purely checks whether a cell rectangle is empty. */
  isAreaEmpty(area: DashboardGridRect): boolean;
  /** Converts a client point to a logical grid cell. */
  getCellFromPoint(point: {
    clientX: number;
    clientY: number;
  }): { column: number; row: number };
  /** Remeasures a size-to-content item. */
  resizeItemToContent(id: string): void;
  /** Rotates one item around an optional pivot cell. */
  rotateItem(id: string, pivot?: { column: number; row: number }): void;
  /** Enables pointer and keyboard item manipulation. */
  enable(options?: { recursive?: boolean }): void;
  /** Disables pointer and keyboard item manipulation. */
  disable(options?: { recursive?: boolean }): void;
  /** Cancels the current interaction transaction. */
  cancelInteraction(): void;
  /** Refreshes custom drag handles after async content mounts. */
  refreshDragHandles(id?: string): void;
  /** Focuses an item root. */
  focusItem(id: string): void;
}

const isSerializedGrid = (value: unknown): value is DashboardGridSerializedGrid =>
  typeof value === 'object' &&
  value !== null &&
  (value as Partial<DashboardGridSerializedGrid>).version === 1 &&
  Array.isArray((value as Partial<DashboardGridSerializedGrid>).items);

const getRecursiveItem = (
  registry: DashboardGridRegistry,
  gridId: string,
  id: string,
): DashboardGridResolvedItem | undefined => {
  for (const candidate of registry.getGrids()) {
    let parentId = candidate.parentGridId;
    while (parentId) {
      if (parentId === gridId) {
        const item = candidate.store.getItem(id);
        if (item) {
          return item;
        }
        break;
      }
      parentId = registry.getGrid(parentId)?.parentGridId;
    }
  }
  return undefined;
};

const removeWithFocus = (
  store: DashboardGridStore,
  registry: DashboardGridRegistry,
  focusManager: DashboardGridHandleEnvironment['focusManager'],
  id: string,
) => {
  const focusRecord = focusManager?.captureFocus(store.id, id);
  const host = registry.itemHosts.get(id)?.host;
  const itemElement = host?.closest<HTMLElement>('[data-dashboard-grid-item]');
  const containedFocus =
    !!focusRecord?.element &&
    (!!itemElement?.contains(focusRecord.element) ||
      !!host?.contains(focusRecord.element));
  const removedRect = containedFocus ? itemElement?.getBoundingClientRect() : undefined;
  if (containedFocus && focusRecord) {
    focusManager?.requestPendingFocus(focusRecord);
  }

  store.remove(id);
  if (containedFocus) {
    Promise.resolve().then(() =>
      Promise.resolve().then(() => {
        if (!registry.getItemOwner(id)) {
          focusManager?.focusAfterRemoval(store.id, removedRect);
          focusManager?.requestPendingFocus({ element: null });
        }
      }),
    );
  }
};

export const createDashboardGridHandle = (
  store: DashboardGridStore,
  registry: DashboardGridRegistry,
  environment: DashboardGridHandleEnvironment = {},
): DashboardGridHandle => ({
  getItems: () => store.getSnapshot().items,
  getItem: (id, options) =>
    store.getItem(id) ??
    (options?.recursive ? getRecursiveItem(registry, store.id, id) : undefined),
  addItem: item => {
    store.add(item);
  },
  removeItem: (id, options) => {
    if (options?.recursive) {
      for (const child of registry.getGrids()) {
        if (child.parentGridId === store.id && child.parentItemId === id) {
          child.store.removeAll();
        }
      }
    }
    removeWithFocus(store, registry, environment.focusManager, id);
  },
  removeAll: options => {
    if (options?.recursive) {
      for (const child of registry.getGrids()) {
        let parentId = child.parentGridId;
        while (parentId) {
          if (parentId === store.id) {
            child.store.removeAll();
            break;
          }
          parentId = registry.getGrid(parentId)?.parentGridId;
        }
      }
    }
    store.removeAll();
  },
  updateItem: (id, patch) => {
    store.updateDefinition(id, patch);
    store.update(id, toDashboardGridEngineItem({ id, ...patch }));
  },
  load: (items, options) => {
    if (isSerializedGrid(items)) {
      store.setSerializableOptions(items.options, true);
    }
    store.load(
      isSerializedGrid(items)
        ? deserializeDashboardGridItems(items, registry, store.id)
        : items,
      {
        addMissing: true,
        removeMissing: true,
        ...(isSerializedGrid(items) && items.options.columns
          ? { sourceColumns: Number(items.options.columns) || undefined }
          : {}),
        ...options,
      },
    );
  },
  save: options => {
    const state = serializeDashboardGrid(store, registry, options);
    return options?.itemsOnly ? state.items : state;
  },
  batch: (operation, options) => store.batch(operation, options),
  compact: mode => {
    store.compact(mode ?? environment.compactMode);
  },
  setColumns: (columns, layout) => {
    store.setColumns(columns, layout);
  },
  canPlace: item => store.engine.canPlace(toDashboardGridEngineItem(item)),
  isAreaEmpty: area => store.engine.isAreaEmpty(area),
  getCellFromPoint: point => {
    const geometry = environment.getDomGeometry?.();
    const metrics = environment.getMetrics?.();
    if (!geometry || !metrics) {
      return { column: 0, row: 0 };
    }
    const local = geometry.clientToLocal(point);
    return {
      column: Math.max(0, Math.floor(local.clientX / Math.max(1, metrics.columnWidth))),
      row: Math.max(0, Math.floor(local.clientY / Math.max(1, metrics.rowHeight))),
    };
  },
  resizeItemToContent: id => environment.resizeItemToContent?.(id),
  rotateItem: (id, pivot) => {
    store.rotateItem(id, pivot);
  },
  enable: options => environment.setEnabled?.(true, options),
  disable: options => environment.setEnabled?.(false, options),
  cancelInteraction: () => {
    store.cancelInteraction();
  },
  refreshDragHandles: id => environment.refreshDragHandles?.(id),
  focusItem: id => {
    environment.focusManager?.focusItem(store.id, id);
  },
});

/** Returns the nearest grid command handle or a provider-registered grid handle. */
export const useDashboardGrid = (gridId?: string): DashboardGridHandle => {
  const context = useDashboardGridContext_unstable(value => value);
  const provider = useDashboardGridProviderContext_unstable(value => value);
  const registry = context?.registry ?? provider?.registry;
  const registration = gridId ? registry?.getGrid(gridId) : undefined;
  const store = registration?.store ?? context?.store;

  if (!store || !registry) {
    throw new Error(
      '@fluentui/react-dashboard-grid-preview: useDashboardGrid must be used inside a DashboardGridProvider or DashboardGrid.',
    );
  }

  const environment = React.useMemo<DashboardGridHandleEnvironment>(
    () => ({
      focusManager: context?.focusManager ?? provider?.focusManager,
      getMetrics: registration?.getMetrics ?? context?.resizeObserver.getMetrics,
      getDomGeometry: registration?.getDomGeometry ?? context?.getDomGeometry,
      setEnabled: registration?.setEnabled ?? context?.setEnabled,
      refreshDragHandles:
        registration?.refreshDragHandles ?? context?.refreshDragHandles,
      resizeItemToContent:
        registration?.resizeItemToContent ??
        (context
          ? () => {
              context.resizeObserver.remeasure();
            }
          : undefined),
      compactMode: registration?.compactMode ?? context?.compactMode,
    }),
    [context, provider?.focusManager, registration],
  );

  return React.useMemo(
    () => createDashboardGridHandle(store, registry, environment),
    [environment, registry, store],
  );
};
