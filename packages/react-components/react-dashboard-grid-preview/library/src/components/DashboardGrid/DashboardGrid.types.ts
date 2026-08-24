import type * as React from 'react';
import type {
  ComponentProps,
  ComponentState,
  EventHandler,
  Slot,
} from '@fluentui/react-utilities';
import type {
  DashboardGridEngineChangeSet,
  DashboardGridEngineDiagnostic,
  DashboardGridEngineError,
  DashboardGridRect,
  DashboardGridResolvedItem,
} from '../../engine';
import type { DashboardGridHandle } from '../../hooks/useDashboardGrid';
import type {
  DashboardGridComponentRegistry,
  DashboardGridItemDefinition,
  DashboardGridOptions,
  DashboardGridRenderItem,
  DashboardGridRenderUnknownComponent,
} from '../../state/DashboardGridStore.types';
export type { DashboardGridResponsiveOptions } from '../../state/DashboardGridStore.types';
import type { DashboardGridAriaStrings } from '../../accessibility/aria';
import type { DashboardGridAnnouncementStrings } from '../../accessibility/announcements';
import type {
  DashboardGridInteractionInput,
  DashboardGridInteractionIntentType,
  DashboardGridInteractionOperation,
  DashboardGridRejectedReason,
} from '../../interaction/types';

/** Slots rendered by DashboardGrid. */
export type DashboardGridSlots = {
  /** Root element that owns semantics and keyboard navigation. */
  root: NonNullable<Slot<'div'>>;
  /** Positioned surface that owns item and placeholder geometry. */
  surface: NonNullable<Slot<'div'>>;
  /** Interaction placeholder. */
  placeholder?: Slot<'div'>;
  /** Content rendered when the layout is empty. */
  emptyContent?: Slot<'div'>;
};

/** Data emitted for lower-level engine diagnostics. */
export type DashboardGridDiagnosticData = DashboardGridEngineDiagnostic & {
  type: 'diagnostic';
  event: Event;
};

/** Caller-localizable accessibility and announcement strings. */
export type DashboardGridStrings = DashboardGridAriaStrings & DashboardGridAnnouncementStrings;

/** One explicit responsive breakpoint. */
export type DashboardGridResponsiveBreakpoint = NonNullable<
  import('../../state/DashboardGridStore.types').DashboardGridResponsiveOptions['breakpoints']
>[number];

/** Reason associated with a public grid callback. */
export type DashboardGridChangeReason =
  | 'add'
  | 'remove'
  | 'update'
  | 'load'
  | 'compact'
  | 'columns'
  | 'interaction'
  | 'content'
  | 'enabled'
  | 'transfer';

/** Event discriminators surfaced by DashboardGrid callbacks. */
export type DashboardGridEventType =
  | DashboardGridInteractionIntentType
  | 'items-change'
  | 'item-add'
  | 'item-remove'
  | 'item-drop'
  | 'drag-start'
  | 'drag'
  | 'drag-end'
  | 'resize-start'
  | 'resize'
  | 'resize-end'
  | 'content-resize'
  | 'enabled-change'
  | 'error'
  | 'layout-change'
  | 'columns-change'
  | 'arrange-mode-change'
  | 'transfer';

/** Fields shared by all DashboardGrid event data. */
export type DashboardGridEventFields = {
  /** Fluent event data discriminator. */
  type: DashboardGridEventType;
  /** Native or React event associated with the callback. */
  event: Event | React.SyntheticEvent<HTMLElement>;
  /** Grid that surfaced the callback. */
  gridId: string;
  /** Input that initiated the change. */
  input:
    | DashboardGridInteractionInput
    | 'api'
    | 'load'
    | 'responsive'
    | 'content';
  /** Interaction or mutation kind. */
  kind?:
    | DashboardGridInteractionOperation
    | 'move'
    | 'rotate'
    | 'transfer'
    | 'remove';
  /** Primary item associated with the callback. */
  itemId?: string;
  /** Originating grid for cross-grid operations. */
  sourceGridId?: string;
  /** Destination grid for cross-grid operations. */
  targetGridId?: string;
  /** Geometry before the operation. */
  previous?: DashboardGridRect;
  /** Geometry after the operation. */
  current?: DashboardGridRect;
  /** Current affected resolved items. */
  affectedItems: readonly DashboardGridResolvedItem[];
  /** Public reason associated with the callback. */
  reason: DashboardGridChangeReason;
  /** Rejection reason when an operation is refused. */
  rejectedReason?: DashboardGridRejectedReason;
};

/** Data emitted when the layout item collection changes. */
export type DashboardGridLayoutChangeData = DashboardGridEventFields & {
  type: 'items-change';
  items: readonly DashboardGridResolvedItem[];
  changeSet: DashboardGridEngineChangeSet;
};

/** Data emitted for item add, remove, or content-resize callbacks. */
export type DashboardGridItemsData = DashboardGridEventFields & {
  type: 'item-add' | 'item-remove' | 'content-resize';
  items: readonly DashboardGridResolvedItem[];
};

