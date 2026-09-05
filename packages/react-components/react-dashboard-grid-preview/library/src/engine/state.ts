import type { DashboardGridEngineSnapshot, DashboardGridResolvedItem } from './DashboardGridEngine.types';
import { intersects, sameInternalRect, toPublicRect } from './geometry';
import type {
  CachedLayoutNode,
  EngineState,
  InternalNode,
  InternalRect,
  OpaqueNodeKey,
  ResponsiveLayoutCache,
} from './internalTypes';

export const cloneInternalRect = (rect: InternalRect): InternalRect => ({
  x: rect.x,
  y: rect.y,
  w: rect.w,
  h: rect.h,
});

export const cloneInternalNode = (node: InternalNode): InternalNode => ({
  ...node,
});

const cloneCachedLayoutNode = (node: CachedLayoutNode): CachedLayoutNode => ({
  ...node,
});

export const cloneResponsiveLayouts = (layouts: ResponsiveLayoutCache): ResponsiveLayoutCache => {
  const clone: ResponsiveLayoutCache = new Map();

  layouts.forEach((layout, columns) => {
    const layoutClone = new Map<OpaqueNodeKey, CachedLayoutNode>();
    layout.forEach((node, key) => layoutClone.set(key, cloneCachedLayoutNode(node)));
    clone.set(columns, layoutClone);
  });

  return clone;
};

export const cloneEngineState = (state: EngineState): EngineState => ({
  columns: state.columns,
  ...(state.maxRows === undefined ? {} : { maxRows: state.maxRows }),
  float: state.float,
  resizeDisabled: state.resizeDisabled,
  nodes: state.nodes.map(cloneInternalNode),
  layouts: cloneResponsiveLayouts(state.layouts),
  referenceColumns: state.referenceColumns,
  nextKey: state.nextKey,
  nextSequence: state.nextSequence,
});

export const compareNodes = (a: InternalNode, b: InternalNode): number =>
  a.y - b.y || a.x - b.x || a.sequence - b.sequence;

export const sortNodesStable = (nodes: readonly InternalNode[], direction: 1 | -1 = 1): InternalNode[] =>
  [...nodes].sort((a, b) => direction * compareNodes(a, b));

export const nodeToResolvedItem = (node: InternalNode): DashboardGridResolvedItem =>
  Object.freeze({
    id: node.id,
    ...toPublicRect(node),
    ...(node.minW === undefined ? {} : { minColumnSpan: node.minW }),
    ...(node.maxW === undefined ? {} : { maxColumnSpan: node.maxW }),
    ...(node.minH === undefined ? {} : { minRowSpan: node.minH }),
    ...(node.maxH === undefined ? {} : { maxRowSpan: node.maxH }),
    movable: node.movable,
    resizable: node.resizable,
    locked: node.locked,
  });

export const createSnapshot = (state: EngineState, revision: number): DashboardGridEngineSnapshot => {
  const items = sortNodesStable(state.nodes).map(nodeToResolvedItem);

  return Object.freeze({
    revision,
    columns: state.columns,
    ...(state.maxRows === undefined ? {} : { maxRows: state.maxRows }),
    float: state.float,
    items: Object.freeze(items),
  });
};

export const getInternalRow = (nodes: readonly InternalNode[]): number =>
  nodes.reduce((row, node) => Math.max(row, node.y + node.h), 0);

export const findNodeById = (nodes: readonly InternalNode[], id: string): InternalNode | undefined =>
  nodes.find(node => node.id === id);

export const findNodeByKey = (nodes: readonly InternalNode[], key: OpaqueNodeKey): InternalNode | undefined =>
  nodes.find(node => node.key === key);

export const createRectMap = (nodes: readonly InternalNode[]): Map<OpaqueNodeKey, InternalRect> => {
  const result = new Map<OpaqueNodeKey, InternalRect>();
  nodes.forEach(node => result.set(node.key, cloneInternalRect(node)));
  return result;
};

export const hasOverlaps = (nodes: readonly InternalNode[]): boolean => {
  for (let index = 0; index < nodes.length; index++) {
    for (let otherIndex = index + 1; otherIndex < nodes.length; otherIndex++) {
      if (intersects(nodes[index], nodes[otherIndex])) {
        return true;
      }
    }
  }

  return false;
};

const sameOptionalNumber = (a: number | undefined, b: number | undefined): boolean => a === b;

export const sameNode = (a: InternalNode, b: InternalNode): boolean =>
  a.key === b.key &&
  a.sequence === b.sequence &&
  a.id === b.id &&
  sameInternalRect(a, b) &&
  sameOptionalNumber(a.minW, b.minW) &&
  sameOptionalNumber(a.maxW, b.maxW) &&
  sameOptionalNumber(a.minH, b.minH) &&
  sameOptionalNumber(a.maxH, b.maxH) &&
  a.movable === b.movable &&
  a.resizable === b.resizable &&
  a.locked === b.locked &&
  a.auto === b.auto;

export const samePublicState = (a: EngineState, b: EngineState): boolean => {
  if (a.columns !== b.columns || a.maxRows !== b.maxRows || a.float !== b.float || a.nodes.length !== b.nodes.length) {
    return false;
  }

  const bByKey = new Map(b.nodes.map(node => [node.key, node]));
  return a.nodes.every(node => {
    const other = bByKey.get(node.key);
    return other !== undefined && sameNode(node, other);
  });
};

export const createEmptyState = (options: {
  columns: number;
  maxRows?: number;
  float: boolean;
  resizeDisabled: boolean;
}): EngineState => ({
  columns: options.columns,
  ...(options.maxRows === undefined ? {} : { maxRows: options.maxRows }),
  float: options.float,
  resizeDisabled: options.resizeDisabled,
  nodes: [],
  layouts: new Map(),
  referenceColumns: Math.max(12, options.columns),
  nextKey: 1,
  nextSequence: 1,
});
