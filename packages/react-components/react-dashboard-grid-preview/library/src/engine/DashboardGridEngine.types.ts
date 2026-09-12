export type DashboardGridRect = Readonly<{
  column: number;
  row: number;
  columnSpan: number;
  rowSpan: number;
}>;

export type DashboardGridPixelRect = Readonly<{
  x: number;
  y: number;
  width: number;
  height: number;
}>;

export type DashboardGridCellMetrics = Readonly<{
  columnWidth: number;
  rowHeight: number;
  gapTop: number;
  gapRight: number;
  gapBottom: number;
  gapLeft: number;
}>;

export type DashboardGridResolvedItem = DashboardGridRect &
  Readonly<{
    id: string;
    minColumnSpan?: number;
    maxColumnSpan?: number;
    minRowSpan?: number;
    maxRowSpan?: number;
    movable: boolean;
    resizable: boolean;
    locked: boolean;
  }>;

export type DashboardGridLayoutItemInput = Readonly<{
  id: string;
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
}>;

export type DashboardGridLayoutItemPatch = Readonly<Partial<Omit<DashboardGridLayoutItemInput, 'id'>>>;

export type DashboardGridEngineSnapshot = Readonly<{
  revision: number;
  columns: number;
  maxRows?: number;
  float: boolean;
  items: readonly DashboardGridResolvedItem[];
}>;

export type DashboardGridInteractionContext = Readonly<{
  kind: 'drag' | 'resize' | 'keyboard';
  source: 'internal' | 'external';
  metrics?: DashboardGridCellMetrics;
  originPixelRect?: DashboardGridPixelRect;
  allowNesting?: boolean;
  nestingDwell?: boolean | number;
}>;

export type DashboardGridMoveProposal = Readonly<
  Partial<DashboardGridRect> & {
    input: 'pointer' | 'keyboard' | 'api' | 'load' | 'responsive';
    resizing?: boolean;
    pixelRect?: DashboardGridPixelRect;
    forceCollision?: boolean;
    pack?: boolean;
    resizeEdge?: 'n' | 'e' | 's' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
  }
>;

export type DashboardGridGeometryChange = Readonly<{
  id: string;
  previous: DashboardGridRect;
  current: DashboardGridRect;
}>;

export type DashboardGridEngineDiagnosticCode =
  | 'bounds'
  | 'collision-cycle'
  | 'constraint'
  | 'contradictory-constraints'
  | 'duplicate-id'
  | 'invalid-columns'
  | 'invalid-custom-layout'
  | 'invalid-id'
  | 'invalid-serialized-state'
  | 'max-rows'
  | 'missing-item'
  | 'nested-transaction'
  | 'rotation-not-allowed';

export type DashboardGridEngineDiagnostic = Readonly<{
  code: DashboardGridEngineDiagnosticCode;
  message: string;
  severity: 'warning' | 'error';
  recoverable: boolean;
  itemId?: string;
  details?: Readonly<Record<string, unknown>>;
}>;

export type DashboardGridEngineError = Readonly<{
  diagnostic: DashboardGridEngineDiagnostic;
  cause?: unknown;
}>;

export type DashboardGridEngineChange =
  | Readonly<{ kind: 'removed'; item: DashboardGridResolvedItem }>
  | Readonly<{ kind: 'added'; item: DashboardGridResolvedItem }>
  | Readonly<{ kind: 'changed'; change: DashboardGridGeometryChange }>;

export type DashboardGridEngineChangeSet = Readonly<{
  revision: number;
  removed: readonly DashboardGridResolvedItem[];
  added: readonly DashboardGridResolvedItem[];
  changed: readonly DashboardGridGeometryChange[];
  changes: readonly DashboardGridEngineChange[];
  diagnostics: readonly DashboardGridEngineDiagnostic[];
}>;

export type DashboardGridMoveResult =
  | Readonly<{
      status: 'accepted';
      item: DashboardGridResolvedItem;
      affected: readonly DashboardGridGeometryChange[];
    }>
  | Readonly<{
      status: 'unchanged';
      item: DashboardGridResolvedItem;
    }>
  | Readonly<{
      status: 'deferred';
      reason: 'coverage-threshold';
    }>
  | Readonly<{
      status: 'rejected';
      reason: 'bounds' | 'max-rows' | 'constraint' | 'collision-cycle' | 'missing-item';
      diagnostic?: DashboardGridEngineDiagnostic;
    }>
  | Readonly<{
      status: 'nest-requested';
      targetId: string;
      coverage: number;
    }>;

export type DashboardGridMutationRejectionReason =
  | 'bounds'
  | 'collision-cycle'
  | 'constraint'
  | 'duplicate-id'
  | 'invalid-input'
  | 'max-rows'
  | 'missing-item';

