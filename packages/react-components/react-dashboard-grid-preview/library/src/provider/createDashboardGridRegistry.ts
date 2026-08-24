import type { DashboardGridEngineChangeSet, DashboardGridRect } from '../engine';
import type {
  DashboardGridExternalItemDescriptor,
  DashboardGridNestingIntent,
  DashboardGridPreparedTransferResult,
  DashboardGridRejectedReason,
  DashboardGridTransferIntent,
  DashboardGridTransferResult,
} from '../interaction/types';
import { createDashboardGridSerializerRegistry } from '../serialization/serializerRegistry';
import type { DashboardGridItemDefinition } from '../state/DashboardGridStore.types';
import { toDashboardGridEngineItem } from '../state/DashboardGridStore.types';
import type {
  DashboardGridProviderItemRegistration,
  DashboardGridRegistration,
  DashboardGridRegistry,
  DashboardGridRegistryError,
  DashboardGridRegistryOptions,
  DashboardGridRegistrySnapshot,
} from './DashboardGridRegistry.types';
import { createDashboardGridItemHostRegistry } from './itemHostRegistry';
import { createDashboardGridPendingRemovalQueue } from './pendingRemovalQueue';
import { createDashboardGridNestedOptions } from '../nesting/nestedGrid';
import type { DashboardGridDefinition } from '../state/DashboardGridStore.types';

type RegisteredGrid = {
  registration: DashboardGridRegistration;
  references: number;
};

type RegisteredItem = {
  registration: DashboardGridProviderItemRegistration;
  references: number;
};

const mutationReasonToRejectedReason = (reason: string): DashboardGridRejectedReason => {
  switch (reason) {
    case 'max-rows':
      return 'target-full';
    case 'missing-item':
      return 'missing-item';
    case 'constraint':
      return 'constraint';
    case 'collision-cycle':
      return 'collision-cycle';
    case 'bounds':
      return 'bounds';
    default:
      return 'target-rejected';
  }
};

const withProviderFinalizer = (
  result: DashboardGridTransferResult,
): DashboardGridPreparedTransferResult =>
  result.status === 'accepted'
    ? {
        ...result,
        finalize: result.finalize ?? (() => undefined),
      }
    : result;

const getDeepActiveElement = (targetDocument: Document | undefined): HTMLElement | null => {
  const targetWindow = targetDocument?.defaultView;
  if (!targetDocument || !targetWindow) {
    return null;
  }

  let active = targetDocument?.activeElement;

  while (active && 'shadowRoot' in active && active.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }

  return active instanceof targetWindow.HTMLElement ? active : null;
};

const descriptorToDefinition = (
  descriptor: DashboardGridExternalItemDescriptor,
  rect: DashboardGridRect | undefined,
): DashboardGridItemDefinition | undefined => {
  if (!descriptor.id) {
    return undefined;
  }

  return {
    id: descriptor.id,
    column: rect?.column,
    row: rect?.row,
    columnSpan: rect?.columnSpan ?? descriptor.columnSpan,
    rowSpan: rect?.rowSpan ?? descriptor.rowSpan,
    minColumnSpan: descriptor.minColumnSpan,
    maxColumnSpan: descriptor.maxColumnSpan,
    minRowSpan: descriptor.minRowSpan,
    maxRowSpan: descriptor.maxRowSpan,
    data: descriptor.data,
  };
};

const definitionAtRect = (
  definition: DashboardGridItemDefinition,
  rect: DashboardGridRect | undefined,
): DashboardGridItemDefinition =>
  rect
    ? {
        ...definition,
        column: rect.column,
        row: rect.row,
        columnSpan: rect.columnSpan,
        rowSpan: rect.rowSpan,
        autoPosition: false,
      }
    : definition;

