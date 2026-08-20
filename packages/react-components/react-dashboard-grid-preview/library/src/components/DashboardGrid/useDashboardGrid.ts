'use client';

import * as React from 'react';
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
import { useDashboardGridResizeObserver } from '../../observers/useDashboardGridResizeObserver';
import { createDashboardGridRegistry } from '../../provider/createDashboardGridRegistry';
import type { DashboardGridRegistry } from '../../provider/DashboardGridRegistry.types';
import { createDashboardGridHandle } from '../../hooks/useDashboardGrid';
import { createDashboardGridStore } from '../../state/createDashboardGridStore';
import type {
  DashboardGridItemDefinition,
  DashboardGridStore,
  DashboardGridStoreCallbacks,
} from '../../state/DashboardGridStore.types';
import { useDashboardGridStoreSnapshot } from '../../state/useDashboardGridStore';
import type {
  DashboardGridProps,
  DashboardGridSlots,
  DashboardGridState,
} from './DashboardGrid.types';

type DashboardGridResponsiveOptions = {
  breakpoints?: readonly {
    maxWidth: number;
    columns: number;
    layout?: 'list' | 'compact' | 'moveScale' | 'move' | 'scale' | 'none';
  }[];
  layout?: 'list' | 'compact' | 'moveScale' | 'move' | 'scale' | 'none';
};

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