export type DashboardGridMutationResult =
  | Readonly<{
      status: 'accepted';
      snapshot: DashboardGridEngineSnapshot;
      changeSet: DashboardGridEngineChangeSet;
      item?: DashboardGridResolvedItem;
    }>
  | Readonly<{
      status: 'unchanged';
      snapshot: DashboardGridEngineSnapshot;
      changeSet: DashboardGridEngineChangeSet;
      item?: DashboardGridResolvedItem;
    }>
  | Readonly<{
      status: 'rejected';
      reason: DashboardGridMutationRejectionReason;
      snapshot: DashboardGridEngineSnapshot;
      changeSet: DashboardGridEngineChangeSet;
      diagnostic?: DashboardGridEngineDiagnostic;
    }>;

export type DashboardGridFitResult = Readonly<{
  fits: boolean;
  resolvedPosition?: DashboardGridRect;
  reason?: 'bounds' | 'collision-cycle' | 'constraint' | 'duplicate-id' | 'max-rows';
}>;

export type DashboardGridBatchOptions = Readonly<{
  pack?: boolean;
}>;

export type DashboardGridLoadOptions = Readonly<{
  addMissing?: boolean;
  removeMissing?: boolean;
  sourceColumns?: number;
}>;

export type DashboardGridColumnLayoutContext = Readonly<{
  previousColumns: number;
  columns: number;
  items: readonly DashboardGridResolvedItem[];
}>;

export type DashboardGridColumnLayout =
  | 'list'
  | 'compact'
  | 'moveScale'
  | 'move'
  | 'scale'
  | 'none'
  | ((context: DashboardGridColumnLayoutContext) => readonly DashboardGridLayoutItemInput[]);

export type DashboardGridSerializedItem = Readonly<{
  id: string;
  column?: number;
  row?: number;
  columnSpan: number;
  rowSpan: number;
  minColumnSpan?: number;
  maxColumnSpan?: number;
  minRowSpan?: number;
  maxRowSpan?: number;
  autoPosition?: true;
  movable: boolean;
  resizable: boolean;
  locked: boolean;
}>;

export type DashboardGridEngineSerializedState = Readonly<{
  version: 1;
  columns: number;
  itemColumns: number;
  maxRows?: number;
  float: boolean;
  items: readonly DashboardGridSerializedItem[];
  layouts?: Readonly<Record<number, readonly DashboardGridSerializedItem[]>>;
}>;

export type DashboardGridEngineSaveOptions = Readonly<{
  columns?: number;
  includeLayouts?: boolean;
}>;

export type DashboardGridEngineOptions = Readonly<{
  columns?: number;
  maxRows?: number;
  float?: boolean;
  resizeDisabled?: boolean;
  collision?: Readonly<{
    dragActivationRatio?: number;
    nestingActivationRatio?: number;
  }>;
  items?: readonly DashboardGridLayoutItemInput[];
  serializedState?: DashboardGridEngineSerializedState;
  development?: boolean;
  onDiagnostic?: (diagnostic: DashboardGridEngineDiagnostic) => void;
  onError?: (error: DashboardGridEngineError) => void;
}>;

export interface DashboardGridEngine {
  getSnapshot(): DashboardGridEngineSnapshot;
  subscribe(listener: () => void): () => void;

  getItem(id: string): DashboardGridResolvedItem | undefined;
  getRow(): number;
  isAreaEmpty(area: DashboardGridRect): boolean;
  canPlace(item: DashboardGridLayoutItemInput): DashboardGridFitResult;

  beginBatch(options?: DashboardGridBatchOptions): void;
  commitBatch(options?: DashboardGridBatchOptions): DashboardGridEngineChangeSet;
  rollbackBatch(): DashboardGridEngineChangeSet;

  beginInteraction(id: string, context: DashboardGridInteractionContext): void;
  move(id: string, proposal: DashboardGridMoveProposal): DashboardGridMoveResult;
  rotate(
    id: string,
    options: Readonly<{
      pivot?: Readonly<{ column: number; row: number }>;
      input: 'pointer' | 'keyboard' | 'api';
    }>,
  ): DashboardGridMoveResult;
  commitInteraction(): DashboardGridEngineChangeSet;
  cancelInteraction(): DashboardGridEngineChangeSet;

  add(item: DashboardGridLayoutItemInput): DashboardGridMutationResult;
  remove(id: string): DashboardGridMutationResult;
  removeAll(): DashboardGridMutationResult;
  update(id: string, patch: DashboardGridLayoutItemPatch): DashboardGridMutationResult;
  load(items: readonly DashboardGridLayoutItemInput[], options?: DashboardGridLoadOptions): DashboardGridMutationResult;

  compact(mode?: 'compact' | 'list'): DashboardGridMutationResult;
  setColumns(columns: number, layout?: DashboardGridColumnLayout): DashboardGridMutationResult;
  save(options?: DashboardGridEngineSaveOptions): DashboardGridEngineSerializedState;
  clone(): DashboardGridEngine;
}
