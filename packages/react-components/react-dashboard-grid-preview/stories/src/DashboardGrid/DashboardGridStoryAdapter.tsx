'use client';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DashboardGrid as DashboardGridComponent,
  DashboardGridProvider as DashboardGridProviderComponent,
} from '@fluentui/react-dashboard-grid-preview';
import type { EventHandler } from '@fluentui/react-utilities';

export type DashboardGridStoryCSSLength = number | `${number}${'px' | 'em' | 'rem' | 'vh' | 'vw' | '%' | 'cm' | 'mm'}`;

export type DashboardGridStoryRect = Readonly<{
  column: number;
  row: number;
  columnSpan: number;
  rowSpan: number;
}>;

export type DashboardGridStoryColumnLayout = 'list' | 'compact' | 'moveScale' | 'move' | 'scale' | 'none';

export type DashboardGridStoryResponsiveOptions = Readonly<{
  targetColumnWidth?: number;
  maxColumns?: number;
  breakpoints?: readonly Readonly<{
    maxWidth: number;
    columns: number;
    layout?: DashboardGridStoryColumnLayout;
  }>[];
  observe?: 'grid' | 'window';
  layout?: DashboardGridStoryColumnLayout;
}>;

export type DashboardGridStoryPrintOptions = Readonly<{
  hide?: boolean;
  pageBreakBefore?: boolean;
  orientation?: 'portrait' | 'landscape';
}>;

export type DashboardGridStoryOptions = Readonly<{
  columns?: number | 'auto';
  responsive?: DashboardGridStoryResponsiveOptions;
  rowHeight?: DashboardGridStoryCSSLength | 'auto' | 'initial';
  minRows?: number;
  float?: boolean;
  printMode?: 'flow' | 'exact';
}>;

export type DashboardGridStoryItemDefinition = Readonly<{
  id: string;
  label?: string;
  column?: number;
  row?: number;
  columnSpan?: number;
  rowSpan?: number;
  minColumnSpan?: number;
  maxColumnSpan?: number;
  minRowSpan?: number;
  maxRowSpan?: number;
  autoPosition?: boolean;
  movable?: boolean;
  resizable?: boolean;
  locked?: boolean;
  lazyMount?: boolean;
  sizeToContent?: boolean | number;
  sizeToContentSelector?: string;
  className?: string;
  data?: unknown;
  component?: string;
  props?: Readonly<Record<string, unknown>>;
  subGrid?: DashboardGridStoryDefinition;
  print?: DashboardGridStoryPrintOptions;
}>;

export type DashboardGridStoryDefinition = DashboardGridStoryOptions &
  Readonly<{
    items?: readonly DashboardGridStoryItemDefinition[];
  }>;

export type DashboardGridStoryResolvedItem = DashboardGridStoryRect &
  Readonly<{
    id: string;
    movable: boolean;
    resizable: boolean;
    locked: boolean;
  }>;

export type DashboardGridStoryComponentRegistry = Readonly<
  Record<string, React.ComponentType<Record<string, unknown>>>
>;

export type DashboardGridStoryEventData = Readonly<
  Record<string, unknown> & {
    type: string;
    event: Event | React.SyntheticEvent;
    gridId: string;
    input: 'pointer' | 'keyboard' | 'api' | 'load' | 'responsive' | 'content';
    kind?: 'drag' | 'resize' | 'move' | 'rotate' | 'transfer' | 'remove';
    itemId?: string;
    sourceGridId?: string;
    targetGridId?: string;
    previous?: DashboardGridStoryRect;
    current?: DashboardGridStoryRect;
    affectedItems: readonly DashboardGridStoryResolvedItem[];
    reason: string;
    rejectedReason?: string;
    items?: readonly DashboardGridStoryResolvedItem[];
    columns?: number;
    active?: boolean;
  }
>;

export type DashboardGridStoryEventReporter = (name: string, data: DashboardGridStoryEventData) => void;

export type DashboardGridStorySerializedGrid = Readonly<{
  version: 1;
  options: Readonly<Record<string, unknown>>;
  items: readonly DashboardGridStoryItemDefinition[];
  layouts?: Readonly<Record<number, readonly DashboardGridStoryItemDefinition[]>>;
}>;

