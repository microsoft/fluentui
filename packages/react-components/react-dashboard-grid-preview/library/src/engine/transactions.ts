import type {
  DashboardGridEngineChange,
  DashboardGridEngineChangeSet,
  DashboardGridEngineDiagnostic,
  DashboardGridGeometryChange,
  DashboardGridResolvedItem,
} from './DashboardGridEngine.types';
import { sameInternalRect, toPublicRect } from './geometry';
import type { EngineState, InternalNode, OpaqueNodeKey } from './internalTypes';
import {
  nodeToResolvedItem,
  sortNodesStable,
} from './state';

const freezeItems = (
  items: DashboardGridResolvedItem[],
): readonly DashboardGridResolvedItem[] => Object.freeze(items);

const freezeGeometryChanges = (
  changes: DashboardGridGeometryChange[],
): readonly DashboardGridGeometryChange[] => Object.freeze(changes);

export const createChangeSet = (
  before: EngineState,
  after: EngineState,
  revision: number,
  diagnostics: readonly DashboardGridEngineDiagnostic[] = [],
): DashboardGridEngineChangeSet => {
  const beforeByKey = new Map<OpaqueNodeKey, InternalNode>(
    before.nodes.map(node => [node.key, node]),
  );
  const afterByKey = new Map<OpaqueNodeKey, InternalNode>(
    after.nodes.map(node => [node.key, node]),
  );
  const removed = sortNodesStable(before.nodes)
    .filter(node => !afterByKey.has(node.key))
    .map(nodeToResolvedItem);
  const added = sortNodesStable(after.nodes)
    .filter(node => !beforeByKey.has(node.key))
    .map(nodeToResolvedItem);
  const changed = sortNodesStable(after.nodes).flatMap(node => {
    const previous = beforeByKey.get(node.key);
    if (previous === undefined || sameInternalRect(previous, node)) {
      return [];
    }

    return [
      Object.freeze({
        id: node.id,
        previous: toPublicRect(previous),
        current: toPublicRect(node),
      }),
    ];
  });
  const ordered: DashboardGridEngineChange[] = [
    ...removed.map(item => Object.freeze({ kind: 'removed' as const, item })),
    ...added.map(item => Object.freeze({ kind: 'added' as const, item })),
    ...changed.map(change =>
      Object.freeze({ kind: 'changed' as const, change }),
    ),
  ];

  return Object.freeze({
    revision,
    removed: freezeItems(removed),
    added: freezeItems(added),
    changed: freezeGeometryChanges(changed),
    changes: Object.freeze(ordered),
    diagnostics: Object.freeze([...diagnostics]),
  });
};

export const emptyChangeSet = (
  revision: number,
  diagnostics: readonly DashboardGridEngineDiagnostic[] = [],
): DashboardGridEngineChangeSet =>
  Object.freeze({
    revision,
    removed: Object.freeze([]),
    added: Object.freeze([]),
    changed: Object.freeze([]),
    changes: Object.freeze([]),
    diagnostics: Object.freeze([...diagnostics]),
  });