const resolveResponsiveColumns = (
  responsive: DashboardGridResponsiveOptions | undefined,
  width: number,
  columns: number,
): number => {
  const breakpoints = [...(responsive?.breakpoints ?? [])].sort(
    (left, right) => left.maxWidth - right.maxWidth,
  );
  return breakpoints.find(breakpoint => width <= breakpoint.maxWidth)?.columns ?? columns;
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
  const fluent = useFluent();
  const generatedId = useId('dashboard-grid-');
  const gridId = props.gridId ?? generatedId;
  const direction = fluent.dir === 'rtl' ? 'rtl' : 'ltr';
  const parentProvider = useDashboardGridProviderContext_unstable(context => context);
  const targetDocument = parentProvider
    ? parentProvider.targetDocument
    : fluent.targetDocument;
  const parentGridId = useDashboardGridItemContext_unstable(context => context.gridId);
  const parentItemId = useDashboardGridItemContext_unstable(context => context.id);
  const parentItem = useDashboardGridItemContext_unstable(context => context.snapshot.item);
  const parentResizeObserver = useDashboardGridContext_unstable(context => context.resizeObserver);
  const onRegistryError = useEventCallback((error: unknown) => props.onError?.(error));
  const localFocusManagerRef = React.useRef<
    ReturnType<typeof useDashboardGridFocusManager> | undefined
  >(undefined);

  const [localRegistry] = React.useState(() =>
    createDashboardGridRegistry({
      onError: onRegistryError,
      captureFocus: (focusGridId, itemId) =>
        localFocusManagerRef.current?.captureFocus(focusGridId, itemId) ?? {
          element: null,
          gridId: focusGridId,
          itemId,
        },
      requestPendingFocus: (record: DashboardGridFocusRecord) =>
        localFocusManagerRef.current?.requestPendingFocus(record),
      focusAfterRemoval: (focusGridId, removedRect) =>
        localFocusManagerRef.current?.focusAfterRemoval(focusGridId, removedRect) ?? false,
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
                registry.getGrid(intentGridId)?.store.events.enqueue(intent);
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
  const localFocusManager = React.useMemo(
    () => localFocusManagerState,
    [
      localFocusManagerState.captureFocus,
      localFocusManagerState.focusAfterRemoval,
      localFocusManagerState.focusGeometric,
      localFocusManagerState.focusItem,
      localFocusManagerState.navigationAttributes,
      localFocusManagerState.notifyItemRegistered,
      localFocusManagerState.requestPendingFocus,
      localFocusManagerState.restoreFocus,
    ],
  );
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
  const registerFocusableItem =
    parentProvider?.registerFocusableItem ?? localRegisterFocusableItem;
  const { announceDashboardGrid } = useDashboardGridAnnouncements(props.strings);

  const authoredColumns =
    props.columns === 'auto'
      ? Math.max(1, parentItem?.columnSpan ?? DEFAULT_COLUMNS)
      : Math.max(1, props.columns ?? DEFAULT_COLUMNS);
  const rowHeight = Math.max(1, props.rowHeight ?? DEFAULT_ROW_HEIGHT);

  const [store] = React.useState(() =>
    createDashboardGridStore({
      id: gridId,
      columns: authoredColumns,
      maxRows: props.maxRows,
      float: props.float,
      resizeDisabled: props.resizeDisabled,
      defaultItems: props.defaultItems as readonly DashboardGridItemDefinition[] | undefined,
      items: props.items as readonly DashboardGridItemDefinition[] | undefined,
      callbacks: {
        onDiagnostic: props.onDiagnostic,
        onError: props.onError,
      },
    }),
  );
  const emit = React.useCallback(
    (
      callback: ((event: never, data: never) => void) | undefined,
      data: Record<string, unknown>,
      nativeEvent?: Event,
    ) => invokeEventHandler(callback, data, nativeEvent, targetDocument),
    [targetDocument],
  );
  const storeCallbacks = React.useMemo<DashboardGridStoreCallbacks>(
    () => ({
      onDiagnostic: diagnostic => props.onDiagnostic?.(diagnostic),
      onError: error => props.onError?.(error),
      onIntent: intent => {
        const input =
          intent.operation === 'keyboard'
            ? 'keyboard'
            : intent.operation === 'external'
              ? 'external'
              : targetDocument?.defaultView?.KeyboardEvent &&
                  intent.nativeEvent instanceof targetDocument.defaultView.KeyboardEvent
                ? 'keyboard'
                : 'pointer';
        const data = {
          ...intent,
          gridId,
          sourceGridId: intent.sourceGridId ?? gridId,
          input,
          kind: intent.operation,
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
              intent.operation === 'resize' ? props.onResizeStart : props.onDragStart,
              data,
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
              intent.operation === 'resize' ? props.onResizeEnd : props.onDragEnd,
              data,
              intent.nativeEvent,
            );
            if (
              intent.operation === 'drag' &&
              intent.sourceGridId &&
              intent.targetGridId &&
              intent.sourceGridId !== intent.targetGridId
            ) {
              emit(props.onTransfer, data, intent.nativeEvent);
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
            emit(props.onCancel, data, intent.nativeEvent);
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
            if (itemLabel && intent.current) {
              announceDashboardGrid({
                type:
                  intent.type === 'rotate'
                    ? 'rotate'
                    : intent.operation === 'resize'
                      ? 'resize'
                      : 'move',
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
        const data = {
          type: 'layout-change',
          gridId,
          sourceGridId: gridId,
          items: store.getSnapshot().items,
          changeSet,
          input: 'api',
          kind: 'layout',
        };
        emit(props.onLayoutChange, data, nativeEvent);
        for (const item of changeSet.added) {
          emit(props.onItemAdd, { ...data, itemId: item.id, item }, nativeEvent);
          announceDashboardGrid({
            type: 'add',
            itemLabel: coordinator?.getItem(gridId, item.id)?.label ?? item.id,
            sourceGridLabel: registry.getGrid(gridId)?.label ?? gridId,
          });
        }
        for (const item of changeSet.removed) {
          emit(props.onItemRemove, { ...data, itemId: item.id, item }, nativeEvent);
          announceDashboardGrid({
            type: 'remove',
            itemLabel: item.id,
            sourceGridLabel: registry.getGrid(gridId)?.label ?? gridId,
          });
        }
      },
    }),
    [
      emit,
      announceDashboardGrid,
      coordinator,
      gridId,
      props.onCancel,
      props.onDiagnostic,
      props.onDragEnd,
      props.onDragStart,
      props.onError,
      props.onItemAdd,
      props.onItemRemove,
      props.onLayoutChange,
      props.onResizeEnd,
      props.onResizeStart,
      props.onTransfer,
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

  const snapshot = useDashboardGridStoreSnapshot(store);
  const responsive = props.responsive as DashboardGridResponsiveOptions | undefined;
  const resolveColumns = React.useCallback(
    (width: number) => {
      const next = resolveResponsiveColumns(responsive, width, authoredColumns);
      if (next !== store.getSnapshot().columns) {
        emit(props.onColumnsChange, {
          gridId,
          columns: next,
          previousColumns: store.getSnapshot().columns,
          input: 'responsive',
          kind: 'columns',
        });
      }
      return next;
    },
    [authoredColumns, emit, gridId, props.onColumnsChange, responsive, store],
  );
  const handleResizeContent = React.useCallback(() => {
    emit(props.onResizeContent, {
      gridId,
      items: store.getSnapshot().items,
      input: 'responsive',
      kind: 'layout',
    });
  }, [emit, gridId, props.onResizeContent, store]);
  const handleDiagnostic = React.useCallback(
    (diagnostic: Parameters<NonNullable<DashboardGridProps['onDiagnostic']>>[0]) => {
      props.onDiagnostic?.(diagnostic);
    },
    [props.onDiagnostic],
  );
  const resizeObserver = useDashboardGridResizeObserver({
    targetDocument,
    store,
    rowHeight,
    resolveColumns,
    columnLayout: responsive?.layout,
    nested: !!parentGridId,
    parentController: parentResizeObserver ?? undefined,
    onResizeContent: handleResizeContent,
  });

  const [rootElement, setRootElement] = React.useState<HTMLDivElement | null>(null);
  const [surfaceElement, setSurfaceElement] = React.useState<HTMLDivElement | null>(null);
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
        label: props['aria-label'],
        nestedLayout: responsive?.layout,
      }),
    [
      direction,
      gridId,
      parentGridId,
      parentItemId,
      props['aria-label'],
      registry,
      responsive?.layout,
      rootElement,
      store,
      surfaceElement,
      targetDocument,
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
      label: props['aria-label'],
      direction,
      store,
      getMetrics: resizeObserver.getMetrics,
    });
  }, [
    coordinator,
    direction,
    gridId,
    parentGridId,
    parentItemId,
    props['aria-label'],
    resizeObserver,
    rootElement,
    store,
    surfaceElement,
  ]);

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
    () => createDashboardGridHandle(store, registry, focusManager),
    [focusManager, registry, store],
  );

  const modelItemContents =
    props.children === undefined
      ? snapshot.engine.items.map(item => {
          const definition = store.getDefinition(item.id);
          return props.renderItem?.(item) ?? definition?.content ?? null;
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
      [dashboardGridDataAttributes.grid]: gridId,
      'data-dashboard-grid-ssr': targetDocument ? undefined : '',
      ...focusManager.navigationAttributes,
      ref: useMergedRefs(
        ref,
        React.useCallback((element: HTMLDivElement | null) => {
          setRootElement(element);
          resizeObserver.rootRef(element);
        }, [resizeObserver]),
      ),
    }),
    { elementType: 'div' },
  );
  const surface = slot.always(props.surface ?? undefined, { elementType: 'div' });
  surface.ref = React.useCallback((element: HTMLDivElement | null) => {
    setSurfaceElement(element);
  }, []);
  surface.style = {
    '--dashboard-grid-columns': snapshot.engine.columns,
    '--dashboard-grid-row-height': `${rowHeight}px`,
    gridTemplateRows: snapshot.preview?.temporaryRows
      ? `repeat(${snapshot.preview.temporaryRows}, var(--dashboard-grid-row-height))`
      : undefined,
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
            ? {
                '--dashboard-grid-column': snapshot.preview.rect.column,
                '--dashboard-grid-row': snapshot.preview.rect.row,
                '--dashboard-grid-column-span': snapshot.preview.rect.columnSpan,
                '--dashboard-grid-row-span': snapshot.preview.rect.rowSpan,
              } as React.CSSProperties
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
      onArrangeModeChange: (event, data) =>
        emit(props.onArrangeModeChange, { gridId, ...data }, event),
      printMode: props.printMode ?? 'flow',
      rootRole: semanticRootRole,
      onDiagnostic: props.onDiagnostic,
      strings: props.strings,
      focusManager,
      registerFocusableItem,
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
      props.onArrangeModeChange,
      props.onDiagnostic,
      props.printMode,
      semanticRootRole,
      props.strings,
      focusManager,
      registerFocusableItem,
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
