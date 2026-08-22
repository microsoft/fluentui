import { createDashboardGridEngine } from '../engine';
import type {
  DashboardGridEngineChangeSet,
  DashboardGridEngineSnapshot,
  DashboardGridInteractionContext,
  DashboardGridMoveProposal,
  DashboardGridMoveResult,
  DashboardGridMutationResult,
  DashboardGridResolvedItem,
} from '../engine';
import type { DashboardGridInteractionPreview } from '../interaction/types';
import { createDashboardGridEventQueue } from './eventQueue';
import type {
  DashboardGridItemDefinition,
  DashboardGridItemStoreSnapshot,
  DashboardGridRuntimeItemState,
  DashboardGridSerializedGrid,
  DashboardGridSerializedItem,
  DashboardGridSerializedState,
  DashboardGridStore,
  DashboardGridStoreOptions,
  DashboardGridStoreSnapshot,
} from './DashboardGridStore.types';
import {
  dashboardGridDefaultRuntimeItemState,
  toDashboardGridEngineItem,
} from './DashboardGridStore.types';
import {
  areDashboardGridItemsEqual,
  areDashboardGridLayoutsEqual,
  copyDashboardGridItems,
} from './reconcileOptions';
import { getDashboardGridSerializableOptions } from '../serialization/dashboardGridSerialization';

const emptyChangeSet = (snapshot: DashboardGridEngineSnapshot): DashboardGridEngineChangeSet => ({
  revision: snapshot.revision,
  removed: [],
  added: [],
  changed: [],
  changes: [],
  diagnostics: [],
});

const sameResolvedItem = (
  left: DashboardGridResolvedItem | undefined,
  right: DashboardGridResolvedItem | undefined,
): boolean =>
  left === right ||
  (!!left &&
    !!right &&
    left.id === right.id &&
    left.column === right.column &&
    left.row === right.row &&
    left.columnSpan === right.columnSpan &&
    left.rowSpan === right.rowSpan &&
    left.minColumnSpan === right.minColumnSpan &&
    left.maxColumnSpan === right.maxColumnSpan &&
    left.minRowSpan === right.minRowSpan &&
    left.maxRowSpan === right.maxRowSpan &&
    left.movable === right.movable &&
    left.resizable === right.resizable &&
    left.locked === right.locked);

const serializeDefinition = (
  item: DashboardGridItemDefinition,
): DashboardGridSerializedItem => {
  const { content, nestedGrid, subGrid, ...serializable } = item;
  return {
    ...serializable,
    subGrid: subGrid
      ? {
          version: 1,
          options: getDashboardGridSerializableOptions(subGrid),
          items: (subGrid.items ?? []).map(serializeDefinition),
        }
      : (nestedGrid as DashboardGridSerializedGrid | undefined),
  };
};

