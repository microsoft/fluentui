import type {
  DashboardGridColumnLayout,
  DashboardGridEngineDiagnostic,
  DashboardGridLayoutItemInput,
} from './DashboardGridEngine.types';
import { repairCollisions } from './collision';
import { createDiagnostic } from './diagnostics';
import type { CachedLayoutNode, EngineState, InternalNode, OpaqueNodeKey } from './internalTypes';
import { normalizeInternalBounds, normalizeItem } from './normalize';
import { compactNodes, packNodes } from './packing';
import { findFirstEmptyPosition } from './placement';
import { cloneInternalNode, getInternalRow, nodeToResolvedItem, sortNodesStable } from './state';

const layoutFromNodes = (nodes: readonly InternalNode[]): Map<OpaqueNodeKey, CachedLayoutNode> =>
  new Map(nodes.map(node => [node.key, { x: node.x, y: node.y, w: node.w }]));

export const cacheCurrentLayout = (state: EngineState, clear = false): void => {
  if (clear) {
    state.layouts.clear();
  }
  state.layouts.set(state.columns, layoutFromNodes(state.nodes));
  state.referenceColumns = Math.max(state.referenceColumns, state.columns);
};

export const cacheAuthoredLayout = (
  state: EngineState,
  key: OpaqueNodeKey,
  layout: CachedLayoutNode,
  columns: number,
): void => {
  const normalizedColumns = Math.max(1, Math.trunc(columns));
  state.referenceColumns = Math.max(state.referenceColumns, normalizedColumns);
  const target = state.layouts.get(normalizedColumns) ?? new Map<OpaqueNodeKey, CachedLayoutNode>();
  target.set(key, { ...layout });
  state.layouts.set(normalizedColumns, target);
};

export const removeNodeFromAllLayouts = (state: EngineState, key: OpaqueNodeKey): void => {
  state.layouts.forEach(layout => layout.delete(key));
};

export const clearResponsiveLayouts = (state: EngineState): void => {
  state.layouts.clear();
};

export const synchronizeResponsiveCaches = (before: EngineState, after: EngineState): void => {
  const beforeByKey = new Map(before.nodes.map(node => [node.key, node]));
  const afterByKey = new Map(after.nodes.map(node => [node.key, node]));

  after.layouts.forEach((layout, columns) => {
    before.nodes.forEach(node => {
      if (!afterByKey.has(node.key)) {
        layout.delete(node.key);
      }
    });

    if (columns < after.columns) {
      after.layouts.delete(columns);
      return;
    }

    if (columns === after.columns) {
      return;
    }

    const ratio = columns / after.columns;
    after.nodes.forEach(node => {
      const previous = beforeByKey.get(node.key);
      const cached = layout.get(node.key);
      if (cached === undefined) {
        layout.set(node.key, {
          x: Math.max(0, Math.round(node.x * ratio)),
          y: node.y,
          w: Math.max(1, Math.round(node.w * ratio)),
        });
        return;
      }

      if (previous === undefined) {
        return;
      }

      if (node.y !== previous.y) {
        cached.y = Math.max(0, (cached.y ?? previous.y) + node.y - previous.y);
        delete cached.auto;
      }
      if (node.x !== previous.x) {
        cached.x = Math.max(0, Math.round(node.x * ratio));
        delete cached.auto;
      }
      if (node.w !== previous.w) {
        cached.w = Math.max(1, Math.round(node.w * ratio));
      }
    });
  });

  cacheCurrentLayout(after);
};

export const highestCachedColumns = (state: EngineState): number =>
  Math.max(state.columns, state.referenceColumns, ...state.layouts.keys());

const mergeCustomInput = (node: InternalNode, input: DashboardGridLayoutItemInput): DashboardGridLayoutItemInput => ({
  id: node.id,
  column: input.column ?? node.x,
  row: input.row ?? node.y,
  columnSpan: input.columnSpan ?? node.w,
  rowSpan: input.rowSpan ?? node.h,
  minColumnSpan: input.minColumnSpan ?? node.minW,
  maxColumnSpan: input.maxColumnSpan ?? node.maxW,
  minRowSpan: input.minRowSpan ?? node.minH,
  maxRowSpan: input.maxRowSpan ?? node.maxH,
  autoPosition: input.autoPosition,
  movable: input.movable ?? node.movable,
  resizable: input.resizable ?? node.resizable,
  locked: input.locked ?? node.locked,
});

