import type { Position, PositioningProps } from '@fluentui/react-positioning';
import { ABOVE, BELOW } from '../constants';

type ResolvedOffset = [mainAxis: number, crossAxis: number];

export function applyOffset(node: HTMLElement, position: Position, mainAxis: number, crossAxis: number): void {
  const isBlockMain = position === ABOVE || position === BELOW;

  const setMargin = (axis: 'block' | 'inline', value: number) => {
    const margin = `${value}px`;
    node.style.setProperty(`margin-${axis}-start`, margin);
    node.style.setProperty(`margin-${axis}-end`, margin);
  };

  mainAxis && setMargin(isBlockMain ? 'block' : 'inline', mainAxis);
  crossAxis && setMargin(isBlockMain ? 'inline' : 'block', crossAxis);
}

/**
 * Normalises the `offset` prop into explicit `{ mainAxis, crossAxis }`. The
 * function form (`OffsetFunction`) is not supported under CSS anchor
 * positioning — rect information is not available ahead of layout — and
 * resolves to a zero offset.
 */
export function resolveOffset(offset: PositioningProps['offset']): ResolvedOffset {
  if (typeof offset === 'number') {
    return [offset, 0];
  }

  if (offset && typeof offset === 'object') {
    return [offset.mainAxis ?? 0, offset.crossAxis ?? 0];
  }

  return [0, 0];
}
