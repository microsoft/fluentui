import type { Position, PositioningProps } from '@fluentui/react-positioning';
import { POSITIONS } from '../constants';

export function applyOffset(node: HTMLElement, position: Position, mainAxis: number, crossAxis: number): void {
  const isBlockMain = position === POSITIONS.above || position === POSITIONS.below;

  if (mainAxis) {
    const main = `${mainAxis}px`;
    if (isBlockMain) {
      node.style.marginBlockStart = main;
      node.style.marginBlockEnd = main;
    } else {
      node.style.marginInlineStart = main;
      node.style.marginInlineEnd = main;
    }
  }

  if (crossAxis) {
    const cross = `${crossAxis}px`;
    if (isBlockMain) {
      node.style.marginInlineStart = cross;
      node.style.marginInlineEnd = cross;
    } else {
      node.style.marginBlockStart = cross;
      node.style.marginBlockEnd = cross;
    }
  }
}

/**
 * Normalises the `offset` prop into explicit `{ mainAxis, crossAxis }`. The
 * function form (`OffsetFunction`) is not supported under CSS anchor
 * positioning — rect information is not available ahead of layout — and
 * resolves to a zero offset.
 */
export function resolveOffset(offset: PositioningProps['offset']): { mainAxis: number; crossAxis: number } {
  if (typeof offset === 'number') {
    return { mainAxis: offset, crossAxis: 0 };
  }

  if (offset && typeof offset === 'object') {
    return { mainAxis: offset.mainAxis ?? 0, crossAxis: offset.crossAxis ?? 0 };
  }

  return { mainAxis: 0, crossAxis: 0 };
}