export const createDashboardGridStore = (options: DashboardGridStoreOptions): DashboardGridStore => {
  let callbacks = options.callbacks;
  let serializedOptions = options.serializedOptions ?? {};
  let serializedOptionsAreAuthoritative = false;
  let controlledItems = copyDashboardGridItems(options.items);
  let controlledVersion = 0;
  let preview: DashboardGridInteractionPreview | undefined;
  let engineSnapshot: DashboardGridEngineSnapshot;
  let storeRevision = 0;
  let rootListeners: Array<() => void> = [];
  const itemListeners = new Map<string, Array<() => void>>();
  const definitions = new Map<string, DashboardGridItemDefinition>();
  const modelItemIds = new Set<string>();
  const declarativeRegistrations = new Map<string, number>();
  const runtime = new Map<string, DashboardGridRuntimeItemState>();
  const itemSnapshotCache = new Map<string, DashboardGridItemStoreSnapshot>();

  const initialItems = options.items ?? options.defaultItems ?? [];
  for (const item of initialItems) {
    definitions.set(item.id, item);
    modelItemIds.add(item.id);
  }

  const engine =
    options.engine ??
    createDashboardGridEngine({
      columns: options.columns,
      maxRows: options.maxRows,
      float: options.float,
      resizeDisabled: options.resizeDisabled,
      serializedState: options.serializedState,
      development: options.development,
      items: initialItems.map(toDashboardGridEngineItem),
      onDiagnostic: diagnostic => callbacks?.onDiagnostic?.(diagnostic),
      onError: error => callbacks?.onError?.(error),
    });
  if (options.engine && initialItems.length > 0) {
    engine.load(initialItems.map(toDashboardGridEngineItem), {
      addMissing: true,
      removeMissing: true,
    });
  }

  engineSnapshot = engine.getSnapshot();
  let storeSnapshot: DashboardGridStoreSnapshot = {
    revision: storeRevision,
    engine: engineSnapshot,
    itemIds: engineSnapshot.items.map(item => item.id),
  };

  const notifyItem = (id: string) => {
    itemSnapshotCache.delete(id);
    for (const listener of itemListeners.get(id) ?? []) {
      listener();
    }
  };

  const notifyRoot = () => {
    storeRevision++;
    storeSnapshot = {
      revision: storeRevision,
      engine: engineSnapshot,
      preview,
      itemIds: engineSnapshot.items.map(item => item.id),
    };
    for (const listener of rootListeners) {
      listener();
    }
  };

  const syncEngineSnapshot = () => {
    const previous = engineSnapshot;
    const next = engine.getSnapshot();
    if (previous === next) {
      return;
    }

    engineSnapshot = next;
    const previousItems = new Map(previous.items.map(item => [item.id, item]));
    const nextItems = new Map(next.items.map(item => [item.id, item]));

    for (const id of new Set([...previousItems.keys(), ...nextItems.keys()])) {
      if (!sameResolvedItem(previousItems.get(id), nextItems.get(id))) {
        notifyItem(id);
      }
    }
    notifyRoot();
  };

  const unsubscribeEngine = engine.subscribe(syncEngineSnapshot);

  const events = createDashboardGridEventQueue(intent => {
    if (intent.type === 'layout-change') {
      const changeSet = intent.changes as DashboardGridEngineChangeSet;
      callbacks?.onLayoutChange?.(changeSet, intent.nativeEvent);
      callbacks?.onItemsChange?.(getDefinitionsInLayoutOrder(), changeSet, intent.nativeEvent);
      return;
    }

    callbacks?.onIntent?.(intent);
  });

  const getDefinitionsInLayoutOrder = (): readonly DashboardGridItemDefinition[] => {
    const ordered: DashboardGridItemDefinition[] = [];
    for (const item of engineSnapshot.items) {
      const definition = definitions.get(item.id);
      ordered.push({
        ...(definition ?? { id: item.id }),
        ...item,
      });
    }
    return ordered;
  };

  const enqueueChange = (changeSet: DashboardGridEngineChangeSet, nativeEvent?: Event) => {
    if (changeSet.changes.length === 0) {
      return;
    }

    events.enqueue({
      type: 'layout-change',
      sourceGridId: options.id,
      changes: changeSet,
      nativeEvent,
    });
  };

  const scheduleControlledReconciliation = () => {
    if (!controlledItems) {
      return;
    }

    const version = controlledVersion;
    Promise.resolve().then(() => {
      if (controlledItems && version === controlledVersion) {
        const changedIds = new Set(definitions.keys());
        definitions.clear();
        for (const item of controlledItems) {
          definitions.set(item.id, item);
          changedIds.add(item.id);
        }
        for (const id of changedIds) {
          notifyItem(id);
        }
        engine.load(controlledItems.map(toDashboardGridEngineItem), {
          addMissing: true,
          removeMissing: true,
        });
      }
    });
  };

  const applyMutationResult = (result: DashboardGridMutationResult): DashboardGridMutationResult => {
    if (result.status !== 'rejected') {
      enqueueChange(result.changeSet);
      scheduleControlledReconciliation();
    }
    return result;
  };

  const store: DashboardGridStore = {
    id: options.id,
    engine,
    events,

    getSnapshot: () => engine.getSnapshot(),
    getStoreSnapshot: () => storeSnapshot,
    getServerSnapshot: () => storeSnapshot,
    getItem: id => engine.getItem(id),

    subscribe(listener) {
      rootListeners = [...rootListeners, listener];
      return () => {
        rootListeners = rootListeners.filter(candidate => candidate !== listener);
      };
    },

    subscribeItem(id, listener) {
      const listeners = itemListeners.get(id) ?? [];
      itemListeners.set(id, [...listeners, listener]);
      return () => {
        const next = (itemListeners.get(id) ?? []).filter(candidate => candidate !== listener);
        if (next.length === 0) {
          itemListeners.delete(id);
        } else {
          itemListeners.set(id, next);
        }
      };
    },

    getItemSnapshot(id) {
      const cached = itemSnapshotCache.get(id);
      if (cached) {
        return cached;
      }

      const next: DashboardGridItemStoreSnapshot = {
        item: engine.getItem(id),
        definition: definitions.get(id),
        runtime: runtime.get(id) ?? dashboardGridDefaultRuntimeItemState,
        preview: preview?.itemId === id ? preview : undefined,
      };
      itemSnapshotCache.set(id, next);
      return next;
    },

    getDefinition: id => definitions.get(id),
    getDefinitions: getDefinitionsInLayoutOrder,
    isControlled: () => controlledItems !== undefined,

    setCallbacks(nextCallbacks) {
      callbacks = nextCallbacks;
    },

    setSerializableOptions(nextOptions, replace = false) {
      serializedOptions = replace
        ? nextOptions
        : { ...serializedOptions, ...nextOptions };
      serializedOptionsAreAuthoritative = serializedOptionsAreAuthoritative || replace;
    },

    requestControlledReconciliation: scheduleControlledReconciliation,

    setControlledItems(items) {
      if (items === undefined) {
        controlledItems = undefined;
        controlledVersion++;
        return undefined;
      }

      const definitionsEqual = areDashboardGridItemsEqual(controlledItems, items);
      if (definitionsEqual) {
        return undefined;
      }

      const layoutsEqual = areDashboardGridLayoutsEqual(controlledItems, items);
      controlledItems = copyDashboardGridItems(items);
      controlledVersion++;
      const previousIds = new Set(definitions.keys());
      for (const item of items) {
        definitions.set(item.id, item);
        modelItemIds.add(item.id);
        previousIds.delete(item.id);
        notifyItem(item.id);
      }
      for (const id of previousIds) {
        definitions.delete(id);
        notifyItem(id);
      }
      notifyRoot();

      if (layoutsEqual) {
        return undefined;
      }

      return applyMutationResult(
        engine.load(items.map(toDashboardGridEngineItem), {
          addMissing: true,
          removeMissing: true,
        }),
      );
    },

    registerDeclarativeItem(item) {
      if (modelItemIds.has(item.id)) {
        return () => undefined;
      }
      const count = declarativeRegistrations.get(item.id) ?? 0;
      declarativeRegistrations.set(item.id, count + 1);
      definitions.set(item.id, item);
      notifyItem(item.id);

      if (!engine.getItem(item.id)) {
        engine.add(toDashboardGridEngineItem(item));
      } else {
        engine.update(item.id, toDashboardGridEngineItem(item));
      }

      return () => {
        const registrations = (declarativeRegistrations.get(item.id) ?? 1) - 1;
        if (registrations > 0) {
          declarativeRegistrations.set(item.id, registrations);
          return;
        }

        declarativeRegistrations.delete(item.id);
        Promise.resolve().then(() => {
          if (!declarativeRegistrations.has(item.id) && !controlledItems) {
            definitions.delete(item.id);
            engine.remove(item.id);
            notifyItem(item.id);
          }
        });
      };
    },

    setItemOwner(id, gridId) {
      const definition = definitions.get(id);
      if (definition && gridId !== options.id) {
        definitions.delete(id);
        notifyItem(id);
      }
    },

    takeDefinition(id) {
      const definition = definitions.get(id);
      if (definition) {
        definitions.delete(id);
        notifyItem(id);
      }
      return definition;
    },

    receiveDefinition(item) {
      definitions.set(item.id, item);
      modelItemIds.add(item.id);
      notifyItem(item.id);
    },

    updateDefinition(id, patch) {
      const definition = definitions.get(id);
      if (!definition) {
        return undefined;
      }
      const next = { ...definition, ...patch, id };
      definitions.set(id, next);
      notifyItem(id);
      notifyRoot();
      return next;
    },

    setRuntimeItemState(id, patch) {
      const previous = runtime.get(id) ?? dashboardGridDefaultRuntimeItemState;
      const next = { ...previous, ...patch };
      if (
        previous.lazyVisible === next.lazyVisible &&
        previous.mounted === next.mounted &&
        previous.measuredRowSpan === next.measuredRowSpan
      ) {
        return;
      }

      runtime.set(id, next);
      notifyItem(id);
    },

    beginInteraction(id: string, context: DashboardGridInteractionContext) {
      engine.beginInteraction(id, context);
    },

    move(id: string, proposal: DashboardGridMoveProposal): DashboardGridMoveResult {
      return engine.move(id, proposal);
    },

    rotate(id, rotateOptions) {
      return engine.rotate(id, rotateOptions);
    },

    commitInteraction() {
      const changeSet = engine.commitInteraction();
      enqueueChange(changeSet);
      scheduleControlledReconciliation();
      return changeSet;
    },

    cancelInteraction() {
      const changeSet = engine.cancelInteraction();
      preview = undefined;
      notifyRoot();
      return changeSet;
    },

    publishPreview(nextPreview) {
      const previousItemId = preview?.itemId;
      preview = nextPreview;
      if (previousItemId) {
        notifyItem(previousItemId);
      }
      if (nextPreview.itemId && nextPreview.itemId !== previousItemId) {
        notifyItem(nextPreview.itemId);
      }
      notifyRoot();
    },

    clearPreview() {
      const previousItemId = preview?.itemId;
      preview = undefined;
      if (previousItemId) {
        notifyItem(previousItemId);
      }
      notifyRoot();
    },

    setColumns(columns, layout) {
      serializedOptions = { ...serializedOptions, columns };
      return applyMutationResult(engine.setColumns(columns, layout));
    },

    add(item) {
      modelItemIds.add(item.id);
      definitions.set(item.id, item);
      notifyItem(item.id);
      const result = engine.add(toDashboardGridEngineItem(item));
      if (result.status === 'rejected') {
        definitions.delete(item.id);
        modelItemIds.delete(item.id);
        notifyItem(item.id);
      }
      return applyMutationResult(result);
    },

    remove(id) {
      const previousDefinition = definitions.get(id);
      definitions.delete(id);
      notifyItem(id);
      const result = engine.remove(id);
      if (result.status === 'rejected' && previousDefinition) {
        definitions.set(id, previousDefinition);
        notifyItem(id);
      }
      return applyMutationResult(result);
    },

    removeAll() {
      const previousDefinitions = new Map(definitions);
      definitions.clear();
      for (const id of previousDefinitions.keys()) {
        notifyItem(id);
      }
      const result = engine.removeAll();
      if (result.status === 'rejected') {
        for (const [id, definition] of previousDefinitions) {
          definitions.set(id, definition);
          notifyItem(id);
        }
      }
      return applyMutationResult(result);
    },

    update(id, patch) {
      const definition = definitions.get(id);
      if (definition) {
        definitions.set(id, { ...definition, ...patch });
        notifyItem(id);
      }
      return applyMutationResult(engine.update(id, patch));
    },

    compact(mode) {
      return applyMutationResult(engine.compact(mode));
    },

    batch(operation, batchOptions) {
      engine.beginBatch(batchOptions);
      try {
        const value = operation();
        const changeSet = engine.commitBatch(batchOptions);
        enqueueChange(changeSet);
        scheduleControlledReconciliation();
        return value;
      } catch (error) {
        engine.rollbackBatch();
        throw error;
      }
    },

    rotateItem(id, pivot) {
      engine.beginInteraction(id, { kind: 'keyboard', source: 'internal' });
      const result = engine.rotate(id, { input: 'api', pivot });
      if (result.status === 'accepted' || result.status === 'unchanged') {
        const changeSet = engine.commitInteraction();
        enqueueChange(changeSet);
        scheduleControlledReconciliation();
      } else {
        engine.cancelInteraction();
      }
      return result;
    },

    load(items, loadOptions) {
      definitions.clear();
      for (const item of items) {
        definitions.set(item.id, item);
        modelItemIds.add(item.id);
        notifyItem(item.id);
      }
      return applyMutationResult(
        engine.load(items.map(toDashboardGridEngineItem), loadOptions ?? {
          addMissing: true,
          removeMissing: true,
        }),
      );
    },

    save(saveOptions): DashboardGridSerializedState {
      const engineState = engine.save({
        columns: saveOptions?.columns,
        includeLayouts: saveOptions?.includeLayouts ?? true,
      });
      return {
        version: 1,
        options: serializedOptionsAreAuthoritative
          ? {
              ...serializedOptions,
              ...(saveOptions?.columns !== undefined && { columns: engineState.columns }),
            }
          : {
              columns: engineState.columns,
              maxRows: engineState.maxRows,
              float: engineState.float,
              ...serializedOptions,
            },
        items: getDefinitionsInLayoutOrder().map(serializeDefinition),
        layouts: engineState.layouts,
        engine: engineState,
      };
    },

    dispose() {
      unsubscribeEngine();
      events.dispose();
      rootListeners = [];
      itemListeners.clear();
      itemSnapshotCache.clear();
      definitions.clear();
      modelItemIds.clear();
      runtime.clear();
      preview = undefined;
    },
  };

  return store;
};

export const createEmptyDashboardGridChangeSet = emptyChangeSet;
