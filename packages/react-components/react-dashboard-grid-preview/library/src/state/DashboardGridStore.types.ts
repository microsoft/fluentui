import type * as React from 'react';
import type {
  DashboardGridColumnLayout,
  DashboardGridBatchOptions,
  DashboardGridEngine,
  DashboardGridEngineChangeSet,
  DashboardGridEngineDiagnostic,
  DashboardGridEngineError,
  DashboardGridEngineOptions,
  DashboardGridEngineSerializedState,
  DashboardGridEngineSnapshot,
  DashboardGridInteractionContext,
  DashboardGridLayoutItemInput,
  DashboardGridLayoutItemPatch,
  DashboardGridLoadOptions,
  DashboardGridMoveProposal,
  DashboardGridMoveResult,
  DashboardGridMutationResult,
  DashboardGridResolvedItem,
} from '../engine';
import type {
  DashboardGridInteractionIntent,
  DashboardGridInteractionPreview,
  DashboardGridInteractionStore,
} from '../interaction/types';
import type { DashboardGridEventQueue } from './eventQueue';

/** A numeric pixel value or a supported CSS length string. */
export type DashboardGridCSSLength = number | `${number}${'px' | 'em' | 'rem' | 'vh' | 'vw' | '%' | 'cm' | 'mm'}`;

/** Measures rendered content for size-to-content layout. */
export type DashboardGridContentMeasure = (element: HTMLElement) => number | undefined;

/** A resize edge exposed by DashboardGrid resize handles. */
export type DashboardGridResizeDirection = 'n' | 'e' | 's' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

/** Per-item print behavior. */
export type DashboardGridPrintOptions = {
  /** Excludes the item from printed output. */
  hide?: boolean;
  /** Starts the item on a new page in exact print mode. */
  pageBreakBefore?: boolean;
  /** Requests a page orientation in exact print mode. */
  orientation?: 'portrait' | 'landscape';
};

/** @deprecated Use {@link DashboardGridPrintOptions}. */
export type DashboardGridItemPrintOptions = DashboardGridPrintOptions & {
  /** @deprecated Use `pageBreakBefore`. */
  pageBreak?: boolean;
};

/** Responsive column selection and relayout options. */
export type DashboardGridResponsiveOptions = {
  /** Desired pixel width of one column when deriving a responsive column count. */
  targetColumnWidth?: number;
  /** Maximum responsive column count. */
  maxColumns?: number;
  /** Explicit width-to-column breakpoints. */
  breakpoints?: readonly {
    maxWidth: number;
    columns: number;
    layout?: DashboardGridColumnLayout;
  }[];
  /** Chooses whether responsive width observes the grid or its window. */
  observe?: 'grid' | 'window';
  /** Default relayout strategy when columns change. */
  layout?: DashboardGridColumnLayout;
};

/** Pointer-drag configuration. */
export type DashboardGridDragOptions = {
  /** Selector for a drag handle inside each item. */
  handleSelector?: string;
  /** Selector that prevents a drag from starting. */
  cancelSelector?: string;
  /** Visual preview rendered during a drag. */
  preview?: 'item' | 'clone' | React.ReactNode | ((item: DashboardGridResolvedItem) => React.ReactNode);
  /** Portal target for drag preview content. */
  portal?: 'body' | 'parent' | HTMLElement;
  /** Enables functional autoscroll. */
  scroll?: boolean;
  /** Delays collision activation. */
  pause?: boolean | number;
};

/** Resize handle configuration. */
export type DashboardGridResizeOptions = {
  /** Enabled resize directions. */
  handles?: DashboardGridResizeDirection | readonly DashboardGridResizeDirection[] | 'all';
  /** Resize-handle visibility policy. */
  handleVisibility?: 'hover' | 'always' | 'coarse-pointer';
};

/** Collision activation thresholds. */
export type DashboardGridCollisionOptions = {
  /** Directional collision activation ratio. */
  dragActivationRatio?: number;
  /** Dynamic nesting activation ratio. */
  nestingActivationRatio?: number;
};

/** Removal-zone acceptance options. */
export type DashboardGridRemovalOptions = {
  /** Item acceptance predicate or selector. */
  accept?: string | ((item: DashboardGridResolvedItem) => boolean);
  /** Item rejection predicate or selector. */
  decline?: string | ((item: DashboardGridResolvedItem) => boolean);
};

