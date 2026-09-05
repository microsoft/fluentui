import type {
  DashboardGridEngine,
  DashboardGridEngineChangeSet,
  DashboardGridLayoutItemInput,
  DashboardGridLoadOptions,
  DashboardGridResolvedItem,
} from '../engine';

export type GridStackNumberOrString = number | string;

export type GridStackColumnLayout =
  | 'list'
  | 'compact'
  | 'moveScale'
  | 'move'
  | 'scale'
  | 'none'
  | ((column: number, previousColumn: number, nodes: GridStackWidget[], previousNodes: GridStackWidget[]) => void);

export type GridStackCompactMode = 'list' | 'compact';

export interface GridStackPrintOptions {
  hide?: boolean;
  pageBreak?: boolean;
  orientation?: 'portrait' | 'landscape';
}

export interface GridStackBreakpoint {
  w?: number;
  c: number;
  layout?: GridStackColumnLayout;
}

export interface GridStackResponsiveOptions {
  columnWidth?: number;
  columnMax?: number;
  breakpoints?: GridStackBreakpoint[];
  breakpointForWindow?: boolean;
  layout?: GridStackColumnLayout;
}

export interface GridStackDragOptions {
  handle?: string;
  appendTo?: string;
  pause?: boolean | number;
  scroll?: boolean;
  cancel?: string;
  helper?: 'clone' | ((element: HTMLElement) => HTMLElement);
  start?: (event: Event, ui: GridStackDragUIData) => void;
  stop?: (event: Event) => void;
  drag?: (event: Event, ui: GridStackDragUIData) => void;
  rtl?: boolean;
}

export interface GridStackResizeOptions {
  autoHide?: boolean;
  handles?: string;
  element?: string | HTMLElement;
}

export interface GridStackRemoveOptions {
  accept?: string;
  decline?: string;
}

export interface GridStackDragUIData {
  position?: Readonly<{ top: number; left: number }>;
  size?: Readonly<{ width: number; height: number }>;
  draggable?: HTMLElement;
}

export type GridStackElement = string | Element;

export type GridStackSelectorRoot = Document | ShadowRoot | HTMLElement;

export type GridStackPosition = Readonly<{
  top: number;
  left: number;
}>;

export interface GridStackWidget {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  autoPosition?: boolean;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  noResize?: boolean;
  noMove?: boolean;
  locked?: boolean;
  id?: string;
  /** Compatibility content is treated as text. This adapter never injects it as HTML. */
  content?: string;
  print?: GridStackPrintOptions;
  lazyLoad?: boolean;
  sizeToContent?: boolean | number;
  resizeToContentParent?: string;
  resizeHandles?: string;
  subGridOpts?: GridStackOptions;
  component?: string;
  props?: Record<string, unknown>;
  class?: string;
  data?: unknown;
  [key: string]: unknown;
}

export interface GridStackOptions {
  acceptWidgets?: boolean | string | ((element: Element) => boolean);
  alwaysShowResizeHandle?: true | false | 'mobile';
  animate?: boolean;
  auto?: boolean;
  cellHeight?: GridStackNumberOrString;
  cellHeightThrottle?: number;
  cellHeightUnit?: string;
  children?: GridStackWidget[];
  column?: number | 'auto';
  columnOpts?: GridStackResponsiveOptions;
  class?: string;
  disableDrag?: boolean;
  disableResize?: boolean;
  draggable?: GridStackDragOptions;
  engineClass?: unknown;
  float?: boolean;
  handle?: string;
  handleClass?: string;
  itemClass?: string;
  layout?: GridStackColumnLayout;
  lazyLoad?: boolean;
  margin?: GridStackNumberOrString;
  marginTop?: GridStackNumberOrString;
  marginRight?: GridStackNumberOrString;
  marginBottom?: GridStackNumberOrString;
  marginLeft?: GridStackNumberOrString;
  marginUnit?: string;
  maxRow?: number;
  minRow?: number;
  /** @deprecated Accepted as migration metadata only; the compatibility lane does not create styles. */
  nonce?: string;
  placeholderClass?: string;
  placeholderText?: string;
  resizable?: GridStackResizeOptions;
  removable?: boolean | string;
  removableOptions?: GridStackRemoveOptions;
  row?: number;
  printMode?: 'flow' | 'exact';
  rtl?: boolean | 'auto';
  sizeToContent?: boolean;
  staticGrid?: boolean;
  /** @deprecated GridStack-compatible styles are not generated dynamically. */
  styleInHead?: boolean;
  subGridOpts?: GridStackOptions;
  subGridDynamic?: boolean;
  [key: string]: unknown;
}

