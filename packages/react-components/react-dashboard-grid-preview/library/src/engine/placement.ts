import { intersects } from './geometry';
import type { InternalNode, InternalRect } from './internalTypes';

export const findFirstEmptyPosition = (
  size: Pick<InternalRect, 'w' | 'h'>,
  nodes: readonly InternalNode[],
  columns: number,
  options: {
    after?: InternalRect;
    maxRows?: number;
  } = {},
): InternalRect | undefined => {
  const start =
    options.after === undefined
      ? 0
      : options.after.y * columns + options.after.x + options.after.w;
  const contentRows = nodes.reduce(
    (row, node) => Math.max(row, node.y + node.h),
    0,
  );
  const lastRow =
    options.maxRows === undefined
      ? contentRows + nodes.length * Math.max(1, size.h) + 1
      : options.maxRows - size.h;

  for (let index = start; Math.floor(index / columns) <= lastRow; index++) {
    const x = index % columns;
    const y = Math.floor(index / columns);
    if (x + size.w > columns) {
      continue;
    }

    const candidate: InternalRect = { x, y, w: size.w, h: size.h };
    if (!nodes.some(node => intersects(candidate, node))) {
      return candidate;
    }
  }

  return undefined;
};
