import type * as React from 'react';
import type {
  DashboardGridColumnLayout,
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

export type DashboardGridItemPrintOptions = {
  hide?: boolean;
  pageBreak?: boolean;
  orientation?: 'portrait' | 'landscape';
};

export type DashboardGridItemDefinition = DashboardGridLayoutItemInput & {
  label?: string;
  content?: React.ReactNode;
  component?: string;
  props?: Readonly<Record<string, unknown>>;
  data?: unknown;
  lazyMount?: boolean;
  sizeToContent?: boolean | number;
  print?: DashboardGridItemPrintOptions;
  nestedGrid?: DashboardGridSerializedState;
};

export type DashboardGridSerializedItem = Omit<DashboardGridItemDefinition, 'content' | 'nestedGrid'> & {
  nestedGrid?: DashboardGridSerializedState;
};

export type DashboardGridSerializedState = {
  version: 1;
  engine: DashboardGridEngineSerializedState;
  items: readonly DashboardGridSerializedItem[];
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

  setCallbacks(callbacks: DashboardGridStoreCallbacks | undefined): void;
  setControlledItems(items: readonly DashboardGridItemDefinition[] | undefined): DashboardGridMutationResult | undefined;
  requestControlledReconciliation(): void;
  registerDeclarativeItem(item: DashboardGridItemDefinition): () => void;
  setItemOwner(id: string, gridId: string): void;
  takeDefinition(id: string): DashboardGridItemDefinition | undefined;
  receiveDefinition(item: DashboardGridItemDefinition): void;

  setRuntimeItemState(id: string, patch: Partial<DashboardGridRuntimeItemState>): void;
  setColumns(columns: number, layout?: DashboardGridColumnLayout): DashboardGridMutationResult;
  add(item: DashboardGridItemDefinition): DashboardGridMutationResult;
  remove(id: string): DashboardGridMutationResult;
  update(id: string, patch: DashboardGridLayoutItemPatch): DashboardGridMutationResult;
  compact(mode?: 'compact' | 'list'): DashboardGridMutationResult;
  load(
    items: readonly DashboardGridItemDefinition[],
    options?: DashboardGridLoadOptions,
  ): DashboardGridMutationResult;
  save(): DashboardGridSerializedState;
  dispose(): void;
};

export const dashboardGridDefaultRuntimeItemState: DashboardGridRuntimeItemState = {
  lazyVisible: true,
  mounted: false,
};

export const toDashboardGridEngineItem = (
  item: DashboardGridItemDefinition,
): DashboardGridLayoutItemInput => ({
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