export type DashboardGridCompatibilityGap =
  | GridStackNumberOrString
  | Readonly<{
      top?: GridStackNumberOrString;
      right?: GridStackNumberOrString;
      bottom?: GridStackNumberOrString;
      left?: GridStackNumberOrString;
    }>;

export interface DashboardGridCompatibilityResponsiveOptions {
  columnWidth?: number;
  maxColumns?: number;
  breakpoints?: readonly Readonly<{
    maxWidth?: number;
    columns: number;
    layout?: GridStackColumnLayout;
  }>[];
  useViewportWidth?: boolean;
  layout?: GridStackColumnLayout;
}

export interface DashboardGridCompatibilityDragOptions {
  handleSelector?: string;
  appendTo?: string;
  pause?: boolean | number;
  scroll?: boolean;
  cancel?: string;
  helper?: GridStackDragOptions['helper'];
  callbacks?: Pick<GridStackDragOptions, 'start' | 'stop' | 'drag'>;
}

export interface DashboardGridCompatibilityResizeOptions {
  handleVisibility?: 'hover' | 'always' | 'coarse-pointer';
  handles?: string;
  element?: string | HTMLElement;
}

export interface DashboardGridCompatibilityPlaceholderOptions {
  className?: string;
  text?: string;
}

export interface DashboardGridCompatibilityMetadata {
  autoImportDom?: boolean;
  cellHeightUnit?: string;
  engineClass?: unknown;
  handleClass?: string;
  itemClass?: string;
  marginUnit?: string;
  /** @deprecated Accepted as migration metadata only; the compatibility lane does not create styles. */
  nonce?: string;
  /** @deprecated GridStack-compatible styles are not generated dynamically. */
  styleInHead?: boolean;
}

export type DashboardGridCompatibilityItem<TData = unknown> = DashboardGridLayoutItemInput &
  Readonly<{
    content?: string;
    print?: GridStackPrintOptions;
    lazyMount?: boolean;
    sizeToContent?: boolean | number;
    sizeToContentSelector?: string;
    resizeHandles?: string;
    subGrid?: DashboardGridCompatibilityOptions<TData>;
    component?: string;
    props?: Readonly<Record<string, unknown>>;
    className?: string;
    data?: TData;
    legacy?: Readonly<Record<string, unknown>>;
  }>;

export interface DashboardGridCompatibilityOptions<TData = unknown> {
  items?: readonly DashboardGridCompatibilityItem<TData>[];
  columns?: number | 'auto';
  responsive?: DashboardGridCompatibilityResponsiveOptions;
  rowHeight?: GridStackNumberOrString | 'auto' | 'initial';
  rowHeightThrottle?: number;
  gap?: DashboardGridCompatibilityGap;
  minRows?: number;
  maxRows?: number;
  fixedRows?: number;
  float?: boolean;
  animate?: boolean;
  direction?: 'ltr' | 'rtl' | 'auto';
  static?: boolean;
  disableDrag?: boolean;
  disableResize?: boolean;
  lazyMount?: boolean;
  sizeToContent?: boolean;
  printMode?: 'flow' | 'exact';
  acceptExternal?: GridStackOptions['acceptWidgets'];
  removable?: boolean | string;
  removal?: GridStackRemoveOptions;
  drag?: DashboardGridCompatibilityDragOptions;
  resize?: DashboardGridCompatibilityResizeOptions;
  placeholder?: DashboardGridCompatibilityPlaceholderOptions;
  className?: string;
  layoutOnResize?: GridStackColumnLayout;
  subGridDefaults?: DashboardGridCompatibilityOptions<TData>;
  dynamicNesting?: boolean;
  compatibility?: DashboardGridCompatibilityMetadata;
}

export type DashboardGridOptions<TData = unknown> = DashboardGridCompatibilityOptions<TData>;
export type DashboardGridItemDefinition<TData = unknown> = DashboardGridCompatibilityItem<TData>;