const validateCustomLayout = (
  state: EngineState,
  layout: DashboardGridColumnLayout,
  columns: number,
): Readonly<{
  nodes?: InternalNode[];
  diagnostics: DashboardGridEngineDiagnostic[];
}> => {
  if (typeof layout !== 'function') {
    return { diagnostics: [] };
  }

  const diagnostics: DashboardGridEngineDiagnostic[] = [];
  const byId = new Map(state.nodes.map(node => [node.id, node]));
  const seen = new Set<string>();
  const result: InternalNode[] = [];
  let output: readonly DashboardGridLayoutItemInput[];

  try {
    output = layout(
      Object.freeze({
        previousColumns: state.columns,
        columns,
        items: Object.freeze(sortNodesStable(state.nodes).map(nodeToResolvedItem)),
      }),
    );
  } catch (error) {
    diagnostics.push(
      createDiagnostic('invalid-custom-layout', 'A custom column layout threw while computing the target layout.', {
        severity: 'error',
        details: {
          cause: error instanceof Error ? error.message : String(error),
        },
      }),
    );
    return { diagnostics };
  }

  if (!Array.isArray(output) || output.length !== state.nodes.length) {
    diagnostics.push(
      createDiagnostic(
        'invalid-custom-layout',
        'A custom column layout must return exactly one item for every existing ID.',
        { severity: 'error' },
      ),
    );
    return { diagnostics };
  }

  try {
    output.forEach(input => {
      const node = byId.get(input.id);
      if (node === undefined || seen.has(input.id)) {
        throw new Error('Unknown or duplicate item ID.');
      }
      seen.add(input.id);
      result.push(
        normalizeItem(mergeCustomInput(node, input), {
          columns,
          ...(state.maxRows === undefined ? {} : { maxRows: state.maxRows }),
          key: node.key,
          sequence: node.sequence,
          resizing: true,
          sourceColumns: columns,
        }).node,
      );
    });
  } catch (error) {
    diagnostics.push(
      createDiagnostic(
        'invalid-custom-layout',
        'A custom column layout returned invalid, duplicate, or unknown items.',
        {
          severity: 'error',
          details: {
            cause: error instanceof Error ? error.message : String(error),
          },
        },
      ),
    );
    return { diagnostics };
  }

  return { nodes: result, diagnostics };
};

const sourceForNode = (
  node: InternalNode,
  sourceLayout: ReadonlyMap<OpaqueNodeKey, CachedLayoutNode> | undefined,
): CachedLayoutNode => sourceLayout?.get(node.key) ?? { x: node.x, y: node.y, w: node.w };

const rebuildWithoutOverlaps = (
  source: readonly InternalNode[],
  state: EngineState,
): Readonly<{ nodes?: InternalNode[]; diagnostic?: DashboardGridEngineDiagnostic }> => {
  const rebuilt: InternalNode[] = [];
  let failed = false;

  sortNodesStable(source).forEach(candidateSource => {
    if (failed) {
      return;
    }

    const candidate = cloneInternalNode(candidateSource);
    let autoPlaced = false;
    if (candidate.auto) {
      const empty = findFirstEmptyPosition(candidate, rebuilt, state.columns, {
        ...(state.maxRows === undefined ? {} : { maxRows: state.maxRows }),
      });
      if (empty !== undefined) {
        candidate.x = empty.x;
        candidate.y = empty.y;
        delete candidate.auto;
        autoPlaced = true;
      }
    }

    rebuilt.push(candidate);
    if (autoPlaced) {
      return;
    }
    const repair = repairCollisions(rebuilt, candidate.key, candidate, {
      columns: state.columns,
      float: state.float,
      loading: true,
      moving: false,
      movingDown: false,
      allowSwap: false,
      rootKey: candidate.key,
      budget: Math.max(1, rebuilt.length * 2 + 1),
    });
    if (repair.status === 'collision-cycle') {
      failed = true;
    }
  });

  if (failed) {
    return {
      diagnostic: createDiagnostic('collision-cycle', 'Responsive layout collision repair exceeded its pass budget.', {
        severity: 'error',
      }),
    };
  }

  return { nodes: rebuilt };
};