export type DashboardGridStoryHandle = {
  addItem(item: DashboardGridStoryItemDefinition): void;
  removeItem(id: string, options?: Readonly<Record<string, unknown>>): void;
  load(
    items: readonly DashboardGridStoryItemDefinition[],
    options?: Readonly<{
      addMissing?: boolean;
      removeMissing?: boolean;
      sourceColumns?: number;
    }>,
  ): void;
  save(): DashboardGridStorySerializedGrid | readonly DashboardGridStoryItemDefinition[];
};

type DashboardGridStoryCallbacks = Readonly<{
  onEvent?: DashboardGridStoryEventReporter;
  onItemsChange?: EventHandler<DashboardGridStoryEventData>;
  onItemAdd?: EventHandler<DashboardGridStoryEventData>;
  onItemRemove?: EventHandler<DashboardGridStoryEventData>;
  onItemDrop?: EventHandler<DashboardGridStoryEventData>;
  onDragStart?: EventHandler<DashboardGridStoryEventData>;
  onDrag?: EventHandler<DashboardGridStoryEventData>;
  onDragEnd?: EventHandler<DashboardGridStoryEventData>;
  onResizeStart?: EventHandler<DashboardGridStoryEventData>;
  onResize?: EventHandler<DashboardGridStoryEventData>;
  onResizeEnd?: EventHandler<DashboardGridStoryEventData>;
  onContentResize?: EventHandler<DashboardGridStoryEventData>;
  onEnabledChange?: EventHandler<DashboardGridStoryEventData>;
  onError?: EventHandler<DashboardGridStoryEventData>;
}>;

export type DashboardGridStoryProps = DashboardGridStoryOptions &
  DashboardGridStoryCallbacks &
  Readonly<{
    gridId: string;
    items: readonly DashboardGridStoryItemDefinition[];
    imperativeRef?: React.Ref<DashboardGridStoryHandle>;
    renderItem?: (item: DashboardGridStoryItemDefinition) => React.ReactNode;
    components?: DashboardGridStoryComponentRegistry;
    renderUnknownComponent?: (item: DashboardGridStoryItemDefinition, component: string) => React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    'aria-label': string;
    'data-testid': string;
  }>;

type InterimDashboardGridHandle = {
  addItem(item: InterimDashboardGridItemDefinition): unknown;
  removeItem(id: string): unknown;
  save(): unknown;
  load(
    state: unknown,
    options?: Readonly<{
      addMissing?: boolean;
      removeMissing?: boolean;
      sourceColumns?: number;
    }>,
  ): unknown;
};

type InterimDashboardGridEventData = Readonly<
  Record<string, unknown> & {
    type: string;
    event: Event | React.SyntheticEvent;
  }
>;

type InterimDashboardGridProps = Readonly<{
  gridId: string;
  defaultItems: readonly InterimDashboardGridItemDefinition[];
  columns?: number | 'auto';
  responsive?: DashboardGridStoryResponsiveOptions;
  rowHeight?: number;
  minRows?: number;
  float?: boolean;
  printMode?: 'flow' | 'exact';
  imperativeRef?: React.Ref<InterimDashboardGridHandle>;
  renderItem: (item: unknown) => React.ReactNode;
  onLayoutChange?: EventHandler<InterimDashboardGridEventData>;
  onColumnsChange?: EventHandler<InterimDashboardGridEventData>;
  onArrangeModeChange?: EventHandler<InterimDashboardGridEventData>;
  onItemAdd?: EventHandler<InterimDashboardGridEventData>;
  onItemRemove?: EventHandler<InterimDashboardGridEventData>;
  onDragStart?: EventHandler<InterimDashboardGridEventData>;
  onDragEnd?: EventHandler<InterimDashboardGridEventData>;
  onResizeStart?: EventHandler<InterimDashboardGridEventData>;
  onResizeEnd?: EventHandler<InterimDashboardGridEventData>;
  onTransfer?: EventHandler<InterimDashboardGridEventData>;
  onResizeContent?: EventHandler<InterimDashboardGridEventData>;
  onCancel?: EventHandler<InterimDashboardGridEventData>;
  onError?: EventHandler<InterimDashboardGridEventData>;
  className?: string;
  style?: React.CSSProperties;
  'aria-label': string;
  'data-testid': string;
}>;

