import type { DashboardGridPixelRect } from './DashboardGridEngine.types';
import {
  directionalCoverage,
  intersects,
  touches,
} from './geometry';
import type {
  CollisionRepairContext,
  CollisionRepairResult,
  InternalNode,
  InternalRect,
  OpaqueNodeKey,
} from './internalTypes';
import { findNodeByKey, sortNodesStable } from './state';

export const firstCollision = (
  nodes: readonly InternalNode[],
  skipKey: OpaqueNodeKey,
  area: InternalRect,
  secondSkipKey?: OpaqueNodeKey,
): InternalNode | undefined =>
  sortNodesStable(nodes).find(
    node =>
      node.key !== skipKey &&
      node.key !== secondSkipKey &&
      intersects(node, area),
  );

export const allCollisions = (
  nodes: readonly InternalNode[],
  skipKey: OpaqueNodeKey,
  area: InternalRect,
  secondSkipKey?: OpaqueNodeKey,
): InternalNode[] =>
  sortNodesStable(nodes).filter(
    node =>
      node.key !== skipKey &&
      node.key !== secondSkipKey &&
      intersects(node, area),
  );

export const selectPointerCollision = (
  candidates: readonly InternalNode[],
  targetRects: ReadonlyMap<OpaqueNodeKey, DashboardGridPixelRect>,
  origin: DashboardGridPixelRect,
  current: DashboardGridPixelRect,
): Readonly<{ node: InternalNode; coverage: number }> | undefined => {
  let selected: InternalNode | undefined;
  let selectedCoverage = 0.5;

  candidates.forEach(candidate => {
    if (candidate.locked) {
      return;
    }

    const target = targetRects.get(candidate.key);
    if (target === undefined) {
      return;
    }

    const coverage = directionalCoverage(origin, current, target);
    if (coverage > selectedCoverage) {
      selected = candidate;
      selectedCoverage = coverage;
    }
  });

  return selected === undefined
    ? undefined
    : Object.freeze({ node: selected, coverage: selectedCoverage });
};

export const canSwap = (a: InternalNode, b: InternalNode): boolean => {
  if (a.locked || b.locked || !touches(a, b)) {
    return false;
  }

  return (
    (a.w === b.w &&
      a.h === b.h &&
      (a.x === b.x || a.y === b.y)) ||
    (a.w === b.w && a.x === b.x) ||
    (a.h === b.h && a.y === b.y)
  );
};

export const swapNodes = (first: InternalNode, second: InternalNode): boolean => {
  if (!canSwap(first, second)) {
    return false;
  }

  let a = first;
  let b = second;
  if (a.w === b.w && a.x === b.x && b.y < a.y) {
    a = second;
    b = first;
  } else if (a.h === b.h && a.y === b.y && b.x < a.x) {
    a = second;
    b = first;
  }

  const oldBX = b.x;
  const oldBY = b.y;
  b.x = a.x;
  b.y = a.y;

  if (a.h !== b.h) {
    a.x = oldBX;
    a.y = b.y + b.h;
  } else if (a.w !== b.w) {
    a.x = b.x + b.w;
    a.y = oldBY;
  } else {
    a.x = oldBX;
    a.y = oldBY;
  }

  return true;
};

export const repairCollisions = (
  nodes: InternalNode[],
  activeKey: OpaqueNodeKey,
  desired: InternalRect,
  context: CollisionRepairContext,
): CollisionRepairResult => {
  let passes = 0;
  const stack = new Set<OpaqueNodeKey>();
  const hasLocked = nodes.some(node => node.locked);
  const originalActive = findNodeByKey(nodes, activeKey);
  const initialCollisions = allCollisions(nodes, activeKey, desired);
  const preferredInitial =
    context.preferredCollisionKey === undefined
      ? undefined
      : initialCollisions.find(
          collision => collision.key === context.preferredCollisionKey,
        );
  const initialCollision = preferredInitial ?? initialCollisions[0];
  if (
    context.allowSwap &&
    originalActive !== undefined &&
    initialCollision !== undefined &&
    canSwap(originalActive, initialCollision) &&
    swapNodes(originalActive, initialCollision)
  ) {
    return { status: 'accepted', passes, swapped: true };
  }

  const repair = (
    key: OpaqueNodeKey,
    next: InternalRect,
    topLevel: boolean,
  ): boolean => {
    if (stack.has(key)) {
      return false;
    }

    const node = findNodeByKey(nodes, key);
    if (node === undefined) {
      return false;
    }

    stack.add(key);
    node.x = next.x;
    node.y = next.y;
    node.w = next.w;
    node.h = next.h;

    while (true) {
      const useEntireRow =
        !context.float &&
        !hasLocked &&
        (!topLevel || !context.moving || !context.movingDown);
      const area = useEntireRow
        ? { x: 0, y: node.y, w: context.columns, h: node.h }
        : { x: node.x, y: node.y, w: node.w, h: node.h };
      const collisions = allCollisions(nodes, key, area, context.rootKey === key ? undefined : context.rootKey);
      if (collisions.length === 0) {
        stack.delete(key);
        return true;
      }

      passes++;
      if (passes > context.budget) {
        stack.delete(key);
        return false;
      }

      const preferred =
        topLevel && context.preferredCollisionKey !== undefined
          ? collisions.find(
              collision => collision.key === context.preferredCollisionKey,
            )
          : undefined;
      const collision = preferred ?? collisions[0];

      const activeSkips =
        collision.locked ||
        (topLevel && context.loading) ||
        (topLevel && context.moving && context.movingDown && !context.float);
      if (activeSkips) {
        node.y = collision.y + collision.h;
        continue;
      }

      const pushed = repair(
        collision.key,
        {
          x: collision.x,
          y: node.y + node.h,
          w: collision.w,
          h: collision.h,
        },
        false,
      );
      if (!pushed) {
        stack.delete(key);
        return false;
      }
    }
  };

  const accepted = repair(activeKey, desired, true);
  if (!accepted) {
    return { status: 'collision-cycle', passes };
  }

  return { status: 'accepted', passes, swapped: false };
};
