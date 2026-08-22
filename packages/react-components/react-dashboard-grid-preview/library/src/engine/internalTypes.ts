import type {
  DashboardGridCellMetrics,
  DashboardGridEngineDiagnostic,
  DashboardGridInteractionContext,
  DashboardGridPixelRect,
} from './DashboardGridEngine.types';

declare const opaqueNodeKeyBrand: unique symbol;

export type OpaqueNodeKey = number & {
  readonly [opaqueNodeKeyBrand]: true;
};

export type InternalRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type InternalNode = InternalRect & {
  key: OpaqueNodeKey;
  sequence: number;
  id: string;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  movable: boolean;
  resizable: boolean;
  locked: boolean;
  auto?: true;
};

export type CachedLayoutNode = {
  x?: number;
  y?: number;
  w: number;
  auto?: true;
};

export type ResponsiveLayoutCache = Map<
  number,
  Map<OpaqueNodeKey, CachedLayoutNode>
>;

export type EngineState = {
  columns: number;
  maxRows?: number;
  float: boolean;
  resizeDisabled: boolean;
  nodes: InternalNode[];
  layouts: ResponsiveLayoutCache;
  referenceColumns: number;
  nextKey: number;
  nextSequence: number;
};

export type BatchRecord = {
  depth: number;
  snapshot: EngineState;
  pack: boolean;
  published: boolean;
};

export type InteractionRecord = {
  activeKey: OpaqueNodeKey;
  context: DashboardGridInteractionContext;
  snapshot: EngineState;
  originalRects: Map<OpaqueNodeKey, InternalRect>;
  targetRects: Map<OpaqueNodeKey, DashboardGridPixelRect>;
  nestingTargetKey?: OpaqueNodeKey;
  nestingStartedAt?: number;
};

export type NormalizedItem = {
  node: InternalNode;
  authoredLayout: CachedLayoutNode;
  sourceColumns: number;
  diagnostics: DashboardGridEngineDiagnostic[];
};

export type CollisionRepairContext = {
  columns: number;
  float: boolean;
  loading: boolean;
  moving: boolean;
  movingDown: boolean;
  allowSwap: boolean;
  preferredCollisionKey?: OpaqueNodeKey;
  rootKey: OpaqueNodeKey;
  budget: number;
};

export type CollisionRepairResult =
  | {
      status: 'accepted';
      passes: number;
      swapped: boolean;
    }
  | {
      status: 'collision-cycle';
      passes: number;
    };

export type PixelCollisionContext = {
  metrics: DashboardGridCellMetrics;
  origin: DashboardGridPixelRect;
  current: DashboardGridPixelRect;
};

export const asOpaqueNodeKey = (value: number): OpaqueNodeKey =>
  value as OpaqueNodeKey;