export const createDashboardGridRegistry = (
  options: DashboardGridRegistryOptions = {},
): DashboardGridRegistry => {
  const grids = new Map<string, RegisteredGrid>();
  const eventGridParents = new Map<string, string>();
  const items = new Map<string, RegisteredItem>();
  const pendingItemRemoval = createDashboardGridPendingRemovalQueue();
  const itemHosts = createDashboardGridItemHostRegistry();
  const serializers = createDashboardGridSerializerRegistry();
  let listeners: Array<() => void> = [];
  let revision = 0;
  let snapshot: DashboardGridRegistrySnapshot = { revision, gridIds: [], itemIds: [] };

  const emitChange = () => {
    revision++;
    snapshot = {
      revision,
      gridIds: [...grids.keys()],
      itemIds: [...items.keys()],
    };
    for (const listener of listeners) {
      listener();
    }
  };

  const reportError = (error: DashboardGridRegistryError) => {
    options.onError?.(error);
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`@fluentui/react-dashboard-grid-preview: ${error.message}`);
    }
  };

  const getGrid = (id: string): DashboardGridRegistration | undefined => grids.get(id)?.registration;
  const getEventGrid = (id: string): DashboardGridRegistration | undefined => {
    let currentId: string | undefined = id;
    while (currentId) {
      const grid = getGrid(currentId);
      if (grid) {
        return grid;
      }
      currentId = eventGridParents.get(currentId);
    }
    return undefined;
  };

  const getTransferDefinition = (
    intent: DashboardGridTransferIntent,
  ): DashboardGridItemDefinition | undefined => {
    if (intent.operation === 'external') {
      return intent.descriptor ? descriptorToDefinition(intent.descriptor, intent.rect) : undefined;
    }

    if (!intent.sourceGridId || !intent.itemId) {
      return undefined;
    }

    return getGrid(intent.sourceGridId)?.store.getDefinition(intent.itemId);
  };

  const preflightTransfer = (intent: DashboardGridTransferIntent): DashboardGridTransferResult => {
    if (!intent.targetGridId) {
      return { status: 'rejected', reason: 'target-rejected' };
    }

    const target = getGrid(intent.targetGridId);
    const definition = getTransferDefinition(intent);
    if (!target || !definition) {
      return { status: 'rejected', reason: 'target-rejected' };
    }

    const targetDefinition = definitionAtRect(definition, intent.rect);
    const existingOwner = items.get(targetDefinition.id)?.registration.gridId;
    if (existingOwner && existingOwner !== intent.sourceGridId && existingOwner !== intent.targetGridId) {
      return { status: 'rejected', reason: 'target-rejected' };
    }

    if (intent.sourceGridId === intent.targetGridId) {
      return { status: 'accepted', targetGridId: intent.targetGridId, rect: intent.rect };
    }

    const fit = target.store.engine.canPlace(toDashboardGridEngineItem(targetDefinition));
    return fit.fits
      ? {
          status: 'accepted',
          targetGridId: target.id,
          rect: fit.resolvedPosition ?? intent.rect,
        }
      : {
          status: 'rejected',
          reason: mutationReasonToRejectedReason(fit.reason ?? 'target-rejected'),
        };
  };

  const transfer = async (
    intent: DashboardGridTransferIntent,
  ): Promise<DashboardGridPreparedTransferResult> => {
    const preflight = preflightTransfer(intent);
    if (preflight.status === 'rejected') {
      return preflight;
    }
    if (!intent.targetGridId) {
      return { status: 'rejected', reason: 'target-rejected' };
    }

    const target = getGrid(intent.targetGridId);
    const source = intent.sourceGridId ? getGrid(intent.sourceGridId) : undefined;
    const sourceDefinition = getTransferDefinition(intent);
    if (!target || !sourceDefinition) {
      return { status: 'rejected', reason: 'target-rejected' };
    }

    if (source?.id === target.id) {
      if (intent.rect && intent.itemId) {
        const result = source.store.update(intent.itemId, intent.rect);
        return result.status === 'rejected'
          ? { status: 'rejected', reason: mutationReasonToRejectedReason(result.reason) }
          : withProviderFinalizer({
              status: 'accepted',
              targetGridId: target.id,
              rect: intent.rect,
            });
      }
      return withProviderFinalizer(preflight);
    }

    const definition = definitionAtRect(sourceDefinition, preflight.rect ?? intent.rect);
    const host = itemHosts.get(definition.id)?.host;
    const activeElement = getDeepActiveElement(target.targetDocument ?? source?.targetDocument ?? undefined);
    const restoreFocus = !!activeElement && !!host?.contains(activeElement);
    let sourceDefinitionRemoved = false;

    try {
      source?.store.cancelInteraction();
      source?.store.engine.beginBatch();
      target.store.engine.beginBatch();

      if (source) {
        const removal = source.store.engine.remove(definition.id);
        if (removal.status === 'rejected') {
          source.store.engine.rollbackBatch();
          target.store.engine.rollbackBatch();
          return { status: 'rejected', reason: mutationReasonToRejectedReason(removal.reason) };
        }
        source.store.takeDefinition(definition.id);
        sourceDefinitionRemoved = true;
      }

      const addition = target.store.engine.add(toDashboardGridEngineItem(definition));
      if (addition.status === 'rejected') {
        source?.store.engine.rollbackBatch();
        target.store.engine.rollbackBatch();
        if (source && sourceDefinitionRemoved) {
          source.store.receiveDefinition(sourceDefinition);
        }
        return { status: 'rejected', reason: mutationReasonToRejectedReason(addition.reason) };
      }

      target.store.receiveDefinition(definition);
      const sourceChangeSet = source?.store.engine.commitBatch();
      const targetChangeSet = target.store.engine.commitBatch();
      let finalized = false;
      const finalize = () => {
        if (finalized) {
          return;
        }
        finalized = true;
        if (source && sourceChangeSet?.changes.length) {
          source.store.events.enqueue({
            type: 'layout-change',
            sourceGridId: source.id,
            targetGridId: target.id,
            changes: sourceChangeSet,
            nativeEvent: intent.nativeEvent,
          });
          source.store.events.flush();
        }
        if (targetChangeSet.changes.length) {
          target.store.events.enqueue({
            type: 'layout-change',
            sourceGridId: source?.id,
            targetGridId: target.id,
            changes: targetChangeSet,
            nativeEvent: intent.nativeEvent,
          });
          target.store.events.flush();
        }
      };

      const registeredItem = items.get(definition.id);
      if (registeredItem) {
        registeredItem.registration = {
          ...registeredItem.registration,
          gridId: target.id,
        };
      }
      itemHosts.setOwner(definition.id, target.id);
      emitChange();
      source?.store.requestControlledReconciliation();
      target.store.requestControlledReconciliation();

      Promise.resolve().then(() => {
        if (source?.store.getItem(definition.id) && !target.store.getItem(definition.id)) {
          const currentItem = items.get(definition.id);
          if (currentItem) {
            currentItem.registration = {
              ...currentItem.registration,
              gridId: source.id,
            };
          }
          itemHosts.setOwner(definition.id, source.id);
          emitChange();
        }
      });

      if (restoreFocus && activeElement) {
        Promise.resolve().then(() => {
          if (activeElement.isConnected) {
            activeElement.focus({ preventScroll: true });
          }
        });
      }

      return {
        status: 'accepted',
        targetGridId: target.id,
        rect: preflight.rect ?? intent.rect,
        finalize,
      };
    } catch (cause) {
      source?.store.engine.rollbackBatch();
      target.store.engine.rollbackBatch();
      if (source && sourceDefinitionRemoved) {
        source.store.receiveDefinition(sourceDefinition);
      }
      reportError({
        code: 'transfer-failed',
        message: `Unable to transfer dashboard item "${definition.id}".`,
        itemId: definition.id,
        cause,
      });
      return { status: 'rejected', reason: 'target-rejected' };
    }
  };

  const registry: DashboardGridRegistry = {
    itemHosts,
    serializers,

    getSnapshot: () => snapshot,

    subscribe(listener) {
      listeners = [...listeners, listener];
      return () => {
        listeners = listeners.filter(candidate => candidate !== listener);
      };
    },

    registerGrid(registration) {
      const existing = grids.get(registration.id);
      if (existing) {
        if (existing.registration.store !== registration.store) {
          reportError({
            code: 'duplicate-grid-id',
            message: `Dashboard grid ID "${registration.id}" is already registered in this provider.`,
            gridId: registration.id,
          });
          return () => undefined;
        }

        existing.references++;
        existing.registration = { ...existing.registration, ...registration };
      } else {
        grids.set(registration.id, { registration, references: 1 });
      }
      emitChange();

      return () => {
        const current = grids.get(registration.id);
        if (!current || current.registration.store !== registration.store) {
          return;
        }
        current.references--;
        if (current.references <= 0) {
          grids.delete(registration.id);
        }
        emitChange();
      };
    },

    updateGrid(id, patch) {
      const current = grids.get(id);
      if (!current) {
        return;
      }
      current.registration = { ...current.registration, ...patch };
      emitChange();
    },

    getGrid,
    getEventGrid,
    getGrids: () => [...grids.values()].map(value => value.registration),

    registerItem(registration) {
      const cancelledRemoval = pendingItemRemoval.cancel(registration.id);
      const existing = items.get(registration.id);
      if (existing && !cancelledRemoval) {
        reportError({
          code: 'duplicate-item-id',
          message: `Dashboard item ID "${registration.id}" must be unique within a DashboardGridProvider.`,
          gridId: registration.gridId,
          itemId: registration.id,
        });
        return () => undefined;
      }

      if (existing) {
        existing.references++;
        existing.registration = { ...existing.registration, ...registration };
      } else {
        items.set(registration.id, { registration, references: 1 });
      }

      if (registration.content !== undefined || !itemHosts.get(registration.id)) {
        itemHosts.setContent(registration.id, registration.content, registration.gridId);
      } else {
        itemHosts.setOwner(registration.id, registration.gridId);
      }
      emitChange();

      return () => {
        const current = items.get(registration.id);
        if (!current) {
          return;
        }

        current.references--;
        if (current.references > 0) {
          return;
        }

        pendingItemRemoval.schedule(registration.id, () => {
          const latest = items.get(registration.id);
          if (latest && latest.references <= 0) {
            items.delete(registration.id);
            itemHosts.remove(registration.id);
            emitChange();
          }
        });
      };
    },

    getItemOwner: id => items.get(id)?.registration.gridId,
    attachItemHost: (id, container) => itemHosts.attach(id, container),
    detachItemHost: (id, container) => itemHosts.park(id, container),
    setParkingElement: element => itemHosts.setParkingElement(element),

    preflightTransfer,
    transfer,

    remove(intent) {
      if (!intent.sourceGridId || !intent.itemId) {
        return { status: 'rejected', reason: 'target-rejected' };
      }

      const source = getGrid(intent.sourceGridId);
      if (!source?.store.getItem(intent.itemId)) {
        return { status: 'rejected', reason: 'missing-item' };
      }
      const focusRecord = options.captureFocus?.(source.id, intent.itemId);
      const host = itemHosts.get(intent.itemId)?.host;
      const itemElement = source.rootElement
        ? Array.from(
            source.rootElement.querySelectorAll<HTMLElement>('[data-dashboard-grid-item]'),
          ).find(
            element => element.getAttribute('data-dashboard-grid-item') === intent.itemId,
          )
        : undefined;
      const containedFocus =
        !!focusRecord?.element &&
        (!!itemElement?.contains(focusRecord.element) || !!host?.contains(focusRecord.element));
      const removedRect = containedFocus ? itemElement?.getBoundingClientRect() : undefined;
      if (containedFocus && focusRecord) {
        options.requestPendingFocus?.(focusRecord);
      }

      source.store.cancelInteraction();
      source.store.engine.beginBatch();
      const definition = source.store.takeDefinition(intent.itemId);
      const removal = source.store.engine.remove(intent.itemId);
      if (removal.status === 'rejected') {
        source.store.engine.rollbackBatch();
        if (definition) {
          source.store.receiveDefinition(definition);
        }
        return { status: 'rejected', reason: mutationReasonToRejectedReason(removal.reason) };
      }

      const changeSet = source.store.engine.commitBatch();
      let finalized = false;
      const finalize = () => {
        if (finalized || changeSet.changes.length === 0) {
          return;
        }
        finalized = true;
        source.store.events.enqueue({
          type: 'layout-change',
          sourceGridId: source.id,
          changes: changeSet,
          nativeEvent: intent.nativeEvent,
        });
        source.store.events.flush();
      };
      source.store.requestControlledReconciliation();
      if (containedFocus) {
        Promise.resolve().then(() =>
          Promise.resolve().then(() => {
            if (!items.has(intent.itemId!)) {
              options.focusAfterRemoval?.(source.id, removedRect);
              options.requestPendingFocus?.({ element: null });
            }
          }),
        );
      }
      return { status: 'accepted', targetGridId: undefined, finalize };
    },

    drop(intent) {
      if (intent.targetGridId) {
        return transfer(intent);
      }

      const result =
        options.onCustomDrop?.(intent) ?? {
          status: 'rejected',
          reason: 'target-rejected' as const,
        };
      return Promise.resolve(result).then(withProviderFinalizer);
    },

    requestNesting(intent: DashboardGridNestingIntent) {
      const nestedTarget = [...grids.values()]
        .map(value => value.registration)
        .find(
          grid =>
            grid.parentGridId === intent.targetGridId &&
            grid.parentItemId === intent.targetItemId,
        );

      if (!nestedTarget) {
        const source = getGrid(intent.sourceGridId);
        const target = getGrid(intent.targetGridId);
        const sourceItem = source?.store.getItem(intent.itemId);
        const targetItem = target?.store.getItem(intent.targetItemId);
        const sourceDefinition = source?.store.getDefinition(intent.itemId);
        const targetDefinition = target?.store.getDefinition(intent.targetItemId);
        if (
          !source ||
          !target ||
          !target.dynamicNesting ||
          !sourceItem ||
          !targetItem ||
          !sourceDefinition ||
          !targetDefinition ||
          source.store.isControlled() ||
          target.store.isControlled()
        ) {
          return { status: 'rejected', reason: 'target-rejected' };
        }

        const childGridId = `${target.id}::${intent.targetItemId}::subgrid`;
        eventGridParents.set(childGridId, target.id);
        const existingItems = targetDefinition.subGrid?.items ?? [];
        if (existingItems.some(item => item.id === sourceDefinition.id)) {
          return { status: 'rejected', reason: 'target-rejected' };
        }
        const nestedOptions = createDashboardGridNestedOptions(
          target.subGridDefaults ?? {},
          targetDefinition.subGrid,
          targetItem.columnSpan,
          sourceItem.columnSpan,
        );
        const nestedDefinition: DashboardGridDefinition = {
          ...(nestedOptions as DashboardGridDefinition),
          items: [
            ...existingItems,
            {
              ...sourceDefinition,
              column: undefined,
              row: undefined,
              autoPosition: true,
            },
          ],
        };

        source.store.cancelInteraction();
        source.store.engine.beginBatch();
        const removal = source.store.engine.remove(intent.itemId);
        if (removal.status === 'rejected') {
          source.store.engine.rollbackBatch();
          return {
            status: 'rejected',
            reason: mutationReasonToRejectedReason(removal.reason),
          };
        }
        source.store.takeDefinition(intent.itemId);
        target.store.updateDefinition(intent.targetItemId, {
          subGrid: nestedDefinition,
        });
        const sourceChangeSet = source.store.engine.commitBatch();
        const targetChangeSet: DashboardGridEngineChangeSet = {
          revision: target.store.getSnapshot().revision,
          removed: [],
          added: [],
          changed: [
            {
              id: targetItem.id,
              previous: targetItem,
              current: targetItem,
            },
          ],
          changes: [
            {
              kind: 'changed',
              change: {
                id: targetItem.id,
                previous: targetItem,
                current: targetItem,
              },
            },
          ],
          diagnostics: [],
        };
        let finalized = false;
        const finalize = () => {
          if (finalized) {
            return;
          }
          finalized = true;
          if (sourceChangeSet.changes.length) {
            source.store.events.enqueue({
              type: 'layout-change',
              sourceGridId: source.id,
              targetGridId: childGridId,
              changes: sourceChangeSet,
              nativeEvent: intent.nativeEvent,
            });
            source.store.events.flush();
          }
          target.store.events.enqueue({
            type: 'layout-change',
            sourceGridId: source.id,
            targetGridId: childGridId,
            changes: targetChangeSet,
            nativeEvent: intent.nativeEvent,
          });
          target.store.events.flush();
        };

        const registeredItem = items.get(intent.itemId);
        if (registeredItem) {
          registeredItem.registration = {
            ...registeredItem.registration,
            gridId: childGridId,
          };
        }
        itemHosts.setOwner(intent.itemId, childGridId);
        emitChange();
        return {
          status: 'accepted',
          targetGridId: childGridId,
          rect: {
            column: 0,
            row: 0,
            columnSpan: Math.min(
              sourceItem.columnSpan,
              Number(nestedDefinition.columns) || sourceItem.columnSpan,
            ),
            rowSpan: sourceItem.rowSpan,
          },
          finalize,
        };
      }

      return transfer({
        operation: 'drag',
        sourceGridId: intent.sourceGridId,
        targetGridId: nestedTarget.id,
        itemId: intent.itemId,
        nativeEvent: intent.nativeEvent,
      });
    },

    cancel() {
      // Cross-grid engines are mutated only during commit, so there is no provider draft to roll back here.
    },

    dispose() {
      pendingItemRemoval.dispose();
      itemHosts.dispose();
      grids.clear();
      eventGridParents.clear();
      items.clear();
      listeners = [];
      emitChange();
    },
  };

  return registry;
};
