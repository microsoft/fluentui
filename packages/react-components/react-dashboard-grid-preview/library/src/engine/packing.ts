import { intersects, sameInternalRect } from './geometry';
import type { InternalNode, InternalRect, OpaqueNodeKey } from './internalTypes';
import { findFirstEmptyPosition } from './placement';
import { cloneInternalNode, sortNodesStable } from './state';

const collidesAt = (node: InternalNode, area: InternalRect, nodes: readonly InternalNode[]): boolean =>
  nodes.some(other => other.key !== node.key && intersects(area, other));

export const packNodes = (
  nodes: InternalNode[],
  options: {
    float: boolean;
    originalRects?: ReadonlyMap<OpaqueNodeKey, InternalRect>;
  },
): void => {
  const sorted = sortNodesStable(nodes);

  sorted.forEach(node => {
    if (node.locked) {
      return;
    }

    if (options.float) {
      const original = options.originalRects?.get(node.key);
      if (original === undefined || sameInternalRect(node, original)) {
        return;
      }

      while (node.y > original.y) {
        const next = { x: node.x, y: node.y - 1, w: node.w, h: node.h };
        if (collidesAt(node, next, nodes)) {
          break;
        }
        node.y--;
      }
      return;
    }

    while (node.y > 0) {
      const next = { x: node.x, y: node.y - 1, w: node.w, h: node.h };
      if (collidesAt(node, next, nodes)) {
        break;
      }
      node.y--;
    }
  });

  const ordered = sortNodesStable(nodes);
  nodes.splice(0, nodes.length, ...ordered);
};

export const compactNodes = (
  nodes: readonly InternalNode[],
  columns: number,
  mode: 'compact' | 'list',
  maxRows?: number,
): InternalNode[] => {
  const sorted = sortNodesStable(nodes);
  const rebuilt: InternalNode[] = sorted.filter(node => node.locked).map(cloneInternalNode);
  let previous: InternalNode | undefined;

  sorted.forEach(source => {
    if (source.locked) {
      previous = rebuilt.find(node => node.key === source.key);
      return;
    }

    const node = cloneInternalNode(source);
    const position = findFirstEmptyPosition(node, rebuilt, columns, {
      ...(mode === 'list' && previous !== undefined ? { after: previous } : {}),
      ...(maxRows === undefined ? {} : { maxRows }),
    });
    if (position !== undefined) {
      node.x = position.x;
      node.y = position.y;
    }
    delete node.auto;
    rebuilt.push(node);
    previous = node;
  });

  return sortNodesStable(rebuilt);
};