type InterimDashboardGridItemDefinition = Omit<
  DashboardGridStoryItemDefinition,
  'print' | 'subGrid' | 'sizeToContentSelector' | 'className'
> &
  Readonly<{
    print?: Readonly<{
      hide?: boolean;
      pageBreak?: boolean;
      orientation?: 'portrait' | 'landscape';
    }>;
  }>;

type DashboardGridStoryProviderProps = Readonly<{
  children: React.ReactNode;
  onError?: EventHandler<InterimDashboardGridEventData>;
}>;

const InterimDashboardGrid = DashboardGridComponent as unknown as (props: InterimDashboardGridProps) => JSXElement;

const ProposedDashboardGridProvider = DashboardGridProviderComponent as unknown as (
  props: DashboardGridStoryProviderProps,
) => JSXElement;

const toResolvedItem = (value: unknown): DashboardGridStoryResolvedItem => {
  const candidate =
    typeof value === 'object' && value !== null ? (value as Partial<DashboardGridStoryResolvedItem>) : {};

  return {
    id: typeof candidate.id === 'string' ? candidate.id : String(value),
    column: candidate.column ?? 0,
    row: candidate.row ?? 0,
    columnSpan: candidate.columnSpan ?? 1,
    rowSpan: candidate.rowSpan ?? 1,
    movable: candidate.movable ?? true,
    resizable: candidate.resizable ?? true,
    locked: candidate.locked ?? false,
  };
};

const toInterimDefinition = (item: DashboardGridStoryItemDefinition): InterimDashboardGridItemDefinition => {
  const definition = { ...item };
  const print = definition.print;
  delete definition.subGrid;
  delete definition.sizeToContentSelector;
  delete definition.className;
  delete definition.print;

  return {
    ...definition,
    print: print
      ? {
          hide: print.hide,
          pageBreak: print.pageBreakBefore,
          orientation: print.orientation,
        }
      : undefined,
  };
};

const fromInterimDefinition = (
  value: unknown,
  definitions: ReadonlyMap<string, DashboardGridStoryItemDefinition>,
): DashboardGridStoryItemDefinition => {
  const candidate =
    typeof value === 'object' && value !== null
      ? ({ ...(value as Record<string, unknown>) } as Record<string, unknown>)
      : {};
  const id = typeof candidate.id === 'string' ? candidate.id : String(value);
  const interimPrint =
    typeof candidate.print === 'object' && candidate.print !== null
      ? (candidate.print as Record<string, unknown>)
      : undefined;
  delete candidate.print;
  delete candidate.nestedGrid;

  return {
    ...definitions.get(id),
    ...(candidate as unknown as DashboardGridStoryItemDefinition),
    id,
    print: interimPrint
      ? {
          hide: typeof interimPrint.hide === 'boolean' ? interimPrint.hide : undefined,
          pageBreakBefore: typeof interimPrint.pageBreak === 'boolean' ? interimPrint.pageBreak : undefined,
          orientation:
            interimPrint.orientation === 'portrait' || interimPrint.orientation === 'landscape'
              ? interimPrint.orientation
              : undefined,
        }
      : definitions.get(id)?.print,
  };
};

const toArchitectureSave = (
  saved: unknown,
  definitions: ReadonlyMap<string, DashboardGridStoryItemDefinition>,
): DashboardGridStorySerializedGrid | readonly DashboardGridStoryItemDefinition[] => {
  if (Array.isArray(saved)) {
    return saved.map(item => fromInterimDefinition(item, definitions));
  }

  if (typeof saved !== 'object' || saved === null) {
    return [...definitions.values()];
  }

  const candidate = saved as Record<string, unknown>;
  const engine =
    typeof candidate.engine === 'object' && candidate.engine !== null
      ? (candidate.engine as Record<string, unknown>)
      : {};
  const items = Array.isArray(candidate.items)
    ? candidate.items.map(item => fromInterimDefinition(item, definitions))
    : [...definitions.values()];
  const rawLayouts =
    typeof engine.layouts === 'object' && engine.layouts !== null
      ? (engine.layouts as Record<string, unknown>)
      : undefined;
  const layouts = rawLayouts
    ? (Object.fromEntries(
        Object.entries(rawLayouts)
          .filter((entry): entry is [string, readonly unknown[]] => Array.isArray(entry[1]))
          .map(([columns, layout]) => [Number(columns), layout.map(item => fromInterimDefinition(item, definitions))]),
      ) as Record<number, readonly DashboardGridStoryItemDefinition[]>)
    : undefined;

  return {
    version: 1,
    options: {
      columns: engine.columns,
      maxRows: engine.maxRows,
      float: engine.float,
    },
    items,
    layouts,
  };
};

