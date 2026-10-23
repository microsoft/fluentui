import type { SideObject } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';

export function toFloatingUIPadding(
  padding: NonNullable<PositioningOptions['overflowBoundaryPadding']>,
  isRtl: boolean,
): number | Partial<SideObject> {
  if (typeof padding === 'number') {
    return padding;
  }

  const { start, end, ...verticalPadding } = padding;
  const paddingObject: Partial<SideObject> = verticalPadding;
  const left = isRtl ? 'end' : 'start';
  const right = isRtl ? 'start' : 'end';

  if (padding[left] !== undefined) {
    paddingObject.left = padding[left];
  }

  if (padding[right] !== undefined) {
    paddingObject.right = padding[right];
  }

  return paddingObject;
}
