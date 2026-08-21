'use client';

import * as React from 'react';
import { tokens } from '@fluentui/react-theme';
import { mergeClasses } from '@griffel/react';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  slot,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import {
  getDashboardGridItemAriaProps,
  getDashboardGridResizeHandleAriaProps,
} from '../../accessibility/aria';
import {
  DashboardGridContextProvider,
  useRequiredDashboardGridContext_unstable,
} from '../../contexts/DashboardGridContext';
import {
  DashboardGridItemContextProvider,
  type DashboardGridItemContextValue,
} from '../../contexts/DashboardGridItemContext';
import { createDashboardGridKeyboardInteraction } from '../../interaction/keyboardInteraction';
import { createDashboardGridPointerDrag } from '../../interaction/pointerDrag';
import { createDashboardGridPointerResize } from '../../interaction/pointerResize';
import {
  dashboardGridDataAttributes,
  type DashboardGridItemRegistration,
  type DashboardGridResizeEdge,
} from '../../interaction/types';
import { useDashboardGridLazyMount } from '../../observers/useDashboardGridLazyMount';
import { useDashboardGridSizeToContent } from '../../observers/useDashboardGridSizeToContent';
import {
  getDashboardGridGeometryStyle,
  getDashboardGridPrintGeometryStyle,
} from '../../print/printGeometry';
import type { DashboardGridItemDefinition } from '../../state/DashboardGridStore.types';
import { useDashboardGridItemStoreSnapshot } from '../../state/useDashboardGridStore';
import type {
  DashboardGridItemProps,
  DashboardGridItemState,
} from './DashboardGridItem.types';
import { getDashboardGridScreenGeometryStyle } from '../DashboardGrid/screenGeometry';
import { DashboardGrid } from '../DashboardGrid/DashboardGrid';

type ExtendedDashboardGridItemProps = DashboardGridItemProps & {
  label?: string;
  resizeDirections?: readonly DashboardGridResizeEdge[];
  cancel?: string;
  lazyMount?: boolean;
  sizeToContent?: boolean | number;
  printMode?: 'flow' | 'exact';
  modelOwned_unstable?: boolean;
};

export type DashboardGridItemInternalState = DashboardGridItemState & {
  contextValue: DashboardGridItemContextValue;
  resizeHandles: Partial<Record<DashboardGridResizeEdge, React.ButtonHTMLAttributes<HTMLButtonElement>>>;
  resizeDirections: readonly DashboardGridResizeEdge[];
  portalReady: boolean;
  lazyVisible: boolean;
  printMode: 'flow' | 'exact';
  print?: DashboardGridItemDefinition['print'];
  animated: boolean;
  handleVisibility: 'hover' | 'always' | 'coarse-pointer';
};

const defaultResizeDirections: readonly DashboardGridResizeEdge[] = ['se'];
const emptyResizeDirections: readonly DashboardGridResizeEdge[] = [];
const emptyItemOptions: Partial<Omit<DashboardGridItemDefinition, 'id'>> = {};
const allResizeDirections: readonly DashboardGridResizeEdge[] = [
  'n',
  'e',
  's',
  'w',
  'ne',
  'nw',
  'se',
  'sw',
];

