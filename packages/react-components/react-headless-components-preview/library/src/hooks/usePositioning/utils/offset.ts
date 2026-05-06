import type { Position, PositioningProps } from '@fluentui/react-positioning';
import { POSITIONS } from '../constants';

export function applyOffset(node: HTMLElement, position: Position, mainAxis: number, crossAxis: number): void {
  if (mainAxis) {
    switch (position) {
      case POSITIONS.above:
        node.style.marginBlockEnd = `${mainAxis}px`;
        break;
      case POSITIONS.below:
        node.style.marginBlockStart = `${mainAxis}px`;
        break;
      case POSITIONS.before:
        node.style.marginInlineEnd = `${mainAxis}px`;
        break;
      case POSITIONS.after:
        node.style.marginInlineStart = `${mainAxis}px`;
        break;
    }
  }

  if (crossAxis) {
    switch (position) {
      case POSITIONS.above:
      case POSITIONS.below:
        node.style.marginInlineStart = `${crossAxis}px`;
        break;
      case POSITIONS.before:
      case POSITIONS.after:
        node.style.marginBlockStart = `${crossAxis}px`;
        break;
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
