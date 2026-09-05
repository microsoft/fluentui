'use client';

import * as React from 'react';
import { tokens } from '@fluentui/react-theme';
import {
  getIntrinsicElementProps,
  slot,
  useEventCallback,
  useId,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { getDashboardGridRootAriaProps } from '../../accessibility/aria';
import { useDashboardGridAnnouncements } from '../../accessibility/announcements';
import {
  useDashboardGridFocusManager,
  type DashboardGridFocusableItem,
  type DashboardGridFocusRecord,
} from '../../accessibility/focusManager';
import {
  useDashboardGridContext_unstable,
  useDashboardGridItemContext_unstable,
  useDashboardGridProviderContext_unstable,
} from '../../contexts';
import type { DashboardGridContextValue } from '../../contexts/DashboardGridContext';
import type { DashboardGridProviderContextValue } from '../../contexts/DashboardGridProviderContext';
import { createDashboardGridInteractionCoordinator } from '../../interaction/coordinator';
import {
  createDashboardGridDomGeometrySession,
  type DashboardGridDomGeometrySession,
} from '../../interaction/domGeometry';
import { dashboardGridDataAttributes } from '../../interaction/types';
import type { DashboardGridDropAcceptanceContext } from '../../interaction/types';
import { useDashboardGridResizeObserver } from '../../observers/useDashboardGridResizeObserver';
import { createDashboardGridRegistry } from '../../provider/createDashboardGridRegistry';
import type { DashboardGridRegistry } from '../../provider/DashboardGridRegistry.types';
import { createDashboardGridHandle } from '../../hooks/useDashboardGrid';
import { getDashboardGridSerializableOptions } from '../../serialization/dashboardGridSerialization';
import { createDashboardGridStore } from '../../state/createDashboardGridStore';
import type {
  DashboardGridCSSLength,
  DashboardGridEngineFactory,
  DashboardGridItemDefinition,
  DashboardGridResponsiveOptions,
  DashboardGridStore,
  DashboardGridStoreCallbacks,
} from '../../state/DashboardGridStore.types';
import { useDashboardGridStoreSnapshot } from '../../state/useDashboardGridStore';
import type { DashboardGridCellMetrics, DashboardGridEngineDiagnostic, DashboardGridEngineOptions } from '../../engine';
import { getDashboardGridScreenGeometryStyle, getDashboardGridSurfaceBlockSize } from './screenGeometry';
import type { DashboardGridProps, DashboardGridState } from './DashboardGrid.types';

export type DashboardGridInternalState = DashboardGridState & {
  store: DashboardGridStore;
  registry: DashboardGridRegistry;
  contextValue: DashboardGridContextValue;
  localProvider: boolean;
  providerContextValue: DashboardGridProviderContextValue;
  modelItemContents?: readonly React.ReactNode[];
  columns: number;
  rowHeight: number;
  printMode: 'flow' | 'exact';
};

const DEFAULT_COLUMNS = 12;
const DEFAULT_ROW_HEIGHT = 80;
const emptyMetrics: DashboardGridCellMetrics = {
  columnWidth: 0,
  rowHeight: 0,
  gapTop: 0,
  gapRight: 0,
  gapBottom: 0,
  gapLeft: 0,
};

const resolveResponsiveColumns = (
  responsive: DashboardGridResponsiveOptions | undefined,
  width: number,
  columns: number,
): number => {
  const breakpoints = [...(responsive?.breakpoints ?? [])].sort((left, right) => left.maxWidth - right.maxWidth);
  const breakpointColumns = breakpoints.find(breakpoint => width <= breakpoint.maxWidth)?.columns;
  if (breakpointColumns !== undefined) {
    return breakpointColumns;
  }
  if (responsive?.targetColumnWidth) {
    return Math.max(1, Math.min(responsive.maxColumns ?? columns, Math.round(width / responsive.targetColumnWidth)));
  }
  return columns;
};

const toCSSLength = (value: DashboardGridCSSLength | string): string =>
  typeof value === 'number' ? `${value}px` : value;

const getGapStyles = (gap: DashboardGridProps['gap']): { rowGap: string; columnGap: string } => {
  if (gap === undefined) {
    return {
      rowGap: tokens.spacingVerticalMNudge,
      columnGap: tokens.spacingHorizontalMNudge,
    };
  }
  const values = String(toCSSLength(gap)).trim().split(/\s+/);
  if (values.length === 1) {
    return { rowGap: values[0], columnGap: values[0] };
  }
  if (values.length === 2) {
    return { rowGap: values[0], columnGap: values[1] };
  }
  return {
    rowGap: `calc(${values[0]} + ${values[2] ?? values[0]})`,
    columnGap: `calc(${values[1]} + ${values[3] ?? values[1]})`,
  };
};

const invokeEventHandler = (
  callback: ((event: never, data: never) => void) | undefined,
  data: Record<string, unknown>,
  nativeEvent?: Event,
  targetDocument?: Document | null,
) => {
  if (!callback) {
    return;
  }

  const event =
    nativeEvent ??
    (targetDocument?.defaultView
      ? new targetDocument.defaultView.Event(String(data.type ?? 'dashboardgrid'))
      : undefined);
  callback(
    event as never,
    {
      type: String(data.type ?? 'dashboardgrid'),
      event,
      ...data,
    } as never,
  );
};

export const useDashboardGrid_unstable = (
  props: DashboardGridProps,
  ref: React.Ref<HTMLDivElement>,
): DashboardGridInternalState => {
  /* eslint-disable @typescript-eslint/no-deprecated -- Deprecated callbacks are normalized here for migration compatibility. */
  const {
    onTransfer: legacyOnTransfer,
    onCancel: legacyOnCancel,
    onLayoutChange: legacyOnLayoutChange,
    onColumnsChange: legacyOnColumnsChange,
    onResizeContent: legacyOnResizeContent,
    onArrangeModeChange: legacyOnArrangeModeChange,
  } = props;
  /* eslint-enable @typescript-eslint/no-deprecated */
  const fluent = useFluent();
  const generatedId = useId('dashboard-grid-');
  const gridId = props.gridId ?? generatedId;
  const direction =
    props.direction === 'rtl' || props.direction === 'ltr' ? props.direction : fluent.dir === 'rtl' ? 'rtl' : 'ltr';
  const parentProvider = useDashboardGridProviderContext_unstable(context => context);
  const targetDocument = parentProvider ? parentProvider.targetDocument : fluent.targetDocument;
  const parentGridId = useDashboardGridItemContext_unstable(context => context.gridId);
  const parentItemId = useDashboardGridItemContext_unstable(context => context.id);
  const parentItem = useDashboardGridItemContext_unstable(context => context.snapshot.item);
  const parentResizeObserver = useDashboardGridContext_unstable(context => context.resizeObserver);
  const onRegistryError = useEventCallback((error: unknown) => {
    const event = targetDocument?.defaultView ? new targetDocument.defaultView.Event('error') : undefined;
    props.onError?.(
      event as never,
      {
        type: 'error',
        event,
        gridId,
        input: 'api',
        affectedItems: [],
        reason: 'interaction',
        error,
      } as never,
    );
  });
  const onDiagnostic = useEventCallback((diagnostic: DashboardGridEngineDiagnostic) => {
    invokeEventHandler(props.onDiagnostic as never, { ...diagnostic, type: 'diagnostic' }, undefined, targetDocument);
  });
  const localFocusManagerRef = React.useRef<ReturnType<typeof useDashboardGridFocusManager> | undefined>(undefined);
  const captureLocalFocus = useEventCallback(
    (focusGridId: string, itemId: string) =>
      localFocusManagerRef.current?.captureFocus(focusGridId, itemId) ?? {
        element: null,
        gridId: focusGridId,
        itemId,
      },
  );
  const requestLocalPendingFocus = useEventCallback((record: DashboardGridFocusRecord) =>
    localFocusManagerRef.current?.requestPendingFocus(record),
  );
  const focusLocalAfterRemoval = useEventCallback(
    (focusGridId: string, removedRect?: DOMRectReadOnly) =>
      localFocusManagerRef.current?.focusAfterRemoval(focusGridId, removedRect) ?? false,
  );

  const [localRegistry] = React.useState(() =>
    createDashboardGridRegistry({
      onError: onRegistryError,
      captureFocus: captureLocalFocus,
      requestPendingFocus: requestLocalPendingFocus,
      focusAfterRemoval: focusLocalAfterRemoval,
    }),
  );
  const registry = parentProvider?.registry ?? localRegistry;
  const localProvider = !parentProvider;

  const localCoordinator = React.useMemo(
    () =>
      localProvider && targetDocument
        ? createDashboardGridInteractionCoordinator({
            targetDocument,
            provider: registry,
            eventQueue: {
              enqueue(intent) {
                const intentGridId = intent.targetGridId ?? intent.sourceGridId ?? gridId;
                registry.getEventGrid(intentGridId)?.store.events.enqueue(intent);
              },
              flush(intentGridId) {
                if (intentGridId) {
                  registry.getEventGrid(intentGridId)?.store.events.flush();
                  return;
                }
                const stores = new Set(registry.getGrids().map(candidate => candidate.store));
                stores.forEach(candidateStore => candidateStore.events.flush());
              },
            },
          })
        : undefined,
    [gridId, localProvider, registry, targetDocument],
  );
  const coordinator = parentProvider?.coordinator ?? localCoordinator;
  const localFocusableItems = React.useRef(new Map<string, DashboardGridFocusableItem>());
  const localFocusManagerState = useDashboardGridFocusManager({
    targetDocument: targetDocument ?? undefined,
    getGridElement: id => registry.getGrid(id)?.rootElement ?? undefined,
    getItems: () => [...localFocusableItems.current.values()],
  });
  const localFocusManager = React.useMemo(() => localFocusManagerState, [localFocusManagerState]);
  useIsomorphicLayoutEffect(() => {
    localFocusManagerRef.current = localFocusManager;
    return () => {
      if (localFocusManagerRef.current === localFocusManager) {
        localFocusManagerRef.current = undefined;
      }
    };
  }, [localFocusManager]);
  const localRegisterFocusableItem = React.useCallback(
    (item: DashboardGridFocusableItem) => {
      const key = `${item.gridId}\u0000${item.itemId}`;
      localFocusableItems.current.set(key, item);
      localFocusManager.notifyItemRegistered(item);
      return () => {
        if (localFocusableItems.current.get(key) === item) {
          localFocusableItems.current.delete(key);
        }
      };
    },
    [localFocusManager],
  );
  const focusManager = parentProvider?.focusManager ?? localFocusManager;
  const registerFocusableItem = parentProvider?.registerFocusableItem ?? localRegisterFocusableItem;
  const { announceDashboardGrid } = useDashboardGridAnnouncements(props.strings);

  const authoredColumns =
    props.columns === 'auto'
      ? Math.max(1, parentItem?.columnSpan ?? DEFAULT_COLUMNS)
      : Math.max(1, props.columns ?? DEFAULT_COLUMNS);
  const rowHeightOption = props.rowHeight ?? 'auto';
  const rowHeight =
    typeof rowHeightOption === 'number'
      ? Math.max(0, rowHeightOption)
      : typeof rowHeightOption === 'string' && rowHeightOption.endsWith('px')
      ? Math.max(1, Number.parseFloat(rowHeightOption))
      : DEFAULT_ROW_HEIGHT;
  const [enabled, setEnabledState] = React.useState(!props.static);
  const [refreshDragHandlesVersion, setRefreshDragHandlesVersion] = React.useState(0);
  const [layoutMetrics, setLayoutMetrics] = React.useState<DashboardGridCellMetrics>(emptyMetrics);
  const initialAutoRowHeight = React.useRef<number | undefined>(undefined);

  const engineOptions: DashboardGridEngineOptions = {
    columns: authoredColumns,
    maxRows: props.fixedRows ?? props.maxRows,
    float: props.float,
    resizeDisabled: props.static || props.disableResize,
    collision: props.collision,
    items: (props.items ?? props.defaultItems)?.map(item => ({
      id: item.id,
      column: item.column,
      row: item.row,
      columnSpan: item.columnSpan,
      rowSpan: item.rowSpan,
      minColumnSpan: item.minColumnSpan,
      maxColumnSpan: item.maxColumnSpan,
      minRowSpan: item.minRowSpan,
      maxRowSpan: item.maxRowSpan,
      autoPosition: item.autoPosition,
      movable: item.movable,
      resizable: item.resizable,
      locked: item.locked,
    })),
    onDiagnostic,
    onError: onRegistryError,
  };

  const [store] = React.useState(() =>
    createDashboardGridStore({
      id: gridId,
      serializedOptions: getDashboardGridSerializableOptions(props),
      columns: authoredColumns,
      maxRows: props.fixedRows ?? props.maxRows,
      float: props.float,
      resizeDisabled: props.static || props.disableResize,
      collision: props.collision,
      defaultItems: props.defaultItems as readonly DashboardGridItemDefinition[] | undefined,
      items: props.items as readonly DashboardGridItemDefinition[] | undefined,
      engine:
        typeof props.layoutEngine === 'function'
          ? (props.layoutEngine as DashboardGridEngineFactory)(engineOptions)
          : props.layoutEngine,
      callbacks: {
        onDiagnostic,
      },
    }),
  );
  store.setSerializableOptions(getDashboardGridSerializableOptions(props));
  const emit = React.useCallback(
    (callback: ((event: never, data: never) => void) | undefined, data: Record<string, unknown>, nativeEvent?: Event) =>
      invokeEventHandler(callback, data, nativeEvent, targetDocument),
    [targetDocument],
  );
  const handleArrangeModeChange = useEventCallback((event: Event | undefined, data: Record<string, unknown>) =>
    emit(legacyOnArrangeModeChange, { gridId, ...data }, event),
  );
  const pendingDrop = React.useRef<
    | {
        data: Record<string, unknown>;
        nativeEvent?: Event;
      }
    | undefined
  >(undefined);
  const storeCallbacks = React.useMemo<DashboardGridStoreCallbacks>(
    () => ({
      onDiagnostic,
      onError: error =>
        emit(props.onError, {
          type: 'error',
          gridId,
          input: 'api',
          affectedItems: store.getSnapshot().items,
          reason: 'interaction',
          error,
        }),
      onIntent: intent => {
        const input =
          intent.input ??
          (intent.operation === 'keyboard' ||
          (targetDocument?.defaultView?.KeyboardEvent &&
            intent.nativeEvent instanceof targetDocument.defaultView.KeyboardEvent)
            ? 'keyboard'
            : 'pointer');
        const interactionKind = intent.operation === 'resize' || intent.kind === 'resize' ? 'resize' : 'drag';
        const data = {
          ...intent,
          gridId,
          sourceGridId: intent.sourceGridId ?? gridId,
          input,
          kind: interactionKind,
          affectedItems: store.getSnapshot().items,
          reason: 'interaction',
          rejectedReason: 'rejectionReason' in intent ? intent.rejectionReason : undefined,
        };
        const itemId = intent.itemId ?? ('sourceId' in intent ? intent.sourceId : undefined);
        const itemLabel =
          (intent.itemId && intent.sourceGridId
            ? coordinator?.getItem(intent.sourceGridId, intent.itemId)?.label
            : undefined) ??
          itemId ??
          '';
        const sourceGridLabel = intent.sourceGridId
          ? registry.getGrid(intent.sourceGridId)?.label ?? intent.sourceGridId
          : undefined;
        const targetGridLabel = intent.targetGridId
          ? registry.getGrid(intent.targetGridId)?.label ?? intent.targetGridId
          : undefined;
        switch (intent.type) {
          case 'start':
            emit(
              interactionKind === 'resize' ? props.onResizeStart : props.onDragStart,
              {
                ...data,
                type: interactionKind === 'resize' ? 'resize-start' : 'drag-start',
              },
              intent.nativeEvent,
            );
            if (itemLabel) {
              announceDashboardGrid({
                type: intent.operation === 'keyboard' ? 'arrange-start' : 'pointer-start',
                itemLabel,
                sourceGridLabel,
                targetGridLabel,
              });
            }
            break;
          case 'stop':
            emit(
              interactionKind === 'resize' ? props.onResizeEnd : props.onDragEnd,
              {
                ...data,
                type: interactionKind === 'resize' ? 'resize-end' : 'drag-end',
              },
              intent.nativeEvent,
            );
            if (
              intent.operation === 'drag' &&
              intent.sourceGridId &&
              intent.targetGridId &&
              intent.sourceGridId !== intent.targetGridId
            ) {
              emit(legacyOnTransfer, data, intent.nativeEvent);
            }
            if (interactionKind === 'drag') {
              pendingDrop.current = {
                data: {
                  ...data,
                  type: 'item-drop',
                  kind:
                    intent.sourceGridId && intent.targetGridId && intent.sourceGridId !== intent.targetGridId
                      ? 'transfer'
                      : 'move',
                  reason: 'transfer',
                },
                nativeEvent: intent.nativeEvent,
              };
              Promise.resolve().then(() =>
                Promise.resolve().then(() =>
                  Promise.resolve().then(() => {
                    if (pendingDrop.current) {
                      emit(props.onItemDrop, pendingDrop.current.data, pendingDrop.current.nativeEvent);
                      pendingDrop.current = undefined;
                    }
                  }),
                ),
              );
            }
            if (itemLabel) {
              announceDashboardGrid({
                type: intent.operation === 'keyboard' ? 'arrange-commit' : 'drop',
                itemLabel,
                sourceGridLabel,
                targetGridLabel,
              });
            }
            break;
          case 'cancel':
            emit(legacyOnCancel, data, intent.nativeEvent);
            if (itemLabel) {
              announceDashboardGrid({
                type: intent.operation === 'keyboard' ? 'arrange-cancel' : 'pointer-cancel',
                itemLabel,
                sourceGridLabel,
                targetGridLabel,
              });
            }
            break;
          case 'update':
          case 'rotate':
            if (intent.type === 'update') {
              emit(
                interactionKind === 'resize' ? props.onResize : props.onDrag,
                {
                  ...data,
                  type: interactionKind === 'resize' ? 'resize' : 'drag',
                },
                intent.nativeEvent,
              );
            }
            if (itemLabel && intent.current) {
              announceDashboardGrid({
                type: intent.type === 'rotate' ? 'rotate' : intent.operation === 'resize' ? 'resize' : 'move',
                itemLabel,
                rect: intent.current,
                sourceGridLabel,
                targetGridLabel,
              });
            }
            break;
          case 'rejected':
            if (itemLabel) {
              announceDashboardGrid({
                type: 'rejected',
                itemLabel,
                reason: intent.rejectionReason,
                sourceGridLabel,
                targetGridLabel,
              });
            }
            break;
          case 'target':
            if (itemLabel && intent.valid) {
              announceDashboardGrid({
                type: 'target',
                itemLabel,
                targetLabel: targetGridLabel,
                sourceGridLabel,
                targetGridLabel,
              });
            }
            break;
          default:
            break;
        }
      },
      onLayoutChange: (changeSet, nativeEvent) => {
        const currentItems = store.getSnapshot().items;
        const input =
          targetDocument?.defaultView?.KeyboardEvent && nativeEvent instanceof targetDocument.defaultView.KeyboardEvent
            ? 'keyboard'
            : nativeEvent
            ? 'pointer'
            : 'api';
        const reason = changeSet.added.length > 0 ? 'add' : changeSet.removed.length > 0 ? 'remove' : 'update';
        const data = {
          type: 'items-change',
          gridId,
          sourceGridId: gridId,
          items: currentItems,
          changeSet,
          input,
          affectedItems: currentItems,
          reason,
        };
        emit(props.onItemsChange, data, nativeEvent);
        emit(legacyOnLayoutChange, { ...data, type: 'layout-change', kind: 'layout' }, nativeEvent);
        for (const item of changeSet.added) {
          emit(
            props.onItemAdd,
            {
              ...data,
              type: 'item-add',
              itemId: item.id,
              affectedItems: changeSet.added,
              reason: 'add',
            },
            nativeEvent,
          );
          announceDashboardGrid({
            type: 'add',
            itemLabel: coordinator?.getItem(gridId, item.id)?.label ?? item.id,
            sourceGridLabel: registry.getGrid(gridId)?.label ?? gridId,
          });
        }
        for (const item of changeSet.removed) {
          emit(
            props.onItemRemove,
            {
              ...data,
              type: 'item-remove',
              itemId: item.id,
              affectedItems: changeSet.removed,
              reason: 'remove',
            },
            nativeEvent,
          );
          announceDashboardGrid({
            type: 'remove',
            itemLabel: item.id,
            sourceGridLabel: registry.getGrid(gridId)?.label ?? gridId,
          });
        }
        if (pendingDrop.current) {
          emit(props.onItemDrop, pendingDrop.current.data, pendingDrop.current.nativeEvent);
          pendingDrop.current = undefined;
        }
      },
    }),
    [
      emit,
      announceDashboardGrid,
      coordinator,
      gridId,
      legacyOnCancel,
      onDiagnostic,
      props.onDragEnd,
      props.onDragStart,
      props.onError,
      props.onItemAdd,
      props.onItemDrop,
      props.onItemRemove,
      props.onItemsChange,
      legacyOnLayoutChange,
      props.onDrag,
      props.onResizeEnd,
      props.onResize,
      props.onResizeStart,
      legacyOnTransfer,
      registry,
      store,
      targetDocument,
    ],
  );

  useIsomorphicLayoutEffect(() => {
    store.setCallbacks(storeCallbacks);
  }, [store, storeCallbacks]);

  useIsomorphicLayoutEffect(() => {
    store.setControlledItems(props.items as readonly DashboardGridItemDefinition[] | undefined);
  }, [props.items, store]);

  useIsomorphicLayoutEffect(() => {
    if (props.columns === 'auto' && store.getSnapshot().columns !== authoredColumns) {
      store.setColumns(authoredColumns, 'list');
    }
  }, [authoredColumns, props.columns, store]);

  const [rootElement, setRootElement] = React.useState<HTMLDivElement | null>(null);
  const [surfaceElement, setSurfaceElement] = React.useState<HTMLDivElement | null>(null);
  const setRootRef = React.useCallback((element: HTMLDivElement | null) => {
    setRootElement(element);
  }, []);
  const snapshot = useDashboardGridStoreSnapshot(store);
  const responsive = props.responsive as DashboardGridResponsiveOptions | undefined;
  const ariaLabel = props['aria-label'];
  const compactMode = props.compactMode;
  const dynamicNesting = props.dynamicNesting;
  const subGridDefaults = props.subGridDefaults;
  const responsiveLayout = responsive?.layout;
  const dragPause = props.drag?.pause;
  const removable = props.removable;
  const removal = props.removal;
  const gapStyles = React.useMemo(() => getGapStyles(props.gap), [props.gap]);
  const resolveColumns = useEventCallback((width: number) => {
    const measuredWidth = responsive?.observe === 'window' ? targetDocument?.defaultView?.innerWidth ?? width : width;
    if (!Number.isFinite(measuredWidth) || measuredWidth <= 0) {
      return store.getSnapshot().columns;
    }
    const next = resolveResponsiveColumns(responsive, measuredWidth, authoredColumns);
    if (next !== store.getSnapshot().columns) {
      emit(legacyOnColumnsChange, {
        gridId,
        columns: next,
        previousColumns: store.getSnapshot().columns,
        input: 'responsive',
        kind: 'columns',
      });
    }
    return next;
  });
  const handleResizeContent = useEventCallback(() => {
    const items = store.getSnapshot().items;
    emit(props.onContentResize, {
      type: 'content-resize',
      gridId,
      input: 'content',
      items,
      affectedItems: items,
      reason: 'content',
    });
    emit(legacyOnResizeContent, {
      gridId,
      items,
      input: 'responsive',
      kind: 'layout',
    });
  });
  const resolveMeasuredRowHeight = React.useCallback(
    (columnWidth: number) => {
      if (rowHeightOption === 'auto') {
        return columnWidth > 0 ? columnWidth : rowHeight;
      }
      if (rowHeightOption === 'initial') {
        if (initialAutoRowHeight.current === undefined && columnWidth > 0) {
          initialAutoRowHeight.current = columnWidth;
        }
        return initialAutoRowHeight.current ?? rowHeight;
      }
      if (typeof rowHeightOption === 'number') {
        return Math.max(0, rowHeightOption);
      }
      if (!targetDocument || !surfaceElement) {
        return rowHeight;
      }

      const probe = targetDocument.createElement('div');
      probe.style.position = 'absolute';
      probe.style.visibility = 'hidden';
      probe.style.blockSize = rowHeightOption;
      surfaceElement.appendChild(probe);
      const measured = probe.getBoundingClientRect().height;
      probe.remove();
      return measured > 0 ? measured : rowHeight;
    },
    [rowHeight, rowHeightOption, surfaceElement, targetDocument],
  );
  const measureGaps = React.useCallback(() => {
    const targetWindow = targetDocument?.defaultView;
    if (!targetWindow || !surfaceElement) {
      return {};
    }
    const probe = targetDocument.createElement('div');
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.margin =
      props.gap === undefined
        ? `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`
        : toCSSLength(props.gap);
    surfaceElement.appendChild(probe);
    const computed = targetWindow.getComputedStyle(probe);
    const gaps = {
      gapTop: Number.parseFloat(computed.marginTop) || 0,
      gapRight: Number.parseFloat(computed.marginRight) || 0,
      gapBottom: Number.parseFloat(computed.marginBottom) || 0,
      gapLeft: Number.parseFloat(computed.marginLeft) || 0,
    };
    probe.remove();
    return gaps;
  }, [props.gap, surfaceElement, targetDocument]);
  const handleMetricsChange = React.useCallback((metrics: DashboardGridCellMetrics) => {
    setLayoutMetrics(previous =>
      previous.columnWidth === metrics.columnWidth &&
      previous.rowHeight === metrics.rowHeight &&
      previous.gapTop === metrics.gapTop &&
      previous.gapRight === metrics.gapRight &&
      previous.gapBottom === metrics.gapBottom &&
      previous.gapLeft === metrics.gapLeft
        ? previous
        : metrics,
    );
  }, []);
  const handleDiagnostic = useEventCallback((diagnostic: DashboardGridEngineDiagnostic) => onDiagnostic(diagnostic));
  const resizeObserver = useDashboardGridResizeObserver({
    targetDocument,
    store,
    rowHeight,
    resolveColumns,
    columnLayout: responsive?.layout,
    nested: !!parentGridId,
    parentController: parentResizeObserver ?? undefined,
    onResizeContent: handleResizeContent,
    resizeDelay: props.rowHeightThrottle ?? 100,
    resolveRowHeight: resolveMeasuredRowHeight,
    measureGaps,
    onMetricsChange: handleMetricsChange,
  });
  useIsomorphicLayoutEffect(() => {
    if (parentResizeObserver) {
      return;
    }

    resizeObserver.rootRef(rootElement);
    return () => {
      resizeObserver.rootRef(null);
    };
  }, [parentResizeObserver, resizeObserver, rootElement]);

  React.useEffect(() => {
    if (responsive?.observe !== 'window') {
      return;
    }
    const targetWindow = targetDocument?.defaultView;
    if (!targetWindow) {
      return;
    }
    const handleWindowResize = () => resizeObserver.remeasure();
    targetWindow.addEventListener('resize', handleWindowResize);
    return () => targetWindow.removeEventListener('resize', handleWindowResize);
  }, [resizeObserver, responsive?.observe, targetDocument]);

  const geometryRef = React.useRef<DashboardGridDomGeometrySession | undefined>(undefined);
  const getDomGeometry = React.useCallback(() => {
    if (!targetDocument || !surfaceElement) {
      return undefined;
    }

    if (!geometryRef.current) {
      geometryRef.current = createDashboardGridDomGeometrySession({
        targetDocument,
        rootElement: surfaceElement,
        direction,
        onUnsupportedTransform: (_element, transform) =>
          handleDiagnostic({
            code: 'invalid-custom-layout',
            message: `Unsupported transformed ancestor: ${transform}`,
            severity: 'warning',
            recoverable: true,
          }),
      });
    }
    return geometryRef.current;
  }, [direction, handleDiagnostic, surfaceElement, targetDocument]);

  useIsomorphicLayoutEffect(() => {
    geometryRef.current = undefined;
  }, [direction, surfaceElement]);

  const setGridEnabled = React.useCallback(
    (nextEnabled: boolean, options?: { recursive?: boolean }) => {
      const resolvedEnabled = nextEnabled && !props.static;
      setEnabledState(resolvedEnabled);
      emit(props.onEnabledChange, {
        type: 'enabled-change',
        gridId,
        input: 'api',
        affectedItems: store.getSnapshot().items,
        reason: 'enabled',
        enabled: resolvedEnabled,
      });
      if (!options?.recursive) {
        return;
      }
      for (const candidate of registry.getGrids()) {
        let parentId = candidate.parentGridId;
        while (parentId) {
          if (parentId === gridId) {
            candidate.setEnabled?.(resolvedEnabled, { recursive: false });
            break;
          }
          parentId = registry.getGrid(parentId)?.parentGridId;
        }
      }
    },
    [emit, gridId, props.onEnabledChange, props.static, registry, store],
  );
  const refreshDragHandles = React.useCallback(
    (id?: string) => {
      setRefreshDragHandlesVersion(version => version + 1);
      for (const candidate of registry.getGrids()) {
        if (candidate.id !== gridId && candidate.parentGridId === gridId) {
          candidate.refreshDragHandles?.(id);
        }
      }
    },
    [gridId, registry],
  );
  const acceptsExternal = React.useCallback(
    (context: DashboardGridDropAcceptanceContext) => {
      const acceptance = props.acceptExternal;
      if (typeof acceptance === 'boolean' || acceptance === undefined) {
        return acceptance ?? false;
      }
      if (typeof acceptance === 'string') {
        const data = context.descriptor?.data;
        return (
          context.sourceId === acceptance ||
          (typeof data === 'object' &&
            data !== null &&
            'className' in data &&
            String(data.className).split(/\s+/).includes(acceptance))
        );
      }
      const descriptor = context.descriptor;
      const descriptorId = descriptor?.id ?? context.sourceId;
      if (!descriptor || !descriptorId) {
        return false;
      }
      return acceptance(
        {
          id: descriptorId,
          columnSpan: descriptor.columnSpan,
          rowSpan: descriptor.rowSpan,
          minColumnSpan: descriptor.minColumnSpan,
          maxColumnSpan: descriptor.maxColumnSpan,
          minRowSpan: descriptor.minRowSpan,
          maxRowSpan: descriptor.maxRowSpan,
          data: descriptor.data,
        },
        {
          sourceGridId: context.sourceGridId,
          targetGridId: gridId,
        },
      );
    },
    [gridId, props.acceptExternal],
  );

  useIsomorphicLayoutEffect(
    () =>
      registry.registerGrid({
        id: gridId,
        store,
        targetDocument,
        rootElement,
        surfaceElement,
        parentGridId,
        parentItemId,
        direction,
        label: ariaLabel,
        nestedLayout: responsiveLayout,
        compactMode,
        dynamicNesting,
        subGridDefaults,
        setEnabled: setGridEnabled,
        refreshDragHandles,
        getMetrics: resizeObserver.getMetrics,
        getDomGeometry,
        resizeItemToContent: id => resizeObserver.remeasure(id),
      }),
    [
      direction,
      gridId,
      parentGridId,
      parentItemId,
      ariaLabel,
      dynamicNesting,
      compactMode,
      subGridDefaults,
      refreshDragHandles,
      registry,
      resizeObserver,
      responsiveLayout,
      rootElement,
      store,
      surfaceElement,
      setGridEnabled,
      targetDocument,
      getDomGeometry,
    ],
  );

  useIsomorphicLayoutEffect(() => {
    if (!coordinator || !rootElement) {
      return;
    }
    return coordinator.registerGrid({
      id: gridId,
      element: rootElement,
      surfaceElement: surfaceElement ?? undefined,
      outerHitElement: parentItemId ? rootElement.parentElement ?? undefined : undefined,
      parentGridId,
      label: ariaLabel,
      direction,
      store,
      getMetrics: resizeObserver.getMetrics,
      nestingDwell: dragPause,
      acceptsExternal,
    });
  }, [
    coordinator,
    direction,
    gridId,
    parentGridId,
    parentItemId,
    ariaLabel,
    dragPause,
    acceptsExternal,
    resizeObserver,
    rootElement,
    store,
    surfaceElement,
  ]);

  useIsomorphicLayoutEffect(() => {
    if (!coordinator || !targetDocument || !removable) {
      return;
    }

    const elements =
      removable === true
        ? [targetDocument.body]
        : (() => {
            const matched = new Set<HTMLElement>(Array.from(targetDocument.querySelectorAll<HTMLElement>(removable)));
            const rootNode = rootElement?.getRootNode();
            if (rootNode && rootNode !== targetDocument && 'querySelectorAll' in rootNode) {
              const queryRoot = rootNode as Node & ParentNode;
              for (const element of Array.from(queryRoot.querySelectorAll<HTMLElement>(removable))) {
                matched.add(element);
              }
            }
            return [...matched];
          })();
    const accepts = (context: DashboardGridDropAcceptanceContext) => {
      if (!context.itemId || !context.sourceGridId) {
        return false;
      }
      const item = registry.getGrid(context.sourceGridId)?.store.getItem(context.itemId);
      const itemElement = coordinator.getItem(context.sourceGridId, context.itemId)?.element;
      if (!item) {
        return false;
      }
      const decline = removal?.decline;
      if (
        (typeof decline === 'function' && decline(item)) ||
        (typeof decline === 'string' && itemElement?.matches(decline))
      ) {
        return false;
      }
      const accept = removal?.accept;
      return (
        accept === undefined ||
        (typeof accept === 'function' && accept(item)) ||
        (typeof accept === 'string' && !!itemElement?.matches(accept))
      );
    };

    const unregister = elements.map((element, index) =>
      coordinator.registerDropZone({
        id: `${gridId}::remove::${index}`,
        element,
        kind: 'remove',
        label: ariaLabel,
        accepts,
      }),
    );
    return () => unregister.forEach(dispose => dispose());
  }, [coordinator, gridId, ariaLabel, removable, removal, registry, rootElement, targetDocument]);

  React.useEffect(
    () => () => {
      store.dispose();
      if (localProvider) {
        localCoordinator?.destroy();
        localRegistry.dispose();
      }
    },
    [localCoordinator, localProvider, localRegistry, store],
  );

  React.useImperativeHandle(
    props.imperativeRef,
    () =>
      createDashboardGridHandle(store, registry, {
        focusManager,
        getMetrics: resizeObserver.getMetrics,
        getDomGeometry,
        setEnabled: setGridEnabled,
        refreshDragHandles,
        resizeItemToContent: id => resizeObserver.remeasure(id),
        compactMode: props.compactMode,
      }),
    [
      focusManager,
      getDomGeometry,
      refreshDragHandles,
      registry,
      resizeObserver,
      setGridEnabled,
      store,
      props.compactMode,
    ],
  );

  const modelItemContents =
    props.children === undefined
      ? snapshot.engine.items.map(item => {
          const definition = store.getDefinition(item.id);
          return props.renderItem?.({ ...(definition ?? { id: item.id }), ...item }) ?? definition?.content ?? null;
        })
      : undefined;

  const semanticRootRole = props.role === 'list' ? 'list' : 'group';
  const rootAria = getDashboardGridRootAriaProps({
    label: props['aria-label'],
    labelledBy: props['aria-labelledby'],
    role: semanticRootRole,
    itemRole: semanticRootRole === 'list' ? 'listitem' : 'group',
  });
  const root = slot.always(
    getIntrinsicElementProps('div', {
      ...props,
      ...rootAria,
      dir: direction,
      [dashboardGridDataAttributes.grid]: gridId,
      'data-dashboard-grid-ssr': targetDocument ? undefined : '',
      ...(props.keyboardNavigation === 'none' ? {} : focusManager.navigationAttributes),
      ref: useMergedRefs(ref, setRootRef),
    }),
    { elementType: 'div' },
  );
  const surface = slot.always(props.surface ?? undefined, { elementType: 'div' });
  surface.ref = React.useCallback((element: HTMLDivElement | null) => {
    setSurfaceElement(element);
  }, []);
  const occupiedRows = snapshot.engine.items.reduce((rows, item) => Math.max(rows, item.row + item.rowSpan), 0);
  const renderedRows = Math.max(
    occupiedRows,
    props.fixedRows ?? props.minRows ?? 0,
    snapshot.preview?.temporaryRows ?? 0,
  );
  surface.style = {
    '--dashboard-grid-columns': snapshot.engine.columns,
    '--dashboard-grid-row-height': `${layoutMetrics.rowHeight || rowHeight}px`,
    rowGap: gapStyles.rowGap,
    columnGap: gapStyles.columnGap,
    blockSize: getDashboardGridSurfaceBlockSize(renderedRows, layoutMetrics, rowHeight),
    ...surface.style,
  } as React.CSSProperties;
  Object.assign(surface, {
    'data-dashboard-grid-temporary-rows': snapshot.preview?.temporaryRows,
  });
  const placeholder = snapshot.preview
    ? slot.always(props.placeholder ?? undefined, {
        elementType: 'div',
        defaultProps: {
          'aria-hidden': true,
          style: snapshot.preview.rect
            ? ({
                ...getDashboardGridScreenGeometryStyle(
                  snapshot.preview.rect,
                  layoutMetrics,
                  snapshot.engine.columns,
                  rowHeight,
                ),
                '--dashboard-grid-column': snapshot.preview.rect.column,
                '--dashboard-grid-row': snapshot.preview.rect.row,
                '--dashboard-grid-column-span': snapshot.preview.rect.columnSpan,
                '--dashboard-grid-row-span': snapshot.preview.rect.rowSpan,
              } as React.CSSProperties)
            : undefined,
        },
      })
    : undefined;
  const emptyContent =
    snapshot.engine.items.length === 0 && props.emptyContent
      ? slot.optional(props.emptyContent ?? undefined, { elementType: 'div' })
      : undefined;

  const contextValue = React.useMemo<DashboardGridContextValue>(
    () => ({
      gridId,
      store,
      registry,
      coordinator,
      targetDocument,
      direction,
      parentGridId,
      parentItemId,
      resizeObserver,
      getDomGeometry,
      onArrangeModeChange: handleArrangeModeChange,
      printMode: props.printMode ?? 'flow',
      rootRole: semanticRootRole,
      onDiagnostic,
      strings: props.strings,
      focusManager,
      registerFocusableItem,
      layoutMetrics,
      fallbackRowHeight: rowHeight,
      columns: snapshot.engine.columns,
      enabled,
      animate: props.animate ?? true,
      disableDrag: !enabled || !!props.static || !!props.disableDrag,
      disableResize: !enabled || !!props.static || !!props.disableResize,
      defaultLazyMount: props.lazyMount ?? false,
      defaultSizeToContent: props.sizeToContent ?? false,
      defaultMeasureSizeToContent: props.measureSizeToContent,
      dragOptions: props.drag,
      resizeOptions: props.resize,
      components: props.components,
      renderItem: props.renderItem,
      renderUnknownComponent: props.renderUnknownComponent,
      subGridDefaults: props.subGridDefaults,
      dynamicNesting: props.dynamicNesting ?? false,
      compactMode: props.compactMode,
      refreshDragHandlesVersion,
      setEnabled: setGridEnabled,
      refreshDragHandles,
    }),
    [
      coordinator,
      direction,
      getDomGeometry,
      gridId,
      parentGridId,
      parentItemId,
      registry,
      resizeObserver,
      store,
      targetDocument,
      handleArrangeModeChange,
      onDiagnostic,
      props.printMode,
      semanticRootRole,
      props.strings,
      focusManager,
      registerFocusableItem,
      layoutMetrics,
      rowHeight,
      snapshot.engine.columns,
      enabled,
      props.animate,
      props.static,
      props.disableDrag,
      props.disableResize,
      props.lazyMount,
      props.sizeToContent,
      props.measureSizeToContent,
      props.drag,
      props.resize,
      props.components,
      props.renderItem,
      props.renderUnknownComponent,
      props.subGridDefaults,
      props.dynamicNesting,
      props.compactMode,
      refreshDragHandlesVersion,
      setGridEnabled,
      refreshDragHandles,
    ],
  );

  return {
    components: {
      root: 'div',
      surface: 'div',
      placeholder: 'div',
      emptyContent: 'div',
    },
    root,
    surface,
    placeholder,
    emptyContent,
    store,
    registry,
    contextValue,
    localProvider,
    providerContextValue: {
      registry,
      coordinator,
      targetDocument,
      focusManager,
      registerFocusableItem,
    },
    modelItemContents,
    columns: snapshot.engine.columns,
    rowHeight,
    printMode: props.printMode ?? 'flow',
  } as DashboardGridInternalState;
};