export const useDashboardGridItem_unstable = (
  props: DashboardGridItemProps,
  ref: React.Ref<HTMLDivElement>,
): DashboardGridItemInternalState => {
  const extendedProps = props as ExtendedDashboardGridItemProps;
  const gridId = useRequiredDashboardGridContext_unstable(context => context.gridId);
  const gridContextValue = useRequiredDashboardGridContext_unstable(context => context);
  const store = useRequiredDashboardGridContext_unstable(context => context.store);
  const registry = useRequiredDashboardGridContext_unstable(context => context.registry);
  const coordinator = useRequiredDashboardGridContext_unstable(context => context.coordinator);
  const targetDocument = useRequiredDashboardGridContext_unstable(context => context.targetDocument);
  const direction = useRequiredDashboardGridContext_unstable(context => context.direction);
  const resizeObserver = useRequiredDashboardGridContext_unstable(context => context.resizeObserver);
  const getDomGeometry = useRequiredDashboardGridContext_unstable(context => context.getDomGeometry);
  const onArrangeModeChange = useRequiredDashboardGridContext_unstable(
    context => context.onArrangeModeChange,
  );
  const printMode = useRequiredDashboardGridContext_unstable(context => context.printMode);
  const rootRole = useRequiredDashboardGridContext_unstable(context => context.rootRole);
  const onDiagnostic = useRequiredDashboardGridContext_unstable(context => context.onDiagnostic);
  const strings = useRequiredDashboardGridContext_unstable(context => context.strings);
  const layoutMetrics = useRequiredDashboardGridContext_unstable(
    context => context.layoutMetrics,
  );
  const fallbackRowHeight = useRequiredDashboardGridContext_unstable(
    context => context.fallbackRowHeight,
  );
  const columns = useRequiredDashboardGridContext_unstable(context => context.columns);
  const enabled = useRequiredDashboardGridContext_unstable(context => context.enabled);
  const animated = useRequiredDashboardGridContext_unstable(context => context.animate);
  const disableDrag = useRequiredDashboardGridContext_unstable(context => context.disableDrag);
  const disableResize = useRequiredDashboardGridContext_unstable(context => context.disableResize);
  const defaultLazyMount = useRequiredDashboardGridContext_unstable(
    context => context.defaultLazyMount,
  );
  const defaultSizeToContent = useRequiredDashboardGridContext_unstable(
    context => context.defaultSizeToContent,
  );
  const dragOptions = useRequiredDashboardGridContext_unstable(context => context.dragOptions);
  const resizeOptions = useRequiredDashboardGridContext_unstable(context => context.resizeOptions);
  const componentRegistry = useRequiredDashboardGridContext_unstable(
    context => context.components,
  );
  const renderUnknownComponent = useRequiredDashboardGridContext_unstable(
    context => context.renderUnknownComponent,
  );
  const parentRenderItem = useRequiredDashboardGridContext_unstable(
    context => context.renderItem,
  );
  const subGridDefaults = useRequiredDashboardGridContext_unstable(
    context => context.subGridDefaults,
  );
  const refreshDragHandlesVersion = useRequiredDashboardGridContext_unstable(
    context => context.refreshDragHandlesVersion,
  );
  const focusManager = useRequiredDashboardGridContext_unstable(context => context.focusManager);
  const registerFocusableItem = useRequiredDashboardGridContext_unstable(
    context => context.registerFocusableItem,
  );
  const [ownsDeclarativeRegistration] = React.useState(
    () => !extendedProps.modelOwned_unstable,
  );
  const snapshot = useDashboardGridItemStoreSnapshot(store, props.id);
  const definition = snapshot.definition;
  const itemOptions = props.item ?? emptyItemOptions;
  const itemLabel =
    extendedProps.label ??
    itemOptions.label ??
    definition?.label ??
    props['aria-label'] ??
    props.id;
  const resolvedItem = snapshot.item ?? {
    id: props.id,
    column: itemOptions.column ?? 0,
    row: itemOptions.row ?? 0,
    columnSpan: itemOptions.columnSpan ?? 1,
    rowSpan: itemOptions.rowSpan ?? 1,
    minColumnSpan: itemOptions.minColumnSpan,
    maxColumnSpan: itemOptions.maxColumnSpan,
    minRowSpan: itemOptions.minRowSpan,
    maxRowSpan: itemOptions.maxRowSpan,
    movable: itemOptions.movable ?? true,
    resizable: itemOptions.resizable ?? true,
    locked: itemOptions.locked ?? false,
  };
  const movable = enabled && !disableDrag && resolvedItem.movable;
  const resizable = enabled && !disableResize && resolvedItem.resizable;
  const preserveCommittedPointerGeometry =
    snapshot.preview?.itemId === props.id &&
    snapshot.preview.sourceGridId === gridId &&
    (snapshot.preview.operation === 'drag' || snapshot.preview.operation === 'resize') &&
    snapshot.preview.originRect;
  const renderedItem = preserveCommittedPointerGeometry
    ? { ...resolvedItem, ...snapshot.preview!.originRect }
    : resolvedItem;
  const pointerPreview =
    preserveCommittedPointerGeometry &&
    snapshot.preview?.pixelRect &&
    snapshot.preview.originPixelRect
      ? {
          x:
            (snapshot.preview.pixelRect.x - snapshot.preview.originPixelRect.x) *
            (direction === 'rtl' ? -1 : 1),
          y: snapshot.preview.pixelRect.y - snapshot.preview.originPixelRect.y,
        }
      : undefined;
  const contextSnapshot = React.useMemo(
    () => (renderedItem === resolvedItem ? snapshot : { ...snapshot, item: renderedItem }),
    [renderedItem, resolvedItem, snapshot],
  );
  const contextValue = React.useMemo<DashboardGridItemContextValue>(
    () => ({ id: props.id, gridId, store, snapshot: contextSnapshot }),
    [contextSnapshot, gridId, props.id, store],
  );

  const [rootElement, setRootElement] = React.useState<HTMLDivElement | null>(null);
  const [contentElement, setContentElement] = React.useState<HTMLDivElement | null>(null);
  const [dragHandleElement, setDragHandleElement] = React.useState<HTMLElement | null>(null);
  const setDragHandleRef = React.useCallback((element: HTMLDivElement | null) => {
    setDragHandleElement(element);
  }, []);
  const resizeHandleElements = React.useRef<
    Partial<Record<DashboardGridResizeEdge, HTMLButtonElement | null>>
  >({});
  const dragController = React.useRef<
    ReturnType<typeof createDashboardGridPointerDrag> | undefined
  >(undefined);
  const keyboardController = React.useRef<
    ReturnType<typeof createDashboardGridKeyboardInteraction> | undefined
  >(undefined);
  const resizeControllers = React.useRef<
    Partial<Record<DashboardGridResizeEdge, ReturnType<typeof createDashboardGridPointerResize>>>
  >({});
  const interactionRegistration = React.useRef<DashboardGridItemRegistration | undefined>(
    undefined,
  );
  const [arranging, setArranging] = React.useState(false);
  const [activeResizeEdge, setActiveResizeEdge] = React.useState<
    DashboardGridResizeEdge | undefined
  >(undefined);
  const [portalReady, setPortalReady] = React.useState(false);

  const lazyMount =
    extendedProps.lazyMount ??
    itemOptions.lazyMount ??
    definition?.lazyMount ??
    defaultLazyMount;
  const lazy = useDashboardGridLazyMount<HTMLDivElement>({
    targetDocument,
    enabled: lazyMount,
  });
  const sizeToContent =
    extendedProps.sizeToContent ??
    itemOptions.sizeToContent ??
    definition?.sizeToContent ??
    defaultSizeToContent;
  const sizeToContentRef = useDashboardGridSizeToContent<HTMLDivElement>({
    controller: resizeObserver,
    id: props.id,
    enabled: sizeToContent,
    store,
    onTextOnly: id =>
      onDiagnostic?.({
        code: 'invalid-custom-layout',
        message: `Dashboard item "${id}" uses text-only size-to-content content and was not measured.`,
        severity: 'warning',
        recoverable: true,
        itemId: id,
        details: { feature: 'size-to-content', reason: 'text-only-content' },
      }),
  });

  useIsomorphicLayoutEffect(() => {
    store.setRuntimeItemState(props.id, {
      lazyVisible: lazy.visible,
      mounted: true,
    });
    return () => store.setRuntimeItemState(props.id, { mounted: false });
  }, [lazy.visible, props.id, store]);

  useIsomorphicLayoutEffect(() => {
    if (!ownsDeclarativeRegistration) {
      return;
    }

    const item: DashboardGridItemDefinition = {
      ...itemOptions,
      id: props.id,
      lazyMount,
      sizeToContent,
      content: props.children,
      label: extendedProps.label ?? itemOptions.label,
      print: extendedProps.print ?? itemOptions.print,
    };
    return store.registerDeclarativeItem(item);
  }, [
    extendedProps.label,
    extendedProps.print,
    itemOptions,
    lazyMount,
    props.children,
    props.id,
    sizeToContent,
    store,
    ownsDeclarativeRegistration,
  ]);

  let content = props.children ?? definition?.content;
  if (content === undefined && definition?.component) {
    const RegisteredComponent = componentRegistry?.[definition.component];
    content = RegisteredComponent
      ? React.createElement(RegisteredComponent, {
          ...definition.props,
          data: definition.data,
        })
      : registry.serializers.render(definition.component, definition.data, {
          gridId,
          itemId: props.id,
        });
    if (content === null) {
      content =
        renderUnknownComponent?.(definition, definition.component) ?? (
          <span data-dashboard-grid-unknown-component="">
            {`Unknown dashboard component: ${definition.component}`}
          </span>
        );
    }
  }

  useIsomorphicLayoutEffect(() => {
    const unregister = registry.registerItem({
      id: props.id,
      gridId,
      content: lazy.visible ? (
        <DashboardGridContextProvider value={gridContextValue}>
          <DashboardGridItemContextProvider value={contextValue}>
            {content}
          </DashboardGridItemContextProvider>
        </DashboardGridContextProvider>
      ) : null,
    });
    if (contentElement) {
      registry.attachItemHost(props.id, contentElement);
    }
    setPortalReady(true);

    return () => {
      registry.detachItemHost(props.id, contentElement);
      unregister();
    };
  }, [
    content,
    contentElement,
    contextValue,
    gridContextValue,
    gridId,
    lazy.visible,
    props.id,
    registry,
  ]);

  const configuredResizeDirections =
    extendedProps.resizeDirections ??
    (resizeOptions?.handles === 'all'
      ? allResizeDirections
      : Array.isArray(resizeOptions?.handles)
        ? resizeOptions.handles
        : resizeOptions?.handles
          ? [resizeOptions.handles]
          : defaultResizeDirections);
  const resizeDirectionsKey =
    resizable && !resolvedItem.locked
      ? configuredResizeDirections.join(',')
      : '';
  const resizeDirections = React.useMemo<readonly DashboardGridResizeEdge[]>(
    () =>
      resizeDirectionsKey
        ? (resizeDirectionsKey.split(',') as DashboardGridResizeEdge[])
        : emptyResizeDirections,
    [resizeDirectionsKey],
  );
  const strictSizeToContent = sizeToContent === true;

  useIsomorphicLayoutEffect(() => {
    if (!rootElement) {
      return;
    }

    const focusableItem = {
      gridId,
      itemId: props.id,
      element: rootElement,
    };
    const unregister = registerFocusableItem(focusableItem);

    return () => {
      const focusRecord = focusManager.captureFocus(gridId, props.id);
      const host = registry.itemHosts.get(props.id)?.host;
      const containedFocus =
        !!focusRecord.element &&
        (rootElement.contains(focusRecord.element) || !!host?.contains(focusRecord.element));
      const removedRect = containedFocus ? rootElement.getBoundingClientRect() : undefined;
      if (containedFocus) {
        focusManager.requestPendingFocus(focusRecord);
      }
      unregister();

      if (containedFocus) {
        Promise.resolve().then(() =>
          Promise.resolve().then(() => {
            if (!registry.getItemOwner(props.id)) {
              focusManager.focusAfterRemoval(gridId, removedRect);
              focusManager.requestPendingFocus({ element: null });
            }
          }),
        );
      }
    };
  }, [
    focusManager,
    gridId,
    props.id,
    registerFocusableItem,
    registry,
    rootElement,
  ]);

  useIsomorphicLayoutEffect(() => {
    if (!interactionRegistration.current) {
      return;
    }

    Object.assign(interactionRegistration.current, {
      dragHandle: dragHandleElement,
      resizeHandles: resizeHandleElements.current,
      label: itemLabel,
      movable,
      resizable,
      locked: resolvedItem.locked,
      sizeToContent: strictSizeToContent,
      resizeDirections,
    });
  }, [
    dragHandleElement,
    itemLabel,
    resizeDirections,
    resolvedItem.locked,
    movable,
    resizable,
    strictSizeToContent,
  ]);

  useIsomorphicLayoutEffect(() => {
    if (!coordinator || !targetDocument || !rootElement) {
      return;
    }

    const registration: DashboardGridItemRegistration = {
      id: props.id,
      gridId,
      element: rootElement,
      dragHandle: dragHandleElement,
      resizeHandles: resizeHandleElements.current,
      label: itemLabel,
      movable,
      resizable,
      locked: resolvedItem.locked,
      sizeToContent: strictSizeToContent,
      resizeDirections,
    };
    interactionRegistration.current = registration;
    const unregister = coordinator.registerItem(registration);

    const geometry = getDomGeometry();
    if (geometry) {
      dragController.current = createDashboardGridPointerDrag({
        targetDocument,
        coordinator,
        gridId,
        itemId: props.id,
        itemElement: rootElement,
        geometry,
        handle: dragHandleElement ?? dragOptions?.handleSelector,
        cancel: extendedProps.cancel ?? dragOptions?.cancelSelector,
        getOriginPixelRect: () => geometry.elementToLocalRect(rootElement),
      });

      for (const edge of resizeDirections) {
        const handleElement = resizeHandleElements.current[edge];
        if (!handleElement) {
          continue;
        }
        resizeControllers.current[edge] = createDashboardGridPointerResize({
          targetDocument,
          coordinator,
          gridId,
          itemId: props.id,
          itemElement: rootElement,
          handleElement,
          edge,
          geometry,
          sizeToContent: strictSizeToContent,
          getOriginPixelRect: () => geometry.elementToLocalRect(rootElement),
        });
      }
    }

    keyboardController.current = createDashboardGridKeyboardInteraction({
      targetDocument,
      coordinator,
      gridId,
      itemId: props.id,
      itemElement: rootElement,
      dragHandle: dragHandleElement,
      resizeHandles: resizeHandleElements.current,
      direction,
      onArrangeChange: active => {
        setArranging(active);
        onArrangeModeChange?.(undefined, {
          active,
          gridId,
          itemId: props.id,
        });
      },
      onResizeHandleActiveChange: setActiveResizeEdge,
    });

    return () => {
      unregister();
      dragController.current?.destroy();
      dragController.current = undefined;
      keyboardController.current?.cancel();
      keyboardController.current = undefined;
      for (const controller of Object.values(resizeControllers.current)) {
        controller?.destroy();
      }
      resizeControllers.current = {};
      interactionRegistration.current = undefined;
    };
  }, [
    coordinator,
    direction,
    dragHandleElement,
    extendedProps.cancel,
    dragOptions?.cancelSelector,
    dragOptions?.handleSelector,
    getDomGeometry,
    gridId,
    onArrangeModeChange,
    props.id,
    resizeDirections,
    refreshDragHandlesVersion,
    rootElement,
    strictSizeToContent,
    targetDocument,
  ]);

  const itemAria = getDashboardGridItemAriaProps({
    rect: renderedItem,
    label: itemLabel,
    rootRole,
    role:
      (props.role as 'group' | 'listitem' | 'gridcell' | undefined) ??
      (rootRole === 'list' ? 'listitem' : 'group'),
    arranging,
    movable,
    resizable,
    strings,
  });
  const rootIntrinsicProps = getIntrinsicElementProps(
    'div',
    props as unknown as React.HTMLAttributes<HTMLDivElement>,
  );
  const rootSlotProps = {
      ...rootIntrinsicProps,
      ...itemAria,
      className: mergeClasses(
        itemOptions.className ?? definition?.className,
        rootIntrinsicProps.className,
      ),
      ref: useMergedRefs(
        ref,
        React.useCallback((element: HTMLDivElement | null) => {
          setRootElement(element);
          lazy.ref(element);
        }, [lazy]),
      ),
      tabIndex: props.tabIndex ?? 0,
      style: {
        ...getDashboardGridScreenGeometryStyle(
          renderedItem,
          layoutMetrics,
          columns,
          fallbackRowHeight,
        ),
        ...getDashboardGridGeometryStyle(renderedItem),
        ...getDashboardGridPrintGeometryStyle(
          renderedItem,
          printMode,
          store.getSnapshot().columns,
        ),
        ...props.style,
        ...(pointerPreview
          ? {
              transform: `translate3d(${pointerPreview.x}px, ${pointerPreview.y}px, 0)${
                props.style?.transform ? ` ${props.style.transform}` : ''
              }`,
              transition: 'none',
              willChange: 'transform',
              zIndex: tokens.zIndexOverlay,
            }
          : {}),
      },
      onPointerDown: mergeCallbacks(props.onPointerDown, event =>
        dragController.current?.onPointerDown(event.nativeEvent),
      ),
      onKeyDown: mergeCallbacks(props.onKeyDown, event =>
        keyboardController.current?.onKeyDown(event.nativeEvent),
      ),
    } as React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>;
  Object.assign(rootSlotProps, { [dashboardGridDataAttributes.item]: props.id });
  const root = slot.always(rootSlotProps, { elementType: 'div' });
  const contentSlot = slot.always(props.content ?? undefined, {
    elementType: 'div',
  }) as NonNullable<DashboardGridItemState['content']>;
  contentSlot.ref = React.useCallback(
    (element: HTMLDivElement | null) => {
      setContentElement(element);
      sizeToContentRef(element);
    },
    [sizeToContentRef],
  );
  contentSlot['aria-busy'] = lazyMount && !lazy.visible ? true : undefined;
  contentSlot.children = portalReady ? undefined : lazy.visible ? content : null;
  const dragHandle = props.dragHandle
    ? slot.optional(props.dragHandle ?? undefined, { elementType: 'div' })
    : undefined;
  if (dragHandle) {
    dragHandle.ref = setDragHandleRef;
    Object.assign(dragHandle, { [dashboardGridDataAttributes.dragHandle]: '' });
  }
  const resizeHandle =
    resizeDirections.length > 0
      ? (slot.always(props.resizeHandle ?? undefined, {
          elementType: 'button',
        }) as NonNullable<DashboardGridItemState['resizeHandle']>)
      : undefined;
  const resizeHandles = Object.fromEntries(
    resizeDirections.map(edge => [
      edge,
      {
        ...getDashboardGridResizeHandleAriaProps({
          edge,
          itemLabel,
          strings,
          active: activeResizeEdge === edge,
        }),
        ref: (element: HTMLButtonElement | null) => {
          resizeHandleElements.current[edge] = element;
        },
        onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) =>
          resizeControllers.current[edge]?.onPointerDown(event.nativeEvent),
      },
    ]),
  ) as DashboardGridItemInternalState['resizeHandles'];
  const nestedDefinition = itemOptions.subGrid ?? definition?.subGrid;
  const nestedOptions = nestedDefinition
    ? { ...subGridDefaults, ...nestedDefinition }
    : undefined;
  const nestedItems = nestedOptions?.items;
  const subGridContent = nestedOptions ? (
    <DashboardGrid
      {...nestedOptions}
      gridId={`${gridId}::${props.id}::subgrid`}
      columns={nestedOptions.columns ?? 'auto'}
      defaultItems={nestedItems}
      items={undefined}
      renderItem={parentRenderItem}
      components={componentRegistry}
      renderUnknownComponent={renderUnknownComponent}
    />
  ) : null;
  const subGrid =
    props.subGrid || subGridContent
      ? slot.always(props.subGrid ?? undefined, {
          elementType: 'div',
          defaultProps: {
            children: subGridContent,
          },
        })
      : undefined;

  return {
    components: {
      root: 'div',
      content: 'div',
      dragHandle: 'div',
      resizeHandle: 'button',
      subGrid: 'div',
    },
    root,
    content: contentSlot,
    dragHandle,
    resizeHandle,
    subGrid,
    contextValue,
    resizeHandles,
    resizeDirections,
    arranging,
    portalReady,
    lazyVisible: lazy.visible,
    printMode,
    print: extendedProps.print ?? itemOptions.print ?? definition?.print,
    animated,
    handleVisibility: resizeOptions?.handleVisibility ?? 'coarse-pointer',
  } as DashboardGridItemInternalState;
};