/** Context supplied to external-item acceptance predicates. */
export type DashboardGridAcceptContext = {
  sourceGridId?: string;
  targetGridId: string;
};

/** Predicate used to accept an externally supplied item. */
export type DashboardGridAcceptPredicate = (
  item: DashboardGridItemDefinition,
  context: DashboardGridAcceptContext,
) => boolean;

/** Factory for injecting a custom public layout engine. */
export type DashboardGridEngineFactory = (options?: DashboardGridEngineOptions) => DashboardGridEngine;

/** Grid options shared by root grids and nested definitions. */
export type DashboardGridOptions = {
  /** Column count. `auto` derives nested columns from the parent span. */
  columns?: number | 'auto';
  /** Responsive column behavior. */
  responsive?: DashboardGridResponsiveOptions;
  /** Row pitch. `auto` tracks column width and `initial` resolves it once. */
  rowHeight?: DashboardGridCSSLength | 'auto' | 'initial';
  /** Delayed resize-observer gate in milliseconds. */
  rowHeightThrottle?: number;
  /** Grid gap, supporting CSS shorthand strings. */
  gap?: DashboardGridCSSLength | string;
  /** Minimum rendered row count. */
  minRows?: number;
  /** Maximum layout row count. */
  maxRows?: number;
  /** Fixed rendered and maximum row count. */
  fixedRows?: number;
  /** Enables floating layouts without top gravity. */
  float?: boolean;
  /** Enables layout transition styling. */
  animate?: boolean;
  /** Logical grid direction. */
  direction?: 'ltr' | 'rtl' | 'auto';
  /** Disables all user movement and resizing. */
  static?: boolean;
  /** Disables user drag operations. */
  disableDrag?: boolean;
  /** Disables user resize operations. */
  disableResize?: boolean;
  /** Lazily mounts item content. */
  lazyMount?: boolean;
  /** Enables item content-driven row sizing. */
  sizeToContent?: boolean;
  /** Default custom size-to-content measurement for this grid. */
  measureSizeToContent?: DashboardGridContentMeasure;
  /** Screen-to-print layout projection. */
  printMode?: 'flow' | 'exact';
  /** Collision activation configuration. */
  collision?: DashboardGridCollisionOptions;
  /** Default explicit compaction strategy. */
  compactMode?: 'compact' | 'list';
  /** Pointer-drag behavior. */
  drag?: DashboardGridDragOptions;
  /** Resize-handle behavior. */
  resize?: DashboardGridResizeOptions;
  /** External-item acceptance. */
  acceptExternal?: boolean | string | DashboardGridAcceptPredicate;
  /** Enables removal or identifies a removal zone. */
  removable?: boolean | string;
  /** Removal-zone acceptance behavior. */
  removal?: DashboardGridRemovalOptions;
  /** Defaults inherited by dynamically created child grids. */
  subGridDefaults?: DashboardGridOptions;
  /** Enables overlap-driven child-grid creation. */
  dynamicNesting?: boolean;
  /** Injected engine instance or factory. */
  layoutEngine?: DashboardGridEngine | DashboardGridEngineFactory;
};

