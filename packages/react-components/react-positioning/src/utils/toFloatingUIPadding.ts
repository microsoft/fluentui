import type { SideObject } from '@floating-ui/dom';
import { PositioningOptions } from '../types';

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

  // assign properties explicitly since undefined values are actually handled by floating UI
  // TODO create floating UI issue
  if (padding[left]) {
    paddingObject.left = padding[left];
  }

  if (padding[right]) {
    paddingObject.right = padding[right];
  }

  return paddingObject;
}
