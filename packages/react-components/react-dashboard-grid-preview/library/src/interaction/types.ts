import type {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-utilities';
import type {
  DashboardGridCellMetrics as EngineCellMetrics,
  DashboardGridEngineSnapshot as EngineSnapshot,
  DashboardGridGeometryChange as EngineGeometryChange,
  DashboardGridInteractionContext as EngineInteractionContext,
  DashboardGridMoveProposal as EngineMoveProposal,
  DashboardGridMoveResult as EngineMoveResult,
  DashboardGridPixelRect as EnginePixelRect,
  DashboardGridRect as EngineRect,
  DashboardGridResolvedItem as EngineResolvedItem,
} from '../engine';

export type DashboardGridDirection = 'ltr' | 'rtl';

export type DashboardGridResizeEdge = 'n' | 'e' | 's' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export type DashboardGridRect = EngineRect;
export type DashboardGridPixelRect = EnginePixelRect;
export type DashboardGridCellMetrics = EngineCellMetrics;
export type DashboardGridResolvedItem = EngineResolvedItem;
export type DashboardGridGeometryChange = EngineGeometryChange;
export type DashboardGridEngineSnapshot = EngineSnapshot;
export type DashboardGridInteractionContext = EngineInteractionContext;
export type DashboardGridMoveProposal = EngineMoveProposal;

export type DashboardGridRejectedReason =
  | 'bounds'
  | 'max-rows'
  | 'constraint'
  | 'collision-cycle'
  | 'missing-item'
  | 'target-rejected'
  | 'target-full'
  | 'disabled'
  | 'locked'
  | 'not-movable'
  | 'not-resizable';

export type DashboardGridMoveResult = EngineMoveResult;

/**
 * Narrow command/query seam consumed by the interaction lane. Store/engine
 * implementations can satisfy it structurally without exposing internals.
 */
export interface DashboardGridInteractionStore {
  readonly events?: DashboardGridInteractionEventQueue;
  getSnapshot(): DashboardGridEngineSnapshot;
  getItem(id: string): DashboardGridResolvedItem | undefined;
  beginInteraction(id: string, context: DashboardGridInteractionContext): void;
  move(id: string, proposal: DashboardGridMoveProposal): DashboardGridMoveResult;
  rotate(
    id: string,
    options: {
      pivot?: { column: number; row: number };
      input: 'pointer' | 'keyboard' | 'api';
    },
  ): DashboardGridMoveResult;
  commitInteraction(): unknown;
  cancelInteraction(): unknown;
  publishPreview?(preview: DashboardGridInteractionPreview): void;
  clearPreview?(): void;
}

export type DashboardGridInteractionOperation = 'drag' | 'resize' | 'external' | 'keyboard';

export type DashboardGridInteractionPhase = 'armed' | 'active' | 'committing' | 'cancelled';

export type DashboardGridPointerIdentity = {
  pointerId: number;
  pointerType: string;
  isPrimary: boolean;
  button: number;
};

export type DashboardGridPoint = {
  clientX: number;
  clientY: number;
};

export type DashboardGridFocusReturn = {
  element: HTMLElement | null;
  gridId?: string;
  itemId?: string;
};

export type DashboardGridInteractionPreview = {
  operation: DashboardGridInteractionOperation;
  sourceGridId?: string;
  targetGridId?: string;
  itemId?: string;
  sourceId?: string;
  originRect?: DashboardGridRect;
  originPixelRect?: DashboardGridPixelRect;
  rect?: DashboardGridRect;
  pixelRect?: DashboardGridPixelRect;
  temporaryRows?: number;
  valid: boolean;
  rejectionReason?: DashboardGridRejectedReason;
};

export type DashboardGridPointerSession = {
  id: number;
  phase: DashboardGridInteractionPhase;
  operation: Exclude<DashboardGridInteractionOperation, 'keyboard'>;
  pointer: DashboardGridPointerIdentity;
  startedAt: number;
  start: DashboardGridPoint;
  current: DashboardGridPoint;
  sourceGridId?: string;
  targetGridId?: string;
  itemId?: string;
  sourceId?: string;
  resizeEdge?: DashboardGridResizeEdge;
  originRect?: DashboardGridRect;
  originPixelRect: DashboardGridPixelRect;
  currentPixelRect: DashboardGridPixelRect;
  currentClientPixelRect?: DashboardGridPixelRect;
  lastAcceptedRect?: DashboardGridRect;
  rejectionReason?: DashboardGridRejectedReason;
  sourceInteractionClosed?: boolean;
  focusReturn?: DashboardGridFocusReturn;
};

export type DashboardGridKeyboardSession = {
  id: number;
  phase: Exclude<DashboardGridInteractionPhase, 'armed'>;
  operation: 'keyboard';
  startedAt: number;
  sourceGridId: string;
  targetGridId: string;
  itemId: string;
  originRect: DashboardGridRect;
  lastAcceptedRect: DashboardGridRect;
  focusReturn?: DashboardGridFocusReturn;
};

export type DashboardGridInteractionSession = DashboardGridPointerSession | DashboardGridKeyboardSession;

export type DashboardGridGridRegistration = {
  id: string;
  element: HTMLElement;
  surfaceElement?: HTMLElement;
  outerHitElement?: HTMLElement;
  parentGridId?: string;
  label?: string;
  direction: DashboardGridDirection;
  store: DashboardGridInteractionStore;
  getMetrics: () => DashboardGridCellMetrics;
  acceptsExternal?: (context: DashboardGridDropAcceptanceContext) => boolean;
};

export type DashboardGridItemRegistration = {
  id: string;
  gridId: string;
  element: HTMLElement;
  dragHandle?: HTMLElement | null;
  resizeHandles?: Partial<Record<DashboardGridResizeEdge, HTMLElement | null>>;
  label?: string;
  movable: boolean;
  resizable: boolean;
  locked: boolean;
  sizeToContent?: boolean;
  resizeDirections?: readonly DashboardGridResizeEdge[];
};

export type DashboardGridExternalItemDescriptor = {
  id?: string;
  columnSpan?: number;
  rowSpan?: number;
  minColumnSpan?: number;
  maxColumnSpan?: number;
  minRowSpan?: number;
  maxRowSpan?: number;
  data?: unknown;
};

export type DashboardGridDragSourceRegistration = {
  id: string;
  element: HTMLElement;
  label?: string;
  disabled?: boolean;
  descriptor: DashboardGridExternalItemDescriptor | (() => DashboardGridExternalItemDescriptor);
  previewElement?: HTMLElement | null;
};

export type DashboardGridDropZoneKind = 'grid' | 'remove' | 'custom';

export type DashboardGridDropAcceptanceContext = {
  operation: DashboardGridInteractionOperation;
  sourceGridId?: string;
  targetGridId?: string;
  itemId?: string;
  sourceId?: string;
  descriptor?: DashboardGridExternalItemDescriptor;
};

export type DashboardGridDropZoneRegistration = {
  id: string;
  element: HTMLElement;
  gridId?: string;
  parentZoneId?: string;
  kind: DashboardGridDropZoneKind;
  label?: string;
  disabled?: boolean;
  accepts?: boolean | ((context: DashboardGridDropAcceptanceContext) => boolean);
  onStateChange?: (state: DashboardGridDropZoneVisualState) => void;
};

export type DashboardGridDropZoneVisualState = {
  active: boolean;
  valid: boolean;
  reason?: DashboardGridRejectedReason;
};

export type DashboardGridDragSourceSlots = {
  root: Slot<'div'>;
  preview?: Slot<'div'>;
};

export type DashboardGridDragSourceProps = ComponentProps<DashboardGridDragSourceSlots> & {
  id: string;
  descriptor: DashboardGridExternalItemDescriptor | (() => DashboardGridExternalItemDescriptor);
  label?: string;
  disabled?: boolean;
  onKeyboardActivate?: (
    registration: DashboardGridDragSourceRegistration,
    event: KeyboardEvent,
  ) => void;
};

export type DashboardGridDragSourceState = ComponentState<DashboardGridDragSourceSlots>;

export type DashboardGridDropZoneSlots = {
  root: Slot<'div'>;
  indicator?: Slot<'div'>;
};

export type DashboardGridDropZoneProps = ComponentProps<DashboardGridDropZoneSlots> & {
  id: string;
  gridId?: string;
  kind?: DashboardGridDropZoneKind;
  label?: string;
  disabled?: boolean;
  accepts?: boolean | ((context: DashboardGridDropAcceptanceContext) => boolean);
};

export type DashboardGridDropZoneState = ComponentState<DashboardGridDropZoneSlots>;

export type DashboardGridTransferIntent = {
  operation: 'drag' | 'external';
  sourceGridId?: string;
  targetGridId?: string;
  itemId?: string;
  sourceId?: string;
  targetZoneId?: string;
  descriptor?: DashboardGridExternalItemDescriptor;
  rect?: DashboardGridRect;
  nativeEvent?: Event;
};

export type DashboardGridNestingIntent = {
  sourceGridId: string;
  targetGridId: string;
  itemId: string;
  targetItemId: string;
  coverage: number;
  nativeEvent?: Event;
};

export type DashboardGridTransferResult =
  | { status: 'accepted'; targetGridId?: string; rect?: DashboardGridRect }
  | { status: 'rejected'; reason: DashboardGridRejectedReason };

export interface DashboardGridProviderInteractionRegistry {
  preflightTransfer?(intent: DashboardGridTransferIntent): DashboardGridTransferResult;
  transfer?(intent: DashboardGridTransferIntent): DashboardGridTransferResult | Promise<DashboardGridTransferResult>;
  remove?(intent: DashboardGridTransferIntent): DashboardGridTransferResult | Promise<DashboardGridTransferResult>;
  drop?(intent: DashboardGridTransferIntent): DashboardGridTransferResult | Promise<DashboardGridTransferResult>;
  requestNesting?(
    intent: DashboardGridNestingIntent,
  ): DashboardGridTransferResult | Promise<DashboardGridTransferResult>;
  cancel?(session: DashboardGridInteractionSession): void;
}

export type DashboardGridInteractionIntent = {
  kind?: DashboardGridInteractionOperation;
  input?: 'pointer' | 'keyboard';
} & (
  | {
      type: 'start';
      operation: DashboardGridInteractionOperation;
      sourceGridId?: string;
      targetGridId?: string;
      itemId?: string;
      sourceId?: string;
      previous?: DashboardGridRect;
      nativeEvent?: Event;
    }
  | {
      type: 'update' | 'rotate';
      operation: DashboardGridInteractionOperation;
      sourceGridId?: string;
      targetGridId?: string;
      itemId?: string;
      previous?: DashboardGridRect;
      current?: DashboardGridRect;
      nativeEvent?: Event;
    }
  | {
      type: 'target';
      operation: DashboardGridInteractionOperation;
      sourceGridId?: string;
      targetGridId?: string;
      itemId?: string;
      sourceId?: string;
      targetZoneId?: string;
      valid: boolean;
      rejectionReason?: DashboardGridRejectedReason;
      nativeEvent?: Event;
    }
  | {
      type: 'stop' | 'cancel';
      operation: DashboardGridInteractionOperation;
      sourceGridId?: string;
      targetGridId?: string;
      itemId?: string;
      sourceId?: string;
      previous?: DashboardGridRect;
      current?: DashboardGridRect;
      nativeEvent?: Event;
    }
  | {
      type: 'rejected';
      operation: DashboardGridInteractionOperation;
      sourceGridId?: string;
      targetGridId?: string;
      itemId?: string;
      sourceId?: string;
      previous?: DashboardGridRect;
      current?: DashboardGridRect;
      rejectionReason: DashboardGridRejectedReason;
      nativeEvent?: Event;
    }
);

export interface DashboardGridInteractionEventQueue {
  enqueue(intent: DashboardGridInteractionIntent): void;
}

export type DashboardGridCoordinatorOptions = {
  targetDocument: Document;
  provider?: DashboardGridProviderInteractionRegistry;
  eventQueue?: DashboardGridInteractionEventQueue;
  onSessionChange?: (session: DashboardGridInteractionSession | null) => void;
};

export type DashboardGridBeginPointerRequest = {
  operation: 'drag' | 'resize' | 'external';
  pointer: DashboardGridPointerIdentity;
  timeStamp: number;
  point: DashboardGridPoint;
  originPixelRect: DashboardGridPixelRect;
  sourceGridId?: string;
  itemId?: string;
  sourceId?: string;
  resizeEdge?: DashboardGridResizeEdge;
  ownerElement: HTMLElement;
  focusReturn?: DashboardGridFocusReturn;
  nativeEvent?: Event;
};

export type DashboardGridActivatePointerRequest = {
  pixelRect: DashboardGridPixelRect;
  rect?: DashboardGridRect;
  nativeEvent?: Event;
};

export type DashboardGridUpdatePointerRequest = {
  point: DashboardGridPoint;
  pixelRect: DashboardGridPixelRect;
  clientPixelRect?: DashboardGridPixelRect;
  proposal?: DashboardGridMoveProposal;
  nativeEvent?: Event;
};

export type DashboardGridBeginKeyboardRequest = {
  gridId: string;
  itemId: string;
  focusReturn?: DashboardGridFocusReturn;
  nativeEvent?: Event;
};

export interface DashboardGridInteractionCoordinator {
  readonly targetDocument: Document;
  registerGrid(registration: DashboardGridGridRegistration): () => void;
  registerItem(registration: DashboardGridItemRegistration): () => void;
  registerDragSource(registration: DashboardGridDragSourceRegistration): () => void;
  registerDropZone(registration: DashboardGridDropZoneRegistration): () => void;
  getGrid(id: string): DashboardGridGridRegistration | undefined;
  getGrids(): readonly DashboardGridGridRegistration[];
  getItem(gridId: string, itemId: string): DashboardGridItemRegistration | undefined;
  getSession(): DashboardGridInteractionSession | null;
  subscribe(listener: () => void): () => void;
  beginPointer(request: DashboardGridBeginPointerRequest): DashboardGridPointerSession | null;
  activatePointer(request: DashboardGridActivatePointerRequest): DashboardGridMoveResult | undefined;
  updatePointer(request: DashboardGridUpdatePointerRequest): DashboardGridMoveResult | undefined;
  updateDropTarget(point: DashboardGridPoint, nativeEvent?: Event): DashboardGridDropZoneRegistration | undefined;
  invalidateGeometry(gridId?: string): void;
  beginKeyboard(request: DashboardGridBeginKeyboardRequest): DashboardGridKeyboardSession | null;
  moveKeyboard(proposal: DashboardGridMoveProposal, nativeEvent?: Event): DashboardGridMoveResult | undefined;
  rotateKeyboard(nativeEvent?: Event): DashboardGridMoveResult | undefined;
  commit(nativeEvent?: Event): Promise<DashboardGridTransferResult | undefined>;
  cancel(nativeEvent?: Event): void;
  destroy(): void;
}

export const dashboardGridDataAttributes = {
  grid: 'data-dashboard-grid-root',
  item: 'data-dashboard-grid-item',
  dragHandle: 'data-dashboard-grid-drag-handle',
  resizeHandle: 'data-dashboard-grid-resize-handle',
  dragSource: 'data-dashboard-grid-drag-source',
  dropZone: 'data-dashboard-grid-drop-zone',
  preview: 'data-dashboard-grid-preview',
} as const;