export interface DashboardGridSerializedGrid<TData = unknown> {
  version: 1;
  options: DashboardGridCompatibilityOptions<TData>;
  items: readonly DashboardGridCompatibilityItem<TData>[];
}

export interface GridStackWidgetMappingOptions {
  fallbackId?: string;
  usedIds?: Set<string>;
}

export interface GridStackWidgetsMappingOptions {
  existingIds?: Iterable<string>;
  fallbackIdPrefix?: string;
  preserveFirstExistingId?: boolean;
}

export interface GridStackDOMReadOptions extends GridStackWidgetsMappingOptions {
  clearLegacyConstraintAttributes?: boolean;
  includeTextContent?: boolean;
  maxMetadataLength?: number;
}

export interface GridStackDOMWriteOptions {
  writeCssVariables?: boolean;
}

export type GridStackEventName =
  | 'added'
  | 'change'
  | 'disable'
  | 'drag'
  | 'dragstart'
  | 'dragstop'
  | 'dropped'
  | 'enable'
  | 'removed'
  | 'resize'
  | 'resizestart'
  | 'resizestop'
  | 'resizecontent';

export type GridStackNode = GridStackWidget & {
  el?: HTMLElement;
};

export interface GridStackCompatibilityEvent {
  readonly type: GridStackEventName;
  readonly target: EventTarget | null;
  readonly currentTarget: EventTarget | null;
  readonly originalEvent?: Event;
  readonly detail?: unknown;
}

export type GridStackEventHandler = (event: GridStackCompatibilityEvent) => void;
export type GridStackElementHandler = (event: GridStackCompatibilityEvent, element: HTMLElement) => void;
export type GridStackNodesHandler = (event: GridStackCompatibilityEvent, nodes: readonly GridStackNode[]) => void;
export type GridStackDroppedHandler = (
  event: GridStackCompatibilityEvent,
  previousNode: GridStackNode | undefined,
  newNode: GridStackNode,
) => void;
export type GridStackEventHandlerCallback =
  | GridStackEventHandler
  | GridStackElementHandler
  | GridStackNodesHandler
  | GridStackDroppedHandler;

export type GridStackLegacyAddRemoveCallback = (
  parent: HTMLElement,
  widget: GridStackWidget,
  add: boolean,
  grid: boolean,
) => HTMLElement | null | undefined;

export type GridStackLegacyLoadArgument = boolean | GridStackLegacyAddRemoveCallback;

export interface GridStackEventPayloadMap {
  added: Readonly<{ nodes: readonly DashboardGridResolvedItem[]; originalEvent?: Event }>;
  change: Readonly<{ nodes: readonly DashboardGridResolvedItem[]; originalEvent?: Event }>;
  disable: Readonly<{ originalEvent?: Event }>;
  drag: Readonly<{ item: DashboardGridResolvedItem; element?: HTMLElement; originalEvent?: Event }>;
  dragstart: Readonly<{ item: DashboardGridResolvedItem; element?: HTMLElement; originalEvent?: Event }>;
  dragstop: Readonly<{ item: DashboardGridResolvedItem; element?: HTMLElement; originalEvent?: Event }>;
  dropped: Readonly<{
    previousItem?: DashboardGridResolvedItem;
    item: DashboardGridResolvedItem;
    originalEvent?: Event;
  }>;
  enable: Readonly<{ originalEvent?: Event }>;
  removed: Readonly<{ nodes: readonly DashboardGridResolvedItem[]; originalEvent?: Event }>;
  resize: Readonly<{ item: DashboardGridResolvedItem; element?: HTMLElement; originalEvent?: Event }>;
  resizestart: Readonly<{ item: DashboardGridResolvedItem; element?: HTMLElement; originalEvent?: Event }>;
  resizestop: Readonly<{ item: DashboardGridResolvedItem; element?: HTMLElement; originalEvent?: Event }>;
  resizecontent: Readonly<{ nodes: readonly DashboardGridResolvedItem[]; originalEvent?: Event }>;
}