/** Data emitted after an item is dropped. */
export type DashboardGridDropData = DashboardGridEventFields & {
  type: 'item-drop';
  kind: 'transfer' | 'move';
};

/** Data emitted throughout drag and resize interactions. */
export type DashboardGridInteractionData = DashboardGridEventFields & {
  type:
    | 'drag-start'
    | 'drag'
    | 'drag-end'
    | 'resize-start'
    | 'resize'
    | 'resize-end';
  kind: 'drag' | 'resize';
};

/** Data emitted when imperative enablement changes. */
export type DashboardGridEnabledData = DashboardGridEventFields & {
  type: 'enabled-change';
  enabled: boolean;
};

/** Data emitted for recoverable engine or provider failures. */
export type DashboardGridErrorData = DashboardGridEventFields & {
  type: 'error';
  error: DashboardGridEngineError | unknown;
};

/** @deprecated Use the concrete event-data types. */
export type DashboardGridEventData = DashboardGridEventFields & {
  items?: readonly DashboardGridResolvedItem[];
  changeSet?: DashboardGridEngineChangeSet;
  columns?: number;
  previousColumns?: number;
  active?: boolean;
};

/** Props for DashboardGrid. */
export type DashboardGridProps = Omit<
  ComponentProps<Partial<DashboardGridSlots>>,
  | 'children'
  | 'onChange'
  | 'onError'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onResize'
> &
  DashboardGridOptions & {
    /** Provider-local grid identity. */
    gridId?: string;
    /** Controlled item definitions. */
    items?: readonly DashboardGridItemDefinition[];
    /** Initial item definitions for uncontrolled ownership. */
    defaultItems?: readonly DashboardGridItemDefinition[];
    /** Declarative DashboardGridItem children. */
    children?: React.ReactNode;
    /** Renders model-owned item content. */
    renderItem?: DashboardGridRenderItem;
    /** Registry used to resolve item `component` keys. */
    components?: DashboardGridComponentRegistry;
    /** Fallback renderer for unknown component keys. */
    renderUnknownComponent?: DashboardGridRenderUnknownComponent;
    /** Separate imperative command ref; the ordinary ref targets the root element. */
    imperativeRef?: React.Ref<DashboardGridHandle>;
    /** Optional geometric Tabster navigation. */
    keyboardNavigation?: 'none' | 'grid';
    /** Caller-localizable ARIA and announcement strings. */
    strings?: Partial<DashboardGridStrings>;

    /** Called after committed items change. */
    onItemsChange?: EventHandler<DashboardGridLayoutChangeData>;
    /** Called when items are added. */
    onItemAdd?: EventHandler<DashboardGridItemsData>;
    /** Called when items are removed. */
    onItemRemove?: EventHandler<DashboardGridItemsData>;
    /** Called after a successful internal or cross-grid drop. */
    onItemDrop?: EventHandler<DashboardGridDropData>;
    /** Called when dragging starts. */
    onDragStart?: EventHandler<DashboardGridInteractionData>;
    /** Called for accepted drag progress. */
    onDrag?: EventHandler<DashboardGridInteractionData>;
    /** Called after drag commit. */
    onDragEnd?: EventHandler<DashboardGridInteractionData>;
    /** Called when resizing starts. */
    onResizeStart?: EventHandler<DashboardGridInteractionData>;
    /** Called for accepted resize progress. */
    onResize?: EventHandler<DashboardGridInteractionData>;
    /** Called after resize commit. */
    onResizeEnd?: EventHandler<DashboardGridInteractionData>;
    /** Called when size-to-content changes item geometry. */
    onContentResize?: EventHandler<DashboardGridItemsData>;
    /** Called when imperative enablement changes. */
    onEnabledChange?: EventHandler<DashboardGridEnabledData>;
    /** Called for recoverable engine or provider errors. */
    onError?: EventHandler<DashboardGridErrorData>;

    /** Receives lower-level engine diagnostics. */
    onDiagnostic?: EventHandler<DashboardGridDiagnosticData>;

    /** @deprecated Use `onItemsChange`. */
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- Compatibility callback retains the legacy event payload.
    onLayoutChange?: EventHandler<DashboardGridEventData>;
    /** @deprecated Column changes are included in `onItemsChange`. */
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- Compatibility callback retains the legacy event payload.
    onColumnsChange?: EventHandler<DashboardGridEventData>;
    /** @deprecated Arrange changes are announced and reflected by interaction callbacks. */
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- Compatibility callback retains the legacy event payload.
    onArrangeModeChange?: EventHandler<DashboardGridEventData>;
    /** @deprecated Use `onItemDrop`. */
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- Compatibility callback retains the legacy event payload.
    onTransfer?: EventHandler<DashboardGridEventData>;
    /** @deprecated Rejections and cancellation are surfaced through interaction data. */
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- Compatibility callback retains the legacy event payload.
    onCancel?: EventHandler<DashboardGridEventData>;
    /** @deprecated Use `onContentResize`. */
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- Compatibility callback retains the legacy event payload.
    onResizeContent?: EventHandler<DashboardGridEventData>;
  };

/** Render state for DashboardGrid. */
export type DashboardGridState = ComponentState<DashboardGridSlots>;