export const applyColumnChange = (
  state: EngineState,
  columns: number,
  layout: DashboardGridColumnLayout = 'moveScale',
): Readonly<{
  accepted: boolean;
  diagnostics: readonly DashboardGridEngineDiagnostic[];
}> => {
  if (columns === state.columns) {
    return { accepted: true, diagnostics: Object.freeze([]) };
  }

  const previousColumns = state.columns;
  if (columns < previousColumns) {
    cacheCurrentLayout(state);
  }

  const custom = validateCustomLayout(state, layout, columns);
  if (custom.diagnostics.length > 0) {
    return {
      accepted: false,
      diagnostics: Object.freeze([...custom.diagnostics]),
    };
  }

  const exactTarget = columns > previousColumns ? state.layouts.get(columns) : undefined;
  const largestColumns = highestCachedColumns(state);
  const useLargest =
    exactTarget === undefined &&
    columns > previousColumns &&
    largestColumns !== previousColumns &&
    state.layouts.has(largestColumns);
  const baseColumns = exactTarget !== undefined ? columns : useLargest ? largestColumns : previousColumns;
  const sourceLayout = exactTarget ?? (useLargest ? state.layouts.get(largestColumns) : layoutFromNodes(state.nodes));
  let candidates: InternalNode[];

  if (columns === 1) {
    let row = 0;
    candidates = sortNodesStable(custom.nodes ?? state.nodes).map(source => {
      const node = cloneInternalNode(source);
      node.x = 0;
      node.y = row;
      node.w = 1;
      row += node.h;
      delete node.auto;
      return node;
    });
  } else if (custom.nodes !== undefined) {
    candidates = custom.nodes.map(cloneInternalNode);
  } else {
    const ratio = columns / baseColumns;
    candidates = state.nodes.map(source => {
      const node = cloneInternalNode(source);
      const cached = sourceForNode(source, sourceLayout);

      if (exactTarget !== undefined) {
        node.x = cached.x ?? 0;
        node.y = cached.y ?? node.y;
        node.w = cached.w;
        if (cached.auto) {
          node.auto = true;
        } else {
          delete node.auto;
        }
      } else {
        const move = layout === 'move' || layout === 'moveScale';
        const scale = layout === 'scale' || layout === 'moveScale';
        node.x = move ? Math.round((cached.x ?? node.x) * ratio) : Math.min(cached.x ?? node.x, columns - 1);
        node.w =
          baseColumns === 1 ? 1 : scale ? Math.max(1, Math.round(cached.w * ratio)) : Math.min(cached.w, columns);
        node.y = cached.y ?? node.y;
        if (cached.auto) {
          node.auto = true;
        }
      }

      const bounded = normalizeInternalBounds(node, {
        columns,
        ...(state.maxRows === undefined ? {} : { maxRows: state.maxRows }),
        resizing: false,
      });
      node.x = bounded.x;
      node.y = bounded.y;
      node.w = bounded.w;
      node.h = bounded.h;
      return node;
    });
  }

  state.columns = columns;
  if (layout === 'compact' || layout === 'list') {
    state.nodes = compactNodes(candidates, columns, layout, state.maxRows);
  } else {
    const rebuilt = rebuildWithoutOverlaps(candidates, state);
    if (rebuilt.nodes === undefined) {
      return {
        accepted: false,
        diagnostics: Object.freeze(rebuilt.diagnostic === undefined ? [] : [rebuilt.diagnostic]),
      };
    }
    state.nodes = rebuilt.nodes;
    packNodes(state.nodes, { float: state.float });
  }

  if (state.maxRows !== undefined && getInternalRow(state.nodes) > state.maxRows) {
    return {
      accepted: false,
      diagnostics: Object.freeze([
        createDiagnostic('max-rows', 'The responsive layout exceeds the configured maximum row count.', {
          severity: 'error',
        }),
      ]),
    };
  }

  cacheCurrentLayout(state);
  state.referenceColumns = Math.max(state.referenceColumns, columns);
  return { accepted: true, diagnostics: Object.freeze([]) };
};

export const getCachedLayout = (
  state: EngineState,
  columns: number,
): ReadonlyMap<OpaqueNodeKey, CachedLayoutNode> | undefined => state.layouts.get(columns);

export const setCachedLayout = (
  state: EngineState,
  columns: number,
  layout: ReadonlyMap<OpaqueNodeKey, CachedLayoutNode>,
): void => {
  state.layouts.set(columns, new Map([...layout].map(([key, node]) => [key, { ...node }] as const)));
  state.referenceColumns = Math.max(state.referenceColumns, columns);
};