export interface DashboardGridCompatibilityHandle {
  getItems(): readonly DashboardGridLayoutItemInput[];
  getStore?(): Readonly<{ engine: DashboardGridEngine }>;
  load(items: readonly DashboardGridLayoutItemInput[], options?: DashboardGridLoadOptions): unknown;
  addItem?(item: DashboardGridLayoutItemInput): unknown;
  removeItem?(id: string): unknown;
  updateItem?(id: string, patch: Partial<Omit<DashboardGridLayoutItemInput, 'id'>>): unknown;
  compact?(mode?: GridStackCompactMode): unknown;
}

export type DashboardGridCompatibilityTarget = DashboardGridEngine | DashboardGridCompatibilityHandle;

export interface GridStackEventAdapterOptions {
  rootElement?: HTMLElement;
  selectorRoot?: GridStackSelectorRoot;
  getItemElement?: (id: string) => HTMLElement | undefined;
  fallbackIdPrefix?: string;
  setupDragIn?: (
    elements: readonly HTMLElement[],
    dragOptions: GridStackDragOptions | undefined,
    widgets: readonly GridStackWidget[] | undefined,
  ) => void;
}

export interface DashboardGridCompatibilityEventData {
  type: string;
  event?: unknown;
  itemId?: string;
  items?: readonly DashboardGridResolvedItem[];
  changeSet?: DashboardGridEngineChangeSet;
  [key: string]: unknown;
}

export type DashboardGridCompatibilityEventHandler = (
  event: unknown,
  data: DashboardGridCompatibilityEventData,
) => void;

export interface GridStackDashboardEventHandlers {
  onLayoutChange: DashboardGridCompatibilityEventHandler;
  onItemAdd: DashboardGridCompatibilityEventHandler;
  onItemRemove: DashboardGridCompatibilityEventHandler;
  onDragStart: DashboardGridCompatibilityEventHandler;
  onDragEnd: DashboardGridCompatibilityEventHandler;
  onResizeStart: DashboardGridCompatibilityEventHandler;
  onResizeEnd: DashboardGridCompatibilityEventHandler;
  onTransfer: DashboardGridCompatibilityEventHandler;
  onResizeContent: DashboardGridCompatibilityEventHandler;
}

export interface GridStackLikeFacade {
  on(name: GridStackEventName | string, callback: GridStackEventHandlerCallback): GridStackLikeFacade;
  off(name: GridStackEventName | string): GridStackLikeFacade;
  offAll(): GridStackLikeFacade;
  emit<Name extends GridStackEventName>(name: Name, payload: GridStackEventPayloadMap[Name]): GridStackLikeFacade;
  addWidget(widget: Readonly<GridStackWidget>): GridStackNode | undefined;
  makeWidget(element: GridStackElement, options?: Readonly<GridStackWidget>): GridStackNode | undefined;
  removeWidget(element: GridStackElement, removeDOM?: boolean, triggerEvent?: boolean): GridStackLikeFacade;
  removeAll(removeDOM?: boolean, triggerEvent?: boolean): GridStackLikeFacade;
  update(element: GridStackElement, widget: Readonly<GridStackWidget>): GridStackLikeFacade;
  load(items: readonly GridStackWidget[], addRemove?: GridStackLegacyLoadArgument): GridStackLikeFacade;
  save(saveContent?: boolean): GridStackWidget[];
  batchUpdate(flag?: boolean): GridStackLikeFacade;
  column(columns: number, layout?: GridStackColumnLayout): GridStackLikeFacade;
  getColumn(): number;
  willItFit(widget: Readonly<GridStackWidget>): boolean;
  compact(mode?: GridStackCompactMode, doSort?: boolean): GridStackLikeFacade;
  getRow(): number;
  isAreaEmpty(x: number, y: number, width: number, height: number): boolean;
  rotate(element: GridStackElement, relative?: GridStackPosition): GridStackLikeFacade;
  enable(recurse?: boolean): GridStackLikeFacade;
  disable(recurse?: boolean): GridStackLikeFacade;
  setupDragIn(
    elements: string | readonly HTMLElement[],
    dragOptions?: GridStackDragOptions,
    widgets?: readonly GridStackWidget[],
    root?: GridStackSelectorRoot,
  ): GridStackLikeFacade;
  getDashboardGridEventHandlers(): GridStackDashboardEventHandlers;
}