const eventDefaults = (name: string): Pick<DashboardGridStoryEventData, 'input' | 'kind' | 'reason'> => {
  switch (name) {
    case 'columns-change':
      return { input: 'responsive', reason: 'responsive' };
    case 'arrange-mode-change':
      return { input: 'keyboard', reason: 'interaction' };
    case 'drag-start':
    case 'drag':
    case 'drag-end':
      return { input: 'pointer', kind: 'drag', reason: 'interaction' };
    case 'resize-start':
    case 'resize':
    case 'resize-end':
      return { input: 'pointer', kind: 'resize', reason: 'interaction' };
    case 'item-remove':
      return { input: 'api', kind: 'remove', reason: 'remove' };
    case 'item-add':
      return { input: 'api', reason: 'add' };
    case 'item-drop':
      return { input: 'pointer', kind: 'transfer', reason: 'drop' };
    case 'content-resize':
      return { input: 'content', kind: 'resize', reason: 'content' };
    case 'error':
      return { input: 'api', reason: 'error' };
    case 'cancel':
      return { input: 'keyboard', reason: 'cancel' };
    default:
      return { input: 'api', reason: 'layout' };
  }
};

const normalizeEventData = (
  name: string,
  gridId: string,
  event: Event | React.SyntheticEvent,
  data: Record<string, unknown> = {},
): DashboardGridStoryEventData => {
  const defaults = eventDefaults(name);
  const items = Array.isArray(data.items) ? (data.items as readonly DashboardGridStoryResolvedItem[]) : [];
  const affectedItems = Array.isArray(data.affectedItems)
    ? (data.affectedItems as readonly DashboardGridStoryResolvedItem[])
    : items;

  return {
    ...data,
    type: typeof data.type === 'string' ? data.type : name,
    event:
      data.event instanceof Event || (typeof data.event === 'object' && data.event !== null)
        ? (data.event as Event | React.SyntheticEvent)
        : event,
    gridId: typeof data.gridId === 'string' ? data.gridId : gridId,
    input:
      data.input === 'pointer' ||
      data.input === 'keyboard' ||
      data.input === 'api' ||
      data.input === 'load' ||
      data.input === 'responsive' ||
      data.input === 'content'
        ? data.input
        : defaults.input,
    kind:
      data.kind === 'drag' ||
      data.kind === 'resize' ||
      data.kind === 'move' ||
      data.kind === 'rotate' ||
      data.kind === 'transfer' ||
      data.kind === 'remove'
        ? data.kind
        : defaults.kind,
    affectedItems,
    reason: typeof data.reason === 'string' ? data.reason : defaults.reason,
    rejectedReason:
      typeof data.rejectedReason === 'string'
        ? data.rejectedReason
        : typeof data.rejectionReason === 'string'
        ? data.rejectionReason
        : undefined,
    items,
  };
};

/**
 * Adapts the architecture-approved API to the concurrently landing preview
 * implementation. Integration changes remain confined to this file.
 */