/** Serializable or renderable definition of one dashboard item. */
export type DashboardGridItemDefinition<TData = unknown> = DashboardGridLayoutItemInput & {
  /** Accessible item name. */
  label?: string;
  /** React-owned content used when no renderer or component key is supplied. */
  content?: React.ReactNode;
  /** Registered component key. */
  component?: string;
  /** Props passed to a registered component. */
  props?: Readonly<Record<string, unknown>>;
  /** Caller-owned item data. */
  data?: TData;
  /** Additional class applied by caller rendering. */
  className?: string;
  /** Lazily mounts this item's content. */
  lazyMount?: boolean;
  /** Automatically derives this item's row span from content. */
  sizeToContent?: boolean | number;
  /** Selector for the element measured by size-to-content. */
  sizeToContentSelector?: string;
  /** Item-specific custom size-to-content measurement. */
  measureSizeToContent?: DashboardGridContentMeasure;
  /** Nested grid definition. */
  subGrid?: DashboardGridDefinition<TData>;
  /** Per-item print behavior. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Compatibility print options accept the legacy page-break field.
  print?: DashboardGridItemPrintOptions;
  /** @deprecated Use `subGrid`. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Compatibility nested-grid field retains the serialized-state alias.
  nestedGrid?: DashboardGridSerializedState;
};

/** Nested or root grid definition. */
export type DashboardGridDefinition<TData = unknown> = DashboardGridOptions & {
  /** Items owned by this definition. */
  items?: readonly DashboardGridItemDefinition<TData>[];
};

/** Component registry used by model-mode rendering. */
export type DashboardGridComponentRegistry = Record<string, React.ComponentType<Record<string, unknown>>>;

/** Model-mode item renderer. */
export type DashboardGridRenderItem = (item: DashboardGridItemDefinition) => React.ReactNode;

/** Fallback renderer for an unknown component key. */
export type DashboardGridRenderUnknownComponent = (
  item: DashboardGridItemDefinition,
  component: string,
) => React.ReactNode;

/** Additional mutation behavior used by imperative add/update operations. */
export type DashboardGridMutationOptions = {
  /** Suppresses public callbacks for the mutation. */
  silent?: boolean;
};

/** Removal behavior used by imperative remove operations. */
export type DashboardGridRemoveOptions = DashboardGridMutationOptions & {
  /** Removes nested descendants recursively. */
  recursive?: boolean;
};

/** Save behavior used by the imperative handle. */
export type DashboardGridSaveOptions = {
  /** Returns only the item array rather than the versioned grid envelope. */
  itemsOnly?: boolean;
  /** Saves against a requested responsive column cache. */
  columns?: number;
  /** Includes responsive layout caches. */
  includeLayouts?: boolean;
  /** Includes caller-owned application data. Defaults to true. */
  includeData?: boolean;
  /** Includes React-owned item content. Defaults to false. */
  includeContent?: boolean;
};

/** Serializable pointer-drag options retained with a saved grid. */
export type DashboardGridSerializableDragOptions = Pick<
  DashboardGridDragOptions,
  'handleSelector' | 'cancelSelector' | 'scroll' | 'pause'
> & {
  preview?: 'item' | 'clone';
  portal?: Extract<DashboardGridDragOptions['portal'], 'body' | 'parent'>;
};

/** Serializable removal-zone options retained with a saved grid. */
export type DashboardGridSerializableRemovalOptions = {
  accept?: Extract<DashboardGridRemovalOptions['accept'], string>;
  decline?: Extract<DashboardGridRemovalOptions['decline'], string>;
};

/** Serializable options retained with a saved grid. */
export type DashboardGridSerializableOptions = Pick<
  DashboardGridOptions,
  | 'columns'
  | 'responsive'
  | 'rowHeight'
  | 'rowHeightThrottle'
  | 'gap'
  | 'minRows'
  | 'maxRows'
  | 'fixedRows'
  | 'float'
  | 'animate'
  | 'direction'
  | 'static'
  | 'disableDrag'
  | 'disableResize'
  | 'lazyMount'
  | 'sizeToContent'
  | 'printMode'
  | 'collision'
  | 'compactMode'
  | 'resize'
  | 'removable'
  | 'dynamicNesting'
> & {
  drag?: DashboardGridSerializableDragOptions;
  acceptExternal?: boolean | string;
  removal?: DashboardGridSerializableRemovalOptions;
  subGridDefaults?: DashboardGridSerializableOptions;
};

/** Versioned serialized item. */
export type DashboardGridSerializedItem<TData = unknown> = Omit<
  DashboardGridItemDefinition<TData>,
  'content' | 'nestedGrid' | 'subGrid'
> & {
  /** Included item content when explicitly requested during save. */
  content?: React.ReactNode;
  /** Serialized nested grid. */
  subGrid?: DashboardGridSerializedGrid<TData>;
};

/** Versioned serialized grid envelope. */
export type DashboardGridSerializedGrid<TData = unknown> = {
  version: 1;
  options: DashboardGridSerializableOptions;
  items: readonly DashboardGridSerializedItem<TData>[];
  layouts?: Readonly<Record<number, readonly DashboardGridSerializedItem<TData>[]>>;
};

/** @deprecated Use {@link DashboardGridSerializedGrid}. */
export type DashboardGridSerializedState = DashboardGridSerializedGrid & {
  /** Legacy engine envelope accepted during preview migration. */
  engine?: DashboardGridEngineSerializedState;
};

export type DashboardGridRuntimeItemState = {
  lazyVisible: boolean;
  mounted: boolean;
  measuredRowSpan?: number;
};

export type DashboardGridItemStoreSnapshot = {
  item?: DashboardGridResolvedItem;
  definition?: DashboardGridItemDefinition;
  runtime: DashboardGridRuntimeItemState;
  preview?: DashboardGridInteractionPreview;
};

export type DashboardGridStoreSnapshot = {
  revision: number;
  engine: DashboardGridEngineSnapshot;
  preview?: DashboardGridInteractionPreview;
  itemIds: readonly string[];
};

export type DashboardGridStoreCallbacks = {
  onDiagnostic?: (diagnostic: DashboardGridEngineDiagnostic) => void;
  onError?: (error: DashboardGridEngineError) => void;
  onIntent?: (intent: DashboardGridInteractionIntent) => void;
  onLayoutChange?: (changeSet: DashboardGridEngineChangeSet, nativeEvent?: Event) => void;
  onItemsChange?: (
    items: readonly DashboardGridItemDefinition[],
    changeSet: DashboardGridEngineChangeSet,
    nativeEvent?: Event,
  ) => void;
};

export type DashboardGridStoreOptions = Omit<DashboardGridEngineOptions, 'items' | 'onDiagnostic' | 'onError'> & {
  id: string;
  serializedOptions?: DashboardGridSerializableOptions;
  defaultItems?: readonly DashboardGridItemDefinition[];
  items?: readonly DashboardGridItemDefinition[];
  engine?: DashboardGridEngine;
  callbacks?: DashboardGridStoreCallbacks;
};

export type DashboardGridStore = DashboardGridInteractionStore & {
  readonly id: string;
  readonly engine: DashboardGridEngine;
  readonly events: DashboardGridEventQueue;

  getStoreSnapshot(): DashboardGridStoreSnapshot;
  getServerSnapshot(): DashboardGridStoreSnapshot;
  subscribe(listener: () => void): () => void;
  subscribeItem(id: string, listener: () => void): () => void;
  getItemSnapshot(id: string): DashboardGridItemStoreSnapshot;
  getDefinition(id: string): DashboardGridItemDefinition | undefined;
  getDefinitions(): readonly DashboardGridItemDefinition[];
  isControlled(): boolean;

  setCallbacks(callbacks: DashboardGridStoreCallbacks | undefined): void;
  setSerializableOptions(options: DashboardGridSerializableOptions, replace?: boolean): void;
  setControlledItems(
    items: readonly DashboardGridItemDefinition[] | undefined,
  ): DashboardGridMutationResult | undefined;
  requestControlledReconciliation(): void;
  registerDeclarativeItem(item: DashboardGridItemDefinition): () => void;
  setItemOwner(id: string, gridId: string): void;
  takeDefinition(id: string): DashboardGridItemDefinition | undefined;
  receiveDefinition(item: DashboardGridItemDefinition): void;
  updateDefinition(
    id: string,
    patch: Partial<Omit<DashboardGridItemDefinition, 'id'>>,
  ): DashboardGridItemDefinition | undefined;

  setRuntimeItemState(id: string, patch: Partial<DashboardGridRuntimeItemState>): void;
  setColumns(columns: number, layout?: DashboardGridColumnLayout): DashboardGridMutationResult;
  add(item: DashboardGridItemDefinition): DashboardGridMutationResult;
  remove(id: string): DashboardGridMutationResult;
  removeAll(): DashboardGridMutationResult;
  update(id: string, patch: DashboardGridLayoutItemPatch): DashboardGridMutationResult;
  compact(mode?: 'compact' | 'list'): DashboardGridMutationResult;
  batch<T>(operation: () => T, options?: DashboardGridBatchOptions): T;
  rotateItem(id: string, pivot?: Readonly<{ column: number; row: number }>): DashboardGridMoveResult;
  load(items: readonly DashboardGridItemDefinition[], options?: DashboardGridLoadOptions): DashboardGridMutationResult;
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Save retains the legacy engine envelope during preview migration.
  save(options?: DashboardGridSaveOptions): DashboardGridSerializedState;
  dispose(): void;
};

export const dashboardGridDefaultRuntimeItemState: DashboardGridRuntimeItemState = {
  lazyVisible: true,
  mounted: false,
};

export const toDashboardGridEngineItem = (item: DashboardGridItemDefinition): DashboardGridLayoutItemInput => ({
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
});

export type DashboardGridStoreEngineCommands = {
  beginInteraction(id: string, context: DashboardGridInteractionContext): void;
  move(id: string, proposal: DashboardGridMoveProposal): DashboardGridMoveResult;
};
