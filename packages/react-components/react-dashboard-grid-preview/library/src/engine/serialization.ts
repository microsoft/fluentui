import type {
  DashboardGridEngineSaveOptions,
  DashboardGridEngineSerializedState,
  DashboardGridLayoutItemInput,
  DashboardGridSerializedItem,
} from './DashboardGridEngine.types';
import type { CachedLayoutNode, EngineState, InternalNode, OpaqueNodeKey } from './internalTypes';
import { applyLoad } from './load';
import { normalizeColumns, normalizeMaxRows } from './normalize';
import {
  applyColumnChange,
  cacheCurrentLayout,
  getCachedLayout,
  highestCachedColumns,
  setCachedLayout,
} from './responsiveLayouts';
import { cloneEngineState, createEmptyState, findNodeById } from './state';

export class DashboardGridSerializationError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'DashboardGridSerializationError';
  }
}

const serializedItem = (node: InternalNode, layout: CachedLayoutNode): DashboardGridSerializedItem =>
  Object.freeze({
    id: node.id,
    ...(layout.auto || layout.x === undefined || layout.y === undefined
      ? { autoPosition: true as const }
      : { column: layout.x, row: layout.y }),
    columnSpan: layout.w,
    rowSpan: node.h,
    ...(node.minW === undefined ? {} : { minColumnSpan: node.minW }),
    ...(node.maxW === undefined ? {} : { maxColumnSpan: node.maxW }),
    ...(node.minH === undefined ? {} : { minRowSpan: node.minH }),
    ...(node.maxH === undefined ? {} : { maxRowSpan: node.maxH }),
    movable: node.movable,
    resizable: node.resizable,
    locked: node.locked,
  });

const layoutForNode = (
  node: InternalNode,
  layout: ReadonlyMap<OpaqueNodeKey, CachedLayoutNode> | undefined,
): CachedLayoutNode => layout?.get(node.key) ?? { x: node.x, y: node.y, w: node.w };

const serializeItems = (
  state: EngineState,
  layout: ReadonlyMap<OpaqueNodeKey, CachedLayoutNode> | undefined,
): readonly DashboardGridSerializedItem[] => {
  const items = state.nodes
    .map(node => ({
      node,
      layout: layoutForNode(node, layout),
    }))
    .sort((a, b) => {
      const aAuto = a.layout.auto || a.layout.x === undefined || a.layout.y === undefined;
      const bAuto = b.layout.auto || b.layout.x === undefined || b.layout.y === undefined;
      if (aAuto !== bAuto) {
        return aAuto ? 1 : -1;
      }
      return (
        (a.layout.y ?? 0) - (b.layout.y ?? 0) ||
        (a.layout.x ?? 0) - (b.layout.x ?? 0) ||
        a.node.sequence - b.node.sequence
      );
    })
    .map(({ node, layout: cached }) => serializedItem(node, cached));

  return Object.freeze(items);
};

export const serializeEngineState = (
  state: EngineState,
  options: DashboardGridEngineSaveOptions = {},
): DashboardGridEngineSerializedState => {
  let source = state;
  let itemColumns = options.columns === undefined ? highestCachedColumns(state) : normalizeColumns(options.columns);
  let selectedLayout = getCachedLayout(state, itemColumns);

  if (selectedLayout === undefined && itemColumns !== state.columns) {
    const clone = cloneEngineState(state);
    const changed = applyColumnChange(clone, itemColumns);
    if (changed.accepted) {
      source = clone;
      selectedLayout = getCachedLayout(clone, itemColumns);
    } else {
      itemColumns = state.columns;
      selectedLayout = getCachedLayout(state, state.columns);
    }
  }

  if (selectedLayout === undefined && itemColumns === source.columns) {
    selectedLayout = new Map(source.nodes.map(node => [node.key, { x: node.x, y: node.y, w: node.w }]));
  }

  let layouts: Readonly<Record<number, readonly DashboardGridSerializedItem[]>> | undefined;
  if (options.includeLayouts) {
    const mutableLayouts: Record<number, readonly DashboardGridSerializedItem[]> = {};
    [...state.layouts.keys()]
      .sort((a, b) => a - b)
      .forEach(columns => {
        mutableLayouts[columns] = serializeItems(state, state.layouts.get(columns));
      });
    layouts = Object.freeze(mutableLayouts);
  }

  return Object.freeze({
    version: 1 as const,
    columns: state.columns,
    itemColumns,
    ...(state.maxRows === undefined ? {} : { maxRows: state.maxRows }),
    float: state.float,
    items: serializeItems(source, selectedLayout),
    ...(layouts === undefined ? {} : { layouts }),
  });
};

const serializedToInput = (item: DashboardGridSerializedItem): DashboardGridLayoutItemInput => ({
  id: item.id,
  ...(item.autoPosition ? { autoPosition: true } : { column: item.column, row: item.row }),
  columnSpan: item.columnSpan,
  rowSpan: item.rowSpan,
  minColumnSpan: item.minColumnSpan,
  maxColumnSpan: item.maxColumnSpan,
  minRowSpan: item.minRowSpan,
  maxRowSpan: item.maxRowSpan,
  movable: item.movable,
  resizable: item.resizable,
  locked: item.locked,
});

export const deserializeEngineState = (
  serialized: DashboardGridEngineSerializedState,
  options: {
    resizeDisabled?: boolean;
  } = {},
): EngineState => {
  if (
    serialized === null ||
    typeof serialized !== 'object' ||
    serialized.version !== 1 ||
    !Array.isArray(serialized.items)
  ) {
    throw new DashboardGridSerializationError('Unsupported or malformed dashboard grid serialized state.');
  }

  let columns: number;
  let itemColumns: number;
  try {
    columns = normalizeColumns(serialized.columns);
    itemColumns = normalizeColumns(serialized.itemColumns);
  } catch (error) {
    throw new DashboardGridSerializationError(error instanceof Error ? error.message : 'Invalid serialized columns.');
  }

  const state = createEmptyState({
    columns,
    maxRows: normalizeMaxRows(serialized.maxRows),
    float: serialized.float === true,
    resizeDisabled: options.resizeDisabled === true,
  });
  const loaded = applyLoad(state, serialized.items.map(serializedToInput), { sourceColumns: itemColumns });
  if (!loaded.accepted) {
    throw new DashboardGridSerializationError(
      loaded.diagnostics[0]?.message ?? 'The serialized dashboard grid layout could not be loaded.',
    );
  }

  if (serialized.layouts !== undefined) {
    Object.keys(serialized.layouts).forEach(columnsKey => {
      const layoutColumns = normalizeColumns(columnsKey);
      const entries = serialized.layouts?.[layoutColumns];
      if (!Array.isArray(entries)) {
        return;
      }

      const layout = new Map<OpaqueNodeKey, CachedLayoutNode>();
      entries.forEach(item => {
        const node = findNodeById(state.nodes, item.id);
        if (node === undefined) {
          return;
        }
        layout.set(
          node.key,
          item.autoPosition || item.column === undefined || item.row === undefined
            ? { w: item.columnSpan, auto: true }
            : {
                x: item.column,
                y: item.row,
                w: item.columnSpan,
              },
        );
      });
      setCachedLayout(state, layoutColumns, layout);
    });
  }

  cacheCurrentLayout(state);
  return state;
};