export const DashboardGridStory = (props: DashboardGridStoryProps): JSXElement => {
  const {
    items,
    components,
    renderItem,
    renderUnknownComponent,
    imperativeRef,
    onEvent,
    onItemsChange,
    onItemAdd,
    onItemRemove,
    onItemDrop,
    onDragStart,
    onDrag,
    onDragEnd,
    onResizeStart,
    onResize,
    onResizeEnd,
    onContentResize,
    onEnabledChange,
    onError,
    rowHeight,
    ...gridProps
  } = props;
  React.useDebugValue({
    dragProgress: !!onDrag,
    resizeProgress: !!onResize,
    enabledChange: !!onEnabledChange,
  });
  const interimHandleRef = React.useRef<InterimDashboardGridHandle>(null);
  const interimItems = React.useMemo(() => items.map(toInterimDefinition), [items]);
  const definitions = React.useMemo(() => new Map(items.map(item => [item.id, item] as const)), [items]);
  const definitionsRef = React.useRef(definitions);

  React.useEffect(() => {
    definitionsRef.current = definitions;
  }, [definitions]);

  const resolveDefinition = React.useCallback(
    (value: unknown): DashboardGridStoryItemDefinition => {
      const resolved = toResolvedItem(value);
      const current = definitions.get(resolved.id) ?? definitionsRef.current.get(resolved.id);
      return {
        ...current,
        ...resolved,
        id: resolved.id,
      };
    },
    [definitions],
  );

  const renderDefinition = React.useCallback(
    (value: unknown): React.ReactNode => {
      const definition = resolveDefinition(value);
      if (renderItem) {
        return renderItem(definition);
      }

      if (definition.component) {
        const Component = components?.[definition.component];
        if (Component) {
          return <Component {...(definition.props ?? {})} />;
        }
        return renderUnknownComponent?.(definition, definition.component);
      }

      return null;
    },
    [components, renderItem, renderUnknownComponent, resolveDefinition],
  );

  React.useImperativeHandle(
    imperativeRef,
    () => ({
      addItem(item) {
        definitionsRef.current.set(item.id, item);
        interimHandleRef.current?.addItem(toInterimDefinition(item));
      },
      removeItem(id) {
        definitionsRef.current.delete(id);
        interimHandleRef.current?.removeItem(id);
      },
      load(nextItems, options) {
        definitionsRef.current = new Map(nextItems.map(item => [item.id, item] as const));
        interimHandleRef.current?.load(nextItems.map(toInterimDefinition), options);
      },
      save() {
        const saved = interimHandleRef.current?.save();
        return toArchitectureSave(saved, definitionsRef.current);
      },
    }),
    [],
  );

  const emit = React.useCallback(
    (
        name: string,
        callback?: EventHandler<DashboardGridStoryEventData>,
      ): EventHandler<InterimDashboardGridEventData> =>
      (event, data) => {
        const normalized = normalizeEventData(name, props.gridId, event, data);
        callback?.(event, normalized);
        onEvent?.(name, normalized);
      },
    [onEvent, props.gridId],
  );

  const emitError = React.useCallback<EventHandler<InterimDashboardGridEventData>>(
    (event, data): void => {
      const error = data.error;
      const normalized = normalizeEventData('error', props.gridId, event, {
        ...data,
        error,
        rejectedReason: error instanceof Error ? error.message : String(error),
      });
      onError?.(event, normalized);
      onEvent?.('error', normalized);
    },
    [onError, onEvent, props.gridId],
  );

  return (
    <InterimDashboardGrid
      {...gridProps}
      defaultItems={interimItems}
      rowHeight={typeof rowHeight === 'number' ? rowHeight : undefined}
      imperativeRef={interimHandleRef}
      renderItem={renderDefinition}
      onLayoutChange={emit('items-change', onItemsChange)}
      onColumnsChange={emit('columns-change')}
      onArrangeModeChange={emit('arrange-mode-change')}
      onItemAdd={emit('item-add', onItemAdd)}
      onItemRemove={emit('item-remove', onItemRemove)}
      onDragStart={emit('drag-start', onDragStart)}
      onDragEnd={emit('drag-end', onDragEnd)}
      onResizeStart={emit('resize-start', onResizeStart)}
      onResizeEnd={emit('resize-end', onResizeEnd)}
      onTransfer={emit('item-drop', onItemDrop)}
      onResizeContent={emit('content-resize', onContentResize)}
      onCancel={emit('cancel')}
      onError={emitError}
    />
  );
};

export const DashboardGridStoryProvider = (props: DashboardGridStoryProviderProps): JSXElement => (
  <ProposedDashboardGridProvider {...props} />
);
